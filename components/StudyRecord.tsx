"use client";

import { useEffect } from "react";


interface Props {

  courseId:string;

  lessonId:number;

}


export default function StudyRecord({

  courseId,

  lessonId

}:Props){



  useEffect(()=>{


    const record = JSON.parse(

      localStorage.getItem("study_record") || "{}"

    );



    record[courseId] = lessonId;



    localStorage.setItem(

      "study_record",

      JSON.stringify(record)

    );



  },[courseId,lessonId]);




  return null;

}
