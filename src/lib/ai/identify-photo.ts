import { createServerFn } from "@tanstack/react-start";
import { SPECIES, type Biome, type BodyPlan } from "@/lib/catalog/species";
import { SIGN_OPTIONS, type RitualSign } from "@/lib/identify";

const MAX_B64 = 1_200_000;
const BODIES = new Set<BodyPlan>([
  "bird",
  "mammal",
  "fish",
  "reptile",
  "amphibian",
  "insect",
  "marine",
]);
const BIOMES = new Set<Biome>([
  "grassland",
  "forest",
  "desert",
  "freshwater",
  "marine",
  "sky",
  "island",
  "urban-edge",
]);
const SIGNS = new Set<RitualSign>(SIGN_OPTIONS.map((s) => s.value));

export const identifyPhoto = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = input as { imageBase64?: string; mime?: string };
    const imageBase64 = String(data?.imageBase64 ?? "");
    const mime = String(data?.mime ?? "image/jpeg");
    if (!imageBase64 || imageBase64.length > MAX_B64) {
      throw new Error("Photo is missing or too large");
    }
    return { imageBase64, mime };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Photo identification is unavailable here." };
    }

    const catalog = SPECIES.map(
      (s) => `${s.slug}|${s.name}|${s.latin}|${s.body}|${s.biome}|${s.strategy}`,
    ).join("; ");
    const signList = SIGN_OPTIONS.map((s) => s.value).join(", ");
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 420,
          temperature: 0.1,
          messages: [
            {
              role: "system",
              content:
                "You identify wildlife for an educational 54-species catalog using a multi-access key. Reply with JSON only: {\"slug\": string|null, \"guess\": string, \"confidence\": \"low\"|\"medium\"|\"high\", \"note\": string, \"body\": string|null, \"biome\": string|null, \"signs\": string[], \"alternates\": [{\"slug\": string, \"why\": string}]}. slug must be a catalog slug or null. body is bird|mammal|fish|reptile|amphibian|insect|marine. biome is grassland|forest|desert|freshwater|marine|sky|island|urban-edge. signs is a subset of the ritual-sign list. Never describe human sexual content. If the photo is not wildlife, slug is null.",
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Catalog (slug|name|latin|body|biome|strategy): ${catalog}\nRitual signs: ${signList}`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${data.mime};base64,${data.imageBase64}`,
                  },
                },
              ],
            },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: false as const, error: `Vision service error ${res.status}` };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const raw = body.choices?.[0]?.message?.content ?? "";
      const jsonText = raw.replace(/^```json\s*|\s*```$/g, "").trim();
      const parsed = JSON.parse(jsonText) as {
        slug?: string | null;
        guess?: string;
        confidence?: string;
        note?: string;
        body?: string | null;
        biome?: string | null;
        signs?: unknown;
        alternates?: { slug?: string; why?: string }[];
      };
      const slug =
        parsed.slug && SPECIES.some((s) => s.slug === parsed.slug) ? parsed.slug : null;
      const conf =
        parsed.confidence === "high" || parsed.confidence === "low" ? parsed.confidence : "medium";
      const bodyPlan = parsed.body && BODIES.has(parsed.body as BodyPlan) ? (parsed.body as BodyPlan) : null;
      const biome = parsed.biome && BIOMES.has(parsed.biome as Biome) ? (parsed.biome as Biome) : null;
      const signs = Array.isArray(parsed.signs)
        ? parsed.signs.filter((s): s is RitualSign => typeof s === "string" && SIGNS.has(s as RitualSign))
        : [];
      const alternates = (parsed.alternates ?? [])
        .filter((a) => a.slug && SPECIES.some((s) => s.slug === a.slug))
        .slice(0, 3)
        .map((a) => ({ slug: a.slug as string, why: String(a.why ?? "") }));
      return {
        ok: true as const,
        slug,
        guess: parsed.guess ?? "Unsure",
        confidence: conf,
        note: parsed.note ?? "",
        body: bodyPlan,
        biome,
        signs,
        alternates,
      };
    } catch {
      return { ok: false as const, error: "Could not read that photo." };
    }
  });
