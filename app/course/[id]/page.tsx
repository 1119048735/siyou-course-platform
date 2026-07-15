import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Play } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { getCourse } from '@/lib/courses'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = getCourse(id)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          返回全部课程
        </Link>

        {/* Course header */}
        <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {course.name}
            </h1>
            {course.badge ? (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {course.badge}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {course.stage} · 共 {course.lessons.length} 节
          </p>
        </div>

        {/* Lesson list */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">课程列表</h2>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {course.lessons.map((lesson, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-accent/40 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      第 {index + 1} 课
                    </p>
                    <p className="truncate text-sm font-medium text-foreground">
                      {lesson.title}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/course/${course.id}/lesson/${index}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">开始学习</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
