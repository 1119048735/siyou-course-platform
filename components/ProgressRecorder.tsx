"use client"


import { useEffect } from "react"
import { saveProgress } from "@/lib/progress"



type Props = {

  courseId:string

  lessonNumber:number

}




export default function ProgressRecorder({

  courseId,

  lessonNumber

}:Props){



  useEffect(()=>{


    saveProgress(

      courseId,

      lessonNumber

    )


  },[
    courseId,
    lessonNumber
  ])



  return null


}
