"use client";

import { useEffect, useRef } from "react";

export function HighlightClient({
  highlightId,
}: {
  highlightId?: string;
}) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    if (!highlightId) return;
    hasRun.current = true;

    const timer = setTimeout(() => {
      const target = document.querySelector(
        `[data-lesson-id="${highlightId}"]`
      );

      if (!target) {
        console.warn(`未找到课节: ${highlightId}`);
        return;
      }

      // 展开父级 details
      const details = target.closest("details");
      if (details) {
        details.open = true;
        console.log(`已展开章节: ${details.querySelector("summary")?.textContent?.trim()}`);
      }

      // 滚动并高亮
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        target.style.transition = "box-shadow 0.3s, background-color 0.3s";
        target.style.boxShadow = "0 0 0 3px #3b82f6";
        target.style.backgroundColor = "#eff6ff";

        setTimeout(() => {
          target.style.boxShadow = "none";
          target.style.backgroundColor = "";
        }, 3000);
      }, 300);
    }, 500);

    return () => clearTimeout(timer);
  }, [highlightId]);

  return null;
}
