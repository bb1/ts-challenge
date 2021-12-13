import { autoCompleteAddress, InvalidParameters } from './server';
import { Address } from './interfaces';

const QUERY_404 = 'you_not_gonna_find_anything_with_this';

test('basic structure', () => {
    expect(typeof autoCompleteAddress).toEqual('function');
    const queryResult = autoCompleteAddress(QUERY_404);
    expect(queryResult).toBeInstanceOf(Object);
    expect(Number.isInteger(queryResult.count)).toBe(true);
    expect(queryResult.addresses).toBeInstanceOf(Array);
    expect(typeof queryResult.time).toBe('number');
});

test('empty response', () => {
    const queryResult = autoCompleteAddress(QUERY_404);
    expect(queryResult.count).toBe(0);
    expect(queryResult.addresses.length).toBe(0);
});

test('invalid params', () => {
    // @ts-ignore
    expect(() => autoCompleteAddress({})).toThrow(InvalidParameters);
    // @ts-ignore
    expect(() => autoCompleteAddress([])).toThrow(InvalidParameters);
});

test('find "Straße des 17. Juni"', () => {
    const queryResult = autoCompleteAddress('strasse');
    const addresses = queryResult.addresses;
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

test('find "Ehrenbergstr."', () => {
    const { addresses } = autoCompleteAddress('ehrenbe');
    expect(addresses.length).toEqual(1);
    expect(addresses[0]).toMatchObject<Address>({
        district: 'Nippes',
        zip: '50735',
        city: 'Köln',
        street: 'Ehrenbergstr.',
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
    })
});

test('find "Kasseler Str"', () => {
    const { addresses, count } = autoCompleteAddress('kasseler');
    expect(addresses.length).toEqual(1);
    expect(count).toEqual(2);
    expect(addresses).toContainEqual<Address>({
        district: 'Chorweiler',
        zip: '50769',
        city: 'Köln',
        street: 'Kasseler Str.',
        numbers: ['52', '73', '75', '77', '78', '79', '81', '83', '85', '85a', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109']
    })
    expect(addresses).toContainEqual<Address>({
        district: 'Mülheim',
        zip: '51065',
        city: 'Köln',
        street: 'Kasseler Str.',
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
    })
});

test('find "Hauptstr"', () => {
    const { addresses, count } = autoCompleteAddress('haupt');
    expect(addresses.length).toEqual(3);
    expect(count).toEqual(3);
    expect(addresses).toContainEqual({
        district: 'Buchforst',
        zip: '51065',
        city: 'Köln',
        street: 'Kasseler Str.',
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '52', '73', '75', '77', '78', '79', '81', '83', '85', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109']
    })
});