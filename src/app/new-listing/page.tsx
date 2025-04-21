import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withAuth } from "@workos-inc/authkit-nextjs"
import {WorkOS} from '@workos-inc/node'
import Link from "next/link"
export default async function NewListingPage() {
    const {user} = await withAuth()
    const workos = new WorkOS(process.env.WORKOS_API_KEY)

    if(!user){
        return (
            <div className="container py-6 px-6 mx-auto">You need to be logged in First!</div>
        )
    }
       const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
            userId: user.id,
        })
     const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === 'active')
     const organizationNames:{[key: string]: string} = {};
     for(const activeMemberships of activeOrganizationMemberships){
        const organization = await workos.organizations.getOrganization(activeMemberships.organizationId);
        organizationNames[organization.id] = organization.name;
     }

    return (
        <div className="container py-6 px-6 mx-auto">
                <div>
                    <h2 className="font-bold text-2xl mt-6">Your companies</h2>
                    <p className="text-sm text-slate-600 mb-2">Select a company to create a job for</p>
                    <div>
                    <div className="border inline-block rounded-md">
                    {organizationMemberships && (Object.keys(organizationNames).map(orgId => (
                        
                        <Link className={
                            "flex gap-2 capitalize items-center hover:opacity-90 px-4 py-2"
                            +(Object.keys(organizationNames)[0] === orgId ? '' : ' border-t')
                            } href={'/new-listing/'+orgId} key={orgId}>{organizationNames[orgId]}
                        <FontAwesomeIcon className="h-4" icon={faArrowRight} /></Link>
                        
                    )))}

                    </div>
                   
                    {organizationMemberships.data.length === 0 && (<div className="border border-blue-200 bg-blue-50 p-4 rounded-md">You have no companies associated with you!</div>)}
                    </div>
                    
                  

                   <Link className="inline-flex mt-4 gap-2 items-center py-2 px-4 bg-gray-200 rounded-lg" href='/new-company'>
                   Create a new company
                   <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                   </Link>
                </div>
        </div>
    )
}