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


for (const countryName in db) {
  if (db.hasOwnProperty(countryName)) {
    for (const state in db[countryName].states) {
      if (db[countryName].states.hasOwnProperty(state)) {
        for (const idx in db[countryName].states[state]) {
          if (db[countryName].states[state].hasOwnProperty(idx)) {
            const toSave = {
              city: db[countryName].states[state][idx],
              state,
              country: db[countryName],
            }
            const key = db[countryName].states[state][idx].name
            trie.map(key, toSave)

          }
        }

      }
    }

  }
}

const compCities = {

  getAll: (): ICountry[] => { return db },
  getCountriesShort: (): string[] => {
    const res = []
    for (const key in db) {
      if (db.hasOwnProperty(key)) {
        res.push(key)

      }
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
      const res: Partial<Country> = {};
      for (const key in db[shortName]) {
        if (db[shortName].hasOwnProperty(key)) {
          if (key !== 'states') {
            res[key as keyof Country] = db[shortName][key]; // Use a type assertion
          }

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
      if (typeof db[shortName].states !== 'undefined') {
        const res = []
        for (const idx in db[shortName].states[state]) {
          if (db[shortName].states[state].hasOwnProperty(idx)) {
            res.push(db[shortName].states[state][idx].name)

          }
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
    const res: Partial<Country>[] = []
    const typedDb = db as ICountry
    for (const shortName in typedDb) {
      if (typedDb.hasOwnProperty(shortName)) {
        const obj: Partial<Country> = {}
        for (const key in db[shortName]) {
          if (db[shortName].hasOwnProperty(key)) {
            const typedKey = key as keyof Country
            if (key !== 'states') {
              obj.shortName = shortName
              obj[typedKey] = db[shortName][typedKey]
            }

          }
        }
        res.push(obj)

      }
    }
    return res
  },
  getCitiesByName: (name: string): ICityInfo[] => {
    const res = trie.search(name)
    return res
  },
}

export default compCities;