import axios from 'axios'

interface iRecord {
    rank: number
    סמל_ישוב: string
    סמל_רחוב: string
    שם_ישוב: string
    שם_רחוב: string
}

let cityForStreetValidation = ''
export function isValidId(id: string): boolean {
    const paddedId = id.length < 9 ? ('00000000' + id).slice(-9) : id
    return (
        Array.from(paddedId, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1)
            return counter + (step > 9 ? step - 9 : step)
        }) %
            10 ===
        0
    )
}

export async function isValidCity(city: string): Promise<boolean> {
    const data = {
        resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
        limit: 5,
        q: city,
    }
    try {
        const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', { params: data })
        const totalResults = response.data.result.total
        cityForStreetValidation = city
        return totalResults > 0
    } catch (error) {
        throw new Error('Failed to validate city')
    }
}

export async function isValidStreet(street: string): Promise<boolean> {
    const data = {
        resource_id: '9ad3862c-8391-4b2f-84a4-2d4c68625f4b',
        q: street,
    }
    try {
        const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', { params: data })
        const records: [iRecord] = response.data.result.records

        if (!records) return false
        const matchingRecords = records.filter(
            (record: iRecord) => record.שם_ישוב.trim() === cityForStreetValidation && record.שם_רחוב.includes(street)
        )
        return matchingRecords.length > 0
    } catch (error) {
        throw new Error('Failed to validate street')
    }
}
