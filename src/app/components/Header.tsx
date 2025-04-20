import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const handleSignOut = async () => {
    'use server';
    await signOut();
  }
  
    return(
        <header className="shadow-lg">
          <div className="container max-w-8xl flex items-center justify-between py-4 px-6 mx-auto">
          <Link href='/' className="font-bold text-md sm:text-xl">HireHub</Link>
        <nav className="flex gap-4 *:py-2 *:px-4 *:rounded-md *:hover:shadow-sm">
          {
            !user && (
              <Link href={signInUrl} className="bg-gray-300">Login</Link>
            )
          }
          {
            user && (  
                <button onClick={handleSignOut} className="cursor-pointer bg-gray-300">Logout</button>
            )
          }
        <Link href={'/new-listing'} className="bg-blue-600 text-white">Post a job</Link>
        </nav>
          </div>
        </header>
    )
}