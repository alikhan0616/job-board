
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from "@fortawesome/free-solid-svg-icons"
import TimeAgo from './TimeAgo';
import { JobModel, type Job } from '@/models/Job'
import Link from 'next/link';
import mongoose from 'mongoose';
import axios from 'axios';
import DeleteButton from './DeleteButton';
export default async function JobRow({jobDoc}:{jobDoc: Job}) {

    const country = typeof jobDoc.country === 'string' ? JSON.parse(jobDoc.country) : jobDoc.country
  const state = typeof jobDoc.state === 'string' ? JSON.parse(jobDoc.state) : jobDoc.state
  const city = typeof jobDoc.city === 'string' ? JSON.parse(jobDoc.city) : jobDoc.city
    return(
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            <div className="cursor-pointer absolute top-4 right-4">
                <FontAwesomeIcon className='size-4 text-gray-300' icon={faHeart} />
                </div>
            <div className="flex grow gap-4">
            <div className="self-center">
                <img className="size-8 sm:size-12 " src={jobDoc.jobIcon} alt="" />
            </div>
            <div className="grow sm:flex">
                <div className="grow">
                    <div className="">
                <Link href={`/jobs/${jobDoc.orgId}`} className="hover:cursor-pointer hover:underline text-sm text-gray-500">{jobDoc.orgName || '?'}</Link>
                    </div>
                    <div>
                <Link href={`/show/${jobDoc._id}`} className="hover:cursor-pointer hover:underline font-bold text-md sm:text-lg mb-1">{jobDoc.title}</Link>
                    </div>
                <div className=" text-gray-400 text-xs sm:text-sm capitalize">
                {jobDoc.remote} · {country?.name || 'Unknown Country'}
                {city ? (`, ${city?.name || 'Unknown City'}`) : (state ? `, ${state?.name || 'Unknown State'}` : '')} · {jobDoc.type}-Time
                    {jobDoc.isAdmin && (
                        <>
                        {' '}&middot;{' '}  
                        <Link href={`/jobs/edit/${jobDoc._id}`} className='hover:cursor-pointer' >Edit</Link>
                        {' '}&middot;{' '}
                        <DeleteButton jobId={jobDoc._id} />
                        </>
                    )}
                    </div>
                </div>
                {jobDoc.createdAt && (
            <div className="content-end text-gray-500 text-xs mt-1 sm:mt-0 sm:text-sm">
                
                <TimeAgo createdAt={jobDoc.createdAt} />
            </div>
                )}
            </div>
            </div>
           
        </div>
    )
}