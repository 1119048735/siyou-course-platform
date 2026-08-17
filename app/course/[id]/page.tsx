import fs from "fs";
import path from "path";
import Link from "next/link";

export const dynamic = "force-dynamic";


interface Lesson {

  lesson_id: number;

  title: string;

  video_file: string;

  video_url: string;

}


interface Chapter {

  chapter_id: string;

  chapter_name: string;

  lessons: Lesson[];

}


interface Course {

  course_id: string;

  course_name: string;

  cover: string;

  total_lessons: number;

  lessons?: Lesson[];

  chapters?: Chapter[];

}


async function getCourse(id: string): Promise<Course | null> {

  const filePath = path.join(

    process.cwd(),

    "data/courses",

    `${id}.json`

  );


  if (!fs.existsSync(filePath)) {

    throw new Error(

      "课程文件不存在: " + filePath

    );

  }


  const data = fs.readFileSync(

    filePath,

    "utf-8"

  );


  return JSON.parse(data);

}


export default async function CoursePage({

  params,

  searchParams,

}: {

  params: Promise<{

    id: string

  }>;

  searchParams: Promise<{

    highlight?: string

  }>;

}) {


  const { id } = await params;

  const { highlight } = await searchParams;


  const course = await getCourse(id);


  if (!course) {

    return (

      <div className="p-10">

        课程不存在

      </div>

    );

  }


  let targetChapterId: string | null = null;


  if (highlight && course.chapters) {

    for (const chapter of course.chapters) {

      if (

        chapter.lessons.some(

          lesson =>

            String(lesson.lesson_id) === highlight

        )

      ) {

        targetChapterId = chapter.chapter_id;

        break;

      }

    }

  }


  return (

    <div className="min-h-screen bg-gray-50 p-6">


      <div className="max-w-5xl mx-auto">


        {/* 顶部导航 */}

        <div className="flex items-center justify-between mb-6">


          <Link

            href="/"

            className="text-blue-600 hover:text-blue-800"

          >

            ← 返回主页

          </Link>


          <span className="text-sm text-gray-500">

            课程目录

          </span>


        </div>



        {/* 课程信息 */}

        <h1 className="text-3xl font-bold mb-2">

          {course.course_name}

        </h1>


        <p className="text-gray-500 mb-8">

          共 {course.total_lessons} 节课程

        </p>



        {/* 章节课程 */}

        {course.chapters && course.chapters.length > 0 ? (


          course.chapters.map((chapter) => {

            const shouldOpen =

              targetChapterId === chapter.chapter_id;


            return (

              <details

                key={chapter.chapter_id}

                open={shouldOpen}

                className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden"

              >


                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 select-none">


                  <span className="text-xl font-bold text-blue-700 border-l-4 border-blue-500 pl-3">

                    {chapter.chapter_name}

                  </span>


                  <span className="text-gray-400">

                    {shouldOpen ? "▼" : "▶"}

                  </span>


                </summary>



                <div className="px-4 pb-4 grid gap-3">


                  {chapter.lessons.map((lesson) => {


                    const isCurrent =

                      String(lesson.lesson_id) === highlight;


                    return (

                      <Link

                        key={lesson.lesson_id}

                        id={`lesson-${lesson.lesson_id}`}

                        data-lesson-id={lesson.lesson_id}

                        href={`/course/${id}/lesson/${lesson.lesson_id}`}

                        className={`rounded-xl p-4 transition block ${
                          
                          isCurrent

                            ? "bg-blue-100 border-2 border-blue-500 shadow-sm"

                            : "bg-gray-50 hover:bg-blue-50"

                        }`}

                      >


                        <div className="flex justify-between items-center">


                          <div>


                            <div className="text-gray-500 text-sm">

                              第 {lesson.lesson_id} 节

                            </div>


                            <div className="font-semibold mt-1">

                              {lesson.title}

                            </div>


                          </div>


                          <div className="text-blue-600">

                            ▶ 播放

                          </div>


                        </div>


                      </Link>

                    );

                  })}


                </div>


              </details>

            );

          })


        ) : (


          /* 普通课程 */

          <div className="grid gap-4">


            {course.lessons?.map((lesson) => {


              const isCurrent =

                String(lesson.lesson_id) === highlight;


              return (

                <Link

                  key={lesson.lesson_id}

                  id={`lesson-${lesson.lesson_id}`}

                  data-lesson-id={lesson.lesson_id}

                  href={`/course/${id}/lesson/${lesson.lesson_id}`}

                  className={`rounded-xl p-5 transition block ${
                    
                    isCurrent

                      ? "bg-blue-100 border-2 border-blue-500 shadow-sm"

                      : "bg-white hover:bg-blue-50"

                  }`}

                >


                  <div className="flex justify-between items-center">


                    <div>


                      <div className="text-gray-500 text-sm">

                        第 {lesson.lesson_id} 节

                      </div>


                      <div className="font-semibold mt-2">

                        {lesson.title}

                      </div>


                    </div>


                    <div className="text-blue-600">

                      ▶ 播放

                    </div>


                  </div>


                </Link>

              );

            })}


          </div>

        )}


      </div>


      {/* 自动滚动到上次学习的位置 */}

      {highlight && (

        <script

          dangerouslySetInnerHTML={{

            __html: `

              (function() {

                const highlightId = ${JSON.stringify(highlight)};


                function locateLesson() {

                  const target =

                    document.querySelector(

                      '[data-lesson-id="' +

                      highlightId +

                      '"]'

                    );


                  if (!target) {

                    setTimeout(locateLesson, 200);

                    return;

                  }


                  const details =

                    target.closest("details");


                  if (details) {

                    details.open = true;

                  }


                  setTimeout(function() {

                    target.scrollIntoView({

                      behavior: "smooth",

                      block: "center"

                    });

                  }, 100);

                }


                if (

                  document.readyState ===

                  "loading"

                ) {

                  document.addEventListener(

                    "DOMContentLoaded",

                    locateLesson

                  );

                } else {

                  locateLesson();

                }

              })();

            `

          }}

        />

      )}


    </div>

  );

}
