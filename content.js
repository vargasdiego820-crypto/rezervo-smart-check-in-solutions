// content.js

// Ouve mensagens enviadas pelo popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "injectData") {
    injectGuestData(request.data)
      .then(() => sendResponse({ success: true }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    
    return true; // Asynchronous response
  }
});

/**
 * Dispara eventos sintéticos para forçar frameworks como React/Vue a registrarem a mudança.
 */
function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  
  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
  
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * Função principal para preencher o formulário
 */
async function injectGuestData(guest) {
  // ATENÇÃO: Estes seletores são genéricos/baseados em atributos comuns.
  // Será necessário adaptá-á-los aos IDs ou classes exatos do Condfy no futuro.
  
  const selectors = {
    nome: "input[name*='name'], input[name*='nome'], input[type='text']:first-of-type",
    cpf: "input[name*='cpf'], input[name*='document']",
    telefone: "input[name*='phone'], input[name*='telefone'], input[type='tel']",
    checkin: "input[name*='start'], input[name*='inicio'], input[type='datetime-local']",
    checkout: "input[name*='end'], input[name*='fim'], input[type='datetime-local']:last-of-type",
    selfie: "input[type='file'], input[name*='foto'], input[name*='photo']"
  };

  const getEl = (selectorStr) => document.querySelector(selectorStr);

  // 1. Injetar Texto
  try {
    const elNome = getEl(selectors.nome);
    if (elNome) setNativeValue(elNome, guest.nome_completo);
    else throw new Error("Campo Nome não encontrado no layout do Condfy.");

    const elCpf = getEl(selectors.cpf);
    // Limpando CPF para manter só números (se o Condfy exigir)
    if (elCpf) setNativeValue(elCpf, guest.cpf.replace(/\D/g, ''));
    else console.warn("Campo CPF não encontrado."); // Não vamos quebrar tudo por 1 campo

    const elPhone = getEl(selectors.telefone);
    if (elPhone) setNativeValue(elPhone, guest.telefone.replace(/\D/g, ''));
    
    // As datas precisam estar no formato aceito pelo input do tipo date/datetime-local (YYYY-MM-DDThh:mm)
    const elCheckin = getEl(selectors.checkin);
    if (elCheckin) setNativeValue(elCheckin, guest.checkin_date);

    const elCheckout = getEl(selectors.checkout);
    if (elCheckout) setNativeValue(elCheckout, guest.checkout_date);

  } catch (error) {
    throw error;
  }

  // 2. Injetar a Selfie (Download -> Blob -> File -> DataTransfer)
  try {
    const elFile = getEl(selectors.selfie);
    if (elFile && guest.selfie_url) {
      // Baixar imagem
      const response = await fetch(guest.selfie_url);
      const blob = await response.blob();
      const file = new File([blob], `selfie_${guest.id}.jpg`, { type: blob.type });

      // Construir DataTransfer sintético
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      
      // Atribuir os arquivos
      elFile.files = dataTransfer.files;
      elFile.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      console.warn("Input de arquivo não encontrado ou selfie_url não fornecida.");
    }
  } catch (error) {
    console.warn("Erro ao injetar selfie:", error);
  }
}
