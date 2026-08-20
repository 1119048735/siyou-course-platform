'use client'


import {

  useEffect,

  useState

} from "react"


import {

  useRouter

} from "next/navigation"





const DEVICE_KEY =
  "course_device_id"





// ============================================================
// 创建设备ID
// ============================================================

function createDeviceId() {


  if (

    typeof crypto !== "undefined"

    &&

    typeof crypto.randomUUID ===
      "function"

  ) {


    return crypto

      .randomUUID()

      .replace(
        /-/g,
        ""
      )

  }



  return (

    Date.now()
      .toString(36)

    +

    Math.random()
      .toString(36)
      .slice(2)

    +

    Math.random()
      .toString(36)
      .slice(2)

  )

}





// ============================================================
// 获取当前设备ID
// ============================================================

function getOrCreateDeviceId() {


  let deviceId =

    localStorage.getItem(

      DEVICE_KEY

    )



  if (!deviceId) {


    deviceId =
      createDeviceId()



    localStorage.setItem(

      DEVICE_KEY,

      deviceId

    )

  }



  return deviceId

}





// ============================================================
// 登录页面
// ============================================================

export default function LoginPage() {


  const router =
    useRouter()



  const [

    phone,

    setPhone

  ] =
    useState("")



  const [

    error,

    setError

  ] =
    useState("")



  const [

    loading,

    setLoading

  ] =
    useState(false)





  // ==========================================================
  // 页面打开时创建设备ID
  // ==========================================================

  useEffect(() => {


    getOrCreateDeviceId()


  }, [])





  // ==========================================================
  // 登录
  // ==========================================================

  async function handleLogin(

    e: React.FormEvent

  ) {


    e.preventDefault()



    if (loading) {

      return

    }



    setError("")



    const cleanPhone =

      phone

        .replace(
          /\s/g,
          ""
        )

        .trim()



    // ========================================================
    // 手机号检查
    // ========================================================

    if (!cleanPhone) {


      setError(

        "请输入手机号"

      )


      return

    }



    if (

      !/^1\d{10}$/.test(
        cleanPhone
      )

    ) {


      setError(

        "请输入正确的11位手机号"

      )


      return

    }



    // ========================================================
    // 请求登录接口
    // ========================================================

    try {


      setLoading(true)



      const deviceId =
        getOrCreateDeviceId()



      const res =
        await fetch(

          "/api/login",

          {

            method:
              "POST",


            headers: {

              "Content-Type":
                "application/json"

            },


            body:
              JSON.stringify({

                phone:
                  cleanPhone,

                deviceId

              })

          }

        )



      const data =
        await res.json()



      console.log(

        "登录返回数据:",

        data

      )



      // ======================================================
      // 登录成功
      // ======================================================

      if (
        data.success
      ) {


        localStorage.setItem(

          "course_login",

          "true"

        )



        localStorage.setItem(

          "user",

          JSON.stringify(
            data.user
          )

        )



        router.push("/")

        router.refresh()


      }


      // ======================================================
      // 登录失败
      // ======================================================

      else {


        setError(

          data.message

          ||

          "登录失败"

        )

      }


    } catch (error) {


      console.error(

        "登录请求失败：",

        error

      )



      setError(

        "网络异常，请稍后重试"

      )


    } finally {


      setLoading(false)

    }

  }





  // ==========================================================
  // 页面
  // ==========================================================

  return (


    <div

      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-background
        px-4
      "

    >



      <form

        onSubmit={
          handleLogin
        }

        className="
          w-full
          max-w-sm
          space-y-5
          rounded-xl
          border
          bg-background
          p-6
          shadow-sm
        "

      >



        {/* 标题 */}


        <div

          className="
            space-y-2
            text-center
          "

        >


          <h1

            className="
              text-xl
              font-bold
            "

          >

            思维提升幼小衔接营

          </h1>




          <p

            className="
              text-sm
              text-muted-foreground
            "

          >

            请输入购买课程时登记的手机号

          </p>


        </div>




        {/* 手机号输入框 */}


        <input

          type="tel"

          inputMode="numeric"

          autoComplete="tel"

          maxLength={11}


          value={
            phone
          }


          onChange={

            e => {


              const value =

                e.target.value

                  .replace(
                    /\D/g,
                    ""
                  )



              setPhone(
                value
              )


              setError("")

            }

          }


          placeholder="
          请输入11位手机号
          "


          className="
            w-full
            rounded-md
            border
            px-3
            py-3
            text-base
            outline-none
            transition
            focus:border-black
          "

        />




        {/* 错误提示 */}


        {

          error && (


            <div

              className="
                rounded-md
                bg-red-50
                px-3
                py-2
                text-sm
                leading-6
                text-red-600
              "

            >

              {error}

            </div>


          )

        }




        {/* 登录按钮 */}


        <button

          type="submit"


          disabled={
            loading
          }


          className="
            w-full
            rounded-md
            bg-black
            py-3
            text-white
            transition
            disabled:cursor-not-allowed
            disabled:opacity-60
          "

        >


          {

            loading

              ?

              "正在登录..."

              :

              "登录学习"

          }


        </button>




        {/* 设备提示 */}


        <div

          className="
            text-center
            text-xs
            leading-5
            text-muted-foreground
          "

        >

          每个学习账号最多支持3台设备使用

        </div>



      </form>


    </div>

  )

}
