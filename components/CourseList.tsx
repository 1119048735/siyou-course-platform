"use client";

import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  courses,
} from "@/lib/courses";

import {
  getProgress,
} from "@/lib/progress";


type StudyRecord = Record<string, number>;


export function CourseList() {

  const [studyRecord, setStudyRecord] =
    useState<StudyRecord>({});


  useEffect(() => {

    function loadProgress() {

      try {

        // ==========================
        // 读取新的 study_record
        // ==========================

        const saved =
          localStorage.getItem(
            "study_record"
          );

        const studyRecordData: StudyRecord =
          saved
            ? JSON.parse(saved)
            : {};


        // ==========================
        // 读取原来的 progress
        // ==========================

        let oldProgress: any = {};

        try {

          oldProgress =
            getProgress() || {};

        } catch {

          oldProgress = {};

        }


        // ==========================
        // 合并两套记录
        // study_record 优先
        // ==========================

        const merged: StudyRecord = {};


        courses.forEach(course => {

          const courseId =
            String(course.id);


          const newLesson =
            studyRecordData[courseId];


          const oldLesson =
            oldProgress?.[course.id]
              ?.lastLesson;


          if (newLesson) {

            merged[courseId] =
              Number(newLesson);

          } else if (oldLesson) {

            merged[courseId] =
              Number(oldLesson);

          }

        });


        setStudyRecord(
          merged
        );

      } catch (error) {

        console.error(
          "读取学习进度失败:",
          error
        );

        setStudyRecord({});

      }

    }


    // 页面首次加载
    loadProgress();


    // 自定义学习记录更新事件
    window.addEventListener(
      "study-record-updated",
      loadProgress
    );


    // 浏览器重新获得焦点
    window.addEventListener(
      "focus",
      loadProgress
    );


    // 浏览器 storage 变化
    window.addEventListener(
      "storage",
      loadProgress
    );


    return () => {

      window.removeEventListener(
        "study-record-updated",
        loadProgress
      );

      window.removeEventListener(
        "focus",
        loadProgress
      );

      window.removeEventListener(
        "storage",
        loadProgress
      );

    };

  }, []);


  return (

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">

      {courses.map(course => {

        const courseId =
          String(course.id);


        const lastLesson =
          studyRecord[courseId] || 0;


        const progressPercent =
          lastLesson > 0
            ? Math.min(
                Math.round(
                  (
                    lastLesson /
                    course.totalLessons
                  ) * 100
                ),
                100
              )
            : 0;


        const jumpUrl =
          lastLesson > 0
            ? `/course/${course.id}?highlight=${lastLesson}`
            : `/course/${course.id}`;


        return (

          <Link
            key={course.id}
            href={jumpUrl}
            className="
              group
              overflow-hidden
              rounded-xl
              border
              bg-card
              transition
              hover:border-primary/40
              hover:shadow-md
            "
          >

            {/* 封面 */}

            <div
              className="
                aspect-square
                overflow-hidden
                bg-muted
              "
            >

              {course.cover ? (

                <img
                  src={course.cover}
                  alt={course.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

              ) : (

                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                  "
                >

                  <BookOpen
                    className="
                      h-10
                      w-10
                      text-primary
                    "
                  />

                </div>

              )}

            </div>


            {/* 课程信息 */}

            <div className="p-3">

              <div
                className="
                  mb-2
                  flex
                  items-start
                  justify-between
                  gap-2
                "
              >

                <h3
                  className="
                    text-sm
                    font-semibold
                    leading-5
                    line-clamp-2
                  "
                >
                  {course.name}
                </h3>


                {course.badge && (

                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-primary/10
                      px-2
                      py-1
                      text-[10px]
                      text-primary
                    "
                  >
                    {course.badge}
                  </span>

                )}

              </div>


              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                {course.stage}
              </p>


              {lastLesson > 0 && (

                <div className="mt-3">

                  <div
                    className="
                      flex
                      justify-between
                      text-[11px]
                      text-muted-foreground
                    "
                  >

                    <span>
                      {lastLesson}/
                      {course.totalLessons}
                      节
                    </span>

                    <span>
                      {progressPercent}%
                    </span>

                  </div>


                  <div
                    className="
                      mt-1
                      h-1.5
                      rounded-full
                      bg-muted
                    "
                  >

                    <div
                      className="
                        h-1.5
                        rounded-full
                        bg-primary
                      "
                      style={{
                        width:
                          `${progressPercent}%`,
                      }}
                    />

                  </div>

                </div>

              )}


              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  border-t
                  pt-3
                "
              >

                <span
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  共{course.totalLessons}节
                </span>


                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-medium
                    text-primary
                  "
                >

                  {lastLesson > 0
                    ? "继续"
                    : "开始"}

                  <ArrowRight
                    className="h-3 w-3"
                  />

                </span>

              </div>

            </div>

          </Link>

        );

      })}

    </div>

  );
}
