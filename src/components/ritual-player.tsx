import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { BEAT_LABEL, type RitualPlay } from "@/lib/catalog/plays";

const SOUND_KEY = "wildmates.playSound";

function readSoundPref(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SOUND_KEY) === "on";
}

function captionAt(lines: string[], time: number, duration: number) {
  if (!lines.length) return "";
  const span = Math.max(duration, 1) / lines.length;
  const i = Math.min(lines.length - 1, Math.max(0, Math.floor(time / span)));
  return lines[i] ?? lines[0];
}

export function RitualPlayer({ play }: { play: RitualPlay }) {
  const clay = play.clay;
  const src = clay.src ?? clay.loopSilent;
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [now, setNow] = useState(0);

  const overlayLines = [
    clay.line,
    ...(play.voices ?? []).map((v) => `${v.who}: ${v.line}`),
    ...play.beats.map((b) => b.line),
  ];

  useEffect(() => {
    setSoundOn(readSoundPref());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [play]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.muted = !soundOn || !play.hasAudio;
    if (soundOn && play.hasAudio) {
      v.currentTime = 0;
      void v.play().catch(() => undefined);
    }
  }, [soundOn, src, play.hasAudio]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () => setNow(v.currentTime);
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [src]);

  function armSound() {
    const next = !soundOn;
    setSoundOn(next);
    localStorage.setItem(SOUND_KEY, next ? "on" : "off");
  }

  const caption = captionAt(overlayLines, now, play.durationSec);
  const hasAudio = Boolean(play.hasAudio);

  return (
    <section className="overflow-hidden rounded-[28px] bg-surface shadow-[0_0_0_1px_var(--color-border)]">
      <div className="relative aspect-video overflow-hidden bg-elevated" data-testid="clay-film">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-bg/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-accent">
          Clay Plate
        </span>
        {hasAudio && src && !reduced ? (
          <button
            type="button"
            className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-bg/80 text-accent"
            aria-label={soundOn ? "Mute" : "Turn sound on"}
            onClick={armSound}
          >
            {soundOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
          </button>
        ) : null}
        {reduced || !src ? (
          <img src={clay.poster} alt="" className="h-full w-full object-cover" crossOrigin="anonymous" />
        ) : (
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            poster={clay.poster}
            src={src}
            muted={!soundOn || !hasAudio}
            playsInline
            controls
            loop
            autoPlay
            preload="metadata"
          />
        )}
        {hasAudio && !soundOn && src && !reduced ? (
          <button
            type="button"
            className="absolute inset-x-3 bottom-14 z-10 rounded-xl bg-bg/85 px-3 py-2 text-left text-sm text-accent"
            onClick={armSound}
          >
            Turn sound on — they will tell you, in plain words, what you are seeing.
          </button>
        ) : null}
        {caption ? (
          <p className="pointer-events-none absolute inset-x-3 bottom-3 rounded-xl bg-bg/80 px-3 py-2 text-sm leading-snug text-fg">
            {caption}
          </p>
        ) : null}
      </div>

      <div className="space-y-4 p-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Clay plate</p>
        <h2 className="font-display text-2xl text-fg">{clay.titleCard}</h2>
        <p className="text-sm text-accent">{play.caption}</p>
        {play.clipNote ? (
          <p className="rounded-[12px] bg-elevated px-3 py-2 text-sm leading-snug text-accent">
            {play.clipNote}
          </p>
        ) : null}
        {play.voices?.length ? (
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Who is talking</p>
            {play.voices.map((v) => (
              <p key={v.who} className="text-sm leading-relaxed text-fg">
                <span className="text-accent">{v.who}. </span>
                {v.line}
              </p>
            ))}
          </div>
        ) : null}
        {play.beats.length ? (
          <ol className="space-y-2 text-sm leading-relaxed text-muted">
            {play.beats.map((b) => (
              <li key={b.id}>
                <span className="mr-2 text-[10px] uppercase tracking-[0.14em] text-accent">
                  {BEAT_LABEL[b.id] ?? b.id}
                </span>
                {b.line}
              </li>
            ))}
          </ol>
        ) : null}
        {play.flagship ? (
          <div className="rounded-[16px] bg-elevated p-4 text-sm leading-relaxed text-muted">
            <p className="text-[11px] uppercase tracking-[0.14em] text-accent">After you watch</p>
            <p className="mt-2 text-fg">In your own words, what happened?</p>
            <p className="mt-1">Whose choice mattered, if anyone’s?</p>
            <p className="mt-1">What would be wrong to say about this animal after watching?</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function DiscoverClayLoop({ play }: { play: RitualPlay }) {
  const src = play.clay.loopSilent ?? play.clay.src;
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!src || reduced) {
    return (
      <img
        data-testid="clay-film"
        src={play.clay.poster}
        alt=""
        className="min-h-56 h-full w-full object-cover md:min-h-full"
        crossOrigin="anonymous"
      />
    );
  }

  return (
    <video
      data-testid="clay-film"
      className="min-h-56 h-full w-full object-cover md:min-h-full"
      poster={play.clay.poster}
      src={src}
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
    />
  );
}
