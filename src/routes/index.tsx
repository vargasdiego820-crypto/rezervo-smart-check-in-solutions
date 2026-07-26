import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Search, Wifi } from "lucide-react";

export const Route = createFileRoute("/")({
  component: ExtensionPopupLayout,
});

function ExtensionPopupLayout() {
  const [guests, setGuests] = useState([
    {
      id: "1",
      nome_completo: "Diego Vargas",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      checkin_date: "2026-07-26T14:00:00",
      checkout_date: "2026-07-30T10:00:00",
      selfie_url: "https://i.pravatar.cc/150?u=diego"
    },
    {
      id: "2",
      nome_completo: "Maria Silva",
      cpf: "987.654.321-11",
      telefone: "(21) 99999-8888",
      checkin_date: "2026-07-27T12:00:00",
      checkout_date: "2026-08-05T12:00:00",
      selfie_url: "https://i.pravatar.cc/150?u=maria"
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center p-4" style={{ backgroundImage: 'radial-gradient(circle at top right, rgba(0, 163, 255, 0.1), transparent 300px)' }}>
      {/* Extension Container (Simula o tamanho do Popup do Chrome) */}
      <div className="w-[350px] min-h-[450px] max-h-[550px] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10Z" stroke="#00A3FF" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M8 10H16V16H8V10Z" stroke="#fff" strokeWidth="1.5"/>
              <path d="M10 8V12M14 8V12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M21 16L16 21" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-lg tracking-tight">reser<span className="text-[#00A3FF]">z</span>o</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="text-xs font-medium text-slate-400">Pronto</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
          {guests.map((guest) => (
            <div key={guest.id} className="bg-slate-800/70 border border-white/10 rounded-xl p-4 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-[#00A3FF]/30">
              <div className="flex items-center gap-3 mb-3">
                <img src={guest.selfie_url} alt="Selfie" className="w-12 h-12 rounded-full object-cover border-2 border-slate-800" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{guest.nome_completo}</h3>
                  <p className="text-xs text-slate-400">CPF: {guest.cpf}</p>
                  <p className="text-xs text-slate-400">Tel: {guest.telefone}</p>
                </div>
              </div>
              <div className="bg-black/20 rounded-md p-2 mb-3 flex flex-col gap-1 text-[11px] text-slate-400">
                <div>Início: <span className="text-slate-50 font-medium">{new Date(guest.checkin_date).toLocaleString('pt-BR')}</span></div>
                <div>Fim: <span className="text-slate-50 font-medium">{new Date(guest.checkout_date).toLocaleString('pt-BR')}</span></div>
              </div>
              <button className="w-full py-2.5 bg-[#00A3FF] hover:bg-[#008be5] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Preencher Condfy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
