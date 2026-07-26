// popup.js

document.addEventListener('DOMContentLoaded', async () => {
  const loader = document.getElementById('loader');
  const emptyState = document.getElementById('empty-state');
  const guestList = document.getElementById('guest-list');
  const connStatus = document.getElementById('connection-status');
  const statusIndicator = document.querySelector('.status-indicator');
  
  // 1. Check if active tab is valid (condfy.com.br)
  const isValidTab = await checkValidTab();
  
  if (!isValidTab) {
    connStatus.textContent = 'Aba Inválida';
    statusIndicator.classList.add('error');
    emptyState.classList.remove('hidden');
    emptyState.innerHTML = `
      <p style="color: var(--error); margin-bottom: 8px;"><b>Acesso Negado</b></p>
      <p>Navegue até o painel do <b>Condfy</b> para habilitar a injeção de dados.</p>
    `;
    return;
  }

  // 2. Fetch guests from Background Service Worker
  loader.classList.remove('hidden');

  chrome.runtime.sendMessage({ action: "fetchGuests" }, (response) => {
    loader.classList.add('hidden');
    
    if (chrome.runtime.lastError || !response || !response.success) {
      showToast("Erro ao buscar fila de hóspedes.", "error");
      return;
    }

    const guests = response.data;

    if (guests && guests.length > 0) {
      renderGuests(guests);
    } else {
      emptyState.classList.remove('hidden');
    }
  });

  function renderGuests(guests) {
    guestList.innerHTML = '';
    
    guests.forEach(guest => {
      const card = document.createElement('div');
      card.className = 'guest-card';
      
      const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
      };

      card.innerHTML = `
        <div class="guest-header">
          <img class="guest-avatar" src="${guest.selfie_url || 'https://via.placeholder.com/48'}" alt="Selfie do hóspede">
          <div class="guest-info">
            <div class="guest-name">${guest.nome_completo}</div>
            <div class="guest-cpf">CPF: ${guest.cpf}</div>
            <div class="guest-phone">Tel: ${guest.telefone}</div>
          </div>
        </div>
        <div class="guest-dates">
          <div>Início: <span>${formatDateTime(guest.checkin_date)}</span></div>
          <div>Fim: <span>${formatDateTime(guest.checkout_date)}</span></div>
        </div>
        <button class="btn-inject" data-id="${guest.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          Preencher Condfy
        </button>
      `;

      // Event Listener for the inject button
      const btnInject = card.querySelector('.btn-inject');
      btnInject.addEventListener('click', () => handleInject(guest, btnInject));
      
      guestList.appendChild(card);
    });
  }

  async function handleInject(guest, buttonElement) {
    try {
      const originalText = buttonElement.innerHTML;
      buttonElement.disabled = true;
      buttonElement.textContent = "Injetando...";

      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Send message to content script of the active tab
      chrome.tabs.sendMessage(tab.id, { action: "injectData", data: guest }, (response) => {
        buttonElement.disabled = false;
        buttonElement.innerHTML = originalText;

        if (chrome.runtime.lastError) {
          showToast("Erro de conexão. A página já carregou completamente?", "error");
          console.error(chrome.runtime.lastError);
          return;
        }

        if (response && response.success) {
          showToast("Dados preenchidos com sucesso!", "success");
        } else {
          showToast(response.error || "Erro ao preencher dados.", "error");
        }
      });
    } catch (error) {
      buttonElement.disabled = false;
      showToast("Erro inesperado.", "error");
    }
  }

  async function checkValidTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || tabs.length === 0) {
          resolve(false);
          return;
        }
        const url = tabs[0].url;
        // Check if it's a valid Condfy URL (can be customized if needed)
        // For development/testing, we can just allow everything if not in strict mode, 
        // but let's stick to the requirements.
        if (url && (url.includes('condfy.com.br') || url.includes('localhost') || url.includes('127.0.0.1'))) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    
    toast.className = 'toast ' + type;
    toastMsg.textContent = message;
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
});
