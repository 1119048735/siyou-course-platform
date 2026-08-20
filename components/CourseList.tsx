'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { courses } from '@/lib/courses'


export function CourseList() {

  const [userCourses, setUserCourses] = useState<string[] | "all">([])


  useEffect(() => {

    const user = localStorage.getItem("user")

    if(user){

      const data = JSON.parse(user)

      setUserCourses(
        data.courses || []
      )

    }

  }, [])



  const showCourses =

    userCourses === "all"

      ? courses

      :

      courses.filter(

        course =>

          Array.isArray(userCourses)

          &&

          userCourses.includes(course.id)

      )



  return (

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">


      {
        showCourses.map((course)=>(


          <Link

            key={course.id}

            href={`/course/${course.id}`}

            className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md"

          >


            {/* 课程封面 */}

            <div className="aspect-square w-full overflow-hidden bg-muted">


              {
                course.cover ? (

                  <img

                    src={course.cover}

                    alt={course.name}

                    className="h-full w-full object-contain"

                  />

                ) : (

                  <div className="flex h-full items-center justify-center">

                    <BookOpen className="h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />

                  </div>

                )

              }


            </div>



            {/* 课程信息 */}

            <div className="flex flex-1 flex-col p-3 sm:p-5">


              <div className="mb-2 flex min-h-6 items-start justify-between sm:mb-4">


                {
                  course.badge && (

                    <span className="max-w-full truncate rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary sm:px-2.5 sm:text-xs">

                      {course.badge}

                    </span>

                  )

                }


              </div>



              <h3 className="line-clamp-2 text-sm font-semibold leading-5 sm:text-base">

                {course.name}

              </h3>



              {
                course.stage && (

                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground sm:text-sm">

                    {course.stage}

                  </p>

                )

              }



              <div className="mt-auto pt-3 sm:pt-5">


                <div className="flex items-center justify-between gap-2 border-t border-border pt-3 sm:pt-4">


                  <span className="whitespace-nowrap text-[11px] text-muted-foreground sm:text-sm">

                    共 {course.totalLessons} 小节

                  </span>



                  <span className="flex items-center gap-0.5 whitespace-nowrap text-[11px] font-medium text-primary sm:gap-1 sm:text-sm">

                    <span className="hidden sm:inline">
                      进入学习
                    </span>

                    <span className="sm:hidden">
                      学习
                    </span>

                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

                  </span>


                </div>


              </div>


            </div>


          </Link>


        ))
      }


    </div>

  )

}
