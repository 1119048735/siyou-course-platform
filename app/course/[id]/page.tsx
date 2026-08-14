import Link from "next/link"
import { getCourse } from "@/lib/courses"
import { notFound } from "next/navigation"
import { ArrowLeft, PlayCircle } from "lucide-react"


export default async function CoursePage({

  params,

}: {

  params: Promise<{
    id:string
  }>

}) {


  const { id } = await params


  const course = getCourse(id)


  if(!course){

    notFound()

  }



  return (

    <div className="min-h-screen bg-background px-6 py-10">

      <div className="mx-auto max-w-5xl">


        <Link

          href="/"

          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"

        >

          <ArrowLeft className="h-4 w-4"/>

          返回课程中心

        </Link>



        <h1 className="text-3xl font-bold">

          {course.name}

        </h1>


        <p className="mt-2 text-muted-foreground">

          {course.stage}

        </p>


        <p className="mt-2 text-sm text-muted-foreground">

          共 {course.totalLessons} 小节

        </p>




        <div className="mt-10 space-y-8">


          {

            course.chapters.map((chapter)=>(


              <div

                key={chapter.id}

                className="rounded-xl border p-6"

              >


                <h2 className="mb-5 text-xl font-semibold">

                  {chapter.name}

                </h2>



                <div className="space-y-3">


                  {

                    chapter.lessons.map((lesson)=>(


                      <Link

                        key={lesson.number}

                        href={`/course/${course.id}/lesson/${lesson.number}`}

                        className="flex items-center justify-between rounded-lg border px-4 py-3 hover:border-primary"

                      >


                        <div className="flex items-center gap-3">


                          <PlayCircle className="h-5 w-5"/>


                          <span>

                            第{lesson.number}节：

                            {lesson.title}

                          </span>


                        </div>


                      </Link>


                    ))

                  }


                </div>


              </div>


            ))

          }


        </div>


      </div>


    </div>


  )

}
