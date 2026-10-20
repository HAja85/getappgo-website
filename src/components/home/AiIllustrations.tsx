import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

/** Hand-built product illustrations for the three AI slides (no stock imagery). */

export function ChatIllustration() {
  const { illus } = useCopy().ai;
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#ecfdf5] via-[#f0fdf4] to-[#dcfce7] p-6">
      <div aria-hidden="true" className="absolute top-8 left-8 hidden rounded-2xl bg-white/90 p-3 text-xs font-semibold text-slate-600 shadow-md md:block">
        <span className="flex items-center gap-2">
          <Icon name="checkCircle" size={16} className="text-green-600" /> AR · EN
        </span>
      </div>
      <div aria-hidden="true" className="absolute bottom-8 left-8 hidden items-end gap-1 rounded-2xl bg-white/90 p-3 shadow-md md:flex">
        {[10, 18, 26, 14, 22, 30, 16, 24, 12].map((h, i) => (
          <span key={i} className="w-1.5 rounded-full bg-green-500" style={{ height: h }} />
        ))}
      </div>
      <div className="w-full max-w-[270px] overflow-hidden rounded-[28px] border-4 border-slate-900/90 bg-white shadow-2xl md:ms-24">
        <div className="flex items-center gap-2 bg-[#14532d] px-4 py-3 text-white">
          <img src="/images/zillion/mark.svg" alt="" width={28} height={28} className="h-7 w-7 rounded-full bg-white p-1" />
          <div className="leading-tight">
            <p className="text-xs font-bold">{illus.chatTitle}</p>
            <p className="text-[10px] text-green-200">● {illus.chatStatus}</p>
          </div>
          <Icon name="phone" size={14} className="ms-auto" />
        </div>
        <ul className="flex flex-col gap-2 bg-[#ecfdf5] p-3">
          {illus.chat.map((line, index) => (
            <li
              key={index}
              className={cn(
                "max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-4 shadow-sm",
                line.from === "agent" ? "self-start bg-white text-slate-700" : "self-end bg-[#bbf7d0] text-slate-800",
              )}
            >
              {line.text}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-slate-100 px-3 py-2">
          <span className="h-6 flex-1 rounded-full bg-slate-100" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white">
            <Icon name="wave" size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function HubIllustration() {
  const { illus } = useCopy().ai;
  const nodes = illus.hubNodes;
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-[#faf5ff] to-[#ede9fe] p-6">
      <div className="relative aspect-square w-full max-w-[340px]">
        <svg viewBox="0 0 340 340" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="170" cy="170" r="130" fill="none" stroke="#c4b5fd" strokeDasharray="4 6" />
          <circle cx="170" cy="170" r="80" fill="none" stroke="#ddd6fe" />
          {nodes.map((_, i) => {
            const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line key={i} x1={170} y1={170} x2={170 + Math.cos(a) * 130} y2={170 + Math.sin(a) * 130} stroke="#a78bfa" strokeWidth="1.5" />
            );
          })}
        </svg>
        <div className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#8B5CF6] to-[#505FD0] text-white shadow-xl">
          <img src="/images/zillion/mark.svg" alt="" width={36} height={36} className="h-9 w-9 rounded-lg bg-white p-1" />
          <span className="mt-1 text-[11px] font-bold">{illus.hub}</span>
        </div>
        {nodes.map((label, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const left = 50 + (Math.cos(a) * 130 * 100) / 340;
          const top = 50 + (Math.sin(a) * 130 * 100) / 340;
          return (
            <span
              key={label}
              dir="auto"
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-bold whitespace-nowrap text-violet-700 shadow-md"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function FlowIllustration() {
  const { illus } = useCopy().ai;
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#eff6ff] via-[#f0f9ff] to-[#dbeafe] p-6">
      <div className="w-full max-w-[380px] rounded-3xl bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="font-heading text-base font-bold text-slate-900">{illus.flowTitle}</p>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">AUTO</span>
        </div>
        <ol className="mt-4 flex flex-col gap-3">
          {illus.flow.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  item.state === "done" && "bg-blue-600 text-white",
                  item.state === "active" && "border-2 border-blue-600 bg-blue-50 text-blue-600",
                  item.state === "todo" && "border-2 border-slate-200 text-slate-300",
                )}
              >
                {item.state === "done" ? <Icon name="check" size={14} /> : <span className="h-2 w-2 rounded-full bg-current" />}
              </span>
              <span className={cn("flex-1 rounded-xl border px-3 py-2 text-sm", item.state === "active" ? "border-blue-200 bg-blue-50 font-semibold text-blue-800" : "border-slate-100 text-slate-600")}>
                {item.label}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {illus.flowStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-slate-50 p-3">
              <p className="text-2xl font-bold text-[#182793]">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
