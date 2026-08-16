import json
import os
from openpyxl import load_workbook


EXCEL_FILE = "data/course_manage.xlsx"

OUTPUT_DIR = "data/courses"

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)


wb = load_workbook(
    EXCEL_FILE
)


courses_sheet = wb["courses"]
lessons_sheet = wb["lessons"]
chapters_sheet = wb["chapters"]



# =====================
# 读取课程
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

        "description": row[5] if len(row)>5 else "",

        "sort": row[6] if len(row)>6 else 0

    }



# =====================
# 读取全部 lessons
# =====================

lessons = {}


for row in lessons_sheet.iter_rows(
    min_row=2,
    values_only=True
):

    if not row[0]:
        continue


    cid = str(row[0]).zfill(3)


    lesson_id = row[1]


    lessons.setdefault(
        cid,
        {}
    )[lesson_id] = {


        "lesson_id": lesson_id,


        "title": row[2] or "",


        "video_file": row[3] or "",


        "video_url": row[4] or ""

    }



# =====================
# 读取章节
# =====================

chapters = {}


for row in chapters_sheet.iter_rows(
    min_row=2,
    values_only=True
):

    if not row[0]:
        continue


    cid = str(row[0]).zfill(3)


    chapter_id = row[1]


    lesson_id = row[3]


    chapters.setdefault(
        cid,
        {}
    ).setdefault(
        str(chapter_id),
        {

            "chapter_id": str(chapter_id),

            "chapter_name": row[2] or "",

            "lessons":[]

        }
    )


    # 从 lessons 表取完整课程信息

    lesson = lessons.get(
        cid,
        {}
    ).get(
        lesson_id
    )


    if lesson:


        chapters[cid][str(chapter_id)]["lessons"].append(
            lesson
        )



# =====================
# 生成JSON
# =====================

for cid,course in courses.items():


    data = course.copy()



    # 有章节

    if cid in chapters:


        data["chapters"] = list(
            chapters[cid].values()
        )


        data["total_lessons"] = sum(

            len(chapter["lessons"])

            for chapter in data["chapters"]

        )



    # 无章节

    else:


        data["lessons"] = list(

            lessons.get(
                cid,
                {}
            ).values()

        )


        data["total_lessons"] = len(
            data["lessons"]
        )



    with open(

        f"{OUTPUT_DIR}/{cid}.json",

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
        "生成完成:",
        cid
    )



print(
    "全部完成"
)
