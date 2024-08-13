import axios, { AxiosRequestConfig, Method } from 'axios';
import { useQuery } from 'react-query';

interface iRecord {
    rank: number;
    סמל_ישוב: string;
    סמל_רחוב: string;
    שם_ישוב: string;
    שם_רחוב: string;
}

interface AxiosReqParams {
    method?: Method;
    url: string;
    body?: any;
    params?: any;
    withCredentials?: boolean;
}

const govUrl = 'https://data.gov.il/api/3/action/datastore_search';

export async function apiRequest({
    method = "POST",
    body,
    params,
    url,
    withCredentials = false,
}: AxiosReqParams): Promise<any> {
    try {
        const config: AxiosRequestConfig = {
            withCredentials,
            method,
            data: body,
            params,
            url,
        };
        const { data: result } = await axios(config);
        return result;
    } catch (error: any) {
        console.error("Axios Error: \n", error);
        throw new Error(error.message);
    }
}

// Hook for fetching cities
export const useFetchCities = (selectedCity: string) => {
    return useQuery(['cities', selectedCity], async () => {
        const data = {
            resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
            limit: 100000,
            q: selectedCity,
        };
        const res = await apiRequest({ method: "GET", params: data, url: govUrl });
        const cities: iRecord[] = res.result.records;
        return cities.map((c) => c.שם_ישוב);
    });
};

// Hook for fetching streets
export const useFetchStreets = (selectedCity: string) => {
    return useQuery(['streets', selectedCity], async () => {
        const data = {
            resource_id: '9ad3862c-8391-4b2f-84a4-2d4c68625f4b',
            limit: 100000,
            q: selectedCity,
        };
        const res = await apiRequest({ method: "GET", params: data, url: govUrl });
        const records: iRecord[] = res.result.records;
        return records.length ? records.map((record) => record.שם_רחוב) : [];
    }, {
        enabled: !!selectedCity, // Only fetch streets if a city is selected
    });
};
