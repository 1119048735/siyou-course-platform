// ============================================================
// 课程数据管理
// ============================================================


import course001 from "@/data/courses/001.json"
import course002 from "@/data/courses/002.json"
import course003 from "@/data/courses/003.json"
import course004 from "@/data/courses/004.json"
import course005 from "@/data/courses/005.json"
import course006 from "@/data/courses/006.json"
import course007 from "@/data/courses/007.json"
import course008 from "@/data/courses/008.json"
import course009 from "@/data/courses/009.json"
import course010 from "@/data/courses/010.json"
import course011 from "@/data/courses/011.json"
import course012 from "@/data/courses/012.json"
import course013 from "@/data/courses/013.json"
import course014 from "@/data/courses/014.json"



// ============================================================
// 原始 JSON 类型
// ============================================================


type RawLesson = {

  lesson_id:number

  title:string

  video_file?:string

  video_url?:string

}



type RawChapter = {

  chapter_id:string

  chapter_name:string

  lessons:RawLesson[]

}



type RawCourse = {

  course_id:string

  course_name:string

  stage?:string

  badge?:string

  cover?:string

  total_lessons?:number

  lessons?:RawLesson[]

  chapters?:RawChapter[]

}



// ============================================================
// 所有课程数据
// ============================================================


const rawCourses:RawCourse[]=[

  course001,
  course002,
  course003,
  course004,
  course005,
  course006,
  course007,
  course008,
  course009,
  course010,
  course011,
  course012,
  course013,
  course014

]



// ============================================================
// 页面使用类型
// ============================================================


export type Lesson={

  number:number

  title:string

  videoUrl:string

  uploaded:boolean

  videoFile?:string

}



export type Chapter={

  id:string

  name:string

  lessons:Lesson[]

}



export type Course={

  id:string

  name:string

  stage:string

  badge?:string

  cover?:string

  totalLessons:number

  chapters:Chapter[]

}



// ============================================================
// Lesson 转换
// ============================================================


function normalizeLesson(

  lesson:RawLesson,

  index:number

):Lesson{


  const videoUrl =
    (lesson.video_url ?? "")
    .trim()



  return {

    number:index + 1,

    title:lesson.title,

    videoUrl,

    uploaded:
      videoUrl.length > 0,


    videoFile:
      lesson.video_file

  }


}




// ============================================================
// Course 转换
// ============================================================


function normalizeCourse(

  raw:RawCourse

):Course{


  let chapters:Chapter[]=[]



  // ----------------------------
  // 有章节结构
  // ----------------------------


  if(raw.chapters){


    chapters =

      raw.chapters.map(

        chapter=>({


          id:
            chapter.chapter_id,


          name:
            chapter.chapter_name,


          lessons:

            chapter.lessons.map(

              normalizeLesson

            )


        })

      )


  }



  // ----------------------------
  // 普通课程结构
  // ----------------------------


  else if(raw.lessons){


    chapters=[

      {


        id:"default",


        name:"课程目录",


        lessons:

          raw.lessons.map(

            normalizeLesson

          )


      }

    ]


  }




  return {


    id:

      raw.course_id,


    name:

      raw.course_name,


    stage:

      raw.stage ?? "",



    badge:

      raw.badge,



    cover:

      raw.cover,



    totalLessons:


      raw.total_lessons ??

      chapters.reduce(

        (sum,chapter)=>

          sum + chapter.lessons.length,

        0

      ),



    chapters


  }


}



// ============================================================
// 输出课程
// ============================================================


export const courses:Course[] =

  rawCourses.map(

    normalizeCourse

  )



// ============================================================
// 查询
// ============================================================


export function getCourse(

  id:string

){


  return courses.find(

    course =>

      course.id === id

  )


}



// ============================================================
// 获取课程数量
// ============================================================


export function getLessonCount(

  course:Course

){


  return course.totalLessons

}
