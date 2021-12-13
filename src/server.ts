import fetch from 'node-fetch';

export interface AutoCompleteResponse {
    count: number;
    addresses: Address[];
    time: number;
}
export interface Address {
    street: string;
    numbers: string[];
    zip: string;
    district: string;
    city: string;
}

const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';

export function autoCompleteAddress(query: string): AutoCompleteResponse {
    return {
        count: 1,
        addresses: [{
            district: 'Kalk',
            zip: '51103',
            city: 'Köln',
            street: 'Straße des 17. Juni',
            numbers: ['4', '4a']
        }],
        time: 0,
    }
}

export class InvalidParameters extends Error {
}