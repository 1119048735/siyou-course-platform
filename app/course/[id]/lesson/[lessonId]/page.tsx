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



  console.log(

    "读取课程文件:",

    filePath

  );



  if(!fs.existsSync(filePath)){


    throw new Error(

      "课程文件不存在: " + filePath

    );


  }



  const data = fs.readFileSync(

    filePath,

    "utf-8"

  );



  return JSON.parse(data);


}







export default async function LessonPage({


  params,


}:{

  params:Promise<{

    id:string;

    lessonId:string;

  }>


}){


  const {id, lessonId}=await params;




  const course = getCourse(id);




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

        );


      }

    );


  }





  const currentLessonId = Number(lessonId);





  const lesson = lessons.find(


    item =>

      item.lesson_id === currentLessonId


  );





  if(!lesson){


    return (

      <div className="p-10">

        课节不存在

      </div>

    )

  }






  const previousLesson =

    lessons.find(

      item =>

        item.lesson_id === currentLessonId - 1

    );




  const nextLesson =

    lessons.find(

      item =>

        item.lesson_id === currentLessonId + 1

    );







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

              playsInline

              className="w-full h-full"

            />


          ):(


            <div className="text-white flex items-center justify-center h-full">


              视频地址未配置


            </div>


          )


          }


        </div>






        <div className="flex justify-between items-center mt-6">



          <Link


            href={`/course/${id}`}


            className="text-blue-600"


          >

            ← 返回课程目录

          </Link>





          <div className="flex gap-4">



            {

            previousLesson && (

              <Link

                href={`/course/${id}/lesson/${previousLesson.lesson_id}`}

                className="px-4 py-2 bg-gray-200 rounded-lg"

              >

                ← 上一节

              </Link>

            )

            }





            {

            nextLesson && (

              <Link

                href={`/course/${id}/lesson/${nextLesson.lesson_id}`}

                className="px-4 py-2 bg-blue-600 text-white rounded-lg"

              >

                下一节 →

              </Link>

            )

            }



          </div>



        </div>





      </div>


    </div>

  )


}
