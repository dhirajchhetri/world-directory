interface City {
    id: string;
    name: string;
    state_id: string;
}

interface State {
    id: string;
    name: string;
    state_id: string;
}
export interface ICountry {
    [key: string]: Country
}
export interface Country {
    name: string;
    shortName: string;
    native: string;
    phone: string;
    continent: string;
    capital: string;
    currency: string;
    languages: string[];
    emoji?: string;
    emojiU?: string;
    states?: {
        [state: string]: State[];
    };
}


export interface ICityInfo {
    city: City;
    state: string;
    country: Country;
}
