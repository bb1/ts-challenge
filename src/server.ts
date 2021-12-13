
interface Address {
    street: string;
    zip: string;
    number: string;
    district: string;
}

const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';

export function autoCompleteAddress(query): Address[] {
    return []
}