import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./db";

import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { success } from "./utils/envelope";
import { clerkMiddleware } from "@clerk/express";
import { authRouter } from "./routes/auth/auth.routes";

import { adminProductRouter } from "./routes/admin/product.routes";
import { adminPromoRouter } from "./routes/admin/promo.routes";
import { adminOrderRouter } from "./routes/admin/orders.routes";
import { adminSettingsRouter } from "./routes/admin/settings.routes";
import { adminDashboardRouter } from "./routes/admin/dashboard.routes";

import { customerHomeRouter } from "./routes/customer/home.routes";
import { customerProductRouter } from "./routes/customer/product.routes";
import { customerAddressRouter } from "./routes/customer/address.routes";
import { customerPromoRouter } from "./routes/customer/promo.routes";
import { customerCartWishlistRouter } from "./routes/customer/cart-wishlist.routes";
import { customerCheckoutRouter } from "./routes/customer/checkout.routes";
import { customerOrderRouter } from "./routes/customer/orders.routes";
import { customerCheckoutWithPointsRouter } from "./routes/customer/checkout-with-points.routes";

async function main() {
  await connectDB();

  const app = express();
  const CORS_ORIGIN = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const port = process.env.PORT || 5000;

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(clerkMiddleware());



  app.get("/health", (_req, res) => {
    res.status(200).json(success({ message: "Server is healthy" }));
  });

  // --- ROUTES GO HERE ---
  // auth routes
  app.use("/auth", authRouter);

  // customer routes
  app.use("/customer", customerHomeRouter);
  app.use("/customer", customerProductRouter);
  app.use("/customer", customerAddressRouter);
  app.use("/customer", customerPromoRouter);
  app.use("/customer", customerCartWishlistRouter);
  app.use("/customer", customerCheckoutRouter);
  app.use("/customer", customerCheckoutWithPointsRouter);
  app.use("/customer", customerOrderRouter);

  // admin routes
  app.use("/admin", adminProductRouter);
  app.use("/admin", adminPromoRouter);
  app.use("/admin", adminOrderRouter);
  app.use("/admin", adminSettingsRouter);
  app.use("/admin", adminDashboardRouter);

  app.use(errorHandler);
  app.use(notFound);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
