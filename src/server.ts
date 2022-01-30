import axios from 'axios';
import { AutoCompleteResponse, Address, AutoCompleteResponseWithoutNo, AddressWithoutNo } from './interfaces';


const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';



export async function autoCompleteAddress(query: string, HouseNumbers: boolean = true): Promise<AutoCompleteResponse> {

    if (typeof query != 'string') throw new InvalidParameters("query must be a string");

    const timerStart = Date.now();
    const url = BASE_URL + query
    const res = await axios.get(url);

    // stb = district
    // plz = zip
    // str = street

    // return empty AutoCompleteResponse if res.data is empty
    if (!res.data.count) {
        const delta = Date.now() - timerStart;
        const ret: AutoCompleteResponse = {
            count: 0,
            addresses: [],
            time: delta
        }
        return ret;
    };


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


export async function autoCompleteAddressWithoutNo(query: string): Promise<AutoCompleteResponseWithoutNo> {
    if (typeof query != 'string') throw new InvalidParameters("query must be a string");

    const timerStart = Date.now();
    const url = BASE_URL + query
    const res = await axios.get(url);

    // stb = district
    // plz = zip
    // str = street

    // return empty AutoCompleteResponseWithoutNo if res.data is empty
    if (!res.data.count) {
        const delta = Date.now() - timerStart;
        const ret: AutoCompleteResponseWithoutNo = {
            count: 0,
            addresses: [],
            time: delta
        }
        return ret;
    };

    let addresses: AddressWithoutNo[] = [];

    let streetIds = Array.from(new Set(res.data.locs.map((item: any)=>item.fields.strid)));
    streetIds.reverse(); // apparently - order does matter ...

    streetIds.forEach((streetId) => {
        const streetData = res.data.locs.filter((address: any)=> address.fields.strid == streetId);
        addresses.push({
            district:   streetData[0].fields.stb,
            zip:        streetData[0].fields.plz,
            city:       'Köln',
            street:     streetData[0].fields.str,
        });
    });

    const delta = Date.now() - timerStart;
    const ret: AutoCompleteResponseWithoutNo = {
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
