import json
import os
from openpyxl import load_workbook


EXCEL_FILE = "data/course_manage.xlsx"
VIDEO_FILE = "data/videos.json"
OUTPUT_DIR = "data/courses"


os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)


# ======================
# 读取视频库
# ======================

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



# ======================
# 读取Excel
# ======================

wb = load_workbook(
    EXCEL_FILE
)


courses_sheet = wb["courses"]

chapters_sheet = wb["chapters"]



# ======================
# 读取课程
# ======================

courses = {}


for row in courses_sheet.iter_rows(
    min_row=2,
    values_only=True
):

    if not row[0]:
        continue


    course_id = str(row[0]).zfill(3)


    courses[course_id] = {

        "course_id": course_id,

        "course_name": row[1] or "",

        "stage": row[2] or "",

        "badge": row[3] or "",

        "cover": row[4] or ""

    }





# ======================
# 读取章节
# 自动忽略多余列
# ======================

chapters = {}



for row in chapters_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    # 前6列读取
    course_id = row[0]

    chapter_id = row[1]

    chapter_name = row[2]

    lesson_id = row[3]

    title = row[4]

    video_file = row[5]



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




    video_key = f"{course_id}-{lesson_id}"



    video_url = videos.get(

        video_key,

        {}

    ).get(

        "video_url",

        ""

    )



    chapters[course_id][chapter_id]["lessons"].append({

        "lesson_id": lesson_id,

        "title": title or "",

        "video_file": video_file or "",

        "video_url": video_url

    })





# ======================
# 输出JSON
# ======================


for course_id, course in courses.items():


    output = course.copy()



    output["chapters"] = list(

        chapters.get(

            course_id,

            {}

        ).values()

    )



    output["total_lessons"] = sum(

        len(chapter["lessons"])

        for chapter in output["chapters"]

    )



    path = os.path.join(

        OUTPUT_DIR,

        f"{course_id}.json"

    )



    with open(

        path,

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

        path

    )



print(
    "全部课程JSON生成完成"
)
