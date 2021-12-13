import fetch from 'node-fetch';

export interface Address {
    street: string;
    numbers: string[];
    zip: string;
    district: string;
}

const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';

export function autoCompleteAddress(query: string): Address[] {
    return []
}