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


  const data = fs.readFileSync(

    filePath,

    "utf-8"

  );


  return JSON.parse(data);

}





export default function LessonPage({


  params,


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


    return (

      <div className="p-10">

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




  const lesson = lessons.find(


    item =>

      item.lesson_id === Number(params.lessonId)


  );





  if(!lesson){


    return (

      <div className="p-10">

        课节不存在

      </div>

    )

  }






  return (

    <div className="min-h-screen bg-gray-50 p-6">


      <div className="max-w-5xl mx-auto">



        <h1 className="text-2xl font-bold mb-2">


          {course.course_name}


        </h1>



        <h2 className="text-lg text-gray-700 mb-6">


          第{lesson.lesson_id}节：

          {lesson.title}


        </h2>





        <div className="bg-black rounded-xl overflow-hidden aspect-video">


          {

          lesson.video_url ? (


            <video


              src={lesson.video_url}


              controls


              playsInline


              className="w-full h-full"


            />


          ):(


            <div className="text-white h-full flex items-center justify-center">


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





          <div className="space-x-4">


            <button


              className="px-4 py-2 bg-gray-200 rounded"


            >

              上一节


            </button>



            <button


              className="px-4 py-2 bg-blue-600 text-white rounded"


            >

              下一节


            </button>


          </div>



        </div>




      </div>


    </div>

  )

}
