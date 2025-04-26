'use server';

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";

export async function saveJob(formData: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string)
    const {id, ...jobData} = Object.fromEntries(formData)
    const jobDoc = (id)
    ? await JobModel.findByIdAndUpdate(id, jobData)
    : await JobModel.create(jobData)
    return JSON.parse(JSON.stringify(jobDoc))
}