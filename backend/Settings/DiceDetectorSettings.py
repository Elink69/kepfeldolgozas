from functools import lru_cache
from os import getenv
from typing import TypeAlias, Annotated
from fastapi import Depends


class DiceDetectorSettings:
    def __init__(self):
        self.model_path = getenv("MODEL_PATH")


@lru_cache
def get_settings():
    return DiceDetectorSettings()


DiceDetectorSettingsDep: TypeAlias = Annotated[DiceDetectorSettings, Depends(get_settings)]
