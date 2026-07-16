import { SiteHeader } from '@/components/site-header'
import { AuthGuard } from '@/components/AuthGuard'
import { CourseList } from '@/components/CourseList'


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

              已购买课程

            </span>


          </div>



          {/* 根据用户权限显示课程 */}

          <CourseList />


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
