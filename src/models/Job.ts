import { AutoPaginatable, OrganizationMembership, User, WorkOS } from '@workos-inc/node';
import mongoose, { Schema } from 'mongoose'


export type Job = {
    _id: string;
    title: string;
    orgName?: string;
    remote: string;
    type: string;
    salary: number;
    country: any; // Store the full Country object
    state?: any;  // Store the full State object (optional)
    city?: any;   // Store the full City object (optional)
    description: string;
    jobIcon: string;
    orgId: string;
    contactPhoto: string;
    contactName: string;
    contactPhone: number;
    contactEmail: string;
    createdAt: string;
    isAdmin?: boolean;
  };

  const JobSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      remote: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },
      country: {
        type: Schema.Types.Mixed, // Store the full Country object
        required: true,
      },
      state: {
        type: Schema.Types.Mixed, // Store the full State object
      },
      city: {
        type: Schema.Types.Mixed, // Store the full City object
      },
      jobIcon: {
        type: String,
        required: true,
      },
      orgId: {
        type: String,
        required: true,
      },
      contactPhoto: {
        type: String,
        required: true,
      },
      contactName: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: Number,
        required: true,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  export async function addOrgAndUserData(jobsDocs: Job[], user:User|null) {
    const workos = new WorkOS(process.env.WORKOS_API_KEY)
     await mongoose.connect(process.env.MONGO_URI as string)
        let oms:AutoPaginatable<OrganizationMembership> | null = null;
        if (user) {
            oms = await workos.userManagement.listOrganizationMemberships({
                userId: user?.id,
            })
        }
        for(const job of jobsDocs){
            const org = await workos.organizations.getOrganization(job.orgId)
            job.orgName = org.name
            if(oms && oms.data.length > 0) {
              job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId)
            }
        }
        return jobsDocs;
  }

export const JobModel = mongoose.models?.Job || mongoose.model('Job', JobSchema)