import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(
    api_key=GROQ_API_KEY
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {
        "message": "Backend Running"
    }

@app.post("/chat")
async def chat(req: ChatRequest):

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": req.message
                }
            ]
        )

        return {
            "reply": response.choices[0].message.content
        }

    except Exception as e:
        return {
            "error": str(e)
        }