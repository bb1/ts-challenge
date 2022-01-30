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

export interface AutoCompleteResponseWithoutNo {
    count: number;
    addresses: AddressWithoutNo[];
    time: number;
}

export interface AddressWithoutNo {
    street: string;
    zip: string;
    district: string;
    city: string;
}

