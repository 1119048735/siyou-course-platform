'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()

  const [orderId, setOrderId] = useState('')


  function handleLogin(e: React.FormEvent){

    e.preventDefault()


    if(orderId === "DY202607150001"){

      localStorage.setItem(
        "course_login",
        "true"
      )

      router.push("/")

    }else{

      alert("订单编号不存在")

    }

  }


  return (

    <div className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4"
      >

        <h1 className="text-xl font-bold">
          思维提升幼小衔接营
        </h1>


        <input

          value={orderId}

          onChange={
            e=>setOrderId(e.target.value)
          }

          placeholder="请输入订单编号"

          className="w-full border p-2"

        />


        <button
          className="w-full bg-black p-2 text-white"
        >
          登录
        </button>


      </form>

    </div>

  )

}
