import { create } from 'zustand';

// Define the state and actions for city management
interface CityState {
    selectedCity: string;
    setSelectedCity: (city: string) => void;
}

// Create the Zustand store
export const useCityState = create<CityState>((set) => ({
    selectedCity: '',
    setSelectedCity: (city: string) => set({ selectedCity: city }), // Fixed key name to match state property
}));
