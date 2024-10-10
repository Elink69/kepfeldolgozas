from functools import lru_cache
from typing import Annotated, TypeAlias
from fastapi import Depends
from os import getenv


class ImageStoreSettings:
    def __init__(self):
        self.images_folder = getenv("IMAGES_PATH")


@lru_cache
def get_settings() -> ImageStoreSettings:
    return ImageStoreSettings()


ImageStoreSettingsDep: TypeAlias = Annotated[ImageStoreSettings, Depends(get_settings)]
