import os
from PIL import Image

directory = 'static/images'
for subdir, dirs, files in os.walk(os.path.join(os.getcwd(), directory)):
    for i, file in enumerate(files):
        file_path = os.path.join(subdir, file)
        file_name, file_extension = os.path.splitext(file_path)
        if file_extension in ['.webp', '.jpeg']:
            img = Image.open(file_path)
            img.save(os.path.join(subdir, ''.join([file_name, '.jpg'])))
            file_extension = '.jpg'
            if os.path.exists(file_path):
                os.remove(file_path)
            file_path = os.path.join(subdir, ''.join([file_name, '.jpg']))
        os.rename(file_path, os.path.join(subdir, ''.join(['image{}'.format(i), file_extension])))
