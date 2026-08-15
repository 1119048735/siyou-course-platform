import fs from "fs";
import path from "path";
import Link from "next/link";


export const dynamic = "force-dynamic";


interface Lesson {

  lesson_id:number;

  title:string;

  video_file:string;

  video_url:string;

}


interface Course {

  course_id:string;

  course_name:string;

  cover:string;

  total_lessons:number;

  lessons?:Lesson[];

  chapters?:any[];

}



async function getCourse(id:string):Promise<Course|null>{


  const filePath = path.join(

    process.cwd(),

    "data/courses",

    `${id}.json`

  );


  if(!fs.existsSync(filePath)){

    return null;

  }


  const data = fs.readFileSync(

    filePath,

    "utf-8"

  );


  return JSON.parse(data);

}





export default async function CoursePage({


  params,


}:{

  params:{
    id:string
  }

}){


  const course = await getCourse(

    params.id

  );


  if(!course){


    return (

      <div>

        课程不存在

      </div>

    )

  }



  let lessons:Lesson[]=[];



  // 普通课程

  if(course.lessons){

    lessons = course.lessons;

  }



  // 章节课程

  if(course.chapters){

    course.chapters.forEach(

      chapter=>{

        lessons.push(

          ...chapter.lessons

        )

      }

    )

  }



  return (

    <div className="min-h-screen bg-gray-50 p-6">


      <div className="max-w-5xl mx-auto">


        <h1 className="text-3xl font-bold mb-2">

          {course.course_name}

        </h1>


        <p className="text-gray-500 mb-8">

          共 {course.total_lessons} 节课程

        </p>



        <div className="grid gap-4">


          {

          lessons.map((lesson)=>(


            <Link


              key={lesson.lesson_id}


              href={`/course/${params.id}/lesson/${lesson.lesson_id}`}


              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md"


            >


              <div className="flex justify-between items-center">


                <div>


                  <div className="text-gray-500 text-sm">

                    第{lesson.lesson_id}节

                  </div>


                  <div className="font-semibold mt-2">

                    {lesson.title}

                  </div>


                </div>



                <div className="text-blue-600">

                  ▶ 播放

                </div>


              </div>


            </Link>


          ))

          }


        </div>


      </div>


    </div>

  )

}
