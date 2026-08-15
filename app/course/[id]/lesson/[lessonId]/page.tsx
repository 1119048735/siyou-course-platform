import fs from "fs";
import path from "path";
import Link from "next/link";


interface Lesson {

  lesson_id:number;

  title:string;

  video_file:string;

  video_url:string;

}



interface Course {

  course_name:string;

  lessons?:Lesson[];

  chapters?:any[];

}



function getCourse(id:string):Course|null{


  const filePath = path.join(

    process.cwd(),

    "data/courses",

    `${id}.json`

  );


  if(!fs.existsSync(filePath)){

    return null;

  }


  const json = fs.readFileSync(

    filePath,

    "utf-8"

  );


  return JSON.parse(json);

}




export default function LessonPage({


  params


}:{

  params:{
    id:string;
    lessonId:string;
  }

}){


  const course = getCourse(

    params.id

  );



  if(!course){

    return <div>课程不存在</div>

  }



  let lessons:Lesson[]=[];



  if(course.lessons){

    lessons = course.lessons;

  }



  if(course.chapters){

    course.chapters.forEach(

      chapter=>{

        lessons.push(

          ...chapter.lessons

        )

      }

    )

  }



  const lesson = lessons.find(

    item =>

      item.lesson_id === Number(params.lessonId)

  );



  if(!lesson){

    return <div>课节不存在</div>

  }





  return (

    <div className="min-h-screen bg-gray-50 p-6">


      <div className="max-w-5xl mx-auto">


        <h1 className="text-2xl font-bold mb-2">

          {course.course_name}

        </h1>


        <h2 className="text-lg mb-6">

          第{lesson.lesson_id}节：

          {lesson.title}

        </h2>



        <div className="bg-black rounded-xl overflow-hidden aspect-video">


          {

          lesson.video_url ? (

            <video

              src={lesson.video_url}

              controls

              className="w-full h-full"

            />

          ):(

            <div className="text-white flex items-center justify-center h-full">

              视频地址未配置

            </div>

          )

          }


        </div>



        <div className="flex justify-between mt-6">


          <Link

            href={`/course/${params.id}`}

            className="text-blue-600"

          >

            ← 返回课程目录

          </Link>


          <div>


            <button className="mr-4">

              上一节

            </button>


            <button>

              下一节

            </button>


          </div>


        </div>


      </div>


    </div>

  )

}
