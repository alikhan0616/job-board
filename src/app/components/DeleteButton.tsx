"use client";

import axios from 'axios';

export default function DeleteButton({ jobId }: { jobId: string }) {
  const handleDeleteClick = async () => {
    await axios.delete(`/api/jobs?id=${jobId}`);
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleDeleteClick}
      className="hover:cursor-pointer"
    >
      Delete
    </button>
  );
}