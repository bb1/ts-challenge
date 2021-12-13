import { autoCompleteAddress, Address } from './server';

const QUERY_404 = 'you_not_gonna_find_anything_with_this';

test('basic type structure', () => {
    expect(typeof autoCompleteAddress).toEqual('function');
    const queryJune = autoCompleteAddress(QUERY_404);
    expect(queryJune).toBeInstanceOf(Object);
    expect(Number.isInteger(queryJune.count)).toBe(true);
    expect(queryJune.count).toBe(0);
    expect(queryJune.addresses).toBeInstanceOf(Array);
    expect(typeof queryJune.time).toBe('number');
});

test('find strasse', () => {
    const queryJune = autoCompleteAddress('strasse');
    const addresses = queryJune.addresses;
    expect(addresses).toBeInstanceOf(Array);
    expect(addresses.length).toEqual(1);
    expect(addresses[0]).toMatchObject<Address>({
        district: 'Kalk',
        zip: '51103',
        city: 'Köln',
        street: 'Straße des 17. Juni',
        numbers: ['4', '4a']
    })
});

test('find Kasseler Str', () => {
    const { addresses, count } = autoCompleteAddress('kasseler');
    expect(addresses.length).toEqual(1);
    expect(count).toEqual(1);
    expect(addresses[0]).toMatchObject<Address>({
        district: 'Buchforst',
        zip: '51065',
        city: 'Köln',
        street: 'Kasseler Str.',
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '52', '73', '75', '77', '78', '79', '81', '83', '85', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109']
    })
});
