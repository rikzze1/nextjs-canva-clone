import { Hono } from "hono";
import stripe from "@/lib/stripe";

import { verifyAuth } from '@hono/auth-js';

const app = new Hono()
.post("/checkout", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if(!auth.token?.id) {
        return c.json({ error: "Unauthorized"}, 401);
    }

    const session = await stripe.checkout.sessions.create({
        success_url: "http://localhost:3000?success=1",
        cancel_url: "http://localhost:3000?canceled=1",
        payment_method_types: ["card", "paypal"],
        mode: "subscriptions",
        billing_address_collection: "auto",
        customer_email: auth.token.email || "",
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
            },
        ],
        metadata: {
            userId: auth.token.id,
        },
    });

    const url = session.url;

    if(!url) {
        return c.json({ error: "Failed to create session"}, 400);
    }

    return c.json({ data: url});
});

export default app;
