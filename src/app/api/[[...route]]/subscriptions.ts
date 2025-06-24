import { Hono } from "hono";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

import { db } from '@/db/drizzle';
import { verifyAuth } from '@hono/auth-js';
import { subscriptions } from '@/db/schema';

const app = new Hono()
.post("/checkout", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if(!auth.token?.id) {
        return c.json({ error: "Unauthorized"}, 401);
    }

    const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=1`,
        payment_method_types: ["card", "paypal"],
        mode: "subscription",
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
})
.post(
    "/webhook",
    async (c) => {
        const body = await c.req.text();
        const signature = c.req.header("Stripe-Signature") as string;

        let event: Stripe.Event;

        try{
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!
            );

        }catch{
            return c.json({ error: "Invalid signature "}, 400);
        }

        const session = event.data.object as Stripe.Checkout.Session;

        if(event.type === 'checkout.session.completed'){
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string,
            );

            if(!session?.metadata?.userId) {
                return c.json({ error: "Invalid session"}, 400);
            }

            await db
            .insert(subscriptions)
            .values({
                status: subscription.status,
                userId: session.metadata.userId,
                subscriptionId: subscription.id,
                customerId: subscription.customer as string,
                priceId: subscription.items.data[0].price.product as string,
                currentPeriodEnd: new Date(
                    (subscription.current_period_end as number) * 1000
                ),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        return c.json(null, 200);
    }
);

export default app;
