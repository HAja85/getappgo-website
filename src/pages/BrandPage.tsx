import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { useLanguage } from "@/i18n/LanguageProvider";

type Swatch = { name: string; hex: string; text?: "light" | "dark" };

const current: Swatch[] = [
  { name: "Navy", hex: "#182793", text: "light" },
  { name: "Plum", hex: "#7B3368", text: "light" },
  { name: "Magenta", hex: "#CA51AA", text: "light" },
  { name: "Orange", hex: "#D97817", text: "light" },
  { name: "Cyan", hex: "#07A0E7", text: "light" },
];

const midnight: Swatch[] = [
  { name: "Midnight Navy", hex: "#101B35", text: "light" },
  { name: "Technology Blue", hex: "#2563EB", text: "light" },
  { name: "AI Cyan", hex: "#06B6D4", text: "dark" },
  { name: "Cloud White", hex: "#F8FAFC", text: "dark" },
  { name: "Slate Grey", hex: "#64748B", text: "light" },
  { name: "AI Purple", hex: "#7C3AED", text: "light" },
];

const share = [
  { label: "Navy", width: "40%", color: "#101B35" },
  { label: "White", width: "25%", color: "#F8FAFC" },
  { label: "Blue", width: "15%", color: "#2563EB" },
  { label: "Cyan", width: "10%", color: "#06B6D4" },
  { label: "Grey", width: "5%", color: "#64748B" },
  { label: "Purple", width: "5%", color: "#7C3AED" },
];

const alternatives: { title: string; note: { en: string; ar: string }; swatches: Swatch[] }[] = [
  {
    title: "Futuristic AI",
    note: { en: "Best for AI innovation", ar: "أنسب لابتكار الذكاء الاصطناعي" },
    swatches: [
      { name: "Navy", hex: "#0B1120", text: "light" },
      { name: "Electric Blue", hex: "#3B82F6", text: "light" },
      { name: "Neon Cyan", hex: "#00E5FF", text: "dark" },
      { name: "White", hex: "#FFFFFF", text: "dark" },
    ],
  },
  {
    title: "Enterprise Professional",
    note: { en: "Best for corporate clients", ar: "أنسب للعملاء من الشركات" },
    swatches: [
      { name: "Navy", hex: "#172554", text: "light" },
      { name: "Blue", hex: "#1D4ED8", text: "light" },
      { name: "Light Blue", hex: "#93C5FD", text: "dark" },
      { name: "White", hex: "#FFFFFF", text: "dark" },
    ],
  },
  {
    title: "Premium Digital",
    note: { en: "Best for premium SaaS", ar: "أنسب لمنتجات البرمجيات المتميزة" },
    swatches: [
      { name: "Dark", hex: "#17152B", text: "light" },
      { name: "Purple", hex: "#7C3AED", text: "light" },
      { name: "Violet", hex: "#A78BFA", text: "dark" },
      { name: "Silver", hex: "#E2E8F0", text: "dark" },
    ],
  },
];

