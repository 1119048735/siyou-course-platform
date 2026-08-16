"use client";

import { useEffect, useRef } from "react";

export function HighlightClient({
  highlightId,
}: {
  highlightId?: string;
}) {
  const hasRun = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hasRun.current) return;
    if (!highlightId) return;

    let retryCount = 0;
    const maxRetries = 10;

    const doHighlight = () => {
      const target = document.querySelector(
        `[data-lesson-id="${highlightId}"]`
      ) as HTMLElement | null;

      if (target) {
        // 找到并展开父级 details
        const details = target.closest("details");
        if (details) {
          details.open = true;
          console.log(`✅ 已展开章节: ${details.querySelector("summary")?.textContent?.trim()}`);
        } else {
          console.warn("⚠️ 未找到父级 details 元素");
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

        hasRun.current = true;
        return true;
      }
      return false;
    };

    // 尝试立即执行
    if (doHighlight()) return;

    // 如果没找到，使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(() => {
      if (doHighlight()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 兜底：定时重试
    timerRef.current = setInterval(() => {
      retryCount++;
      if (doHighlight() || retryCount >= maxRetries) {
        clearInterval(timerRef.current!);
        observer.disconnect();
      }
    }, 500);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [highlightId]);

  return null;
}
