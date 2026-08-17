"use client";

import Link from "next/link";

import {
  ArrowRight,
  BookOpen
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  courses
} from "@/lib/courses";



type StudyRecord = Record<string, number>;



export function CourseList() {


  const [studyRecord, setStudyRecord] =

    useState<StudyRecord>({});



  useEffect(() => {


    function loadStudyRecord() {


      try {


        const saved =

          localStorage.getItem(

            "study_record"

          );



        if (!saved) {

          setStudyRecord({});

          return;

        }



        const record =

          JSON.parse(saved);



        setStudyRecord(record);


      } catch (error) {


        console.error(

          "读取学习记录失败:",

          error

        );


        setStudyRecord({});


      }


    }



    loadStudyRecord();



    // 当浏览器标签页重新获得焦点时重新读取

    window.addEventListener(

      "focus",

      loadStudyRecord

    );



    return () => {


      window.removeEventListener(

        "focus",

        loadStudyRecord

      );


    };


  }, []);





  return (

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">


      {

        courses.map(course => {


          const lastLesson =

            studyRecord[String(course.id)] || 0;



          const progressPercent =

            lastLesson > 0

              ? Math.min(

                  Math.round(

                    lastLesson /

                    course.totalLessons *

                    100

                  ),

                  100

                )

              : 0;



          const jumpUrl =

            lastLesson > 0

              ? `/course/${course.id}?highlight=${lastLesson}`

              : `/course/${course.id}`;



          return (


            <Link


              key={course.id}


              href={jumpUrl}


              className="
                group
                overflow-hidden
                rounded-xl
                border
                bg-card
                transition
                hover:border-primary/40
                hover:shadow-md
              "


            >


              {/* 封面 */}

              <div

                className="
                  aspect-square
                  overflow-hidden
                  bg-muted
                "

              >


                {

                  course.cover ? (


                    <img

                      src={course.cover}

                      alt={course.name}

                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "

                    />


                  ) : (


                    <div

                      className="
                        flex
                        h-full
                        items-center
                        justify-center
                      "

                    >

                      <BookOpen

                        className="
                          h-10
                          w-10
                          text-primary
                        "

                      />

                    </div>


                  )

                }


              </div>




              {/* 课程信息 */}

              <div className="p-3">


                <div

                  className="
                    mb-2
                    flex
                    items-start
                    justify-between
                    gap-2
                  "

                >


                  <h3

                    className="
                      text-sm
                      font-semibold
                      leading-5
                      line-clamp-2
                    "

                  >

                    {course.name}

                  </h3>



                  {

                    course.badge && (


                      <span

                        className="
                          shrink-0
                          rounded-full
                          bg-primary/10
                          px-2
                          py-1
                          text-[10px]
                          text-primary
                        "

                      >

                        {course.badge}

                      </span>


                    )

                  }


                </div>




                <p

                  className="
                    text-xs
                    text-muted-foreground
                  "

                >

                  {course.stage}

                </p>




                {

                  lastLesson > 0 && (


                    <div className="mt-3">


                      <div

                        className="
                          flex
                          justify-between
                          text-[11px]
                          text-muted-foreground
                        "

                      >

                        <span>

                          {lastLesson}/

                          {course.totalLessons}

                          节

                        </span>


                        <span>

                          {progressPercent}%

                        </span>


                      </div>




                      <div

                        className="
                          mt-1
                          h-1.5
                          rounded-full
                          bg-muted
                        "

                      >

                        <div

                          className="
                            h-1.5
                            rounded-full
                            bg-primary
                          "

                          style={{

                            width:

                              `${progressPercent}%`

                          }}

                        />

                      </div>


                    </div>


                  )

                }




                <div

                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    border-t
                    pt-3
                  "

                >


                  <span

                    className="
                      text-xs
                      text-muted-foreground
                    "

                  >

                    共{course.totalLessons}节

                  </span>




                  <span

                    className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-medium
                      text-primary
                    "

                  >

                    {

                      lastLesson > 0

                        ? "继续"

                        : "开始"

                    }


                    <ArrowRight

                      className="h-3 w-3"

                    />

                  </span>


                </div>


              </div>


            </Link>

          );


        })

      }


    </div>

  );

}
