// ============================================================
// 课程数据管理
// ============================================================


import course001 from '@/data/courses/001.json'
import course002 from '@/data/courses/002.json'
import course003 from '@/data/courses/003.json'
import course004 from '@/data/courses/004.json'
import course005 from '@/data/courses/005.json'
import course006 from '@/data/courses/006.json'
import course007 from '@/data/courses/007.json'
import course008 from '@/data/courses/008.json'
import course009 from '@/data/courses/009.json'
import course010 from '@/data/courses/010.json'
import course011 from '@/data/courses/011.json'
import course012 from '@/data/courses/012.json'
import course013 from '@/data/courses/013.json'
import course014 from '@/data/courses/014.json'



// ============================================================
// JSON 数据结构
// ============================================================


type RawLesson = {

  lesson_id:number

  title:string

  video_file?:string

  video_url?:string

}



type RawCourse = {

  course_id:string

  course_name:string

  stage?:string

  badge?:string

  total_lessons?:number

  lessons:RawLesson[]

}



// ============================================================
// 所有课程
// ============================================================


const rawCourses:RawCourse[] = [

  course001 as RawCourse,

  course002 as RawCourse,

  course003 as RawCourse,

  course004 as RawCourse,

  course005 as RawCourse,

  course006 as RawCourse,

  course007 as RawCourse,

  course008 as RawCourse,

  course009 as RawCourse,

  course010 as RawCourse,

  course011 as RawCourse,

  course012 as RawCourse,

  course013 as RawCourse,

  course014 as RawCourse,

]



// ============================================================
// 页面课程类型
// ============================================================


export type Lesson = {

  number:number

  title:string

  videoUrl:string

  uploaded:boolean

  videoFile?:string

}



export type Course = {

  id:string

  name:string

  stage:string

  badge?:string

  totalLessons:number

  lessons:Lesson[]

}



// ============================================================
// 数据转换
// ============================================================


function normalizeCourse(
  raw:RawCourse
):Course {


  return {


    id:raw.course_id,


    name:raw.course_name,


    stage:raw.stage ?? "",


    badge:raw.badge,


    totalLessons:
      raw.total_lessons ??
      raw.lessons.length,



    lessons:

      raw.lessons.map(
        (lesson,index)=>{


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

      )


  }


}



// ============================================================
// 导出课程
// ============================================================


export const courses:Course[] =
  rawCourses.map(
    normalizeCourse
  )



// ============================================================
// 根据课程ID获取课程
// ============================================================


export function getCourse(
  id:string
):Course | undefined {


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
):number {


  return course.totalLessons

}
