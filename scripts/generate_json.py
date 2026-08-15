import json
import os
from openpyxl import load_workbook


EXCEL_FILE = "data/course_manage.xlsx"

OUTPUT_DIR = "data/courses"


os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)



# =====================
# 打开Excel
# =====================

wb = load_workbook(
    EXCEL_FILE
)


courses_sheet = wb["courses"]

lessons_sheet = wb["lessons"]

chapters_sheet = wb["chapters"]

videos_sheet = wb["videos"]





# =====================
# 视频库
# =====================

videos = {}



for row in videos_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    course_id = row[0]

    lesson_id = row[1]

    video_file = row[2]

    video_url = row[3]



    if not course_id:

        continue



    key = f"{str(course_id).zfill(3)}-{lesson_id}"



    videos[key] = {


        "video_file": video_file or "",

        "video_url": video_url or ""

    }






# =====================
# 课程信息
# =====================

courses = {}



for row in courses_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    if not row[0]:

        continue



    cid = str(row[0]).zfill(3)



    courses[cid] = {


        "course_id": cid,


        "course_name": row[1] or "",


        "stage": row[2] or "",


        "badge": row[3] or "",


        "cover": row[4] or "",


        "description":

            row[5] or "",


        "sort":

            row[6] or 0


    }






# =====================
# 普通课程 lessons
# =====================

lessons = {}



for row in lessons_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    cid = row[0]


    if not cid:

        continue



    cid = str(cid).zfill(3)


    lesson_id = row[1]



    key = f"{cid}-{lesson_id}"



    lessons.setdefault(

        cid,

        []

    ).append({


        "lesson_id":

            lesson_id,


        "title":

            row[2] or "",


        "video_file":

            videos.get(

                key,

                {}

            ).get(

                "video_file",

                row[3] or ""

            ),


        "video_url":

            videos.get(

                key,

                {}

            ).get(

                "video_url",

                ""

            )

    })







# =====================
# 章节课程 chapters
# =====================

chapters = {}



for row in chapters_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    cid = row[0]


    if not cid:

        continue



    cid = str(cid).zfill(3)



    chapter_id = row[1]


    key = f"{cid}-{row[3]}"



    chapter = chapters.setdefault(

        cid,

        {}

    ).setdefault(

        str(chapter_id),

        {


            "chapter_id":

                str(chapter_id),


            "chapter_name":

                row[2] or "",


            "lessons":[]

        }

    )



    chapter["lessons"].append({


        "lesson_id":

            row[3],


        "title":

            row[4] or "",


        "video_file":

            videos.get(

                key,

                {}

            ).get(

                "video_file",

                row[5] or ""

            ),


        "video_url":

            videos.get(

                key,

                {}

            ).get(

                "video_url",

                ""

            )


    })






# =====================
# 生成JSON
# =====================

for cid, course in courses.items():


    data = course.copy()



    if cid in chapters:


        data["chapters"] = list(

            chapters[cid].values()

        )


        data["total_lessons"] = sum(

            len(x["lessons"])

            for x in data["chapters"]

        )



    else:


        data["lessons"] = lessons.get(

            cid,

            []

        )


        data["total_lessons"] = len(

            data["lessons"]

        )





    path = os.path.join(

        OUTPUT_DIR,

        f"{cid}.json"

    )



    with open(

        path,

        "w",

        encoding="utf-8"

    ) as f:


        json.dump(

            data,

            f,

            ensure_ascii=False,

            indent=2

        )



    print(

        "生成:",

        path

    )



print(
    "课程JSON全部生成完成"
)
