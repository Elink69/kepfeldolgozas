from logging import Logger, StreamHandler, Formatter, getLogger, DEBUG
import sys


def logger_factory(name: str) -> Logger:
    stream_handler = StreamHandler(sys.stdout)
    log_formatter = Formatter("%(levelname)s: %(asctime)s  %(name)s: %(message)s")
    stream_handler.setFormatter(log_formatter)
    logger = getLogger(name)
    logger.addHandler(stream_handler)
    logger.setLevel(DEBUG)
    return logger
