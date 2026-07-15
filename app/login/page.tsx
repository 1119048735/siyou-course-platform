import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/40">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              思维提升幼小衔接营
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              儿童综合能力培养线上课程平台
            </p>
          </div>

          {/* Form card */}
          <form className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="account"
                  className="text-sm font-medium text-foreground"
                >
                  账号
                </label>
                <input
                  id="account"
                  name="account"
                  type="text"
                  autoComplete="username"
                  placeholder="请输入账号"
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="请输入密码"
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                登录
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">
              返回首页
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
