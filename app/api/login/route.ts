import { NextResponse } from "next/server"
import orders from "@/data/orders.json"


export async function POST(request: Request) {

  try {

    const { orderId } = await request.json()


    const user = orders.find(
      item =>
        item.orderId === orderId &&
        item.status === "active"
    )


    if (!user) {

      return NextResponse.json({
        success:false,
        message:"订单不存在"
      })

    }


    return NextResponse.json({

      success:true,

      user:{
        name:user.name,
        course:user.course,
        expire:user.expire
      }

    })


  } catch {


    return NextResponse.json({

      success:false,
      message:"服务器错误"

    })

  }

}
