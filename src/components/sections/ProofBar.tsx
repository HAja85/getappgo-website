import { Container } from "@/components/ui/Container";
import { getSite } from "@/lib/content/repository";
import { useCountUp } from "@/hooks/useCountUp";

export function ProofBar() {
  const proof = getSite().proof;
  return (
    <section className="pb-16">
      <Container>
        <div className="grid gap-6 rounded-[28px] border border-line bg-ink-soft/70 px-6 py-8 sm:grid-cols-3">
          {proof.map((item) => (
            <ProofItem key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProofItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value, true);
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-semibold text-white">
        <span ref={ref}>{value}</span>
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
