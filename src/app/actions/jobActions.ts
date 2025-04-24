'use server';

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";

export async function saveJob(data: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string)
    const jobDoc = await JobModel.create(Object.fromEntries(data))
    return JSON.parse(JSON.stringify(jobDoc))
}