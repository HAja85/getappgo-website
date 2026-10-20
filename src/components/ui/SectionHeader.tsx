import { SectionTitle } from "@/components/inner/Blocks";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <SectionTitle pill={eyebrow} title={title} body={description} align={align === "center" ? "center" : "start"} />
    </div>
  );
}
