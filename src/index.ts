import * as  TrieSearch from 'trie-search';
import "./lib/compilecountries"
import { ICountry, Country, ICityInfo } from "./lib/interfaces"
const db = require('./lib/compiledCities.json')

const trie = new TrieSearch([],
  {
    min: 2,
    splitOnRegEx: false,
  }
)


for (let countryName in db) {
  for (let state in db[countryName].states) {
    for (let idx in db[countryName].states[state]) {
      const toSave = {
        city: db[countryName].states[state][idx],
        state: state,
        country: db[countryName],
      }
      const key = db[countryName].states[state][idx].name
      trie.map(key, toSave)
    }
  }
}

const compCities = {

  getAll: (): ICountry[] => { return db },
  getCountriesShort: (): string[] => {
    let res = []
    for (var key in db) {
      res.push(key)
    }
    return res
  },
  getCountryByShort: (shortName: string): ICountry | null => {
    if (typeof db[shortName] !== 'undefined') {
      return db[shortName]
    } else {
      return null
    }
  },
  getCountryInfoByShort: (shortName: string): Partial<Country> | null => {
    if (typeof db[shortName] !== 'undefined') {
      let res: Partial<Country> = {};
      for (var key in db[shortName]) {
        if (key !== 'states') {
          res[key as keyof Country] = db[shortName][key]; // Use a type assertion
        }
      }
      return res;
    } else {
      return null;
    }
  },
  getStatesByShort: (shortName: string): string[] | null => {
    if (typeof db[shortName] !== 'undefined') {
      let res = []
      if (typeof db[shortName].states !== 'undefined') {
        res = Object.keys(db[shortName].states)
        return res
      } else {
        return null
      }
    } else {
      return null
    }
  },
  getCities: (shortName: string, state: string): string[] | null => {
    if (typeof db[shortName] !== 'undefined') {
      if (typeof db[shortName].states != 'undefined') {
        let res = []
        for (let idx in db[shortName].states[state]) {
          res.push(db[shortName].states[state][idx].name)
        }
        return res
      } else {
        return null
      }
    } else {
      return null
    }
  },
  getCountries: (): Partial<Country>[] => {
    let res: Partial<Country>[] = []
    const typedDb = db as ICountry
    for (const shortName in typedDb) {
      let obj: Partial<Country> = {}
      for (const key in db[shortName]) {
        const typedKey = key as keyof Country
        if (key !== 'states') {
          obj.shortName = shortName
          obj[typedKey] = db[shortName][typedKey]
        }
      }
      res.push(obj)
    }
    return res
  },
  getCitiesByName: (name: string): ICityInfo[] => {
    const res = trie.search(name)
    return res
  },
}

export default compCities;