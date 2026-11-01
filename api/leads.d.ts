export function missingSmtp(env: NodeJS.ProcessEnv | undefined): string[];

export function validateLead(body: unknown): string | null;

type LeadResponse = {
  setHeader?: (name: string, value: string) => void;
  status: (code: number) => { json: (payload: unknown) => void };
};

export function handleLead(
  req: { method?: string; body?: unknown },
  res: LeadResponse,
  env?: NodeJS.ProcessEnv,
): Promise<void>;

export default function handler(req: { method?: string; body?: unknown }, res: LeadResponse): Promise<void>;
