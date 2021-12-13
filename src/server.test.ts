import { autoCompleteAddress, Address } from './server';

const QUERY_404 = 'you_not_gonna_find_anything_with_this';

test('basic type structure', () => {
    expect(typeof autoCompleteAddress).toEqual('function');
    const queryJune = autoCompleteAddress(QUERY_404);
    expect(queryJune).toBeInstanceOf(Object);
    expect(Number.isInteger(queryJune.count)).toBeTruthy();
    expect(queryJune.addresses).toBeInstanceOf(Array);
    expect(typeof queryJune.time).toBe('number');
});

test('find strasse', () => {
    const queryJune = autoCompleteAddress("strasse");
    const addresses = queryJune.addresses;
    expect(addresses).toBeInstanceOf(Array);
    expect(addresses.length).toEqual(1);
    expect(addresses[0]).toMatchObject<Address>({
        district: 'Kalk',
        zip: '51103',
        street: 'Straße des 17. Juni',
        numbers: ['4', '4a']
    })
});