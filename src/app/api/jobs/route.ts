import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

// Ensure MongoDB connection (you might want to handle this globally)
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI as string);
  }
};

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: "Job ID is required" }), {
        status: 400,
      });
    }

    const deletedJob = await JobModel.deleteOne({ _id: id });

    if (deletedJob.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Job not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Job successfully deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return new Response(JSON.stringify({ message: "Failed to delete job" }), {
      status: 500,
    });
  }
}