'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { courses } from '@/lib/courses'


export function CourseList() {


  const [userCourses, setUserCourses] = useState<string[]>([])



  useEffect(() => {


    const user = localStorage.getItem("user")


    if(user){

      const data = JSON.parse(user)

      setUserCourses(
        data.courses || []
      )

    }


  }, [])



  const showCourses = courses.filter(
    course =>
      userCourses.includes(course.id)
  )



  return (

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">


      {
        showCourses.map((course)=>(


          <Link

            key={course.id}

            href={`/course/${course.id}`}

            className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"

          >


            <div className="mb-4 flex items-start justify-between gap-3">


              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">

                <BookOpen className="h-5 w-5" />

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




            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">


              <span className="text-sm text-muted-foreground">

                共 {course.totalLessons} 小节

              </span>



              <span className="flex items-center gap-1 text-sm font-medium text-primary">

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
