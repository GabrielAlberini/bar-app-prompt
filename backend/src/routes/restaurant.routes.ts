import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { createRestaurant, getMyRestaurant, updateMyRestaurant, deleteMyRestaurant, getPublicRestaurant } from "../controllers/restaurant.controller";
// Ruta pública para obtener restaurante por slug

const router = Router();

router.get("/slug/:slug", getPublicRestaurant);
router.post("/", authenticate, createRestaurant);
router.get("/me", authenticate, getMyRestaurant);
router.put("/me", authenticate, updateMyRestaurant);
router.delete("/me", authenticate, deleteMyRestaurant);

export default router; 