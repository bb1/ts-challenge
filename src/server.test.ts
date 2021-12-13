import { autoCompleteAddress, Address } from './server';

const QUERY_404 = 'you_not_gonna_find_anything_with_this';

test('basic type structure', () => {
    const queryJune = autoCompleteAddress(QUERY_404);
    expect(queryJune).toBeInstanceOf(Array);
    expect(typeof autoCompleteAddress).toEqual('function');
});

test('find strasse', () => {
    const queryJune = autoCompleteAddress("strasse");
    expect(queryJune).toBeInstanceOf(Array);
    expect(queryJune.length).toEqual(1);
    expect(queryJune[0]).toMatchObject<Address>({
        district: 'Kalk',
        zip: '51103',
        street: 'Straße des 17. Juni',
        numbers: ['4', '4a']
    })
});