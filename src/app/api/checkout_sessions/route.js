import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/core/stripe';

const PLAN_PRICE_ID = {
  // 'basic': 'price_...',
};

// 💡 REMOVE THE CURLY BRACES HERE: Just use (request)
export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // This will work perfectly now
    const formData = await request.formData()
    const planId = formData.get('plan_id')
    const priceId = PLAN_PRICE_ID[planId] || 'price_1TjzeD2al4c1QQcmqpm698du';

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: { planId },
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}