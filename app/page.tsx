import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { AuthGuard } from '@/components/AuthGuard'
import { courses } from '@/lib/courses'
import { AuthGuard } from '@/components/AuthGuard'

export default function HomePage() {
return (
  <AuthGuard>
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Learning center header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            思维提升幼小衔接营
          </h1>
          <p className="mt-2 text-pretty text-base leading-relaxed text-muted-foreground">
            我的专属课程中心
          </p>
        </div>
      </section>

      {/* Courses */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            我的课程
          </h2>
          <span className="text-sm text-muted-foreground">
            共 {courses.length} 套
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <BookOpen className="h-5 w-5" />
                </span>
                {course.badge ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {course.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="text-base font-semibold text-foreground">
                {course.name}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {course.stage}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">
                  共 {course.lessons.length} 小节
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  进入学习
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          思维提升幼小衔接营 · 儿童综合能力培养线上课程平台
        </div>
      </footer>
       </div>
  </AuthGuard>
)
}
