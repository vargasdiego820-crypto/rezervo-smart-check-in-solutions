import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — rezervo" },
      { name: "description", content: "Configurações da conta, webhooks e integrações da rezervo." },
      { property: "og:title", content: "Configurações — rezervo" },
      { property: "og:description", content: "Configurações da conta, webhooks e integrações da rezervo." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Integração com Robô (Antigravity)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="webhook">Webhook URL</Label>
            <Input id="webhook" placeholder="https://api.antigravity.rezervo.app/dispatch" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="token">Token de autenticação</Label>
            <Input id="token" type="password" placeholder="••••••••••••••••" />
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <p className="text-sm font-medium">Envio automático ao aprovar</p>
              <p className="text-xs text-muted-foreground">
                Dispara o webhook automaticamente ao aprovar um hóspede.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button onClick={() => toast.success("Configurações salvas")}>Salvar alterações</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">NCollect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ncollect">Chave de API do NCollect</Label>
            <Input id="ncollect" placeholder="ncl_••••••••" />
          </div>
          <Button variant="outline" onClick={() => toast.success("Conexão verificada")}>
            Testar conexão
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
