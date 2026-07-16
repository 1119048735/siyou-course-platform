'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { courses } from '@/lib/courses'


export function CourseList() {

  const [userCourse, setUserCourse] = useState("")


  useEffect(() => {

    const user = localStorage.getItem("user")

    if (user) {

      const data = JSON.parse(user)

      setUserCourse(data.course)

    }

  }, [])



  const showCourses = courses.filter((course) => {


    if (userCourse === "all") {

      return true

    }


    if (
      userCourse === "math" &&
      course.id === "001"
    ) {

      return true

    }


    return false

  })



  return (

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">


      {
        showCourses.length === 0 && (

          <p className="text-sm text-muted-foreground">

            暂无可学习课程

          </p>

        )
      }



      {
        showCourses.map((course) => (

          <Link

            key={course.id}

            href={`/course/${course.id}`}

            className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"

          >

            <div className="mb-4 flex items-start justify-between">


              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">

                <BookOpen className="h-5 w-5" />

              </span>


              {
                course.badge && (

                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">

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


            <div className="mt-5 flex items-center justify-between border-t pt-4">


              <span className="text-sm text-muted-foreground">

                共 {course.lessons.length} 小节

              </span>


              <span className="flex items-center gap-1 text-sm text-primary">

                进入学习

                <ArrowRight className="h-4 w-4" />

              </span>


            </div>


          </Link>

        ))

      }


    </div>

  )

}
