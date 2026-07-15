import { NextResponse } from "next/server"
import orders from "@/data/orders.json"


export async function POST(request: Request) {

  try {

    const { orderId } = await request.json()


    if (!orderId) {

      return NextResponse.json({
        success: false,
        message: "请输入订单编号"
      })

    }


    const result = orders.find(
      (item) =>
        item.orderId === orderId &&
        item.status === "active"
    )


    if (result) {

      return NextResponse.json({
        success: true,
        course: result.course
      })

    }


    return NextResponse.json({
      success: false,
      message: "订单编号不存在"
    })


  } catch (error) {


    return NextResponse.json({
      success: false,
      message: "服务器错误"
    })


  }

}
