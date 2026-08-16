import fs from "fs";
import path from "path";
import Link from "next/link";

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

  console.log("读取课程:", filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("课程文件不存在: " + filePath);
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    return <div>课程不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{course.course_name}</h1>
        <p className="text-gray-500 mb-8">共 {course.total_lessons} 节课程</p>

        {/* ===== 有章节 → 按章节分组显示 ===== */}
        {course.chapters && course.chapters.length > 0 ? (
          course.chapters.map((chapter) => (
            <div key={chapter.chapter_id} className="mb-8">
              <h2 className="text-xl font-bold text-blue-700 border-l-4 border-blue-500 pl-3 mb-4">
                {chapter.chapter_name}
              </h2>
              <div className="grid gap-3">
                {chapter.lessons.map((lesson) => (
                  <Link
                    key={lesson.lesson_id}
                    href={`/course/${id}/lesson/${lesson.lesson_id}`}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition block"
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
            </div>
          ))
        ) : (
          /* ===== 无章节 → 回退到平铺显示（兼容旧课程） ===== */
          <div className="grid gap-4">
            {course.lessons?.map((lesson) => (
              <Link
                key={lesson.lesson_id}
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
