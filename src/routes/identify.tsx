import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { SpeciesCard } from "@/components/species-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { identifyPhoto } from "@/lib/ai/identify-photo";
import { SPECIES, speciesBySlug } from "@/lib/catalog/species";
import {
  ALGORITHM_NOTES,
  BIOME_OPTIONS,
  BODY_OPTIONS,
  SIGN_OPTIONS,
  rankKey,
  type Observation,
  type RitualSign,
} from "@/lib/identify";
import { addPlateRequest, usePlateRequests } from "@/lib/plate-requests";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/identify")({ component: Identify });

function Identify() {
  const [obs, setObs] = useState<Observation>({ body: "", biome: "", query: "", signs: [] });
  const [photoNote, setPhotoNote] = useState<string | null>(null);
  const [photoSlug, setPhotoSlug] = useState<string | null | undefined>(undefined);
  const [pendingPhoto, setPendingPhoto] = useState(false);
  const [requestGuess, setRequestGuess] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [requestSaved, setRequestSaved] = useState<string | null>(null);
  const requests = usePlateRequests();
  const ranked = useMemo(() => rankKey(obs), [obs]);

  function toggleSign(sign: RitualSign) {
    setObs((o) => {
      const cur = o.signs ?? [];
      const next = cur.includes(sign) ? cur.filter((s) => s !== sign) : [...cur, sign];
      return { ...o, signs: next };
    });
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    setPendingPhoto(true);
    setPhotoNote(null);
    setPhotoSlug(undefined);
    setRequestSaved(null);
    try {
      const dataUrl = await readSmallJpeg(file);
      const mime = dataUrl.slice(5, dataUrl.indexOf(";"));
      const imageBase64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
      const res = await identifyPhoto({ data: { imageBase64, mime } });
      if (!res.ok) {
        setPhotoNote(res.error);
        return;
      }
      setPhotoSlug(res.slug);
      setPhotoNote(`${res.guess} (${res.confidence}). ${res.note}`.trim());
      setObs((o) => ({
        ...o,
        body: res.body ?? o.body,
        biome: res.biome ?? o.biome,
        signs: res.signs.length ? res.signs : o.signs,
        photoSlug: res.slug,
        photoConfidence: res.confidence,
      }));
      if (!res.slug) {
        setRequestGuess(res.guess || "");
      }
    } catch {
      setPhotoNote("Could not read that file.");
    } finally {
      setPendingPhoto(false);
    }
  }

  function submitRequest(e: FormEvent) {
    e.preventDefault();
    const row = addPlateRequest(requestGuess, requestNote);
    setRequestSaved(row.guess);
    setRequestNote("");
  }

  const photoSpecies = photoSlug ? speciesBySlug[photoSlug] : undefined;

  return (
    <main>
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
        A field guide to reproductive strategies
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg">Identify</h1>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
        A multi-access key over {SPECIES.length} plates, fused with a photograph
        when you send one. Not a global vision model of all wildlife. Score characters in any order.
      </p>

      <section className="mt-8 rounded-[28px] bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
        <h2 className="font-display text-2xl text-fg">Camera</h2>
        <p className="mt-2 text-sm text-muted">
          Vision is late-fused into the same ranker as the key — one likelihood, not a second
          answer. A miss becomes a plate request.
        </p>
        <label className="mt-4 flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] bg-accent px-4 text-sm font-medium text-accent-fg">
          Use camera or photo
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => void onPhoto(e.target.files?.[0])}
          />
        </label>
        {pendingPhoto ? <p className="mt-3 text-sm text-muted">Scoring the plate…</p> : null}
        {photoNote ? <p className="mt-3 text-sm text-fg">{photoNote}</p> : null}
        {photoSpecies ? (
          <div className="mt-4">
            <SpeciesCard species={photoSpecies} />
          </div>
        ) : null}
        {photoSlug === null ? (
          <form onSubmit={submitRequest} className="mt-5 space-y-3">
            <p className="text-sm text-muted">
              Not in this catalog. Log a plate request for the next field-guide pass.
            </p>
            <Input
              value={requestGuess}
              onChange={(e) => setRequestGuess(e.target.value)}
              placeholder="Common name or best guess"
              required
            />
            <Textarea
              value={requestNote}
              onChange={(e) => setRequestNote(e.target.value)}
              placeholder="Where you saw it, body plan, anything useful"
            />
            <Button type="submit">Request this plate</Button>
            {requestSaved ? <p className="text-sm text-accent">Logged: {requestSaved}.</p> : null}
          </form>
        ) : null}
      </section>

      <section className="mt-8 space-y-6 rounded-[28px] bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
        <div>
          <h2 className="font-display text-2xl text-fg">Multi-access key</h2>
          <p className="mt-2 text-sm text-muted">
            Score what you can see. Body plan eliminates. Habitat and ritual signs re-weight the
            plates that remain. The list updates as you tap.
          </p>
        </div>

        <fieldset>
          <legend className="text-[11px] uppercase tracking-[0.14em] text-muted">Body plan</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-3 text-sm shadow-[0_0_0_1px_var(--color-border)] has-[:checked]:bg-accent has-[:checked]:text-accent-fg">
              <input
                type="radio"
                name="body"
                value=""
                className="sr-only"
                checked={!obs.body}
                onChange={() => setObs((o) => ({ ...o, body: "" }))}
              />
              Unknown
            </label>
            {BODY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-3 text-sm shadow-[0_0_0_1px_var(--color-border)] has-[:checked]:bg-accent has-[:checked]:text-accent-fg"
              >
                <input
                  type="radio"
                  name="body"
                  value={opt.value}
                  className="sr-only"
                  checked={obs.body === opt.value}
                  onChange={() => setObs((o) => ({ ...o, body: opt.value }))}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] uppercase tracking-[0.14em] text-muted">
            Where you saw it
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-3 text-sm shadow-[0_0_0_1px_var(--color-border)] has-[:checked]:bg-accent has-[:checked]:text-accent-fg">
              <input
                type="radio"
                name="biome"
                value=""
                className="sr-only"
                checked={!obs.biome}
                onChange={() => setObs((o) => ({ ...o, biome: "" }))}
              />
              Unknown
            </label>
            {BIOME_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-3 text-sm shadow-[0_0_0_1px_var(--color-border)] has-[:checked]:bg-accent has-[:checked]:text-accent-fg"
              >
                <input
                  type="radio"
                  name="biome"
                  value={opt.value}
                  className="sr-only"
                  checked={obs.biome === opt.value}
                  onChange={() => setObs((o) => ({ ...o, biome: opt.value }))}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] uppercase tracking-[0.14em] text-muted">
            What you noticed
          </legend>
          <p className="mt-1 text-sm text-muted">Tap what you actually saw. Skip what you did not.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SIGN_OPTIONS.map((opt) => {
              const on = obs.signs?.includes(opt.value) ?? false;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={on}
                  title={opt.hint}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full px-3 text-sm shadow-[0_0_0_1px_var(--color-border)]",
                    on ? "bg-accent text-accent-fg" : "text-fg",
                  )}
                  onClick={() => toggleSign(opt.value)}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="notes" className="text-[11px] uppercase tracking-[0.14em] text-muted">
            Field notes
          </label>
          <Textarea
            id="notes"
            className="mt-2"
            value={obs.query ?? ""}
            onChange={(e) => setObs((o) => ({ ...o, query: e.target.value }))}
            placeholder="Sagebrush, yellow sacs, tandem, anemone, jack…"
          />
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-display text-xl text-fg">
            {ranked.matches.length ? "Relative support" : "The list waits here"}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {ranked.matches.length
              ? `${ranked.remaining} still in play${ranked.ruledOut ? ` · ${ranked.ruledOut} ruled out by body plan` : ""}. Support is among remaining plates, not among all animals.`
              : "Tap a body plan, a habitat, or a sign. This list will move."}
          </p>
          {ranked.matches.length ? (
            <ul className="mt-4 space-y-3">
              {ranked.matches.map((r) => (
                <li key={r.species.slug}>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="tabular-nums text-accent">
                      {Math.round(r.support * 100)}%
                    </span>
                    {r.evidence.map((e) => (
                      <Badge key={e}>{e}</Badge>
                    ))}
                  </div>
                  <div className="mb-3 h-1 overflow-hidden rounded-full bg-elevated">
                    <span
                      className="block h-full bg-accent"
                      style={{ width: `${Math.max(4, Math.round(r.support * 100))}%` }}
                    />
                  </div>
                  <SpeciesCard species={r.species} />
                </li>
              ))}
            </ul>
          ) : ranked.ruledOut ? (
            <p className="mt-2 text-sm text-muted">
              Body plan eliminated the catalog. Clear it, or request a plate.
            </p>
          ) : null}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-fg">How biological ID is done</h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
          Four families of algorithm. This kit uses a multi-access key and a constrained vision
          pass. It does not sequence DNA.
        </p>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {ALGORITHM_NOTES.map((note) => (
            <li
              key={note.id}
              className="rounded-[28px] bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]"
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
                {note.used ? "In this key" : "Not in this kit"}
              </p>
              <h3 className="mt-2 font-display text-xl text-fg">{note.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{note.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {requests.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-fg">Requested plates</h2>
          <p className="mt-1 text-sm text-muted">Waiting on the next catalog pass. Not added yet.</p>
          <ul className="mt-4 space-y-2">
            {requests.map((row) => (
              <li
                key={row.id}
                className="rounded-2xl bg-surface px-4 py-3 text-sm shadow-[0_0_0_1px_var(--color-border)]"
              >
                <p className="text-fg">{row.guess}</p>
                {row.note ? <p className="mt-1 text-muted">{row.note}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-8 text-xs text-subtle">
        <Link to="/strategies" className="text-accent">
          Nine strategies
        </Link>{" "}
        sit behind every plate this key can name.
      </p>
    </main>
  );
}

function readSmallJpeg(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 768;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}
