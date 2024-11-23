from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse
from fastapi.background import BackgroundTasks
from pydantic import BaseModel
from uuid import UUID
from Utils import logger_factory
from Services import DiceDetectorServiceDep, ImageStoreServiceDep


router = APIRouter()
logger = logger_factory(__name__)


class UploadImageResponse(BaseModel):
    image_id: UUID
    results: dict[str, int]


@router.post("/upload_image", response_model=UploadImageResponse)
async def upload_image(file: UploadFile, dice_detector_service: DiceDetectorServiceDep):
    result = dice_detector_service.detection_pipeline(file.file)
    return result


@router.get(
    "/download_image/{image_id}",
    responses={
        200: {"description": "Successful Response", "content": {"image/jpg": {}}},
        404: {"description": "File Not Found", "content": {"application/json": {}}},
    },
)
async def download_annotated_image(
    image_id: str,
    image_store_service: ImageStoreServiceDep,
    background: BackgroundTasks,
):
    image_path = image_store_service.get_image(image_id)
    background.add_task(image_store_service.delete_image, image_path)
    return FileResponse(image_path, media_type="image/jpg")
