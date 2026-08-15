// ============================================================
// 学习进度管理
// ============================================================


export type Progress = {

  [courseId:string]: {

    lastLesson:number

  }

}



// 获取学习记录

export function getProgress(){

  if(typeof window === "undefined"){

    return {}

  }


  const data =
    localStorage.getItem(
      "course_progress"
    )


  if(!data){

    return {}

  }


  return JSON.parse(data)

}




// 保存学习进度

export function saveProgress(

  courseId:string,

  lesson:number

){


  const progress =
    getProgress()



  progress[courseId]={

    lastLesson:lesson

  }



  localStorage.setItem(

    "course_progress",

    JSON.stringify(progress)

  )


}
