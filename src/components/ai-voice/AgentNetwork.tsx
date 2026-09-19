import { cn } from "@/lib/cn";

type NodeItem = {
  id: string;
  label: string;
};

type AgentNetworkProps = {
  nodes: NodeItem[];
  activeIds: string[];
  className?: string;
};

export function AgentNetwork({ nodes, activeIds, className }: AgentNetworkProps) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Active agents">
      {nodes.map((node, index) => {
        const active = activeIds.includes(node.id);
        return (
          <li key={node.id} className="flex items-center gap-2">
            {index > 0 ? (
              <span
                className={cn("hidden h-px w-6 sm:block", active ? "bg-accent/80" : "bg-line")}
                aria-hidden="true"
              />
            ) : null}
            <span
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors",
                active ? "border-accent/70 bg-accent/15 text-mist" : "border-line text-muted",
              )}
            >
              {node.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
