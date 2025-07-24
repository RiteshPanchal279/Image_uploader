import express from "express";
import { createFolder, getFolderById, getFolderFullPath } from "../controller/folder_cnt.js";


const router = express.Router();
router.route("/").post(createFolder);
router.route("/:id/contents").get(getFolderById);
router.route("/:id/path").get(getFolderFullPath);

export default router;
