"use client"
import { TextArea, Theme, RadioGroup, TextField, Button } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city"
import "react-country-state-city/dist/react-country-state-city.css"
import type { Country, State, City } from "react-country-state-city/dist/esm/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faImage, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
import IconUpload from "./IconUpload"
import { useRouter } from "next/navigation"
import { saveJob } from "../actions/jobActions"
import { Job } from "@/models/Job"

export default function JobForm({ orgId, jobDoc }: { orgId: string; jobDoc?: Job }) {
  const [country, setCountry] = useState<Country | null>(null)
  const [currentState, setCurrentState] = useState<State | null>(null)
  const [currentCity, setCurrentCity] = useState<City | null>(null)
  const [error, setError] = useState<String | null>(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const router = useRouter()


  // Initialize states directly from jobDoc, parsing JSON strings if necessary
  useEffect(() => {
    if (jobDoc?.country) {
      const countryData = typeof jobDoc.country === 'string' ? JSON.parse(jobDoc.country) : jobDoc.country
      if (countryData.id && typeof countryData.id === 'string') {
        countryData.id = parseInt(countryData.id, 10)
      }
      setCountry(countryData as Country)
      console.log('Setting country:', countryData)
    }
  }, [jobDoc?.country])

  useEffect(() => {
    if (jobDoc?.state && country) {
      const stateData = typeof jobDoc.state === 'string' ? JSON.parse(jobDoc.state) : jobDoc.state
      if (stateData.id && typeof stateData.id === 'string') {
        stateData.id = parseInt(stateData.id, 10)
      }
      setCurrentState(stateData as State)
      console.log('Setting state:', stateData)
    } else {
      setCurrentState(null)
    }
  }, [jobDoc?.state, country])

  useEffect(() => {
    if (jobDoc?.city && country && currentState) {
      const cityData = typeof jobDoc.city === 'string' ? JSON.parse(jobDoc.city) : jobDoc.city
      if (cityData.id && typeof cityData.id === 'string') {
        cityData.id = parseInt(cityData.id, 10)
      }
      setCurrentCity(cityData as City)
      console.log('Setting city:', cityData)
    } else {
      setCurrentCity(null)
    }
  }, [jobDoc?.city, country, currentState])

  const handleSaveJob = async (data: FormData) => {
    setSubmitLoading(true)
    setError(null)
    if (!country) {
      setError("Please select a country before submitting the form.")
      setSubmitLoading(false)
      return
    }
    try {
      data.set("orgId", orgId)
      data.set('country', JSON.stringify(country))

      if (currentState) {
        data.set('state', JSON.stringify(currentState))
      }

      if (currentCity) {
        data.set('city', JSON.stringify(currentCity))
      }
      const jobDoc = await saveJob(data)
      setSubmitLoading(false)
      router.push(`/jobs/${jobDoc.orgId}`)
    } catch (error) {
      setError("Error Occurred")
      console.log(error)
      setSubmitLoading(false)
    }
  }

  return (
    <Theme>
      <div className="container py-6 px-6 mx-auto">
        <form action={handleSaveJob} className="container flex flex-col gap-3">
          {jobDoc && (
            <input type="hidden" name="id" defaultValue={jobDoc._id} />
          )}
          <TextField.Root name="title" defaultValue={jobDoc?.title || ' '} placeholder="Job Title" required />

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="">
              Remote?
              <RadioGroup.Root defaultValue={jobDoc?.remote || 'hybrid'} name="remote">
                <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="">
              Type:
              <RadioGroup.Root defaultValue={jobDoc?.type || 'full'} name="type">
                <RadioGroup.Item value="contract">Contract</RadioGroup.Item>
                <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="">
              Salary (per year)
              <TextField.Root defaultValue={jobDoc?.salary || ''} required name="salary">
                <TextField.Slot>
                  PKR
                </TextField.Slot>
                <TextField.Slot>
                  K / year
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div>
              <h6>Country</h6>
              {jobDoc?.country && !country?.name && (
                <p className="text-yellow-500">
                  Please reselect the country:{' '}
                  {(typeof jobDoc.country === 'string' ? JSON.parse(jobDoc.country).name : jobDoc.country?.name) || 'Unknown'}
                </p>
              )}
              <CountrySelect
                containerClassName="form-group"
                inputClassName=""
                onChange={(value) => {
                  setCountry(value)
                  setCurrentState(null)
                  setCurrentCity(null)
                  setError(null)
                }}
                onTextChange={(e) => console.log(e.target.value)}
                value={country}
                defaultValue={country} // Set defaultValue to pre-select on render
                placeHolder="Select Country"
              />
            </div>
            {country && (
              <div>
                <h6>State</h6>
                {jobDoc?.state && !currentState?.name && (
                  <p className="text-yellow-500">
                    Please reselect the state:{' '}
                    {(typeof jobDoc.state === 'string' ? JSON.parse(jobDoc.state).name : jobDoc.state?.name) || 'Unknown'}
                  </p>
                )}
                <StateSelect
                  countryid={country.id}
                  containerClassName="form-group"
                  inputClassName=""
                  onChange={(value) => {
                    setCurrentState(value)
                    setCurrentCity(null)
                  }}
                  onTextChange={(e) => console.log(e.target.value)}
                  value={currentState}
                  defaultValue={currentState} // Set defaultValue to pre-select on render
                  placeHolder="Select State"
                />
              </div>
            )}
            {country && currentState && (
              <div>
                <h6>City</h6>
                {jobDoc?.city && !currentCity?.name && (
                  <p className="text-yellow-500">
                    Please reselect the city:{' '}
                    {(typeof jobDoc.city === 'string' ? JSON.parse(jobDoc.city).name : jobDoc.city?.name) || 'Unknown'}
                  </p>
                )}
                <CitySelect
                  countryid={country.id}
                  stateid={currentState.id}
                  onChange={(value) => setCurrentCity(value)}
                  value={currentCity}
                  defaultValue={currentCity} // Set defaultValue to pre-select on render
                  placeHolder="Select City"
                />
              </div>
            )}
          </div>
          <div className="sm:flex">
            <div className="w-1/3">
              <h2>Job Icon</h2>
              <IconUpload name="jobIcon" defaultValue={jobDoc?.jobIcon || ''} icon={faImage} />
            </div>
            <div className="grow">
              <h2>Contact Person</h2>
              <div className="flex gap-2">
                <div className="">
                  <IconUpload defaultValue={jobDoc?.contactPhoto || ''} name="contactPhoto" icon={faUser} />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <TextField.Root required defaultValue={jobDoc?.contactName || ''} name="contactName" placeholder="John Doe" type="text" className="w-full">
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faUser} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root required defaultValue={jobDoc?.contactPhone || ''} name="contactPhone" placeholder="Phone" type="tel" className="w-full">
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faPhone} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root required name="contactEmail" defaultValue={jobDoc?.contactEmail || ''} placeholder="abc@gmail.com" type="text" className="w-full">
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </TextField.Slot>
                  </TextField.Root>
                </div>
              </div>
            </div>
          </div>
          <TextArea required defaultValue={jobDoc?.description || ''} name="description" placeholder="Enter description..." resize="vertical" />
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