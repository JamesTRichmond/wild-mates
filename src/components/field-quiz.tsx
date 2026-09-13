import { useState } from "react";
import { recordAnswer, useFieldLog } from "@/lib/field-log";
import { type QuizItem } from "@/lib/quiz";
import { cn } from "@/lib/utils";

export function FieldQuiz({
  item,
  daily = false,
  title = "Field question",
}: {
  item: QuizItem;
  daily?: boolean;
  title?: string;
}) {
  const log = useFieldLog();
  const stored = log.answered[item.id];
  const [picked, setPicked] = useState<number | null>(null);
  const locked = stored !== undefined || picked !== null;

  function choose(index: number) {
    if (locked) return;
    setPicked(index);
    recordAnswer(item.id, index === item.correct, daily);
  }

  return (
    <section className="rounded-[28px] bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{title}</p>
      <h2 className="mt-2 font-display text-2xl text-fg">{item.prompt}</h2>
      <ul className="mt-4 space-y-2">
        {item.choices.map((choice, i) => {
          const isCorrect = i === item.correct;
          const isPicked = i === picked;
          return (
            <li key={choice}>
              <button
                type="button"
                disabled={locked}
                onClick={() => choose(i)}
                className={cn(
                  "flex min-h-12 w-full items-center rounded-2xl px-4 py-3 text-left text-sm leading-snug text-fg shadow-[0_0_0_1px_var(--color-border)] transition-[background-color,opacity] duration-150",
                  !locked && "hover:bg-elevated",
                  locked && isCorrect && "bg-elevated text-accent",
                  locked && isPicked && !isCorrect && "opacity-50",
                )}
              >
                {choice}
              </button>
            </li>
          );
        })}
      </ul>
      {locked ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">{item.why}</p>
      ) : null}
    </section>
  );
}
