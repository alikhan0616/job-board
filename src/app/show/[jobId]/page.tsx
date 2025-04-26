import { JobModel } from "@/models/Job";
import mongoose from "mongoose";

type PageProps = {
    params: {
        jobId: string;
    }
}

export default async function SingleJobPage(props:PageProps){
    const {jobId} = props.params;
    await mongoose.connect(process.env.MONGO_URI as string)
    const jobDoc = await JobModel.findById(jobId)
    const country = typeof jobDoc.country === 'string' ? JSON.parse(jobDoc.country) : jobDoc.country
    const state = typeof jobDoc.state === 'string' ? JSON.parse(jobDoc.state) : jobDoc.state
    const city = typeof jobDoc.city === 'string' ? JSON.parse(jobDoc.city) : jobDoc.city
    return (
        <div className="container py-6 px-6 mx-auto my-6">
            <div className="sm:flex">
                <div className="grow">
                <h1 className="text-2xl">{jobDoc.title}</h1>
            <div className="mt-2 text-sm text-blue-800 capitalize">
            {jobDoc.remote} · {country?.name || 'Unknown Country'}
            {city ? (`, ${city?.name || 'Unknown City'}`) : (state ? `, ${state?.name || 'Unknown State'}` : '')} · {jobDoc.type}-Time
            </div>
                </div>
                    <img src={jobDoc.jobIcon} alt="job icon" width={500} height={500} className="w-auto h-auto max-w-16 max-h-16" />
            </div>
           
            <div className="mt-4 whitespace-pre-line text-sm text-gray-700">
                {jobDoc.description}
            </div>
            <div className="gap-2 mt-4 bg-gray-200 p-8 rounded-lg">
                <h1 className="font-bold mb-2">Apply my contacting us</h1>
                <div className="flex gap-2">
                <img src={jobDoc.contactPhoto} alt="contact photo" height={500} width={500} className="w-auto h-auto max-w-24 max-h-24" />
                <div className="">
                    {jobDoc.contactName}<br />
                    Phone: {jobDoc.contactPhone}<br />
                    Email: {jobDoc.contactEmail}
                </div>
                </div>
            </div>
        </div>
    ) 
}