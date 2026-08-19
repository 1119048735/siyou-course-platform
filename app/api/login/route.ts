import { NextResponse } from "next/server"
import users from "@/data/users.json"


export async function POST(request: Request) {

  try {

    const { phone } = await request.json()


    if (!phone) {

      return NextResponse.json({
        success:false,
        message:"请输入手机号"
      })

    }


    const user = users.find(
      item => item.phone === phone
    )


    if (!user) {

      return NextResponse.json({
        success:false,
        message:"未找到学习账号"
      })

    }


    return NextResponse.json({

      success:true,

      user:{

        name:"用户",

        courses:"all",

        expire:"永久"

      }

    })


  } catch(error) {


    return NextResponse.json({

      success:false,

      message:"服务器错误"

    })

  }

}
