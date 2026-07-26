# EasyLink - Condfy

Extensão do Google Chrome para orquestração e Auto-fill de hóspedes do NCollect para o Condfy.
Desenvolvida com a identidade visual da **rezervo** e interface de ponta.

## Como Instalar (Modo Desenvolvedor)

1. Faça o download ou clone deste diretório.
2. No Google Chrome, acesse `chrome://extensions/`.
3. Ative o **Modo do desenvolvedor** (chave no canto superior direito).
4. Clique em **Carregar sem compactação** (Load unpacked).
5. Selecione a pasta `easylink-condfy-extension`.
6. A extensão aparecerá na sua lista. Fixe-a na barra de ferramentas para fácil acesso.

## Ícones
Lembre-se de adicionar as imagens reais do ícone da extensão dentro da pasta `assets/` (icon16.png, icon48.png, icon128.png) antes de publicar a extensão.

## Estrutura Técnica
- **Manifest V3**: Padrão de segurança e performance moderno do Google Chrome.
- **Service Worker (`background.js`)**: Trabalha de forma independente da página ativa e (no futuro) ficará responsável por buscar os dados da API NCollect de forma resiliente.
- **Content Script (`content.js`)**: Roda no contexto do Condfy e altera os inputs. Está programado para disparar Eventos Sintéticos `input` e `change`, forçando frameworks SPA (React/Vue) a registrarem as digitações simuladas. Também constrói um objeto `DataTransfer` para injeção programática do arquivo de Selfie.
- **Interface Premium**: Construída do zero com HTML/CSS otimizado. Suporta `Glassmorphism`, `CSS Keyframes` e paleta de cores estrita (Dark & Cyan `#00A3FF`).
