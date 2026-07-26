import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity as ActivityIcon } from "lucide-react";
import { mockGuests } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import type { GuestStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/atividade")({
  head: () => ({
    meta: [
      { title: "Atividade — rezervo" },
      { name: "description", content: "Histórico de sincronizações e eventos recentes do robô rezervo." },
      { property: "og:title", content: "Atividade — rezervo" },
      { property: "og:description", content: "Histórico de sincronizações e eventos recentes do robô rezervo." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ActivityIcon className="h-4 w-4 text-primary" />
            Eventos recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {mockGuests.map((g) => (
              <li key={g.id} className="flex items-center gap-4 p-4">
                <img src={g.photo} className="h-10 w-10 rounded-full object-cover border" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{g.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {g.property} • {g.gateSystem}
                  </p>
                </div>
                <StatusBadge status={g.status as GuestStatus} />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(g.checkinAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
