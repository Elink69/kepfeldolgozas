from functools import lru_cache
from Utils import *
import numpy as np
from Settings import DiceDetectorSettingsDep, ImageStoreSettingsDep, DiceDetectorSettings, ImageStoreSettings
from ultralytics import YOLO
from ultralytics.engine.results import Results
from typing import BinaryIO, TypeAlias, Annotated
import cv2
from fastapi import Depends
import uuid


logger = logger_factory(__name__)


class DiceDetectorService:
    def __init__(self, dice_detector_settings: DiceDetectorSettings, image_store_settings: ImageStoreSettings):
        self.model = YOLO(dice_detector_settings.model_path)
        self.image_store = image_store_settings.images_folder
        self.class_names = ["one",
                            "two",
                            "three",
                            "four",
                            "five",
                            "six"]

    def detection_pipeline(self, image_stream: BinaryIO) -> dict[str, uuid.UUID | dict]:
        image = cv2.imdecode(np.asarray(bytearray(image_stream.read()), np.uint8), 1)
        preprocessed_image = self._preprocess_image(image)
        model_results: list[Results] = self.model(preprocessed_image)
        _, counts = np.unique(model_results[0].boxes.cls.int(), return_counts=True)
        image_id = uuid.uuid4()
        model_results[0].save(f"{self.image_store}/{image_id}.jpg")
        return {"image_id": image_id,
                "results": dict(zip(self.class_names, counts.tolist()))}

    def _preprocess_image(self, image):
        resized_img = cv2.resize(image, (640, 640))
        return resized_img


@lru_cache
def get_service(dice_detector_settings: DiceDetectorSettingsDep, image_store_settings: ImageStoreSettingsDep) -> DiceDetectorService:
    return DiceDetectorService(dice_detector_settings=dice_detector_settings, image_store_settings=image_store_settings)


DiceDetectorServiceDep: TypeAlias = Annotated[DiceDetectorService, Depends(get_service)]
