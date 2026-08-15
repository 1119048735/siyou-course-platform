"use client"


import Link from "next/link"
import {
  useState
} from "react"

import {
  ChevronDown,
  ChevronRight,
  PlayCircle
} from "lucide-react"



type Lesson = {

  number:number

  title:string

}



type Chapter = {

  id:string

  name:string

  lessons:Lesson[]

}



type Props = {

  courseId:string

  chapters:Chapter[]

}




export default function ChapterList({

  courseId,

  chapters

}:Props){



  const [openChapter,setOpenChapter] =
    useState<string | null>(

      chapters.length > 0

      ?

      chapters[0].id

      :

      null

    )





  function toggleChapter(id:string){


    setOpenChapter(

      openChapter === id

      ?

      null

      :

      id

    )


  }







  return (


    <div className="mt-8 space-y-4">



      {


        chapters.map(chapter=>(



          <div

            key={chapter.id}

            className="rounded-xl border bg-card overflow-hidden"


          >




            {/* 章节标题 */}


            <button

              onClick={()=>toggleChapter(chapter.id)}

              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-accent"


            >



              <span className="font-semibold">


                {chapter.name}


              </span>





              {


                openChapter === chapter.id ? (


                  <ChevronDown className="h-5 w-5"/>


                ):(


                  <ChevronRight className="h-5 w-5"/>


                )


              }



            </button>







            {/* 章节内容 */}


            {


              openChapter === chapter.id && (



                <div className="border-t">


                  {


                    chapter.lessons.map(lesson=>(



                      <Link

                        key={lesson.number}

                        href={`/course/${courseId}/lesson/${lesson.number}`}


                        className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-accent"


                      >


                        <PlayCircle

                          className="h-4 w-4 text-primary"

                        />



                        <span>


                          第{lesson.number}节：

                          {lesson.title}


                        </span>



                      </Link>



                    ))


                  }


                </div>



              )


            }




          </div>



        ))


      }



    </div>


  )


}
