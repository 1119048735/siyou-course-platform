import json
import os
from openpyxl import load_workbook


# ============================================================
# 路径配置
# ============================================================


EXCEL_FILE = "data/course_manage.xlsx"

OUTPUT_DIR = "data/courses"



# ============================================================
# 创建输出目录
# ============================================================


os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)



# ============================================================
# 读取 Excel
# ============================================================


wb = load_workbook(
    EXCEL_FILE
)



courses_sheet = wb["courses"]

lessons_sheet = wb["lessons"]

chapters_sheet = wb["chapters"]



# ============================================================
# 读取课程基本信息
# ============================================================


courses = {}



for row in courses_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    course_id, course_name, stage, badge, cover = row



    if not course_id:
        continue



    courses[str(course_id)] = {


        "course_id":
            str(course_id),


        "course_name":
            course_name or "",


        "stage":
            stage or "",


        "badge":
            badge or "",


        "cover":
            cover or ""

    }




# ============================================================
# 处理普通 lessons
# ============================================================


lesson_data = {}



for row in lessons_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    course_id, lesson_id, title, video_file, video_url = row



    if not course_id:
        continue



    course_id = str(course_id)



    if course_id not in lesson_data:

        lesson_data[course_id] = []



    lesson_data[course_id].append({


        "lesson_id":
            int(lesson_id),


        "title":
            title or "",


        "video_file":
            video_file or "",


        "video_url":
            video_url or ""


    })





# ============================================================
# 处理 chapters
# ============================================================


chapter_data = {}



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
        video_file,
        video_url

    ) = row



    if not course_id:
        continue



    course_id = str(course_id)



    if course_id not in chapter_data:

        chapter_data[course_id] = {}



    if chapter_id not in chapter_data[course_id]:

        chapter_data[course_id][chapter_id] = {


            "chapter_id":
                str(chapter_id),


            "chapter_name":
                chapter_name or "",


            "lessons":[]

        }




    chapter_data[course_id][chapter_id]["lessons"].append({


        "lesson_id":
            int(lesson_id),


        "title":
            title or "",


        "video_file":
            video_file or "",


        "video_url":
            video_url or ""

    })





# ============================================================
# 生成 JSON
# ============================================================


for course_id, course in courses.items():


    output = course.copy()



    if course_id in chapter_data:


        output["chapters"] = list(

            chapter_data[course_id].values()

        )



    else:


        output["lessons"] = lesson_data.get(

            course_id,

            []

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



print("全部课程 JSON 生成完成")
