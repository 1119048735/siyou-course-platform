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

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">


      {
        showCourses.map((course)=>(


          <Link

            key={course.id}

            href={`/course/${course.id}`}

            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md"

          >


            {/* 课程封面 */}

            <div className="aspect-video w-full overflow-hidden bg-muted">


              {
                course.cover ? (

                  <img

                    src={course.cover}

                    alt={course.name}

                    className="h-full w-full object-cover"

                  />

                ) : (

                  <div className="flex h-full items-center justify-center">

                    <BookOpen className="h-10 w-10 text-muted-foreground" />

                  </div>

                )

              }


            </div>




            <div className="p-5">


              <div className="mb-4 flex items-start justify-between gap-3">


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



              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">


                <span className="text-sm text-muted-foreground">

                  共 {course.totalLessons} 小节

                </span>



                <span className="flex items-center gap-1 text-sm font-medium text-primary">

                  进入学习

                  <ArrowRight className="h-4 w-4" />

                </span>


              </div>


            </div>


          </Link>


        ))
      }


    </div>

  )

}
