import fs from "fs";
import path from "path";
import Link from "next/link";
import { HighlightClient } from "@/components/HighlightClient";

export const dynamic = "force-dynamic";

interface Lesson {
  lesson_id: number;
  title: string;
  video_file: string;
  video_url: string;
}

interface Chapter {
  chapter_id: string;
  chapter_name: string;
  lessons: Lesson[];
}

interface Course {
  course_id: string;
  course_name: string;
  cover: string;
  total_lessons: number;
  lessons?: Lesson[];
  chapters?: Chapter[];
}

async function getCourse(id: string): Promise<Course | null> {
  const filePath = path.join(
    process.cwd(),
    "data/courses",
    `${id}.json`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error("课程文件不存在: " + filePath);
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ highlight?: string }>;
}) {
  const { id } = await params;
  const { highlight } = await searchParams;

  const course = await getCourse(id);

  if (!course) {
    return <div>课程不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <HighlightClient highlightId={highlight} />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{course.course_name}</h1>
        <p className="text-gray-500 mb-8">共 {course.total_lessons} 节课程</p>

        {course.chapters && course.chapters.length > 0 ? (
          course.chapters.map((chapter) => (
            <details
              key={chapter.chapter_id}
              className="mb-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-xl select-none">
                <span className="text-xl font-bold text-blue-700 border-l-4 border-blue-500 pl-3">
                  {chapter.chapter_name}
                </span>
                <span className="text-gray-400 text-sm">
                  <span className="open:block hidden">▼</span>
                  <span className="open:hidden block">▶</span>
                </span>
              </summary>
              <div className="px-4 pb-4 grid gap-3">
                {chapter.lessons.map((lesson) => (
                  <Link
                    key={lesson.lesson_id}
                    data-lesson-id={lesson.lesson_id}
                    href={`/course/${id}/lesson/${lesson.lesson_id}`}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition block"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-500 text-sm">
                          第 {lesson.lesson_id} 节
                        </div>
                        <div className="font-semibold mt-1">{lesson.title}</div>
                      </div>
                      <div className="text-blue-600">▶ 播放</div>
                    </div>
                  </Link>
                ))}
              </div>
            </details>
          ))
        ) : (
          <div className="grid gap-4">
            {course.lessons?.map((lesson) => (
              <Link
                key={lesson.lesson_id}
                data-lesson-id={lesson.lesson_id}
                href={`/course/${id}/lesson/${lesson.lesson_id}`}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md block"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-500 text-sm">
                      第 {lesson.lesson_id} 节
                    </div>
                    <div className="font-semibold mt-2">{lesson.title}</div>
                  </div>
                  <div className="text-blue-600">▶ 播放</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
