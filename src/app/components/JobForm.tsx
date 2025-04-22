"use client"
import { TextArea, Theme, RadioGroup, TextField } from "@radix-ui/themes"
import { useState, type ChangeEvent } from "react"
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city"
import "react-country-state-city/dist/react-country-state-city.css"
import type { Country, State, City } from "react-country-state-city/dist/esm/types"

export default function JobForm() {
  const [country, setCountry] = useState<Country | null>(null)
  const [currentState, setCurrentState] = useState<State | null>(null)
  const [currentCity, setCurrentCity] = useState<City | null>(null)

  // Create handler functions that can handle both types
  const handleCountryChange = (value: Country | ChangeEvent<HTMLInputElement>) => {
    // Check if the value is a Country object (not an event)
    if (value && typeof value === "object" && !("target" in value)) {
      setCountry(value as Country)
      // Reset state and city when country changes
      setCurrentState(null)
      setCurrentCity(null)
    }
  }

  const handleStateChange = (value: State | ChangeEvent<HTMLInputElement>) => {
    // Check if the value is a State object (not an event)
    if (value && typeof value === "object" && !("target" in value)) {
      setCurrentState(value as State)
      // Reset city when state changes
      setCurrentCity(null)
    }
  }

  const handleCityChange = (value: City | ChangeEvent<HTMLInputElement>) => {
    // Check if the value is a City object (not an event)
    if (value && typeof value === "object" && !("target" in value)) {
      setCurrentCity(value as City)
    }
  }

  return (
    <Theme>
      <div className="container py-6 px-6 mx-auto">
        <form action="" className="container flex flex-col gap-3">
          <TextField.Root placeholder="Job Title" />
          <div className="grid grid-cols-3 gap-6">
            <div className="">
              Location:
              <RadioGroup.Root defaultValue="hybrid" name="location">
                <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="">
              Type:
              <RadioGroup.Root defaultValue="full" name="jobType">
                <RadioGroup.Item value="contract">Contract</RadioGroup.Item>
                <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="">
                Salary (per year)
                <TextField.Root>
                    <TextField.Slot>
                        PKR
                    </TextField.Slot>
                    <TextField.Slot>
                        K / year
                    </TextField.Slot>
                </TextField.Root>
            </div>
            
          </div>
          <div className="flex gap-5">

          <div>
              <h6>Country</h6>
              <CountrySelect
                containerClassName="form-group"
                inputClassName=""
                onChange={handleCountryChange}
                onTextChange={(_txt) => console.log(_txt)}
                placeHolder="Select Country"
              />
            </div>
            {country && (
              <div>
                <h6>State</h6>
                <StateSelect
                  countryid={country.id}
                  containerClassName="form-group"
                  inputClassName=""
                  onChange={handleStateChange}
                  onTextChange={(_txt) => console.log(_txt)}
                  placeHolder="Select State"
                />
              </div>
            )}
            {country && currentState && (
              <div>
                <h6>City</h6>
                <CitySelect
                  countryid={country.id}
                  stateid={currentState.id}
                  onChange={handleCityChange}
                  placeHolder="Select City"
                />
              </div>
            )}
          </div>
          <TextArea placeholder="Enter description..." resize="vertical" />
        </form>
      </div>
    </Theme>
  )
}
