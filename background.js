// background.js

// Escuta a instalação da extensão
chrome.runtime.onInstalled.addListener(() => {
  console.log("EasyLink - Condfy instalado com sucesso!");
});

// Listener para gerenciar mensagens do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchGuests") {
    // Simulação da busca de hóspedes no NCollect
    // Como a API real não foi definida, retornamos dados de teste
    
    const mockGuests = [
      {
        id: "1",
        nome_completo: "Diego Vargas",
        cpf: "123.456.789-00",
        telefone: "(11) 98765-4321",
        checkin_date: "2026-07-26T14:00",
        checkout_date: "2026-07-30T10:00",
        selfie_url: "https://i.pravatar.cc/150?u=diego"
      },
      {
        id: "2",
        nome_completo: "Maria Silva",
        cpf: "987.654.321-11",
        telefone: "(21) 99999-8888",
        checkin_date: "2026-07-27T12:00",
        checkout_date: "2026-08-05T12:00",
        selfie_url: "https://i.pravatar.cc/150?u=maria"
      }
    ];

    // Simular delay de rede
    setTimeout(() => {
      sendResponse({ success: true, data: mockGuests });
    }, 800);

    return true; // Mantém a porta de mensagem aberta para resposta assíncrona
  }
});
