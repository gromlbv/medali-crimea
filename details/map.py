import os, json

"""
    Когда добавляются новые картинки, нужно запускать этот код, чтобы он создал карту для навигации по картинкам
"""

def get_dir_list(path):
    dirs = {}
    for d in os.listdir(path):
        full_path = path + '/' + d
        if os.path.isfile(full_path):
            dirs[d] = full_path
        else:
            dirs[d] = get_dir_list(full_path)
    return dirs


open(
    'details/map.json', 
    encoding="utf-8", 
    mode="w+"
).write(
    json.dumps(
        get_dir_list("details"),
        ensure_ascii=False,
        indent=4
    )    
)
