import json
import os



NEW_DIR = "data/courses"

BACKUP_DIR = "backup_courses"




def load_json(path):

    if not os.path.exists(path):

        return None


    try:

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)


    except:

        return None





def save_json(path, data):


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





def restore_lesson_video(

    new_lesson,

    old_lesson

):


    if old_lesson is None:

        return



    old_url = old_lesson.get(

        "video_url",

        ""

    )



    if old_url:


        new_lesson["video_url"] = old_url






def restore_course(

    new_course,

    old_course

):


    if not old_course:

        return new_course




    # 普通课程

    if "lessons" in new_course:


        old_lessons = {


            x["lesson_id"]:x

            for x in old_course.get(

                "lessons",

                []

            )

        }



        for lesson in new_course["lessons"]:


            old = old_lessons.get(

                lesson["lesson_id"]

            )


            restore_lesson_video(

                lesson,

                old

            )





    # 章节课程

    if "chapters" in new_course:


        old_chapters = {


            x["chapter_id"]:x

            for x in old_course.get(

                "chapters",

                []

            )

        }



        for chapter in new_course["chapters"]:


            old_chapter = old_chapters.get(

                chapter["chapter_id"]

            )


            if not old_chapter:

                continue



            old_lessons = {


                x["lesson_id"]:x

                for x in old_chapter.get(

                    "lessons",

                    []

                )

            }




            for lesson in chapter["lessons"]:


                old = old_lessons.get(

                    lesson["lesson_id"]

                )


                restore_lesson_video(

                    lesson,

                    old

                )




    return new_course





# ===================================================
# 开始恢复
# ===================================================


for filename in os.listdir(NEW_DIR):


    if not filename.endswith(".json"):

        continue



    new_path = os.path.join(

        NEW_DIR,

        filename

    )


    old_path = os.path.join(

        BACKUP_DIR,

        filename

    )



    new_course = load_json(

        new_path

    )


    old_course = load_json(

        old_path

    )



    if new_course:


        new_course = restore_course(

            new_course,

            old_course

        )


        save_json(

            new_path,

            new_course

        )


        print(

            "恢复视频地址:",

            filename

        )



print(

    "视频地址恢复完成"

)
