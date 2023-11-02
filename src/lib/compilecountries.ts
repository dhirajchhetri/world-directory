import * as csc from "country-state-city"
import * as cl from "countries-list"
import * as fs from "fs"
(() => {
  let newlist: any;

  const cscCountries = csc.getAllCountries()

  newlist = cl.countries
  for (var key in newlist) {
    let i = 0;
    let found = false;
    let cscCountryId = null
    while (!found && i < cscCountries.length) {
      if (cscCountries[i].sortname === key) {
        found = true
        cscCountryId = cscCountries[i].id
      }
      i++
    }
    let states = csc.getStatesOfCountry(cscCountryId)
    let cities = null
    newlist[key].states = {}
    for (var idx in states) {
      cities = csc.getCitiesOfState(states[idx].id)
      newlist[key].states[states[idx].name] = cities
    }
  }
  fs.writeFileSync('./src/lib/compiledCities.json', JSON.stringify(newlist))

})()

