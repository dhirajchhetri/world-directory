import db from "./src/index"
// console.log('getAll()')
// console.log(db.getAll())

// console.log('getCountriesShort()')
// console.log(db.getCountriesShort())
// console.log('getCountryByShort("AE")')
// console.log(JSON.stringify(db.getCountryByShort('AE')))
// console.log('getCountryInfoByShort("US")')
// console.log(db.getCountryInfoByShort('AE'))
// console.log('getStatesByShort("US")')
// console.log(db.getStatesByShort('US'))
// console.log('getCities("US", "Kentucky")')
// console.log(db.getCities('US', 'New York'))
// console.log('getCountries()')
// console.log(db.getCountries())

console.log('getCitiesByName("Male")')
console.log(JSON.stringify(db.getCitiesByName('Male')[0]))
//console.log('getCitiesByName("lexington")')
//console.log(db.getCitiesByName('lexington'))
