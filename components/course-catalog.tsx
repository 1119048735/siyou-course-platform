'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ChevronDown, Circle, PlayCircle } from 'lucide-react'

type CourseCatalogProps = {
  courseId: string
  courseName: string
  lessonTitles: string[]
  currentIndex: number
}

export function CourseCatalog({
  courseId,
  courseName,
  lessonTitles,
  currentIndex,
}: CourseCatalogProps) {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-accent"
      >
        <span className="min-w-0">
          <span className="block text-base font-semibold text-foreground">
            课程目录
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {courseName} · 共 {lessonTitles.length} 节
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-muted-foreground transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul className="max-h-96 overflow-y-auto border-t border-border">
          {lessonTitles.map((title, i) => {
            const isCurrent = i === currentIndex
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/course/${courseId}/lesson/${i}`)
                  }
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${
                    isCurrent
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {isCurrent ? (
                    <PlayCircle className="h-4 w-4 flex-none text-primary" />
                  ) : i < currentIndex ? (
                    <CheckCircle2 className="h-4 w-4 flex-none text-muted-foreground" />
                  ) : (
                    <Circle className="h-4 w-4 flex-none text-muted-foreground" />
                  )}
                  <span className="min-w-0 truncate">
                    第 {i + 1} 节 {title}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
