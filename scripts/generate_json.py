import json
import os
from openpyxl import load_workbook


# ==========================
# 文件路径
# ==========================

EXCEL_FILE = "data/course_manage.xlsx"

VIDEO_FILE = "data/videos.json"

OUTPUT_DIR = "data/courses"


os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)



# ==========================
# 读取视频数据库
# ==========================

def load_videos():


    if not os.path.exists(VIDEO_FILE):

        return {}


    with open(

        VIDEO_FILE,

        "r",

        encoding="utf-8"

    ) as f:

        return json.load(f)



videos = load_videos()



# ==========================
# 打开Excel
# ==========================

wb = load_workbook(
    EXCEL_FILE
)



courses_sheet = wb["courses"]

lessons_sheet = wb["lessons"]

chapters_sheet = wb["chapters"]



# ==========================
# 课程数据
# ==========================

courses = {}



for row in courses_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    course_id, name, stage, badge, cover = row



    if not course_id:

        continue



    course_id = str(course_id).zfill(3)



    courses[course_id] = {


        "course_id": course_id,


        "course_name": name or "",


        "stage": stage or "",


        "badge": badge or "",


        "cover": cover or ""


    }




# ==========================
# 章节数据
# ==========================

chapters = {}



for row in chapters_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    (
        course_id,
        chapter_id,
        chapter_name,
        lesson_id,
        title,
        video_file

    ) = row



    if not course_id:

        continue



    course_id = str(course_id).zfill(3)



    if course_id not in chapters:

        chapters[course_id] = {}



    if chapter_id not in chapters[course_id]:


        chapters[course_id][chapter_id] = {


            "chapter_id": str(chapter_id),


            "chapter_name": chapter_name or "",


            "lessons":[]

        }




    key = f"{course_id}-{lesson_id}"



    chapters[course_id][chapter_id]["lessons"].append({


        "lesson_id": lesson_id,


        "title": title or "",


        "video_file": video_file or "",


        "video_url": videos.get(

            key,

            {}

        ).get(

            "video_url",

            ""

        )


    })





# ==========================
# 生成课程JSON
# ==========================


for course_id, course in courses.items():


    output = course.copy()



    course_chapters = chapters.get(

        course_id,

        {}

    )


    output["chapters"] = list(

        course_chapters.values()

    )


    output["total_lessons"] = sum(


        len(chapter["lessons"])

        for chapter in output["chapters"]

    )



    file_path = os.path.join(

        OUTPUT_DIR,

        f"{course_id}.json"

    )



    with open(

        file_path,

        "w",

        encoding="utf-8"

    ) as f:


        json.dump(

            output,

            f,

            ensure_ascii=False,

            indent=2

        )


    print(

        "生成完成:",

        file_path

    )



print(
    "全部课程JSON生成完成"
)
