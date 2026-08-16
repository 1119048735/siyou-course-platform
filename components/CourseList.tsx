"use client"


import Link from "next/link"

import {
  ArrowRight,
  BookOpen
} from "lucide-react"

import {
  useEffect,
  useState
} from "react"

import {
  courses
} from "@/lib/courses"

import {
  getProgress
} from "@/lib/progress"





export function CourseList(){



  const [progress,setProgress] =

    useState<any>({})





  useEffect(()=>{


    setProgress(

      getProgress()

    )


  },[])








  return (



    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">





      {

        courses.map(course=>{



          const courseProgress =

            progress[course.id]



          const lastLesson =

            courseProgress?.lastLesson





          const progressPercent =


            lastLesson


            ?


            Math.round(

              lastLesson /

              course.totalLessons *

              100

            )


            :


            0





          // 修改这里：
          // 继续学习进入课程目录，并定位当前节

          const jumpUrl =


            lastLesson


            ?


            `/course/${course.id}?highlight=${lastLesson}`


            :


            `/course/${course.id}`







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


                  lastLesson && (



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


                      lastLesson

                      ?

                      "继续"

                      :

                      "开始"


                    }


                    <ArrowRight

                      className="h-3 w-3"

                    />


                  </span>




                </div>






              </div>







            </Link>



          )



        })


      }






    </div>



  )



}
