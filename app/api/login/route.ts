import { NextResponse } from "next/server"
import orders from "@/data/orders.json"

export async function POST(request: Request) {

  const { orderId } = await request.json()

  const result = orders.find(
    item => item.orderId === orderId
  )


  if (result) {

    return NextResponse.json({
      success: true
    })

  }


  return NextResponse.json({
    success: false
  })

}
