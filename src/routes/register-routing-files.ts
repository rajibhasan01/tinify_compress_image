// External import
import express from "express";

// Internal import
import loginRoute from "./login/route.login";
import lamaAiRoute from "./tinify/route.tinify";
import { JwtAuthentication } from "../middlewares/common/jwt.varification";
import authRoutes from "./login/route.social-login";

// Create a new router object
const registeredRouters = express.Router();
const jwt = JwtAuthentication.getInstance();

registeredRouters.use("/auth", loginRoute);
registeredRouters.use("/login", authRoutes);
registeredRouters.use("/braincraft", lamaAiRoute);

export = registeredRouters;