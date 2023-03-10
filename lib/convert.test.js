const convert = require('./convert')

test('convert 4 to 4', () => {
    expect(convert.convert(4, 4)).toBe(16)
})

test('convert 4 to 4', () => {
    expect(convert.convert(4.35, 4)).toBe(17.40)
})

test('toMoney converts float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('toMoney converts string', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})