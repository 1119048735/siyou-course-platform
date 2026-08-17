"use client";

import { useEffect } from "react";

interface Props {
  courseId: string;
  lessonId: number;
}

export default function StudyRecord({
  courseId,
  lessonId,
}: Props) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("study_record");

      const record: Record<string, number> = saved
        ? JSON.parse(saved)
        : {};

      record[String(courseId)] = lessonId;

      localStorage.setItem(
        "study_record",
        JSON.stringify(record)
      );

      // 通知首页课程列表立即更新
      window.dispatchEvent(
        new CustomEvent("study-record-updated")
      );
    } catch (error) {
      console.error(
        "保存学习记录失败:",
        error
      );
    }
  }, [courseId, lessonId]);

  return null;
}
