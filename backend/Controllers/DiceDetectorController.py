from fastapi import APIRouter, UploadFile
from Utils import logger_factory
from Services import *


router = APIRouter()
logger = logger_factory(__name__)


@router.post("/upload_image")
async def upload_image(file: UploadFile, dice_detector_service: DiceDetectorServiceDep):
    logger.info(dice_detector_service)
    result = dice_detector_service.detection_pipeline(file.file)
    return result
