"use client"
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { DefaultFilter } from '../../services/filter/types';
import Select from "react-select";

type Props<T extends Record<string, unknown>> = {
  fields: DefaultFilter;
  filterAction?: (item: T) => void;
  loading?: boolean;
}

const FilterComponent = <T extends Record<string, unknown>>({
  fields,
  filterAction,
  loading
}: Props<T>) => {

  const [filters, setFilters] = useState({} as T)

  const handleChange = (key: string, value: unknown) => {
    if(value === '' || value === null || value === undefined) {
      const { [key]: _, ...rest } = filters
      setFilters(rest as T)
      return
    }
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className='filter-component'>
      <FieldSet disabled={loading} className="w-full">
        <FieldGroup className="grid grid-cols-3 gap-4">
          {
            fields.map((field, index) => (
              <Field key={index} className="flex-1 min-w-[200px]">
                <FieldLabel htmlFor={`filter-${field.fieldName}`}>{field.label}</FieldLabel>
                {field.type === 'text' && (
                  <Input 
                    id={`filter-${field.fieldName}`}
                    type="text"
                    placeholder={field.placeHolder || field.label}
                    onChange={(e) => {
                      handleChange(field.fieldName, e.target.value)
                    }}
                  />
                )}
                {field.type === 'select' && (
                  <Select
                    inputId={`filter-${field.fieldName}`}
                    instanceId={`filter-${field.fieldName}`}
                    isClearable
                    isSearchable
                    classNamePrefix="react-select"
                    isDisabled={loading}
                    options={field.options}
                    placeholder={field.placeHolder || field.label}
                    onChange={(e) => {
                      handleChange(field.fieldName, e?.value)
                    }}
                    className='select-sm'
                  />
                )}
              </Field>
            ))
          }
        </FieldGroup>
        <Button
          className='btn-custom'
          onClick={() => filterAction && filterAction(filters as T)}
        >
          <Search />Filtrar
        </Button>
      </FieldSet>
    </div>
  )
}

export default FilterComponent