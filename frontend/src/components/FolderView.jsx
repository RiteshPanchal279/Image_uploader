import { useEffect, useState } from "react";
import API from "../api";
import ImageUpload from "./ImageUpload";

export default function FolderView({ parentId = null }) {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");

  const fetchData = async () => {
    const res = await API.get(`/folder/${parentId || "root"}/contents`);
    setFolders(res.data.folders);
    setImages(res.data.images);
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    await API.post("/folder", {
      name: newFolderName,
      parent: parentId,
    });
    setNewFolderName("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [parentId]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6 space-y-6 border border-gray-200">
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">📁 Folders</h2>
        <ul className="space-y-2 pl-2 border-l-2 border-blue-300">
          {folders.map((folder) => (
            <li key={folder._id} className="pl-2 text-gray-800">
              <span className="font-medium">📂 {folder.name}</span>
              {/* Recursive folder view */}
              <div className="ml-4">
                <FolderView parentId={folder._id} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={createFolder}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add 
        </button>
      </div>

      <div>
        <ImageUpload currentFolderId={parentId} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">🖼️ Images</h3>
        {images.length === 0 ? (
          <p className="text-gray-500 italic">No images in this folder.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img._id}
                className="rounded overflow-hidden shadow border"
              >
                <img
                  src={img.imageUrl}
                  alt={img.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 text-sm text-center text-gray-600 truncate">
                  {img.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
