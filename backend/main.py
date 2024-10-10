from fastapi import FastAPI
from Controllers import DiceDetectorRouter
from dotenv import load_dotenv
import os
from shutil import rmtree
from contextlib import asynccontextmanager


load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    images_path = os.getenv("IMAGES_PATH")
    if not os.path.exists(images_path):
        os.mkdir(images_path)
    yield
    if os.path.exists(images_path):
        rmtree(images_path)

app = FastAPI(lifespan=lifespan)

app.include_router(DiceDetectorRouter)
