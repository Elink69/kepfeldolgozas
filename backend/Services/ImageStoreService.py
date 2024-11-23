from Settings import ImageStoreSettingsDep
from fastapi import HTTPException, Depends
from typing import Annotated, TypeAlias
import os


class ImageStoreService:
    def __init__(self, settings: ImageStoreSettingsDep):
        self.folder = settings.images_folder

    def get_image(self, image_id: str) -> str:
        file_path = os.path.abspath(os.path.join(self.folder, f"{image_id}.jpg"))
        if not os.path.isfile(file_path):
            raise HTTPException(
                status_code=404,
                detail=f"Nem található fájl ilyen azonosítóval ({image_id})",
            )

        return file_path

    def delete_image(self, image_path: str) -> None:
        if os.path.isfile(image_path):
            os.remove(image_path)


ImageStoreServiceDep: TypeAlias = Annotated[
    ImageStoreService, Depends(ImageStoreService)
]
