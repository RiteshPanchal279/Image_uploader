import { useState } from "react";
import API from "../api";
import { toast } from "sonner";

export default function ImageUpload({ currentFolderId ,dataFetch}) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [upLoading, setUpLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !name) return toast.error("Name and image required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    if (currentFolderId) formData.append("folderId", currentFolderId);

    try {
      setUpLoading(true);
      await API.post("/image", formData);
      toast.success("Image uploaded successfully");
      setName("");
      setFile(null);
      dataFetch()
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUpLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm space-y-4"
    >
      <h3 className="text-lg font-medium text-gray-700">📤 Upload Image</h3>

      <input
        type="text"
        placeholder="Image name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />

      <button
        type="submit"
        disabled={upLoading}
        className={`w-full py-2 px-4 rounded-lg transition text-white ${
          upLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {upLoading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
