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



interface Chapter {

  chapter_id:string;

  chapter_name:string;

  lessons:Lesson[];

}



interface Course {

  course_id:string;

  course_name:string;

  lessons?:Lesson[];

  chapters?:Chapter[];

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





export default async function LessonPage({


  params,


}:{

  params:Promise<{

    id:string;

    lessonId:string;

  }>


}){


  const {id,lessonId}=await params;



  const course=getCourse(id);



  if(!course){


    return (

      <div className="p-10">

        课程不存在

      </div>

    )

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

        );


      }

    );


  }





  const currentLessonId=Number(lessonId);





  const lesson=lessons.find(

    item=>

      item.lesson_id===currentLessonId

  );





  if(!lesson){


    return (

      <div className="p-10">

        课节不存在

      </div>

    )

  }






  const previousLesson=lessons.find(

    item=>

      item.lesson_id===currentLessonId-1

  );





  const nextLesson=lessons.find(

    item=>

      item.lesson_id===currentLessonId+1

  );





  return (

    <div className="min-h-screen bg-gray-50 p-6">



      <div className="max-w-5xl mx-auto">



        {/* 顶部导航 */}

        <div className="flex justify-between items-center mb-5">


          <Link

            href="/"

            className="text-blue-600"

          >

            🏠 返回主页

          </Link>



          <Link

            href={`/course/${id}`}

            className="text-blue-600"

          >

            ← 返回课程目录

          </Link>


        </div>





        <h1 className="text-2xl font-bold mb-2">

          {course.course_name}

        </h1>





        <h2 className="text-lg mb-6">

          第{lesson.lesson_id}节：

          {lesson.title}

        </h2>






        {/* 视频 */}

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






        {/* 上下一节 */}

        <div className="flex justify-between items-center mt-6">



          {

          previousLesson ? (


            <Link

              href={`/course/${id}/lesson/${previousLesson.lesson_id}`}

              className="px-4 py-2 bg-gray-200 rounded-lg"

            >

              ← 上一节

            </Link>


          ):(

            <div />

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







        {/* 课程目录 */}

        <div className="mt-10 bg-white rounded-xl p-6 shadow-sm">



          <h2 className="text-xl font-bold mb-5">

            课程目录

          </h2>






          {

          course.chapters ? (


            course.chapters.map(

              chapter=>(


                <div

                  key={chapter.chapter_id}

                  className="mb-6"

                >



                  <h3 className="font-bold text-lg mb-3">

                    {chapter.chapter_name}

                  </h3>





                  <div className="space-y-2">


                  {

                  chapter.lessons.map(

                    item=>(


                      <Link

                        key={item.lesson_id}

                        href={`/course/${id}/lesson/${item.lesson_id}`}

                        className={

                          `block px-4 py-3 rounded-lg ${

                          item.lesson_id===currentLessonId

                          ?

                          "bg-blue-100 text-blue-700 font-bold"

                          :

                          "hover:bg-gray-100"

                          }`

                        }

                      >


                        第{item.lesson_id}节：

                        {item.title}


                      </Link>


                    )


                  )

                  }


                  </div>



                </div>


              )


            )


          ):(


            <div className="space-y-2">


            {

            lessons.map(

              item=>(


                <Link

                  key={item.lesson_id}

                  href={`/course/${id}/lesson/${item.lesson_id}`}

                  className={

                    `block px-4 py-3 rounded-lg ${

                    item.lesson_id===currentLessonId

                    ?

                    "bg-blue-100 text-blue-700 font-bold"

                    :

                    "hover:bg-gray-100"

                    }`

                  }

                >


                  第{item.lesson_id}节：

                  {item.title}


                </Link>


              )


            )

            }


            </div>


          )

          }



        </div>





      </div>



    </div>


  )


}
