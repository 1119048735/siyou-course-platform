'use client'


import Link from 'next/link'
import {
  ArrowRight,
  BookOpen
} from 'lucide-react'

import {
  useEffect,
  useState
} from 'react'

import {
  courses
} from '@/lib/courses'

import {
  getProgress
} from '@/lib/progress'





export function CourseList() {



  const [userCourses, setUserCourses] =
    useState<string[]>([])



  const [progress, setProgress] =
    useState<any>({})





  useEffect(()=>{


    const user =
      localStorage.getItem("user")



    if(user){


      const data =
        JSON.parse(user)



      setUserCourses(

        data.courses || []

      )


    }





    setProgress(

      getProgress()

    )



  },[])








  const showCourses =
    courses.filter(

      course =>

        userCourses.includes(
          course.id
        )

    )









  return (


    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">



      {


        showCourses.map(

          (course)=>(



          <Link


            key={course.id}


            href={`/course/${course.id}`}


            className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"



          >





            <div className="mb-4 flex items-start justify-between gap-3">



              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">


                <BookOpen className="h-5 w-5"/>


              </span>





              {


                course.badge && (


                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">


                    {course.badge}


                  </span>


                )


              }



            </div>









            <h3 className="text-base font-semibold">


              {course.name}


            </h3>





            <p className="mt-1 text-sm text-muted-foreground">


              {course.stage}


            </p>







            {


              progress[course.id] && (



                <div className="mt-4">


                  <div className="flex justify-between text-xs text-muted-foreground">


                    <span>


                      已学习：

                      {progress[course.id].lastLesson}

                      /

                      {course.totalLessons}

                      节


                    </span>



                    <span>


                      {


                        Math.round(

                          progress[course.id].lastLesson

                          /

                          course.totalLessons

                          *

                          100

                        )

                      }

                      %


                    </span>



                  </div>





                  <div className="mt-2 h-2 rounded-full bg-muted">


                    <div


                      className="h-2 rounded-full bg-primary"


                      style={{

                        width:

                        `${Math.round(

                          progress[course.id].lastLesson

                          /

                          course.totalLessons

                          *

                          100

                        )}%`

                      }}


                    />



                  </div>



                </div>


              )


            }










            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">



              <span className="text-sm text-muted-foreground">


                共 {course.totalLessons} 小节


              </span>





              <span className="flex items-center gap-1 text-sm font-medium text-primary">


                {


                  progress[course.id]

                  ?

                  "继续学习"

                  :

                  "开始学习"


                }



                <ArrowRight className="h-4 w-4"/>


              </span>



            </div>






          </Link>



          )


        )


      }



    </div>


  )


}
