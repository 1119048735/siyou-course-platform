// ============================================================
// 课程数据管理
// ============================================================
// 所有课程内容维护在 data/courses/ 目录
// 新增课程时：
// 1. 创建新的 json 文件
// 2. 在顶部 import
// 3. 加入 rawCourses
// ============================================================


import course001 from '@/data/courses/001.json'



// ============================================================
// JSON 数据结构
// ============================================================


type RawLesson = {

  lesson_id: number

  title: string

  video_file?: string

  video_url?: string

}



type RawCourse = {

  course_id: string

  course_name: string

  stage?: string

  badge?: string

  total_lessons?: number

  lessons: RawLesson[]

}



// ============================================================
// 所有课程列表
// ============================================================


const rawCourses: RawCourse[] = [

  course001 as RawCourse,

]



// ============================================================
// 页面使用的数据类型
// ============================================================


export type Lesson = {

  number: number

  title: string

  videoUrl: string

  uploaded: boolean

  videoFile?: string

}



export type Course = {

  id: string

  name: string

  stage: string

  badge?: string

  totalLessons: number

  lessons: Lesson[]

}



// ============================================================
// 数据转换
// ============================================================


function normalizeCourse(
  raw: RawCourse
): Course {


  return {


    id: raw.course_id,


    name: raw.course_name,


    stage: raw.stage ?? "",


    badge: raw.badge,


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
// 输出课程数据
// ============================================================


export const courses: Course[] =
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
