import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            思维提升幼小衔接营
          </span>
        </Link>
      </div>
    </header>
  )
}
