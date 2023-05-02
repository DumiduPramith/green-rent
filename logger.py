import logging

formatter = logging.Formatter('%(asctime)s:%(name)s.%(funcName)s: %(message)s')


def set_logger(logger_name, log_file="Log\\info.log", level=logging.DEBUG):
    file_write_mode = 'w'
    if level is logging.DEBUG:
        log_file = "Log\\debug.log"
    logger = logging.getLogger(logger_name)
    logger.setLevel(level)

    file_handler = logging.FileHandler(log_file, file_write_mode)
    file_handler.setFormatter(formatter)

    logger.addHandler(file_handler)

    return logger
