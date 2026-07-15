import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight, Video } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { CourseCatalog } from '@/components/course-catalog'
import { getCourse } from '@/lib/courses'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; index: string }>
}) {
  const { id, index } = await params
  const course = getCourse(id)
  const lessonIndex = Number(index)

  if (!course || Number.isNaN(lessonIndex) || !course.lessons[lessonIndex]) {
    notFound()
  }

  const lesson = course.lessons[lessonIndex]
  const hasPrev = lessonIndex > 0
  const hasNext = lessonIndex < course.lessons.length - 1

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href={`/course/${course.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          返回课程列表
        </Link>

        {/* 顶部：课程名称 + 章节名称 */}
        <div className="mt-6">
          <p className="text-sm font-medium text-primary">{course.name}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            第 {lesson.number} 节 {lesson.title}
          </h1>
        </div>

        {/* 中间：视频播放器（页面核心，根据章节数据加载对应视频） */}
        {lesson.uploaded && lesson.videoUrl ? (
          <>
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-foreground">
              <video
                key={lesson.videoUrl}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-foreground"
                poster="/course-video-poster.png"
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              当前为演示视频，正式内容将通过腾讯云点播提供。
            </p>
          </>
        ) : (
          <div className="mt-6 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-secondary/40 text-center">
            <Video className="h-10 w-10 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                视频暂未上传
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                视频上传后即可在此处播放。
              </p>
            </div>
          </div>
        )}

        {/* 视频下方：课程目录（可展开/收起，点击切换视频） */}
        <CourseCatalog
          courseId={course.id}
          courseName={course.name}
          lessonTitles={course.lessons.map((l) => l.title)}
          currentIndex={lessonIndex}
        />

        {/* 底部导航：上一节 / 下一节 */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {hasPrev ? (
            <Link
              href={`/course/${course.id}/lesson/${lessonIndex - 1}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
              上一节
            </Link>
          ) : (
            <span />
          )}
          {hasNext ? (
            <Link
              href={`/course/${course.id}/lesson/${lessonIndex + 1}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              下一节
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
    </div>
  )
}
