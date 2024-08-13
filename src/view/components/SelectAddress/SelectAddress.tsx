
import React, { useEffect } from 'react';
import { useFetchCities, useFetchStreets } from '../../../model/services/api.service';
import Select from '../Select/Select';
import { NewUser } from '../../../model';
import { UseFormRegister } from 'react-hook-form';
import { useCityState } from './store';

export interface SelectAddressProps {
    inputId: string;
    required: boolean;
    label: string;
    register: UseFormRegister<NewUser>;
}

const SelectAddress: React.FC<SelectAddressProps> = ({ inputId, label, required, register }) => {
    const {selectedCity , setSelectedCity} = useCityState()

    const { data: cities } = useFetchCities('');
    const { data: streets } = useFetchStreets(selectedCity);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (inputId === 'city') {
            setSelectedCity(event.target.value);
        }
    };
    return (
        <Select
            required={required}
            inputId={inputId}
            register={register}
            options={inputId === 'city' ? cities || [] : streets || []}
            onChange={handleChange}
            placeholder={`בחר ${label}`}
            dependency={inputId !== 'city' ? { condition: selectedCity === '', label: 'נא לבחור עיר' } : undefined}
        />
    );
};

export default SelectAddress;
