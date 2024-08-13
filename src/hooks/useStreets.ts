import { useQuery } from '@tanstack/react-query';
import { fetchStreets } from '../model/services/api.service';

export function useStreets(selectedCity: string) {
  return useQuery({
    queryKey: ['streets', selectedCity],
    queryFn: () => fetchStreets(selectedCity),
    enabled: !!selectedCity, 
  });
}
