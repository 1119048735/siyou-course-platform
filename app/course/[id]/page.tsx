import Link from "next/link"
import { getCourse } from "@/lib/courses"
import { notFound } from "next/navigation"
import { ArrowLeft, PlayCircle } from "lucide-react"


export default async function CoursePage({

  params

}: {

  params: {
    id: string
  }

}) {


  const course = getCourse(params.id)


  if (!course) {

    notFound()

  }



  return (

    <div className="min-h-screen bg-background px-6 py-10">

      <div className="mx-auto max-w-5xl">


        <Link

          href="/"

          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"

        >

          <ArrowLeft className="h-4 w-4" />

          返回课程中心

        </Link>



        <div className="mb-10">


          <h1 className="text-3xl font-bold">

            {course.name}

          </h1>


          <p className="mt-2 text-muted-foreground">

            {course.stage}

          </p>


          <p className="mt-2 text-sm text-muted-foreground">

            共 {course.totalLessons} 小节

          </p>


        </div>




        <div className="space-y-8">


          {
            course.chapters.map((chapter) => (

              <div

                key={chapter.id}

                className="rounded-xl border border-border bg-card p-6"

              >


                <h2 className="mb-5 text-xl font-semibold">

                  {chapter.name}

                </h2>



                <div className="space-y-3">


                  {
                    chapter.lessons.map((lesson) => (

                      <Link

                        key={lesson.number}

                        href={`/course/${course.id}/lesson/${lesson.number}`}

                        className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition hover:border-primary/50"

                      >


                        <div className="flex items-center gap-3">


                          <PlayCircle className="h-5 w-5 text-primary" />


                          <span>

                            第{lesson.number}节：

                            {lesson.title}

                          </span>


                        </div>



                        {
                          lesson.uploaded && (

                            <span className="text-xs text-green-500">

                              已上传

                            </span>

                          )
                        }



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
