import Stripe from 'stripe';

export async function POST(request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = await request.json();
    const { appointmentId, doctorName, appointmentDate, appointmentTime, redirectURL } = body;

    if (!appointmentId || !doctorName || !appointmentDate || !appointmentTime) {
      return Response.json(
        { error: 'Missing required appointment details' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Medical Consultation - ${doctorName}`,
              description: `Appointment on ${new Date(appointmentDate).toLocaleDateString()} at ${appointmentTime}`,
            },
            unit_amount: 15000, // $150.00 consultation fee
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${redirectURL}&session_id={CHECKOUT_SESSION_ID}&appointment_id=${appointmentId}`,
      cancel_url: redirectURL,
      metadata: {
        appointmentId: appointmentId.toString(),
        type: 'medical_consultation'
      }
    });

    return Response.json({ url: session.url });

  } catch (error) {
    console.error('Error creating payment session:', error);
    return Response.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}