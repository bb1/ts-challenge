import axios from 'axios';
import { AutoCompleteResponse } from './interfaces';

const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';

export async function autoCompleteAddress(query: string): Promise<AutoCompleteResponse> {

    const res = await axios.get(BASE_URL + query);

    //console.log(res.data);

    // stb  = district
    // plz  = zip
    // name = str

    let resCount = res.data.count;
    let numbers = [];
    let i;
    for(i=0; i<resCount; i++) {
        numbers.push( res.data.locs[i].fields.hnr);
    }     

    numbers.sort((a, b)=>{return a-b});

    //console.log(numbers);

    return {
        count: 1,
        addresses: [{
            district:   res.data.locs[0].fields.stb,
            zip:        res.data.locs[0].fields.plz,
            city:       'Köln',
            street:     res.data.locs[0].fields.str,
            numbers:    numbers
        }],
        time: 0,
    }
}

export class InvalidParameters extends Error {
}
