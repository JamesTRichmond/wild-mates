import { useState } from "react";
import { GraduationCap, Send } from "lucide-react";
import { askZoologist } from "@/lib/ai/ask-zoologist";
import { type Species } from "@/lib/catalog/species";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PROMPTS = [
  "How does this strategy work in the field?",
  "What do the young receive after hatching or birth?",
  "Where might I be looking if I wanted to observe this?",
];

export function ZoologistSheet({ species }: { species: Species }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(q: string) {
    const text = q.trim();
    if (!text || pending) return;
    setPending(true);
    setError(null);
    setAnswer(null);
    setQuestion("");
    try {
      const res = await askZoologist({ data: { slug: species.slug, question: text } });
      if (res.ok) setAnswer(res.text);
      else setError(res.error);
    } catch {
      setError("Could not reach the zoologist.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="rounded-[28px] bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Ask a zoologist</p>
          <h2 className="mt-1 font-display text-2xl text-fg">Questions about {species.name}</h2>
        </div>
        <GraduationCap className="size-5 text-accent" strokeWidth={1.5} />
      </div>
      <p className="mt-2 text-sm text-muted">
        Field-guide answers only. The model will refuse if it does not know, or if the question leaves biology.
      </p>
      {!open ? (
        <Button className="mt-4" type="button" onClick={() => setOpen(true)}>
          Open the desk
        </Button>
      ) : (
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            void submit(question);
          }}
        >
          <div className="flex flex-wrap gap-2">
            {PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                className="rounded-full px-3 py-2 text-left text-xs text-muted shadow-[0_0_0_1px_var(--color-border)] hover:text-fg"
                onClick={() => void submit(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={400}
            placeholder="Ask about habitat, strategy, or care of young…"
            aria-label="Question for the zoologist"
          />
          <Button type="submit" disabled={pending || !question.trim()}>
            <Send />
            {pending ? "Consulting…" : "Ask"}
          </Button>
          {pending ? (
            <p className="text-sm text-muted">Consulting the catalog notes…</p>
          ) : null}
          {error ? <p className="text-sm text-moss">{error}</p> : null}
          {answer ? (
            <div className="rounded-2xl bg-elevated p-4 text-sm leading-relaxed text-fg shadow-[0_0_0_1px_var(--color-border)]">
              {answer}
            </div>
          ) : null}
        </form>
      )}
    </section>
  );
}
