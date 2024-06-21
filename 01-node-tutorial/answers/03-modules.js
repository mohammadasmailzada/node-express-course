
const names = require('./04-names')
const addTwoNumbers = require('./05-utils')
const {multiplyTwoNumbers, divideTeoNumers, subtractTeoNumers } = require('./06-alternative-flavor')
require(`./07-mind-grenade`);
const { greeting, favoriteNumber, color } = require(`./08-os-module`)
console.log(names)
console.log(addTwoNumbers(1, 2));
console.log(multiplyTwoNumbers(3, 6));
console.log(divideTeoNumers(2, 5));
console.log(subtractTeoNumers(5, 2));
console.log(greeting)
console.log(favoriteNumber)
console.log(color)