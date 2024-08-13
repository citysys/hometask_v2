import { useQuery } from '@tanstack/react-query';
import { fetchCities } from '../model/services/api.service';

export function useCities() {
    return useQuery({
        queryKey: ['cities'],
        queryFn: fetchCities,
    });
}
