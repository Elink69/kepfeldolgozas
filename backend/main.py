from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Controllers import DiceDetectorRouter
from dotenv import load_dotenv
import os
from shutil import rmtree
from contextlib import asynccontextmanager
from Settings import ImageStoreSettings
from Utils.Factories import logger_factory


logger = logger_factory(__name__)

if not os.path.exists("settings.env"):
    logger.error(
        "Nem található a settings.env fájl. Ezt létre kell hozni a megfelelő működéshez"
    )

load_dotenv("settings.env")


def test_env_variables():
    model_path = os.getenv("MODEL_PATH")
    image_store_path = os.getenv("IMAGES_PATH")
    if model_path is None:
        return "A MODEL_PATH környezeti változó nincs beállítva."
    if not os.path.exists(model_path):
        return "A MODEL_PATH rosszul van beállítva, a megadott elérési útvonal nem létezik."
    if image_store_path is None:
        return "Az IMAGES_PATH környezeti változó nincs beállítva."


@asynccontextmanager
async def lifespan(app: FastAPI, image_store_settings=ImageStoreSettings()):
    test_result = test_env_variables()
    if test_result is not None:
        logger.error(test_result)
    images_path = image_store_settings.images_folder
    if not os.path.exists(images_path):
        os.mkdir(images_path)
    yield
    if os.path.exists(images_path):
        rmtree(images_path)


app = FastAPI(lifespan=lifespan)

app.include_router(DiceDetectorRouter)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOWED_ORIGINS")],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
