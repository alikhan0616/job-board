'use server';

import { WorkOS } from "@workos-inc/node";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const workos = new WorkOS(process.env.WORKOS_API_KEY)
export async function createCompany(companyName: string, userId: string) {
    'use server';
   const org = await workos.organizations.createOrganization({name: companyName})
   await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId: org.id,
    roleSlug: 'admincompany'
   })
   revalidatePath('new-listing')
   redirect('/new-listing')
}