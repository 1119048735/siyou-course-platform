'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const login =
      localStorage.getItem("course_login")


    if (!login) {

      router.push("/login")

    } else {

      setLoading(false)

    }

  }, [router])


  if (loading) {

    return null

  }


  return children
}
