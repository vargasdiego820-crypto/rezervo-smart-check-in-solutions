import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FileText, Send, User, Phone, IdCard, Car, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type { Guest } from "@/lib/mock-data";
import { StatusBadge } from "./status-badge";

type Props = {
  guest: Guest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GuestDetailModal({ guest, open, onOpenChange }: Props) {
  const [system, setSystem] = useState<string>("Condfy");

  if (!guest) return null;

  const handleApprove = () => {
    // TODO: POST /api/robot/dispatch { guestId, system } — Antigravity webhook
    toast.success(`Enviado para ${system}`, {
      description: `${guest.name} foi aprovado(a) e sincronizado(a) com a portaria.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl">Ficha do Hóspede</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 p-6">
          <div className="space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden border bg-muted">
              <img src={guest.photo} alt={guest.name} className="w-full h-full object-cover" />
            </div>
            <StatusBadge status={guest.status} />
            <a
              href={guest.documentUrl}
              className="flex items-center justify-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              <FileText className="h-4 w-4" />
              Ver Autorização (PDF)
            </a>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Dados extraídos do NCollect
              </p>
              <h3 className="text-lg font-semibold">{guest.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InfoField icon={IdCard} label="CPF" value={guest.cpf} />
              <InfoField icon={Phone} label="Telefone" value={guest.phone} />
              <InfoField icon={Car} label="Placa" value={guest.carPlate} />
              <InfoField icon={Building2} label="Imóvel" value={guest.property} />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="gate-system">Sistema de Portaria de destino</Label>
              <Select value={system} onValueChange={setSystem}>
                <SelectTrigger id="gate-system">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Condfy">Condfy</SelectItem>
                  <SelectItem value="ControlGuarda">ControlGuarda</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Send className="h-4 w-4 mr-2" />
            Aprovar e Enviar para Portaria
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InfoField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
