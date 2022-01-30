import axios from 'axios';
import { AutoCompleteResponse } from './interfaces';
import { Address } from './interfaces';

const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';

export async function autoCompleteAddress(query: string): Promise<AutoCompleteResponse> {

    if (typeof query != 'string') throw new InvalidParameters("query must be a string");

    const timerStart = Date.now();
    const url = BASE_URL + query
    const res = await axios.get(url);

    // stb = district
    // plz = zip
    // str = street

    // return empty AutoCompleteResponse if no res.data is empty
    if (!res.data.count) {
        const delta = Date.now() - timerStart;
        const ret: AutoCompleteResponse = {
            count: 0,
            addresses: [],
            time: delta
        }
        return ret;
    };

    let numbers:   string[]  = [];
    let addresses: Address[] = [];

    let streetIds = Array.from(new Set(res.data.locs.map((item: any)=>item.fields.strid)));
    streetIds.reverse(); // apparently - order does matter ...

    streetIds.forEach((streetId) => {
        const streetData = res.data.locs.filter((address: any)=> address.fields.strid == streetId);
        let numbers: string[] = streetData.map((address: any) => address.fields.hnr);
        numbers.sort((a, b) => {
            return a.localeCompare(b, undefined, {
                numeric:     true,
                sensitivity: 'base'
        })});

        addresses.push({
            district:   streetData[0].fields.stb,
            zip:        streetData[0].fields.plz,
            city:       'Köln',
            street:     streetData[0].fields.str,
            numbers:    numbers
        });
    });

    const delta = Date.now() - timerStart;

    const ret: AutoCompleteResponse = {
        count: addresses.length,
        addresses: addresses,
        time: delta,
    }
    return ret;
}

export class InvalidParameters extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, InvalidParameters.prototype);
    }
}
