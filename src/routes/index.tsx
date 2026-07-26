import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  RefreshCw,
  Eye,
  Pencil,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { mockGuests, type Guest, type GuestStatus } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { GuestDetailModal } from "@/components/guest-detail-modal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel — rezervo" },
      {
        name: "description",
        content: "Painel operacional da rezervo: check-ins, filas e sincronização com portarias.",
      },
      { property: "og:title", content: "Painel — rezervo" },
      {
        property: "og:description",
        content: "Painel operacional da rezervo: check-ins, filas e sincronização com portarias.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selected, setSelected] = useState<Guest | null>(null);

  const metrics = useMemo(() => {
    const total = mockGuests.length;
    const ok = mockGuests.filter((g) => g.status === "Sincronizado").length;
    const pend = mockGuests.filter(
      (g) => g.status === "Pendente" || g.status === "Processando",
    ).length;
    const err = mockGuests.filter((g) => g.status === "Falha na Foto").length;
    return { total, ok, pend, err };
  }, []);

  const filtered = useMemo(() => {
    return mockGuests.filter((g) => {
      const q = query.toLowerCase().trim();
      const matchesQ =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.property.toLowerCase().includes(q);
      const matchesS = statusFilter === "todos" || g.status === statusFilter;
      return matchesQ && matchesS;
    });
  }, [query, statusFilter]);

  const handleResend = (g: Guest) => {
    // TODO: POST /api/robot/dispatch { guestId: g.id } — Antigravity webhook
    toast.success("Reenviado para portaria", {
      description: `${g.name} enfileirado(a) para ${g.gateSystem}.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Check-ins hoje"
          value={metrics.total}
          icon={Users}
          tint="bg-primary/10 text-primary"
        />
        <MetricCard
          label="Sincronizados"
          value={metrics.ok}
          icon={CheckCircle2}
          tint="bg-success/10 text-success"
        />
        <MetricCard
          label="Pendentes / Em fila"
          value={metrics.pend}
          icon={Clock}
          tint="bg-warning/20 text-warning-foreground"
        />
        <MetricCard
          label="Erros / Atenção"
          value={metrics.err}
          icon={AlertTriangle}
          tint="bg-destructive/10 text-destructive"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por hóspede ou imóvel..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="sm:w-56">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="Sincronizado">Sincronizado</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Processando">Processando</SelectItem>
              <SelectItem value="Falha na Foto">Falha na Foto</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-16">Foto</TableHead>
                <TableHead>Hóspede</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Imóvel / Condomínio</TableHead>
                <TableHead>Portaria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((g) => (
                <TableRow
                  key={g.id}
                  className="cursor-pointer hover:bg-muted/40"
                  onClick={() => setSelected(g)}
                >
                  <TableCell>
                    <img
                      src={g.photo}
                      alt={g.name}
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{g.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div>{g.cpf}</div>
                    <div>{g.phone}</div>
                  </TableCell>
                  <TableCell className="text-sm">{g.property}</TableCell>
                  <TableCell className="text-sm">{g.gateSystem}</TableCell>
                  <TableCell>
                    <StatusBadge status={g.status as GuestStatus} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(g.checkinAt)}
                  </TableCell>
                  <TableCell
                    className="text-right space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleResend(g)}
                      title="Reenviar para portaria"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(g)}
                      title="Ver ficha completa"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-10">
                    Nenhum hóspede encontrado com os filtros atuais.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <GuestDetailModal
        guest={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: number;
  icon: typeof Users;
  tint: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          </div>
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tint}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Suppress unused import warning when Send unused in future
void Send;
