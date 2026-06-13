import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '../../../lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>))
    const amount = Number(body.amount ?? 0) // expected as dollars (e.g. "5" or 5)
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // amount must be in cents for Stripe
    const unit_amount = Math.round(amount * 100)
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
       line_items: [
        {
          // For dynamic/custom amounts, we must use price_data with unit_amount (in cents), not price.
          price_data: {
            currency: 'usd',
            unit_amount: unit_amount,
            product_data: {
                name: 'Donation',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/paymentSuccess`,
      cancel_url: `${origin}/`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}