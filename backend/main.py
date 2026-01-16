from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/visual-search")
async def visual_search(image: UploadFile = File(...)):
    return {
        "filename": image.filename,
        "content_type": image.content_type,
        "message": "Image received successfully"
    }
