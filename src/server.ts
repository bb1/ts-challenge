import axios from 'axios';
import { Address, AutoCompleteResponse } from './interfaces';

const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';

const CITY = 'Köln'

interface LocationResult {
    fields: {
        hnr: string; // street number
        str: string; // street
        strid: string;
        plz: string;
        stb: string; // ?
    };
}

interface FetchResult {
    ok: boolean;
    count: number;
    locs: LocationResult[]
    time: string;
}

const fetchAddresses = async (query: string): Promise<FetchResult> => {
    return await (await axios.get(`${BASE_URL}${query}`)).data;
}

export async function autoCompleteAddress(query: string): Promise<AutoCompleteResponse> {
    if (typeof query !== 'string') {
        throw new InvalidParameters();
    }
    
    const result = await fetchAddresses(query);

    const addressMap = result.locs.reduce((acc: Record<string, Address>, {fields}) => {
        const { strid: key, hnr: number, str: street, plz: zip, stb: district } = fields;
        if (key in acc) {
            acc[key].numbers.push(number);
        } else {
            acc[key] = {
                street,
                zip,
                district,
                city: CITY,
                numbers: [number]
            };
        }
        return acc;
    }, {});

    const addresses = Object
        .values(addressMap)
        .map(address => ({
            ...address,
            numbers: address.numbers.sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10)),
        }))
        .sort((a, b) => a.district.localeCompare(b.district));

    return {
        count: addresses.length,
        addresses,
        time: 0,
    }
}

export class InvalidParameters extends Error {
}