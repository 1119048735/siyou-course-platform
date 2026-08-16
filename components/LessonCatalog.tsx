"use client";

import Link from "next/link";


interface Lesson {

  lesson_id:number;

  title:string;

}


interface Chapter {

  chapter_id:string;

  chapter_name:string;

  lessons:Lesson[];

}


interface LessonCatalogProps {

  courseId:string;

  currentLessonId:number;

  lessons?:Lesson[];

  chapters?:Chapter[];

}



export function LessonCatalog({

  courseId,

  currentLessonId,

  lessons,

  chapters

}:LessonCatalogProps){



  return (

    <div className="mt-8 bg-white rounded-xl p-5 shadow-sm">


      <h3 className="text-xl font-bold mb-5">

        课程目录

      </h3>




      {

        chapters && chapters.length > 0 ? (



          <div className="space-y-6">


            {


              chapters.map(chapter=>(


                <div key={chapter.chapter_id}>


                  <div className="font-bold text-blue-700 mb-3">

                    {chapter.chapter_name}

                  </div>




                  <div className="space-y-2">


                    {


                      chapter.lessons.map(lesson=>(


                        <Link

                          key={lesson.lesson_id}

                          href={`/course/${courseId}/lesson/${lesson.lesson_id}`}

                          className={`

                          block

                          rounded-lg

                          p-3

                          transition

                          ${

                            lesson.lesson_id===currentLessonId

                            ?

                            "bg-blue-100 border border-blue-500"

                            :

                            "bg-gray-50 hover:bg-blue-50"

                          }

                          `}

                        >



                          <div className="flex justify-between">


                            <span>

                              第 {lesson.lesson_id} 节：

                              {lesson.title}

                            </span>



                            {

                              lesson.lesson_id===currentLessonId && (

                                <span className="text-blue-600 text-sm">

                                  正在学习

                                </span>

                              )

                            }


                          </div>



                        </Link>


                      ))

                    }


                  </div>


                </div>


              ))

            }


          </div>



        ) : (



          <div className="space-y-2">


            {

              lessons?.map(lesson=>(


                <Link

                  key={lesson.lesson_id}

                  href={`/course/${courseId}/lesson/${lesson.lesson_id}`}

                  className={`

                  block

                  rounded-lg

                  p-3

                  transition

                  ${

                    lesson.lesson_id===currentLessonId

                    ?

                    "bg-blue-100 border border-blue-500"

                    :

                    "bg-gray-50 hover:bg-blue-50"

                  }

                  `}

                >



                  <div className="flex justify-between">


                    <span>

                      第 {lesson.lesson_id} 节：

                      {lesson.title}

                    </span>



                    {

                      lesson.lesson_id===currentLessonId && (

                        <span className="text-blue-600 text-sm">

                          正在学习

                        </span>

                      )

                    }


                  </div>



                </Link>


              ))

            }


          </div>



        )


      }



    </div>

  );


}
