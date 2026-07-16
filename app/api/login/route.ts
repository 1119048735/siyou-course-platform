import { NextResponse } from "next/server"
import orders from "@/data/orders.json"
import products from "@/data/products.json"


export async function POST(request: Request) {

  try {


    const { orderId } = await request.json()


    if (!orderId) {

      return NextResponse.json({
        success: false,
        message: "请输入订单编号"
      })

    }



    // 查找订单

    const order = orders.find(

      item =>
        item.orderId === orderId &&
        item.status === "active"

    )



    if (!order) {

      return NextResponse.json({

        success: false,

        message: "订单不存在"

      })

    }



    // 根据订单找到套餐

    const product = products.find(

      item =>
        item.productId === order.productId

    )



    if (!product) {


      return NextResponse.json({

        success:false,

        message:"购买套餐不存在"

      })


    }



    return NextResponse.json({


      success:true,


      user:{


        name: order.name,


        product: product.name,


        courses: product.courses,


        expire: order.expire


      }


    })



  } catch(error) {


    return NextResponse.json({

      success:false,

      message:"服务器错误"

    })


  }

}
