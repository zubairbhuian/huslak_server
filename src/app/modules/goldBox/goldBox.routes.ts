import express from "express";
import { GoldBoxController } from "./goldBox.controller";

const goldBox = express.Router();

goldBox.get("/", GoldBoxController.allGoldBox);
goldBox.post("/", GoldBoxController.createGoldBox);
goldBox.put("/", GoldBoxController.updateGoldBox);
goldBox.delete("/", GoldBoxController.deleteGoldBox);

export default goldBox;
