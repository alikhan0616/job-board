"use client"
import { TextArea, Theme, RadioGroup, TextField, Button } from "@radix-ui/themes"
import { useState, type ChangeEvent } from "react"
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city"
import "react-country-state-city/dist/react-country-state-city.css"
import type { Country, State, City } from "react-country-state-city/dist/esm/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faImage, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import IconUpload from "./IconUpload"
<<<<<<< HEAD
import { useRouter } from "next/navigation"
import { saveJob } from "../actions/jobActions"
=======
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1


export default function JobForm({orgId}: {orgId:string}) {
  const [country, setCountry] = useState<Country | null>(null)
  const [currentState, setCurrentState] = useState<State | null>(null)
  const [currentCity, setCurrentCity] = useState<City | null>(null)
  const [error, setError] = useState<String | null>(null)
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  // Create handler functions that can handle both types
  const handleCountryChange = (value: Country | ChangeEvent<HTMLInputElement>) => {
    // Check if the value is a Country object (not an event)
    if (value && typeof value === "object" && !("target" in value)) {
      setCountry(value as Country)
      // Reset state and city when country changes
      setCurrentState(null)
      setCurrentCity(null)
      setError(null)
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
  
  const handleSaveJob = async (data:FormData) => {
    setSubmitLoading(true)
    setError(null)
    if (!country) {
      setError("Please select a country before submitting the form.");
      setSubmitLoading(false);
      return;
    }
    try {
      data.set("orgId", orgId)
    data.set("country", country.name)
    if(currentState) data.set("state", currentState.name)
    if(currentCity) data.set("city", currentCity.name)
    const jobDoc = await saveJob(data);
  setSubmitLoading(false)
  router.push(`/jobs/${jobDoc.orgId}`)
    } catch (error) {
      setError("Error Occured")
      console.log(error)
      setSubmitLoading(false)
    }
  }

  return (
    <Theme>
      <div className="container py-6 px-6 mx-auto">
        <form action={handleSaveJob} className="container flex flex-col gap-3">
          <TextField.Root name="title" placeholder="Job Title" />
         
          <div className="grid grid-cols-3 gap-6">
            <div className="">
              Location:
              <RadioGroup.Root defaultValue="hybrid" name="remote">
                <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="">
              Type:
              <RadioGroup.Root defaultValue="full" name="type">
                <RadioGroup.Item value="contract">Contract</RadioGroup.Item>
                <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="">
                Salary (per year)
                <TextField.Root name="salary">
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
          <div className="flex flex-row">
            <div className="w-1/3">
            <h2>Job Icon</h2>
<<<<<<< HEAD
             <IconUpload name="jobIcon" icon={faImage} />
=======
             <IconUpload icon={faImage} />
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1
            </div>
            <div className="grow">
  <h2>Contact Person</h2>
  <div className="flex gap-2">
    <div className="">
<<<<<<< HEAD
    <IconUpload name="contactPhoto" icon={faUser} />
=======
    <IconUpload icon={faUser} />
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1
    </div>
    <div className="flex flex-col gap-1 w-full">
      <TextField.Root name="contactName" placeholder="John Doe" type="text" className="w-full">
        <TextField.Slot>
          <FontAwesomeIcon icon={faUser} />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root name="contactPhone" placeholder="Phone" type="tel" className="w-full">
        <TextField.Slot>
          <FontAwesomeIcon icon={faPhone} />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root name="contactEmail" placeholder="abc@gmail.com" type="text" className="w-full">
        <TextField.Slot>
          <FontAwesomeIcon icon={faEnvelope} />
        </TextField.Slot>
      </TextField.Root>
    </div>
  </div>
</div>
          </div>
          <TextArea name="description" placeholder="Enter description..." resize="vertical" />
          {error && (
            <div className="mt-2 text-red-500">
              <h3>Error:</h3>
              <p>{error}</p>
            </div>
          )}
          <div className="flex justify-center">
            <Button size="3" disabled={!country || submitLoading}>
              <span className="px-8">
                {submitLoading ? "Saving Job..." : "Save"}
              </span>
              </Button>
          </div>
        </form>
      </div>
    </Theme>
  )
}
