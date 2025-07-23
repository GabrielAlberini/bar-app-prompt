// Obtener perfil público de restaurante por slug
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Restaurant } from "../models/Restaurant";

export const getPublicRestaurant = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const restaurant = await Restaurant.findOne({ slug });
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const { business_name, slug, logo_url, location, contact, qr_url, status } = req.body;
    const user_id = req.user.id;

    console.log(business_name, slug, logo_url, location, contact, qr_url, status, user_id)
    // Solo permitir un restaurante por usuario
    const exists = await Restaurant.findOne({ user_id });
    if (exists) return res.status(400).json({ error: "User already has a restaurant" });
    const restaurant = new Restaurant({ user_id, business_name, slug, logo_url, location, contact, qr_url, status });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getMyRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user.id;
    const restaurant = await Restaurant.findOne({ user_id });
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateMyRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user.id;
    const restaurant = await Restaurant.findOneAndUpdate({ user_id }, req.body, { new: true });
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteMyRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user.id;
    const restaurant = await Restaurant.findOneAndDelete({ user_id });
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json({ message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}; 