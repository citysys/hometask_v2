import axios from 'axios'
interface iRecord {
    rank: number
    סמל_ישוב: string
    סמל_רחוב: string
    שם_ישוב: string
    שם_רחוב: string
}

export async function fetchCities() {
    const data = {
        resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
        limit: 100000,
    }
    try {
        const { data: { result: { records } } } = await axios.get('https://data.gov.il/api/3/action/datastore_search', { params: data })
        if(!records) return [];
        
        const newCities = records.map(({ שם_ישוב }: iRecord) => שם_ישוב)
        return newCities
    } catch {
        throw new Error('Failed to fetch cities')
    }
}

export async function fetchStreets(selectedCity: string) {
    const data = {
        resource_id: '9ad3862c-8391-4b2f-84a4-2d4c68625f4b',
        limit: 100000,
        q: selectedCity,
    }
    try {
        const { data: { result: { records } } } = await axios.get('https://data.gov.il/api/3/action/datastore_search', { params: data })
        if (!records) return [];

        const newStreets = records.map(({ שם_רחוב }: iRecord) => שם_רחוב)
        return newStreets
    } catch (error) {
        throw new Error('Failed to fetch streets')
    }
}
