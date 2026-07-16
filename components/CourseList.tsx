'use client'

import { useEffect, useState } from 'react'
import { courses } from '@/lib/courses'


export function CourseList() {


  const [userCourse, setUserCourse] = useState("")


  useEffect(() => {

    const user = localStorage.getItem("user")


    if (user) {

      const data = JSON.parse(user)

      setUserCourse(data.course)

    }

  }, [])



  return (

    <div>


      <p>
        当前购买权限：
        {userCourse}
      </p>


      <hr />


      {
        courses.map((course)=>(

          <div key={course.id}>

            {course.name}

          </div>

        ))
      }


    </div>

  )

}
