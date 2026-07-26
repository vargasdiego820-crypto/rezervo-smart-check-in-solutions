import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { mockCondos, type Condominium } from "@/lib/mock-data";

export const Route = createFileRoute("/condominios")({
  head: () => ({
    meta: [
      { title: "Condomínios — rezervo" },
      {
        name: "description",
        content:
          "Gerencie os condomínios cadastrados e suas integrações com sistemas de portaria.",
      },
      { property: "og:title", content: "Condomínios — rezervo" },
      {
        property: "og:description",
        content:
          "Gerencie os condomínios cadastrados e suas integrações com sistemas de portaria.",
      },
    ],
  }),
  component: CondosPage,
});

function CondosPage() {
  const [condos, setCondos] = useState<Condominium[]>(mockCondos);
  const [draft, setDraft] = useState<{ name: string; unitId: string; system: "Condfy" | "Outros" }>({
    name: "",
    unitId: "",
    system: "Condfy",
  });

  const toggleActive = (id: string) => {
    setCondos((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  const handleAdd = () => {
    if (!draft.name || !draft.unitId) {
      toast.error("Preencha nome e unidade/ID.");
      return;
    }
    setCondos((prev) => [
      ...prev,
      { id: `c${Date.now()}`, ...draft, active: true },
    ]);
    toast.success("Condomínio cadastrado");
    setDraft({ name: "", unitId: "", system: "Condfy" });
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plus className="h-4 w-4 text-primary" />
            Novo condomínio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome do condomínio</Label>
              <Input
                id="name"
                placeholder="Ex: Ed. Skyline"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="unitId">Unidade / ID</Label>
              <Input
                id="unitId"
                placeholder="Ex: 2172820"
                value={draft.unitId}
                onChange={(e) => setDraft({ ...draft, unitId: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Sistema utilizado</Label>
              <Select
                value={draft.system}
                onValueChange={(v) => setDraft({ ...draft, system: v as "Condfy" | "Outros" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Condfy">Condfy</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} className="h-10">
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4 text-primary" />
            Condomínios cadastrados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Nome</TableHead>
                <TableHead>Unidade / ID</TableHead>
                <TableHead>Sistema</TableHead>
                <TableHead>Integração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {condos.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="font-mono text-sm">{c.unitId}</TableCell>
                  <TableCell>{c.system}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Switch checked={c.active} onCheckedChange={() => toggleActive(c.id)} />
                      <span
                        className={`text-xs font-medium ${
                          c.active ? "text-success" : "text-muted-foreground"
                        }`}
                      >
                        {c.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
