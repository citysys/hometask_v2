import { useQuery } from '@tanstack/react-query'
import { fetchStreets, fetchCities } from '../../../model/services/api.service'
import { Field, useFormikContext } from 'formik'
import { useMemo, ChangeEvent } from 'react'

interface SelectInputProps {
    id: string
    name: string
    isRequired: boolean
}

export const SelectInput: React.FC<SelectInputProps> = (
    {
        name,
        isRequired,
    }) => {

    const { values, setFieldValue } = useFormikContext<any>()

    const selectedCity = values['city']

    const { data: cities } = useQuery({
        queryFn: (): Promise<string[]> => fetchCities(),
        queryKey: ['cities'],
        staleTime: Infinity
    })

    const { data: streets } = useQuery({
        queryFn: (): Promise<string[]> => fetchStreets(selectedCity),
        queryKey: ['streets', { selectedCity }],
        staleTime: Infinity
    })

    console.log('selectedCity: ', selectedCity)
    if (streets) {
        console.log('streets.slice(0,3): ', streets.slice(0, 3))
    } else {
        console.log('no streets :(')
    }

    const getOptionsList = (): string[] | undefined => {
        const entityMap: Record<string, string[] | undefined> = {
            city: cities,
            street: streets
        }
        const res = (name in entityMap) ? entityMap[name] : []
        console.log('res: ', res)
        return (name in entityMap) ? entityMap[name] : []
    }

    const onSelect = useMemo(() => (ev: ChangeEvent<HTMLSelectElement>) => {
        console.log('onSelect')
        if (name !== 'city') return
        console.log('name: ', name)
        const newCity: string = ev.target.value
        setFieldValue(name, newCity)
    }, [name, setFieldValue])

    return (

        <Field
            type='select'
            as='select'
            required={isRequired}
            name={name}
            onChange={onSelect}
            value={values[name] || ''}
        >
            {getOptionsList()?.map((entity: string, index: number) => {
                return (
                    <option key={index} value={entity}>
                        {entity}
                    </option>
                )
            })}
        </Field>
    )
}