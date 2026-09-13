import { createFileRoute } from "@tanstack/react-router";
import { Clicklist } from "@/components/clicklist";
import { currentPhaseId, phases, RUNLOG } from "@/lib/ledger";

export const Route = createFileRoute("/desk")({ component: Desk });

function Desk() {
  const phase = phases.find((p) => p.id === currentPhaseId);

  return (
    <main>
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Production desk</p>
      <h1 className="mt-2 font-display text-4xl text-fg">Not the field guide</h1>
      <p className="mt-3 max-w-prose text-sm text-muted">
        Phase {currentPhaseId}
        {phase ? ` · ${phase.name}` : ""}. Human clicks stay here. They do not re-enter the agent
        list.
      </p>
      <p className="mt-2 max-w-prose text-xs text-subtle">{RUNLOG[RUNLOG.length - 1]}</p>
      <div className="mt-10">
        <Clicklist />
      </div>
    </main>
  );
}
