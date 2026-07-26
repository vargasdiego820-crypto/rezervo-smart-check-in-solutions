export type GuestStatus = "Sincronizado" | "Pendente" | "Processando" | "Falha na Foto";

export type Guest = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  photo: string;
  property: string;
  gateSystem: "Condfy" | "ControlGuarda" | "Outros";
  status: GuestStatus;
  checkinAt: string;
  carPlate: string;
  documentUrl: string;
};

export const mockGuests: Guest[] = [
  {
    id: "g1",
    name: "Mariana Alves Costa",
    cpf: "324.891.076-22",
    phone: "(11) 98421-7734",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
    property: "Ed. Skyline, Apto 502",
    gateSystem: "Condfy",
    status: "Sincronizado",
    checkinAt: "2026-07-26T09:14:00",
    carPlate: "BRA2E19",
    documentUrl: "#",
  },
  {
    id: "g2",
    name: "Rafael Menezes Souza",
    cpf: "108.554.221-09",
    phone: "(21) 99712-4408",
    photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces",
    property: "Res. Ondas do Mar, Apto 1203",
    gateSystem: "Condfy",
    status: "Pendente",
    checkinAt: "2026-07-26T10:02:00",
    carPlate: "RJZ1D42",
    documentUrl: "#",
  },
  {
    id: "g3",
    name: "Camila Oliveira Duarte",
    cpf: "552.038.997-14",
    phone: "(41) 98800-1129",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=faces",
    property: "Ed. Alameda Verde, Apto 807",
    gateSystem: "ControlGuarda",
    status: "Processando",
    checkinAt: "2026-07-26T10:47:00",
    carPlate: "PRK5J88",
    documentUrl: "#",
  },
  {
    id: "g4",
    name: "Thiago Barros Nogueira",
    cpf: "774.221.556-31",
    phone: "(31) 99342-6612",
    photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=faces",
    property: "Res. Mirante, Apto 305",
    gateSystem: "Condfy",
    status: "Falha na Foto",
    checkinAt: "2026-07-26T11:18:00",
    carPlate: "MGB7C10",
    documentUrl: "#",
  },
  {
    id: "g5",
    name: "Isabela Ferraz Lima",
    cpf: "612.487.334-88",
    phone: "(85) 98811-9022",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
    property: "Ed. Praia Bela, Apto 1401",
    gateSystem: "Condfy",
    status: "Sincronizado",
    checkinAt: "2026-07-26T12:05:00",
    carPlate: "CEP4A21",
    documentUrl: "#",
  },
  {
    id: "g6",
    name: "Gustavo Henrique Pires",
    cpf: "889.104.667-52",
    phone: "(48) 99655-3311",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces",
    property: "Res. Costa Azul, Apto 706",
    gateSystem: "Outros",
    status: "Pendente",
    checkinAt: "2026-07-26T13:22:00",
    carPlate: "SCF9K73",
    documentUrl: "#",
  },
];

export type Condominium = {
  id: string;
  name: string;
  unitId: string;
  system: "Condfy" | "Outros";
  active: boolean;
};

export const mockCondos: Condominium[] = [
  { id: "c1", name: "Ed. Skyline", unitId: "2172820", system: "Condfy", active: true },
  { id: "c2", name: "Res. Ondas do Mar", unitId: "2173441", system: "Condfy", active: true },
  { id: "c3", name: "Ed. Alameda Verde", unitId: "CG-8842", system: "Outros", active: true },
  { id: "c4", name: "Res. Mirante", unitId: "2178120", system: "Condfy", active: false },
  { id: "c5", name: "Ed. Praia Bela", unitId: "2179004", system: "Condfy", active: true },
];
