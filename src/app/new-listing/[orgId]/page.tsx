import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node"
import "@radix-ui/themes/styles.css";
import JobForm from "@/app/components/JobForm";

type pageProps = {
    params: {
        orgId: string;
    }
}

export default async function newListingOrgPage(props:pageProps){
    const {user} = await withAuth()
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if(!user) {
        return (
            <div className="container py-6 px-6 mx-auto">You need to log in first!</div>
        )
    }
    const {orgId} = await props.params;
    const oms = await workos.userManagement.listOrganizationMemberships({userId:user.id, organizationId:orgId})
    const hasAccess = oms.data.length > 0;

    if(!hasAccess){
        return(
            <div className="container py-6 px-6 mx-auto">You don't have access to this company!</div>
        )
    }

    return(
     <JobForm />
    )
} 