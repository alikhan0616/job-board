"use client";

<<<<<<< HEAD
import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";
=======
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import { useRef, useState } from "react";
import axios from "axios";

<<<<<<< HEAD
export default function IconUpload({ name, icon }: { name: string; icon: IconDefinition }) {
=======
export default function IconUpload({ icon }: { icon: IconDefinition }) {
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
<<<<<<< HEAD
      setLoading(false)
      setImageUrl(res.data.data.url);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
      setImageUrl(null)
=======
      setImageUrl(res.data.data.url);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-200 size-24 flex justify-center content-center items-center">
<<<<<<< HEAD
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
=======
        {imageUrl ? <img className="size-24 object-contain" src={imageUrl} alt="uploaded picture" /> : <FontAwesomeIcon className="text-gray-400" icon={icon} />}
      </div>
      <div className="mt-2">
>>>>>>> e3f0de84ed5539a59d10e3327bad789e3a5bcae1
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