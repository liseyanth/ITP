import express from "express";
import supController from "../controllers/sup.js";
const router = express.Router();


//All routers are here
router.get("/dis", supController.getAllSup);
router.post("/dis", supController.createSup);
router.get("/dis/single/:id", supController.getSingleSup);
router.put("/dis/:id", supController.updateSup);
router.delete("/dis/:id", supController.deleteSup);
router.get("/dis/search?",supController.getsearchsupplier);
export default router;