import { NextResponse } from "next/server"
import { execFileSync } from "child_process"


export const runtime = "nodejs"
export const dynamic = "force-dynamic"


const DB_PATH =
  "/var/lib/siyou-course-platform/devices.db"


// ============================================================
// SQL安全处理
// ============================================================

function escapeSql(
  value: string
) {

  return value.replace(
    /'/g,
    "''"
  )

}


// ============================================================
// 执行SQLite
// ============================================================

function runSql(
  sql: string
) {

  return execFileSync(

    "sqlite3",

    [
      DB_PATH,
      sql
    ],

    {
      encoding: "utf-8"
    }

  ).trim()

}


// ============================================================
// 登录接口
// ============================================================

export async function POST(
  request: Request
) {

  try {


    const body =
      await request.json()



    const phone =
      String(
        body.phone || ""
      )
        .replace(/\s/g, "")
        .trim()



    const deviceId =
      String(
        body.deviceId || ""
      )
        .trim()



    // ========================================================
    // 手机号检查
    // ========================================================

    if (!phone) {

      return NextResponse.json({

        success: false,

        message:
          "请输入手机号"

      })

    }



    if (
      !/^1\d{10}$/.test(phone)
    ) {

      return NextResponse.json({

        success: false,

        message:
          "请输入正确的11位手机号"

      })

    }



    // ========================================================
    // 设备ID检查
    // ========================================================

    if (!deviceId) {

      return NextResponse.json({

        success: false,

        message:
          "设备识别失败，请刷新页面后重试"

      })

    }



    if (
      !/^[a-zA-Z0-9_-]{10,100}$/.test(
        deviceId
      )
    ) {

      return NextResponse.json({

        success: false,

        message:
          "设备信息异常，请刷新页面后重试"

      })

    }



    const safePhone =
      escapeSql(phone)



    const safeDeviceId =
      escapeSql(deviceId)



    // ========================================================
    // 查询手机号白名单
    // ========================================================

    const userExists =
      runSql(`

        SELECT COUNT(*)

        FROM users

        WHERE phone = '${safePhone}';

      `)



    if (
      Number(userExists) === 0
    ) {

      return NextResponse.json({

        success: false,

        message:
          "未找到学习账号，请确认输入的是购买课程时登记的手机号"

      })

    }



    // ========================================================
    // 设备绑定
    // ========================================================
    //
    // 规则：
    //
    // 已经绑定过当前设备
    // → 正常登录
    //
    // 新设备 + 当前少于3台
    // → 自动绑定
    //
    // 新设备 + 已经3台
    // → 拒绝登录
    //
    // BEGIN IMMEDIATE 防止多设备同时操作导致超过3台
    //
    // ========================================================

    const deviceResult =
      runSql(`

        BEGIN IMMEDIATE;


        UPDATE devices

        SET
          last_login =
            CURRENT_TIMESTAMP

        WHERE
          phone = '${safePhone}'

          AND

          device_id =
            '${safeDeviceId}';



        INSERT INTO devices (

          phone,

          device_id

        )

        SELECT

          '${safePhone}',

          '${safeDeviceId}'

        WHERE

          NOT EXISTS (

            SELECT 1

            FROM devices

            WHERE
              phone =
                '${safePhone}'

              AND

              device_id =
                '${safeDeviceId}'

          )

          AND

          (

            SELECT COUNT(*)

            FROM devices

            WHERE
              phone =
                '${safePhone}'

          ) < 3;



        SELECT

          CASE

            WHEN EXISTS (

              SELECT 1

              FROM devices

              WHERE
                phone =
                  '${safePhone}'

                AND

                device_id =
                  '${safeDeviceId}'

            )

            THEN 'OK'

            ELSE 'LIMIT'

          END;


        COMMIT;

      `)



    const resultLines =
      deviceResult
        .split("\n")
        .map(
          item =>
            item.trim()
        )
        .filter(Boolean)



    const status =
      resultLines[
        resultLines.length - 1
      ]



    // ========================================================
    // 已超过3台
    // ========================================================

    if (
      status !== "OK"
    ) {

      return NextResponse.json({

        success: false,

        code:
          "DEVICE_LIMIT",

        message:
          "该账号已绑定3台设备，如需更换设备，请联系客服处理"

      })

    }



    // ========================================================
    // 查询当前绑定数量
    // ========================================================

    const deviceCount =
      Number(

        runSql(`

          SELECT COUNT(*)

          FROM devices

          WHERE
            phone =
              '${safePhone}';

        `)

      ) || 0



    // ========================================================
    // 登录成功
    // ========================================================

    return NextResponse.json({

      success: true,


      user: {

        name:
          "用户",

        phone,

        courses:
          "all",

        expire:
          "永久",

        deviceCount

      }

    })


  } catch (error) {


    console.error(

      "登录接口错误：",

      error

    )



    return NextResponse.json({

      success: false,

      message:
        "服务器错误，请稍后重试"

    })

  }

}
