"use client";
 
 import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { Button } from "@radix-ui/themes";
 import { useRef, useState } from "react";
 import axios from "axios";
 
 export default function IconUpload({ name, icon, defaultValue = ' ' }: { name: string; icon: IconDefinition; defaultValue: string }) {
   const fileInRef = useRef<HTMLInputElement>(null);
   const [file, setFile] = useState<File | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [imageUrl, setImageUrl] = useState<string | null>(defaultValue)
   const [loading, setLoading] = useState(false);
 
 
   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
     const selectedFile = e.target.files?.[0];
     if (!selectedFile) {
       setError("Please select an image");
       return;
     }
 
     setFile(selectedFile); // Update state for UI purposes
     setError(null);
     setLoading(true);
 
     // Create FormData and append the file
     const formData = new FormData();
     formData.append("image", selectedFile); // Use "image" to match server-side expectation
 
     try {
       const res = await axios.post("/api/upload", formData);
       setError(null);  
       setLoading(false)
       setImageUrl(res.data.data.url);
     } catch (err: any) {
       setError(err.response?.data?.message || err.message || "Something went wrong");
       setImageUrl(null)
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div>
       <div className="bg-gray-200 size-24 flex justify-center content-center items-center">
     {loading ? (
           <FontAwesomeIcon className="text-gray-400 animate-spin" icon={faSpinner} />
         ) : imageUrl ? (
           <img className="size-24 object-contain" src={imageUrl} alt="uploaded picture" />
         ) : (
           <FontAwesomeIcon className="text-gray-400" icon={icon} />
         )}
       </div>
       <div className="mt-2">
         <input type="hidden" name={name} value={imageUrl || ""} />
         <input
           onChange={handleFileUpload}
           hidden
           type="file"
           accept="image/*"
           ref={fileInRef}
           disabled={loading}
         />
         <Button
           type="button"
           onClick={() => fileInRef.current?.click()}
           variant="soft"
           disabled={loading}
         >
           {loading ? "Uploading..." : "Select File"}
         </Button>
       </div>
       
       {error && (
         <div className="mt-2 text-red-500">
           <h3>Error:</h3>
           <p>{error}</p>
         </div>
       )}
     </div>
   );
 }