import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
    params: {
        jobId: string;
    }
}
export default async function JobEditPage(props:PageProps){
    const {jobId} = await props.params
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
    const {user} = await withAuth();
    const workos = new WorkOS();
    if(!jobDoc){
        return 'No Job Found!'
    }
    if(!user) {
        return 'You need to login'
    }
    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: jobDoc.orgId,
    })
    if(oms.data.length === 0){
        return "Access denied"
    }
    return(
        <JobForm orgId={jobDoc.orgId} jobDoc = {jobDoc} />
    )
}