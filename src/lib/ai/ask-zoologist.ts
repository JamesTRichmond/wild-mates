import { createServerFn } from "@tanstack/react-start";
import { speciesBySlug } from "@/lib/catalog/species";
import { strategyBySlug } from "@/lib/catalog/strategies";

const MAX_QUESTION = 400;
const MAX_TOKENS = 420;

export const askZoologist = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = input as { slug?: string; question?: string };
    const slug = String(data?.slug ?? "").trim();
    const question = String(data?.question ?? "").trim().slice(0, MAX_QUESTION);
    if (!slug) throw new Error("Species is required");
    if (!question) throw new Error("Ask a question");
    return { slug, question };
  })
  .handler(async ({ data }) => {
    const species = speciesBySlug[data.slug];
    if (!species) return { ok: false as const, error: "Unknown species" };

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error: "The zoologist is unavailable in this environment.",
      };
    }

    const strategy = strategyBySlug[species.strategy];
    const system = [
      "You are a field zoologist for Wild Mates, an educational wildlife guide.",
      "Stay on the named species and its reproductive strategy as behavioral ecology.",
      "Write like a museum label: precise, adult, unembarrassed, never flirty.",
      "If you are unsure, say so. Do not invent papers or percentages.",
      "Refuse human sexual content, dating advice, and erotic narrative in one short sentence, then stop.",
      "Do not anthropomorphize animals as people who date.",
    ].join(" ");

    const user = [
      `Species: ${species.name} (${species.latin}).`,
      `Strategy: ${strategy.name} (${species.strategy}).`,
      `Habitat: ${species.habitat}. Range: ${species.region}.`,
      `Catalog notes: ${species.summary} ${species.ritual}`,
      `Visitor question: ${data.question}`,
    ].join("\n");

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: MAX_TOKENS,
          temperature: 0.3,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: false as const, error: `Zoologist service error ${res.status}` };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: false as const, error: "No answer returned" };
      return { ok: true as const, text };
    } catch {
      return { ok: false as const, error: "Could not reach the zoologist." };
    }
  });
