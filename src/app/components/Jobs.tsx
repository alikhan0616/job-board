import JobRow from "./JobRow"
export default function Jobs() {
    return(
    <div className="bg-slate-200 rounded-t-3xl">
       <div className="container py-6 px-6 mx-auto">
        <h2 className="font-bold mb-4">Recent Jobs</h2>
        <div className="flex flex-col gap-4">
        <JobRow />
        <JobRow />
        <JobRow />
        <JobRow />
        </div>
       </div>
    </div>
    )
}