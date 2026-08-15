import json
import os
from openpyxl import load_workbook



# =====================================================
# 文件路径
# =====================================================


EXCEL_FILE = "data/course_manage.xlsx"

OUTPUT_DIR = "data/courses"



os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)



# =====================================================
# 读取 Excel
# =====================================================


wb = load_workbook(
    EXCEL_FILE
)



courses_sheet = wb["courses"]

lessons_sheet = wb["lessons"]

chapters_sheet = wb["chapters"]




# =====================================================
# 读取旧 JSON
# =====================================================


old_courses = {}



for filename in os.listdir(OUTPUT_DIR):


    if filename.endswith(".json"):


        path = os.path.join(
            OUTPUT_DIR,
            filename
        )


        try:

            with open(
                path,
                "r",
                encoding="utf-8"
            ) as f:


                data = json.load(f)


                old_courses[
                    data["course_id"]
                ] = data


        except Exception:


            pass




# =====================================================
# 读取课程信息
# =====================================================


courses = {}



for row in courses_sheet.iter_rows(
    min_row=2,
    values_only=True
):


    course_id, course_name, stage, badge, cover = row



    if not course_id:

        continue



    course_id = str(course_id)



    courses[course_id] = {


        "course_id":

            course_id,


        "course_name":

            course_name or "",


        "stage":

            stage or "",


        "badge":

            badge or "",


        "cover":

            cover or ""


    }





# =====================================================
# 读取 lessons
# =====================================================


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






# =====================================================
# 读取 chapters
# =====================================================


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






# =====================================================
# 合并旧视频地址
# =====================================================


def merge_video(
    new_item,
    old_item
):


    if not new_item.get(
        "video_url"
    ):


        if old_item:

            new_item["video_url"] = (

                old_item.get(
                    "video_url",
                    ""

                )

            )


    return new_item






def merge_lessons(
    new_lessons,
    old_lessons
):


    old_map = {

        item["lesson_id"]:

        item

        for item in old_lessons

    }



    result=[]



    for lesson in new_lessons:


        old = old_map.get(
            lesson["lesson_id"]
        )


        result.append(

            merge_video(
                lesson,
                old
            )

        )


    return result






# =====================================================
# 输出 JSON
# =====================================================


for course_id, course in courses.items():


    output = course.copy()



    old_course = old_courses.get(
        course_id,
        {}
    )



    if course_id in chapter_data:


        chapters = []



        for chapter in chapter_data[course_id].values():


            old_chapter = {}



            for oc in old_course.get(
                "chapters",
                []
            ):


                if oc.get(
                    "chapter_id"
                ) == chapter["chapter_id"]:

                    old_chapter = oc



            chapter["lessons"] = merge_lessons(

                chapter["lessons"],

                old_chapter.get(
                    "lessons",
                    []
                )

            )



            chapters.append(
                chapter
            )



        output["chapters"] = chapters



    else:



        output["lessons"] = merge_lessons(

            lesson_data.get(
                course_id,
                []
            ),

            old_course.get(
                "lessons",
                []
            )

        )





    output["total_lessons"] = sum(

        len(chapter["lessons"])

        for chapter in output.get(
            "chapters",
            []
        )

    ) if "chapters" in output else len(

        output.get(
            "lessons",
            []
        )

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

        "生成:",

        file_path

    )




print(
    "课程 JSON 更新完成"
)
