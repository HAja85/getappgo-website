import { Link } from "react-router";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";

const DOTS = ["#182793", "#7B3368", "#D97817"];

export function HardwareSourcing() {
  const copy = useCopy();
  const hw = copy.hardware;

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div aria-hidden="true" className="blob top-1/3 -left-20 h-72 w-72 bg-green-100/60" />
      <div aria-hidden="true" className="blob right-0 bottom-0 h-80 w-96 bg-pink-100/60" />
      <div className="cs-container relative">
        <div className="mx-auto w-fit text-center">
          <h2 className="heading2 relative font-black text-[#0F172A]">
            {hw.titleBefore}
            <span className="relative inline-block">
              <span aria-hidden="true" className="absolute -top-3 left-0 text-base text-[#505FD0] sm:-top-4">✦</span>
              <span className="text-gradient-4">{hw.titleAccent}</span>
            </span>
          </h2>
          <span aria-hidden="true" className="mt-2 flex justify-center gap-1.5 sm:ms-[38%] sm:justify-start">
            {DOTS.map((color) => (
              <span key={color} className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            ))}
          </span>
        </div>

        <ul className="mx-auto mt-12 grid max-w-[1024px] grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {hw.tiles.map((tile) => (
            <li key={tile.label}>
              <Link
                to={tile.href}
                className="group focus-ring flex h-36 flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-3 text-center transition-all hover:border-[#505FD0]/50 hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eef2ff] to-[#fdf2f8] text-[#182793] transition-transform group-hover:scale-110">
                  <Icon name={tile.icon} size={30} strokeWidth={1.75} />
                </span>
                <span className="font-heading text-sm leading-tight font-bold text-slate-800">{tile.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-y-2 text-sm text-slate-500">
          {hw.legend.map((item, index) => (
            <li key={item} className="flex items-center gap-2 border-slate-200 px-4 [&:not(:first-child)]:border-s">
              <span className="h-2 w-2 rounded-full" style={{ background: DOTS[index] }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
