import Stripe from "stripe";

const secret = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!
export const stripe = new Stripe(secret, {
  apiVersion: "2023-08-16",
});
