import Jobs from "@/app/components/Jobs";
import { addOrgAndUserData, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import {  WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";


type PageProps = {
    params: {
        orgId: string;
    }
}
export default async function CompanyJobPage(props:PageProps){
    const workos = new WorkOS(process.env.WORKOS_API_KEY)
    const {user} = await withAuth();
    const { orgId } = await props.params;
    const org = await workos.organizations.getOrganization(orgId)
    await mongoose.connect(process.env.MONGO_URI as string)
    let jobDocs = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})))
    jobDocs = await addOrgAndUserData(jobDocs, user)
    return(
<div className="">
        <div className="container py-6 px-6 mx-auto">
            <h1 className="text-4xl my-6">{org.name} Jobs</h1>
        </div>
        <Jobs jobs={jobDocs} header={"Jobs posted by "+org.name} />
</div>
    )
}