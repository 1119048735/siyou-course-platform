// ============================================================
// 课程数据管理结构
// ------------------------------------------------------------
// 课程内容以 JSON 文件形式维护在 data/courses/ 目录下，
// 页面代码不包含任何课程内容。
//
// 新增课程 / 章节的方法：
//   1. 在 data/courses/ 下新建一个 JSON 文件（可参考 001.json）；
//   2. 在下方 `rawCourses` 数组中 import 并加入即可。
// 无需改动任何页面代码。
//
// 每个章节的 video_url：
//   - 填写视频地址后即可在播放页播放；
//   - 留空字符串 "" 时，播放页会显示“视频暂未上传”。
// ============================================================

import course001 from '@/data/courses/001.json'

// ------------------------------------------------------------
// JSON 原始数据格式（对应 data/courses/*.json）
// ------------------------------------------------------------
type RawLesson = {
  lesson_id: number
  title: string
  video_file?: string
  video_url?: string
}

type RawCourse = {
  course_id: string
  course_name: string
  /** 课程阶段（可选） */
  stage?: string
  /** 角标文案，如 "26年更新中"（可选） */
  badge?: string
  total_lessons?: number
  lessons: RawLesson[]
}

/** 在此登记所有课程 JSON 文件。 */
const rawCourses: RawCourse[] = [course001 as RawCourse]

// ------------------------------------------------------------
// 页面使用的标准数据类型
// ------------------------------------------------------------

/** 单个章节 */
export type Lesson = {
  /** 节次编号，从 1 开始（按顺序自动生成） */
  number: number
  /** 章节名称 */
  title: string
  /** 视频地址，未上传时为空字符串 '' */
  videoUrl: string
  /** 是否已上传视频 */
  uploaded: boolean
  /** 视频文件名（备注用，可选） */
  videoFile?: string
}

/** 单套课程 */
export type Course = {
  /** 课程唯一标识（用于页面路由） */
  id: string
  /** 课程名称 */
  name: string
  /** 课程阶段 */
  stage: string
  /** 角标文案（可选） */
  badge?: string
  /** 章节列表 */
  lessons: Lesson[]
}

// ------------------------------------------------------------
// 将 JSON 原始数据规范化为页面使用的 Course 结构
// ------------------------------------------------------------
function normalizeCourse(raw: RawCourse): Course {
  return {
    id: raw.course_id,
    name: raw.course_name,
    stage: raw.stage ?? '',
    badge: raw.badge,
    lessons: raw.lessons.map((l, i) => {
      const videoUrl = (l.video_url ?? '').trim()
      return {
        number: i + 1,
        title: l.title,
        videoUrl,
        uploaded: videoUrl.length > 0,
        videoFile: l.video_file,
      }
    }),
  }
}

export const courses: Course[] = rawCourses.map(normalizeCourse)

// ------------------------------------------------------------
// 数据读取工具
// ------------------------------------------------------------

/** 根据课程 id 获取课程。 */
export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

/** 课程总节数。 */
export function getLessonCount(course: Course): number {
  return course.lessons.length
}
