import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getCourse } from "@/lib/courses"



export default async function LessonPage({

  params,

}: {

  params: Promise<{
    id:string
    lessonId:string
  }>

}) {


  const { id, lessonId } = await params



  const course = getCourse(id)



  if(!course){

    notFound()

  }



  const lessonNumber = Number(lessonId)



  let currentLesson = null



  for(const chapter of course.chapters){

    const lesson = chapter.lessons.find(
      item =>
        item.number === lessonNumber
    )


    if(lesson){

      currentLesson = lesson

      break

    }

  }



  if(!currentLesson){

    notFound()

  }



  return (

    <div className="min-h-screen bg-background px-6 py-10">


      <div className="mx-auto max-w-5xl">


        <Link

          href={`/course/${course.id}`}

          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"

        >

          <ArrowLeft className="h-4 w-4"/>

          返回课程目录

        </Link>




        <h1 className="text-2xl font-bold">

          {course.name}

        </h1>



        <h2 className="mt-3 text-lg">

          第{currentLesson.number}节：

          {currentLesson.title}

        </h2>





        <div className="mt-8 overflow-hidden rounded-xl border bg-black aspect-video flex items-center justify-center">


          {

            currentLesson.videoUrl ? (


              <video

                src={currentLesson.videoUrl}

                controls

                className="h-full w-full"

              />


            ) : (


              <div className="text-white text-center">


                <p className="text-lg">

                  视频暂未上传

                </p>


                <p className="mt-2 text-sm text-gray-400">

                  老师正在更新中

                </p>


              </div>


            )


          }


        </div>




        <div className="mt-8 rounded-xl border p-5">


          <h3 className="font-semibold">

            课程信息

          </h3>


          <p className="mt-2 text-sm text-muted-foreground">

            {course.stage}

          </p>


          {

            currentLesson.videoFile && (

              <p className="mt-2 text-sm text-muted-foreground">

                文件：

                {currentLesson.videoFile}

              </p>

            )

          }


        </div>



      </div>


    </div>

  )

}
