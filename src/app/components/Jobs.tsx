import { Job } from "@/models/Job";
import JobRow from "./JobRow"
export default function Jobs({header,jobs}:{header: string; jobs:Job[]}) {
    return(
    <div className="bg-slate-200 rounded-t-3xl">
       <div className="container py-6 px-6 mx-auto">
        <h2 className="font-bold mb-4">{header}</h2>
        <div className="flex flex-col gap-4">
            {!jobs?.length &&
            <p>No jobs available found</p>}
            {jobs && jobs.map(job => (
                <JobRow key={job._id} jobDoc={job} />
            ))}
        </div>
       </div>
    </div>
    )
}