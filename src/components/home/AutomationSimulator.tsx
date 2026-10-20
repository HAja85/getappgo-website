import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type NodeId = "request" | "intent" | "rules" | "systems" | "done" | "human";

const NODE_ICONS: Record<NodeId, IconName> = {
  request: "inbox",
  intent: "brain",
  rules: "filter",
  systems: "database",
  done: "smartphone",
  human: "alert",
};

// Desktop zig-zag positions on a 1232 x 290 canvas (same rhythm as the reference flow).
const LAYOUT: Record<NodeId, { x: number; y: number }> = {
  request: { x: 0, y: 0 },
  intent: { x: 250, y: 100 },
  rules: { x: 500, y: 0 },
  systems: { x: 750, y: 100 },
  done: { x: 1000, y: 0 },
  human: { x: 505, y: 203 },
};
const W = 1232;
const NODE_W = 231;

const HAPPY: NodeId[] = ["request", "intent", "rules", "systems", "done"];
const ESCALATED: NodeId[] = ["request", "intent", "rules", "human"];

export function AutomationSimulator() {
  const copy = useCopy();
  const sim = copy.simulator;
  const reduced = usePrefersReducedMotion();
  const [phone, setPhone] = useState(sim.phone);
  const [message, setMessage] = useState(sim.message);
  const [path, setPath] = useState<NodeId[]>(HAPPY);
  const [step, setStep] = useState(HAPPY.length - 1);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMessage(sim.message);
  }, [sim.message]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function run() {
    const lower = message.toLowerCase();
    const escalate = sim.escalateWords.some((word) => lower.includes(word.toLowerCase()));
    const next = escalate ? ESCALATED : HAPPY;
    setPath(next);
    if (reduced) {
      setStep(next.length - 1);
      return;
    }
    setRunning(true);
    setStep(0);
    let current = 0;
    const tick = () => {
      current += 1;
      setStep(current);
      if (current < next.length - 1) {
        timer.current = window.setTimeout(tick, 750);
      } else {
        setRunning(false);
      }
    };
    timer.current = window.setTimeout(tick, 750);
  }

  const reached = new Set(path.slice(0, step + 1));
  const activeId = path[step];
  const finished = !running && step === path.length - 1;

  function nodeState(id: NodeId): "idle" | "active" | "visited" | "success" | "danger" {
    if (!reached.has(id)) return "idle";
    if (finished && id === "done") return "success";
    if (finished && id === "human") return "danger";
    if (id === activeId && running) return "active";
    return "visited";
  }

  const renderNode = (id: NodeId, style?: CSSProperties, className?: string) => {
    const state = nodeState(id);
    const node = sim.nodes[id];
    const isHuman = id === "human";
    return (
      <div
        key={id}
        style={style}
        className={cn(
          "flex items-center gap-3 rounded-2xl border-[1.5px] bg-white p-4 shadow-lg transition-all duration-500",
          state === "idle" && (isHuman ? "border-slate-100 opacity-80" : "border-blue-200/80"),
          state === "visited" && "border-blue-500/70",
          state === "active" && "scale-105 border-blue-600 shadow-blue-200",
          state === "success" && "border-green-500 shadow-green-100",
          state === "danger" && "scale-105 border-red-400",
          className,
        )}
        aria-current={state === "active" ? "step" : undefined}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white",
            isHuman ? "bg-red-500" : "bg-blue-600",
          )}
        >
          <Icon name={NODE_ICONS[id]} size={18} />
        </span>
        <span className="min-w-0">
          <span className={cn("block truncate text-sm font-bold", isHuman ? "text-slate-800" : "text-blue-700")}>{node.title}</span>
          <span className="block truncate text-[10px] font-semibold tracking-wide text-slate-400 uppercase">{node.sub}</span>
        </span>
      </div>
    );
  };

  const curve = (from: NodeId, to: NodeId) => {
    const a = LAYOUT[from];
    const b = LAYOUT[to];
    const x1 = a.x + NODE_W;
    const y1 = a.y + 39;
    const x2 = b.x;
    const y2 = b.y + 39;
    return `M${x1} ${y1} C ${x1 + 22} ${y1}, ${x2 - 22} ${y2}, ${x2} ${y2}`;
  };
  const links: [NodeId, NodeId][] = [
    ["request", "intent"],
    ["intent", "rules"],
    ["rules", "systems"],
    ["systems", "done"],
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full border border-blue-200/70" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[38%] -left-10 h-40 w-40 rounded-full border border-blue-200/70" />
      <div aria-hidden="true" className="pointer-events-none absolute top-24 -right-16 h-44 w-44 rounded-full border border-blue-200/70" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[40%] right-12 h-20 w-20 rounded-full border border-blue-200/70" />
      <div aria-hidden="true" className="blob top-10 left-1/3 h-60 w-96 bg-violet-100/60" />

      <div className="cs-container relative">
        <p className="text-center text-xs font-semibold tracking-wider text-slate-500 uppercase">{sim.eyebrow}</p>
        <h2 className="heading2 mt-3 text-center font-black text-[#0F172A]">
          {sim.titleBefore}
          <span className="text-gradient-4">{sim.titleAccent}</span>
          {sim.titleAfter}
        </h2>

        <form
          className="mx-auto mt-12 flex max-w-[1140px] flex-col items-center gap-6 lg:mt-16 lg:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (!running) run();
          }}
        >
          <div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-2 shadow-[0_10px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:flex-row lg:w-[720px]">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 sm:w-[200px]">
              <Icon name="phone" size={16} className="shrink-0 text-slate-400" />
              <span className="sr-only">{sim.phoneLabel}</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                dir="ltr"
                inputMode="tel"
                className="w-full bg-transparent font-mono text-sm text-slate-700 outline-none"
              />
            </label>
            <label className="flex flex-1 items-center rounded-xl border border-slate-200 px-4 py-3">
              <span className="sr-only">{sim.messageLabel}</span>
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </label>
          </div>
          <div className="flex items-center gap-4 lg:ms-auto">
            <img src="/images/zillion/robot.svg" alt="" width={84} height={90} className="animate-float h-20 w-auto" />
            <button type="submit" disabled={running} className="btn-primary h-12 w-[220px] text-lg disabled:opacity-80">
              {running ? sim.running : sim.run}
              <Icon name="send" size={16} className="rtl:-scale-x-100" />
            </button>
          </div>
        </form>
        <p className="mx-auto mt-4 flex max-w-[1140px] items-center justify-center gap-2 text-xs text-slate-500 lg:justify-start lg:ps-60">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {sim.note}
        </p>

        {/* desktop flow */}
        <div className="relative mx-auto mt-14 hidden h-[290px] w-full max-w-[1232px] lg:block" aria-live="polite">
          <svg viewBox={`0 0 ${W} 290`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full rtl:-scale-x-100" aria-hidden="true">
            <line x1={LAYOUT.rules.x + NODE_W / 2} y1={78} x2={LAYOUT.rules.x + NODE_W / 2} y2={203} stroke={reached.has("human") ? "#f87171" : "#e2e8f0"} strokeWidth="1.5" />
            {links.map(([from, to]) => {
              const lit = reached.has(to);
              return (
                <g key={`${from}-${to}`}>
                  <path d={curve(from, to)} fill="none" stroke={lit ? "#3b82f6" : "#bfdbfe"} strokeWidth="2.5" className="transition-colors duration-500" />
                  <circle cx={LAYOUT[to].x} cy={LAYOUT[to].y + 39} r="4" fill={lit ? "#3b82f6" : "#bfdbfe"} />
                </g>
              );
            })}
          </svg>
          {(Object.keys(LAYOUT) as NodeId[]).map((id) =>
            renderNode(id, {
              position: "absolute",
              insetInlineStart: `${(LAYOUT[id].x / W) * 100}%`,
              top: LAYOUT[id].y,
              width: `${(NODE_W / W) * 100}%`,
            }),
          )}
        </div>

        {/* mobile / tablet flow */}
        <div className="mx-auto mt-10 flex max-w-sm flex-col items-center lg:hidden" aria-live="polite">
          {(["request", "intent", "rules"] as NodeId[]).map((id) => (
            <div key={id} className="flex w-full flex-col items-center">
              {renderNode(id, undefined, "w-[240px]")}
              <span className={cn("h-8 w-0.5", reached.has(id) ? "bg-blue-500" : "bg-blue-200")} />
            </div>
          ))}
          <div className="grid w-full grid-cols-2 gap-3">
            {renderNode("human", undefined, "p-3")}
            {renderNode("systems", undefined, "p-3")}
          </div>
          <span className={cn("h-8 w-0.5", reached.has("done") ? "bg-blue-500" : "bg-blue-200")} />
          {renderNode("done", undefined, "w-[240px]")}
        </div>
      </div>
    </section>
  );
}
