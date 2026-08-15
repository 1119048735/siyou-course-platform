import Link from "next/link"
import { getCourse } from "@/lib/courses"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import ChapterList from "@/components/ChapterList"



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








        {/* 折叠章节目录 */}


        <ChapterList

          courseId={course.id}

          chapters={course.chapters}

        />





      </div>


    </div>


  )

}
