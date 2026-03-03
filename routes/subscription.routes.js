import { Router } from "express";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";
import authorize from "../middleware/auth.middleware.js";

const subscriptionRoute = Router();

subscriptionRoute.get("/", (req, res) => res.send({ title :" Get all subscription"}) )

subscriptionRoute.get("/:id", (req, res) => res.send({ title :" Get subscription details"}) )

subscriptionRoute.post("/",authorize, createSubscription )

subscriptionRoute.put("/:id", (req, res) => res.send({ title :" update subscription"}) )

subscriptionRoute.delete("/:id", (req, res) => res.send({ title :" delete subscription"}) )

subscriptionRoute.get("/user/:id", authorize, getUserSubscription )

subscriptionRoute.put("/:id/cancel", (req, res) => res.send({ title :"Cancel subscription"}) )

subscriptionRoute.get("/upcoming-renewals", (req, res) => res.send({ title :" Get upcoming renewals"}) )


export default subscriptionRoute