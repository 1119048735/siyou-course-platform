"use client"


import Link from "next/link"

import {
  useEffect,
  useState
} from "react"

import {
  ChevronDown,
  ChevronRight,
  PlayCircle
} from "lucide-react"

import {
  getProgress
} from "@/lib/progress"




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
    useState<string | null>(null)



  const [currentLesson,setCurrentLesson] =
    useState<number | null>(null)






  useEffect(()=>{


    const progress =
      getProgress()



    const lastLesson =
      progress[courseId]?.lastLesson



    if(lastLesson){


      setCurrentLesson(
        lastLesson
      )



      const chapter =
        chapters.find(chapter=>

          chapter.lessons.some(

            lesson=>

              lesson.number === lastLesson

          )

        )



      if(chapter){


        setOpenChapter(
          chapter.id
        )


      }


    }else{


      // 没有学习记录，默认打开第一章

      if(chapters.length>0){

        setOpenChapter(
          chapters[0].id
        )

      }


    }



  },[
    courseId,
    chapters
  ])







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




            <button

              onClick={()=>toggleChapter(chapter.id)}

              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-accent"

            >



              <span className="font-semibold">

                {chapter.name}

              </span>





              {

                openChapter === chapter.id

                ?

                <ChevronDown className="h-5 w-5"/>

                :

                <ChevronRight className="h-5 w-5"/>


              }



            </button>








            {


              openChapter === chapter.id && (


                <div className="border-t">


                  {


                    chapter.lessons.map(lesson=>{



                      const isCurrent =

                        lesson.number === currentLesson





                      return (



                        <Link


                          key={lesson.number}


                          href={`/course/${courseId}/lesson/${lesson.number}`}


                          className={

                            `flex items-center gap-3 px-5 py-3 text-sm hover:bg-accent

                            ${

                              isCurrent

                              ?

                              "bg-primary/10 text-primary font-semibold"

                              :

                              ""

                            }`

                          }


                        >



                          <PlayCircle

                            className="h-4 w-4"

                          />



                          <span>


                            {

                              isCurrent

                              ?

                              "⭐ "

                              :

                              ""

                            }


                            第{lesson.number}节：

                            {lesson.title}


                          </span>




                        </Link>



                      )


                    })


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
