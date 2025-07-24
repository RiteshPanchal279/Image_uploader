import Folder from "../model/Folder.js";
import Image from "../model/Image.js";


export const createFolder =async (req, res) => {
  const { name, parent } = req.body;

  if (!name)
    return res.status(400).json({ message: "Folder name is required" });

  const newFolder = new Folder({
    name,
    parent: parent || null,
    user: req.user.id,
  });

  await newFolder.save();
  res.status(201).json({ newFolder, success: true });
};

export const getFolderById= async (req, res) => {
  const folderId = req.params.id === "root" ? null : req.params.id;

  const folders = await Folder.find({ parent: folderId, user: req.user.id });
  const images = await Image.find({ folder: folderId, user: req.user.id });

  res.json({ folders, images, success: true });
};

export const getFolderFullPath=async (req, res) => {
  let folder = await Folder.findOne({ _id: req.params.id, user: req.user.id });
  if (!folder) return res.status(404).json({ message: "Folder not found" });

  const path = [];

  while (folder) {
    path.unshift({ id: folder._id, name: folder.name });
    folder = folder.parent ? await Folder.findById(folder.parent) : null;
  }

  res.json({ path, success: true });
};

