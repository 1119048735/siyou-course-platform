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



def load_json(path):

    if not os.path.exists(path):

        return {}

    with open(
        path,
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)




videos = load_json(
    VIDEO_FILE
)



wb = load_workbook(
    EXCEL_FILE
)



courses_sheet = wb["courses"]

lessons_sheet = wb["lessons"]

chapters_sheet = wb["chapters"]




# ======================
# courses
# ======================

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

        "cover": row[4] or ""

    }





# ======================
# lessons
# ======================

lessons_data = {}


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


    lessons_data.setdefault(
        cid,
        []
    ).append({


        "lesson_id": lesson_id,

        "title": row[2] or "",

        "video_file": row[3] or "",

        "video_url":
            videos.get(
                key,
                {}
            ).get(
                "video_url",
                ""
            )

    })





# ======================
# chapters
# ======================

chapters_data = {}


for row in chapters_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    cid = row[0]


    if not cid:

        continue


    cid = str(cid).zfill(3)


    chapter_id = row[1]

    chapter_name = row[2]


    key = f"{cid}-{row[3]}"


    chapter = chapters_data.setdefault(
        cid,
        {}
    ).setdefault(
        str(chapter_id),
        {

            "chapter_id":str(chapter_id),

            "chapter_name":chapter_name or "",

            "lessons":[]

        }
    )



    chapter["lessons"].append({

        "lesson_id":row[3],

        "title":row[4] or "",

        "video_file":row[5] or "",

        "video_url":
            videos.get(
                key,
                {}
            ).get(
                "video_url",
                ""
            )

    })





# ======================
# 输出
# ======================

for cid, course in courses.items():


    output = course.copy()



    if cid in chapters_data:


        output["chapters"] = list(
            chapters_data[cid].values()
        )


        output["total_lessons"] = sum(

            len(x["lessons"])

            for x in output["chapters"]

        )


    else:


        output["lessons"] = lessons_data.get(
            cid,
            []
        )


        output["total_lessons"] = len(
            output["lessons"]
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

            output,

            f,

            ensure_ascii=False,

            indent=2

        )


    print(
        "生成:",
        path
    )



print("完成")
