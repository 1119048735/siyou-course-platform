import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { getCourse } from "@/lib/courses"
import ProgressRecorder from "@/components/ProgressRecorder"



export default async function LessonPage({

  params,

}: {

  params: Promise<{
    id: string
    lessonId: string
  }>

}) {


  const { id, lessonId } = await params



  const course = getCourse(id)



  if (!course) {

    notFound()

  }



  const lessonNumber = Number(lessonId)



  // =====================================================
  // 展开全部课程
  // 支持章节结构
  // =====================================================


  const allLessons =
    course.chapters.flatMap(
      chapter => chapter.lessons
    )



  const currentIndex =
    allLessons.findIndex(

      lesson =>
        lesson.number === lessonNumber

    )



  if (currentIndex === -1) {

    notFound()

  }



  const currentLesson =
    allLessons[currentIndex]



  const previousLesson =
    allLessons[currentIndex - 1]



  const nextLesson =
    allLessons[currentIndex + 1]





  return (

    <>


      {/* 自动记录学习进度 */}

      <ProgressRecorder

        courseId={course.id}

        lessonNumber={currentLesson.number}

      />




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








          {/* 视频播放器 */}


          <div className="mt-8 aspect-video overflow-hidden rounded-xl border bg-black flex items-center justify-center">


            {


              currentLesson.videoUrl ? (


                <video

                  src={currentLesson.videoUrl}

                  controls

                  playsInline

                  className="h-full w-full"

                />


              ) : (


                <div className="text-center text-white">


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









          {/* 上一节 下一节 */}


          <div className="mt-6 flex justify-between">





            {


              previousLesson ? (


                <Link


                  href={`/course/${course.id}/lesson/${previousLesson.number}`}


                  className="flex items-center gap-2 rounded-lg border px-5 py-3 text-sm hover:bg-accent"


                >


                  <ChevronLeft className="h-4 w-4"/>

                  上一节


                </Link>


              ) : (


                <div />


              )


            }





            {


              nextLesson ? (


                <Link


                  href={`/course/${course.id}/lesson/${nextLesson.number}`}


                  className="flex items-center gap-2 rounded-lg border px-5 py-3 text-sm hover:bg-accent"


                >


                  下一节


                  <ChevronRight className="h-4 w-4"/>


                </Link>


              ) : null


            }



          </div>









          {/* 课程信息 */}


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


                  视频文件：

                  {currentLesson.videoFile}


                </p>


              )


            }



          </div>





        </div>


      </div>


    </>

  )

}
