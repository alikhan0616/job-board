import { withAuth } from "@workos-inc/authkit-nextjs"
import { createCompany } from "../actions/workosActions"

export default async function newCompanyPage(){
    const {user} = await withAuth()
    async function handleNewCompanyFormSubmit(data: FormData) {
            'use server'
        if(user){
            await createCompany(data.get('newCompanyName') as string, user.id)
        }
        }
        if(!user){
            return (
                <div className="container py-6 px-6 mx-auto">You need to be logged in First!</div>
            )
        }
    return(
        <div className="container py-6 px-6 mx-auto">
            <h2 className="font-bold text-2xl mt-6">Create a job listing</h2>
                    <p className="text-sm text-slate-600 mb-2">To create a listing, you need to register your company first</p>
                    
                    <form
                    action={handleNewCompanyFormSubmit}
                    className="flex gap-2">
                        <input
                        className="p-2 border border-gray-300 rounded-lg"
                        name='newCompanyName'
                        placeholder="Company name..."
                        type="text" />
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:opacity-85 rounded-lg">
                            Create Company
                        </button>
                    </form>
        </div>
    )
}