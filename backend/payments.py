import stripe
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

import os
from dotenv import load_dotenv

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@router.post("/create-checkout-session")
async def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "inr",
                    "product_data": {
                        "name": "Jobs99 Pro Plan"
                    },
                    "unit_amount": 49900  # ₹499.00
                },
                "quantity": 1
            }],
            mode="payment",
            success_url="http://localhost:8000/success.html",
            cancel_url="http://localhost:8000/cancel.html"
        )
        return {"id": session.id}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