const copy = {
  en: {
    badge: "Brand preview",
    title: "Colour directions",
    accent: "Current, then new",
    body: "The rest of this preview site uses Midnight Tech. This page keeps the current palette visible, then shows the recommended change and three alternatives.",
    currentTitle: "Current palette",
    currentBody: "Navy, plum, magenta and orange, with Oxanium for body text and Sansation for headings.",
    recommended: "Recommended",
    midnightTitle: "Midnight Tech",
    midnightBody: "Navy and blue for the logo, white or midnight for backgrounds, technology blue for buttons, cyan for AI highlights, midnight headings, slate body text, and blue-to-cyan gradients. Type is Inter Regular for body text and Manrope SemiBold or Bold for headings. Arabic stays in Cairo.",
    shareLabel: "Suggested share of the page",
    alternativesTitle: "Other directions",
    alternativesBody: "Shown here for comparison. They are not applied to the rest of the site.",
  },
  ar: {
    badge: "معاينة الهوية",
    title: "اتجاهات الألوان",
    accent: "الحالي ثم الجديد",
    body: "بقية موقع المعاينة هذا يستخدم Midnight Tech. هذه الصفحة تُبقي لوحة الألوان الحالية ظاهرة، ثم تعرض التغيير المقترح وثلاثة بدائل.",
    currentTitle: "اللوحة الحالية",
    currentBody: "كحلي وبرغندي وماجنتي وبرتقالي، مع Oxanium للنص وSansation للعناوين.",
    recommended: "المقترح",
    midnightTitle: "Midnight Tech",
    midnightBody: "الكحلي والأزرق للشعار، والأبيض أو الكحلي للخلفيات، والأزرق التقني للأزرار، والسماوي لتمييز الذكاء الاصطناعي، وعناوين كحلية، ونص رمادي، وتدرجات من الأزرق إلى السماوي. الخط Inter للنص وManrope للعناوين. العربية تبقى بخط Cairo.",
    shareLabel: "التوزيع المقترح للصفحة",
    alternativesTitle: "اتجاهات أخرى",
    alternativesBody: "للمقارنة فقط. لم تُطبَّق على بقية الموقع.",
  },
} as const;

export function BrandPage() {
  const { lang } = useLanguage();
  const text = copy[lang];

  return (
    <>
      <Seo path="/brand" title={text.title} description={text.body} />
      <PageHero badge={text.badge} badgeIcon="sparkles" title={text.title} accent={text.accent} body={text.body} compact />

      <section className="bg-[#F8FAFC] py-16">
        <div className="cs-container">
          <h2 className="font-heading text-3xl font-bold text-[#101B35]">{text.currentTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">{text.currentBody}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {current.map((swatch) => (
              <SwatchCard key={swatch.hex} swatch={swatch} />
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="cs-container">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#2563EB] uppercase">{text.recommended}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-[#101B35]">{text.midnightTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#64748B]">{text.midnightBody}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {midnight.map((swatch) => (
              <SwatchCard key={swatch.hex} swatch={swatch} />
            ))}
          </ul>
          <p className="mt-10 text-xs font-semibold tracking-[0.16em] text-[#64748B] uppercase">{text.shareLabel}</p>
          <div className="mt-3 flex h-12 overflow-hidden rounded-full border border-[#E2E8F0]" role="img" aria-label={share.map((part) => `${part.label} ${part.width}`).join(", ")}>
            {share.map((part) => (
              <span key={part.label} style={{ width: part.width, background: part.color }} />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#64748B]">
            {share.map((part) => (
              <li key={part.label}>
                {part.label} {part.width}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16">
        <div className="cs-container">
          <h2 className="font-heading text-3xl font-bold text-[#101B35]">{text.alternativesTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">{text.alternativesBody}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {alternatives.map((direction) => (
              <article key={direction.title} className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
                <h3 className="font-heading text-xl font-bold text-[#101B35]">{direction.title}</h3>
                <p className="mt-1 text-sm text-[#64748B]">{direction.note[lang]}</p>
                <ul className="mt-4 grid gap-3">
                  {direction.swatches.map((swatch) => (
                    <SwatchCard key={`${direction.title}-${swatch.hex}`} swatch={swatch} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SwatchCard({ swatch }: { swatch: Swatch }) {
  const light = swatch.text !== "dark";
  return (
    <li className="overflow-hidden rounded-2xl border border-[#E2E8F0]">
      <div className="flex h-24 items-end p-3" style={{ background: swatch.hex }}>
        <span className={light ? "text-sm font-semibold text-white" : "text-sm font-semibold text-[#101B35]"}>{swatch.hex}</span>
      </div>
      <p className="px-3 py-2 text-sm font-semibold text-[#101B35]">{swatch.name}</p>
    </li>
  );
}
