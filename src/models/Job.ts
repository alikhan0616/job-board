import mongoose, { Schema } from 'mongoose'

const JobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    remote:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    salary:{
        type: Number,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    state:{
        type: String,
    },
    city:{
        type: String,
    },
    jobIcon:{
        type: String,
        required: true,
    },
    orgId:{
        type: String,
        required: true,
    },
    contactPhoto:{
        type: String,
        required: true,
    },
    contactName:{
        type: String,
        required: true,
    },
    contactPhone:{
        type: Number,
        required: true,
    },
    contactEmail:{
        type: String,
        required: true,
    },
});

export const JobModel = mongoose.models?.Job || mongoose.model('Job', JobSchema)