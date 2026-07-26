import { CheckCircle2, Clock, Loader2, AlertTriangle } from "lucide-react";
import type { GuestStatus } from "@/lib/mock-data";

const map: Record<GuestStatus, { label: string; icon: typeof CheckCircle2; className: string }> = {
  Sincronizado: {
    label: "Sincronizado",
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/20",
  },
  Pendente: {
    label: "Pendente",
    icon: Clock,
    className: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  Processando: {
    label: "Processando",
    icon: Loader2,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  "Falha na Foto": {
    label: "Falha na Foto",
    icon: AlertTriangle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function StatusBadge({ status }: { status: GuestStatus }) {
  const cfg = map[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}
    >
      <Icon className={`h-3.5 w-3.5 ${status === "Processando" ? "animate-spin" : ""}`} />
      {cfg.label}
    </span>
  );
}
