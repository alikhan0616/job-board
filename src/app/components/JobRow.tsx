import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from "@fortawesome/free-solid-svg-icons"
export default function JobRow() {
    return(
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            <div className="cursor-pointer absolute top-4 right-4">
                <FontAwesomeIcon className='size-4 text-gray-300' icon={faHeart} />
                </div>
            <div className="flex grow gap-4">
            <div className="self-center">
                <img className="size-8 sm:size-12 " src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png" alt="" />
            </div>
            <div className="grow sm:flex">
                <div className="grow">
                <div className="text-sm text-gray-500">Spotify</div>
                <div className="font-bold text-md sm:text-lg mb-1">Product Designer</div>
                <div className=" text-gray-400 text-xs sm:text-sm">Remote &middot; New York, US &middot; Full-time</div>
                </div>
            <div className="content-end text-gray-500 text-xs mt-1 sm:mt-0 sm:text-sm">2 Weeks ago</div>
            </div>
            </div>
           
        </div>
    )
}