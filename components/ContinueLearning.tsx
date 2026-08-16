"use client";


import { useRouter } from "next/navigation";



interface Props {

  courseId:string;

}



export default function ContinueLearning({

  courseId

}:Props){



  const router = useRouter();




  function handleContinue(){



    const data = localStorage.getItem(

      "study_record"

    );



    let record:any = {};



    if(data){

      record = JSON.parse(data);

    }




    const lessonId =

      record[courseId] || 1;




    router.push(

      `/course/${courseId}/lesson/${lessonId}`

    );


  }






  return (


    <button

      onClick={handleContinue}

      className="px-5 py-3 bg-blue-600 text-white rounded-lg"

    >

      继续学习

    </button>


  );


}
