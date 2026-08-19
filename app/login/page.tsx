'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function LoginPage() {


  const router = useRouter()


  const [phone, setPhone] = useState("")

  const [error, setError] = useState("")



  async function handleLogin(
    e: React.FormEvent
  ) {


    e.preventDefault()


    setError("")



    const res = await fetch("/api/login", {


      method: "POST",


      headers: {

        "Content-Type": "application/json"

      },


      body: JSON.stringify({

        phone

      })


    })



    const data = await res.json()



    console.log("登录返回数据:", data)




    if(data.success){



      localStorage.setItem(

        "course_login",

        "true"

      )




      localStorage.setItem(

        "user",

        JSON.stringify(data.user)

      )




      router.push("/")



    }else{



      setError(

        data.message || "登录失败"

      )



    }


  }




  return (


    <div className="flex min-h-screen items-center justify-center bg-background px-4">



      <form

        onSubmit={handleLogin}

        className="w-full max-w-sm space-y-5 rounded-xl border p-6"

      >



        <h1 className="text-xl font-bold text-center">

          思维提升幼小衔接营

        </h1>




        <p className="text-center text-sm text-muted-foreground">

          请输入购买手机号

        </p>




        <input



          value={phone}



          onChange={

            e => setPhone(e.target.value)

          }



          placeholder="请输入手机号"



          className="w-full rounded-md border px-3 py-2"



        />





        {

          error &&

          <p className="text-sm text-red-500">

            {error}

          </p>

        }





        <button


          type="submit"


          className="w-full rounded-md bg-black py-2 text-white"


        >


          登录学习


        </button>




      </form>




    </div>


  )


}
