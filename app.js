/* MOZMATCH public demo: fictitious profiles and browser-local interactions only. */
const $ = (selector) => document.querySelector(selector);
const profileCatalog = [
  { id: "amelia", name: "Amélia", age: 24, city: "Maputo", distance: "2 km", initials: "AM", art: "art-coral", bio: "Café, música ao vivo e passeios pela marginal. Acredito que as melhores conversas começam com um olá.", tags: ["Música", "Café", "Praia"], matchOnLike: true },
  { id: "luis", name: "Luís", age: 27, city: "Matola", distance: "8 km", initials: "LM", art: "art-blue", bio: "Fotografia, futebol e descobrir bons lugares para comer. Sempre pronto para uma nova aventura.", tags: ["Fotografia", "Futebol", "Comida"] },
  { id: "yara", name: "Yara", age: 23, city: "Beira", distance: "12 km", initials: "YC", art: "art-violet", bio: "Apaixonada por viagens, livros e conversas que passam da meia-noite.", tags: ["Viagens", "Leitura", "Arte"], matchOnLike: true },
  { id: "mateus", name: "Mateus", age: 26, city: "Nampula", distance: "5 km", initials: "MC", art: "art-green", bio: "Engenheiro durante o dia, cozinheiro experimental aos fins de semana.", tags: ["Culinária", "Natureza", "Séries"] },
  { id: "celina", name: "Celina", age: 25, city: "Maputo", distance: "4 km", initials: "CM", art: "art-rose", bio: "Gosto de dançar, conhecer culturas e rir até doer a barriga.", tags: ["Dança", "Cultura", "Humor"], matchOnLike: true },
  { id: "ivo", name: "Ivo", age: 29, city: "Quelimane", distance: "9 km", initials: "IM", art: "art-gold", bio: "Mente curiosa, pés no caminho e sempre à procura do melhor pôr do sol.", tags: ["Corrida", "Música", "Praia"] },
  { id: "ines", name: "Inês", age: 28, city: "Pemba", distance: "7 km", initials: "IM", art: "art-teal", bio: "Mar, fotografia e planos espontâneos. Vamos trocar recomendações de viagem?", tags: ["Mar", "Fotografia", "Viagens"] },
];
const initialMessages = {
  yara: [
    { from: "them", text: "Olá! Também gostas de descobrir lugares novos?" },
    { from: "me", text: "Gosto muito. Tens alguma recomendação?" },
    { from: "them", text: "O próximo destino da minha lista é a Ilha de Moçambique ✨" },
  ],
  celina: [
    { from: "them", text: "Olá! Vi que também gostas de música." },
    { from: "me", text: "Sim! Que estilo costumas ouvir?" },
  ],
};
const DEMO_STORAGE_KEY = "mozmatch-demo-state-v1";
const DEFAULT_STATE = { viewed: [], matches: ["yara", "celina"], chats: initialMessages };
let state = loadState();
let activeView = "discover";
let currentChat = null;
let chatReplyTimer;
let toastTimer;

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY));
    if (stored && Array.isArray(stored.viewed) && Array.isArray(stored.matches)) {
      return { viewed: stored.viewed, matches: stored.matches, chats: stored.chats || cloneDefaultState().chats };
    }
  } catch (error) {
    console.warn("Não foi possível ler o estado da demonstração.", error);
  }
  return cloneDefaultState();
}
function saveState() {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Não foi possível guardar as ações locais.", error);
  }
}
function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}
function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}
function profileById(id) {
  return profileCatalog.find((profile) => profile.id === id);
}
function avatarMarkup(profile, sizeClass) {
  return '<span class="avatar ' + escapeHtml(profile.art) + " " + (sizeClass || "") + '" aria-hidden="true">' + escapeHtml(profile.initials) + "</span>";
}
function setDemoOpen(isOpen) {
  $("#auth-page").hidden = isOpen;
  $("#app-page").hidden = !isOpen;
  if (isOpen) showView(activeView);
}

$("#enter-demo").addEventListener("click", () => setDemoOpen(true));
$("#theme-button").addEventListener("click", toggleTheme);
$("#demo-info").addEventListener("click", () => $("#demo-info-dialog").showModal());
document.querySelectorAll("[data-close-info]").forEach((button) => button.addEventListener("click", () => $("#demo-info-dialog").close()));
document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));

function showView(name) {
  activeView = name;
  ["discover", "matches", "messages", "account"].forEach((view) => {
    $("#" + view + "-view").hidden = view !== name;
  });
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const titles = {
    discover: ["Descobrir", "Conhece novas pessoas à tua volta.", "A TUA PRÓXIMA HISTÓRIA COMEÇA AQUI"],
    matches: ["Os teus matches", "Combinações prontas para começar.", "QUANDO A LIGAÇÃO É RECÍPROCA"],
    messages: ["Mensagens", "Continua uma conversa de demonstração.", "CONVERSAS FICTÍCIAS"],
    account: ["O teu perfil", "Explora as opções da demonstração.", "BEM-VINDO AO MOZMATCH"],
  };
  $("#page-title").textContent = titles[name][0];
  $("#page-subtitle").textContent = titles[name][1];
  $("#page-kicker").textContent = titles[name][2];
  if (name === "discover") renderDiscover();
  if (name === "matches") renderMatches();
  if (name === "messages") renderMessages();
  if (name === "account") renderAccount();
}

function renderDiscover() {
  const root = $("#discover-view");
  const available = profileCatalog.filter((profile) => !state.viewed.includes(profile.id));
  if (!available.length) {
    root.innerHTML = '<div class="empty-state"><span class="empty-symbol">✦</span><h2>Já conheceste todos os perfis</h2><p>Reinicia a demonstração para explorar os perfis fictícios outra vez.</p><button id="restart-discover" class="button secondary" type="button">Ver perfis novamente</button></div>';
    $("#restart-discover").addEventListener("click", () => {
      state.viewed = [];
      saveState();
      renderDiscover();
    });
    return;
  }
  const profile = available[0];
  root.innerHTML = '<article class="profile-card"><div class="profile-art ' + escapeHtml(profile.art) + '">' +
    '<div class="portrait-orb orb-a"></div><div class="portrait-orb orb-b"></div><div class="portrait-glow"></div>' +
    '<div class="portrait-monogram">' + escapeHtml(profile.initials) + '</div><span class="profile-label"><i></i>PERFIL FICTÍCIO</span>' +
    '<span class="profile-count">' + (state.viewed.length + 1) + ' <small>/ ' + profileCatalog.length + '</small></span>' +
    '<div class="portrait-bottom"><span class="demo-avatar-tag">PERFIL DE DEMONSTRAÇÃO</span><span class="verified-mark" aria-label="Perfil fictício">✦</span></div></div>' +
    '<div class="profile-info"><div class="profile-heading"><div><h2>' + escapeHtml(profile.name) + '<span>, ' + profile.age + '</span></h2><p class="profile-city"><span aria-hidden="true">⌖</span>' + escapeHtml(profile.city) + ' <span class="city-divider">·</span> ' + escapeHtml(profile.distance) + ' de ti</p></div><button class="more-button" id="profile-more" type="button" aria-label="Informação do perfil">•••</button></div>' +
    '<p class="profile-bio">' + escapeHtml(profile.bio) + '</p><div class="tag-list">' + profile.tags.map((tag) => '<span>' + escapeHtml(tag) + '</span>').join("") + '</div>' +
    '<div class="profile-controls"><button class="round-action pass" id="pass-profile" type="button" aria-label="Passar este perfil">×</button><button class="round-action like" id="like-profile" type="button" aria-label="Gostar deste perfil">♡</button></div></div></article>' +
    '<p class="card-caption"><span>♡</span> As ações nesta versão são apenas uma simulação.</p>';
  $("#pass-profile").addEventListener("click", () => swipe(profile, false));
  $("#like-profile").addEventListener("click", () => swipe(profile, true));
  $("#profile-more").addEventListener("click", () => notify("Perfil inventado, apresentado apenas para demonstração."));
}
function swipe(profile, liked) {
  if (!state.viewed.includes(profile.id)) state.viewed.push(profile.id);
  if (liked) {
    state.matches = Array.from(new Set(state.matches.concat(profile.id)));
    if (!state.chats[profile.id]) {
      state.chats[profile.id] = [{ from: "them", text: "Olá! Esta é uma conversa fictícia para experimentares a app." }];
    }
    notify("É uma combinação de demonstração! 💚");
  } else {
    notify("Perfil passado. A tua ação só fica neste dispositivo.");
  }
  saveState();
  renderDiscover();
}

function renderMatches() {
  const root = $("#matches-view");
  const matches = state.matches.map(profileById).filter(Boolean);
  if (!matches.length) {
    root.innerHTML = '<div class="empty-state"><span class="empty-symbol">♡</span><h2>Ainda sem matches</h2><p>Gosta de um perfil fictício para simular uma combinação.</p><button class="button secondary" data-go-discover type="button">Descobrir perfis</button></div>';
    root.querySelector("[data-go-discover]").addEventListener("click", () => showView("discover"));
    return;
  }
  root.innerHTML = '<div class="section-caption"><span>' + matches.length + ' combinações</span><span>PERFIS DE DEMONSTRAÇÃO</span></div><div class="match-grid">' + matches.map((profile) =>
    '<button class="match-card" data-profile-id="' + escapeHtml(profile.id) + '" type="button">' + avatarMarkup(profile, "avatar-match") +
    '<span class="match-card-info"><strong>' + escapeHtml(profile.name) + ', ' + profile.age + '</strong><small>' + escapeHtml(profile.city) + ' · Perfil fictício</small></span><span class="match-heart">♡</span></button>'
  ).join("") + '</div><p class="local-note">Estas combinações são simuladas e não correspondem a pessoas registadas.</p>';
  root.querySelectorAll("[data-profile-id]").forEach((button) => button.addEventListener("click", () => openChat(button.dataset.profileId)));
}

function renderMessages() {
  const root = $("#messages-view");
  const matches = state.matches.map(profileById).filter(Boolean);
  if (!matches.length) {
    root.innerHTML = '<div class="empty-state"><span class="empty-symbol">▤</span><h2>As conversas aparecem aqui</h2><p>Cria um match de demonstração ao gostar de um perfil.</p><button class="button secondary" data-go-discover type="button">Ver perfis</button></div>';
    root.querySelector("[data-go-discover]").addEventListener("click", () => showView("discover"));
    return;
  }
  root.innerHTML = '<div class="conversation-list">' + matches.map((profile) => {
    const messages = state.chats[profile.id] || [];
    const lastMessage = messages.length ? messages[messages.length - 1].text : "Começa uma conversa de demonstração";
    return '<button class="conversation-item" data-profile-id="' + escapeHtml(profile.id) + '" type="button">' + avatarMarkup(profile, "avatar-conversation") +
      '<span class="conversation-copy"><strong>' + escapeHtml(profile.name) + '</strong><small>' + escapeHtml(lastMessage) + '</small></span><span class="conversation-side"><small>' + (messages.length ? "agora" : "") + '</small><b>›</b></span></button>';
  }).join("") + '</div><p class="local-note">Mensagens fictícias. O que escreveres não é enviado a ninguém.</p>';
  root.querySelectorAll("[data-profile-id]").forEach((button) => button.addEventListener("click", () => openChat(button.dataset.profileId)));
}

function openChat(profileId) {
  const profile = profileById(profileId);
  if (!profile) return;
  currentChat = profileId;
  $("#chat-title").textContent = profile.name;
  $("#chat-avatar").className = "avatar avatar-mini " + profile.art;
  $("#chat-avatar").textContent = profile.initials;
  renderChatMessages();
  $("#chat-dialog").showModal();
  $("#chat-input").focus();
}
function renderChatMessages() {
  const messages = state.chats[currentChat] || [];
  $("#chat-messages").innerHTML = messages.map((message) =>
    '<div class="chat-message ' + (message.from === "me" ? "mine" : "theirs") + '">' + escapeHtml(message.text) + '</div>'
  ).join("");
  $("#chat-messages").scrollTop = $("#chat-messages").scrollHeight;
}
$("#chat-close").addEventListener("click", () => $("#chat-dialog").close());
$("#chat-dialog").addEventListener("close", () => {
  currentChat = null;
  if (activeView === "messages") renderMessages();
  if (activeView === "matches") renderMatches();
});
$("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!currentChat) return;
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text) return;
  state.chats[currentChat] = state.chats[currentChat] || [];
  state.chats[currentChat].push({ from: "me", text: text });
  saveState();
  input.value = "";
  renderChatMessages();
  if (chatReplyTimer) clearTimeout(chatReplyTimer);
  chatReplyTimer = setTimeout(() => {
    if (!currentChat || !state.chats[currentChat]) return;
    state.chats[currentChat].push({ from: "them", text: "Obrigado pela mensagem! Esta resposta é simulada pela demonstração." });
    saveState();
    renderChatMessages();
  }, 900);
});

function renderAccount() {
  const root = $("#account-view");
  root.innerHTML = '<article class="account-card"><div class="account-hero"><span class="guest-avatar">M</span><div><p class="eyebrow">SESSÃO DE TESTE</p><h2>Visitante</h2><span class="guest-status"><i></i>Modo de demonstração</span></div></div>' +
    '<div class="account-actions"><button id="account-theme" type="button"><span><b>Modo escuro</b><small>Personaliza o aspeto da app</small></span><span class="action-value">' + (document.documentElement.classList.contains("dark") ? "Ligado" : "Desligado") + '</span></button>' +
    '<button id="account-location" type="button"><span><b>Localização</b><small>Maputo, Moçambique · Exemplo</small></span><span class="action-value">⌖</span></button>' +
    '<button id="account-premium" type="button"><span><b>MOZMATCH Premium</b><small>Mais formas de conhecer pessoas</small></span><span class="action-value premium-price">167 MT / mês</span></button>' +
    '<button id="reset-demo" type="button"><span><b>Reiniciar demonstração</b><small>Apaga as ações locais de teste</small></span><span class="action-value">↻</span></button></div></article>' +
    '<div class="privacy-card"><span class="privacy-icon">⌑</span><div><strong>Os teus dados ficam contigo</strong><p>Não recolhemos conta, e-mail, telefone, localização ou pagamentos nesta demonstração.</p></div></div>' +
    '<button id="leave-demo" class="button secondary leave-demo" type="button">Sair da demonstração</button>' +
    '<p class="version-note">MOZMATCH · Demonstração interativa</p>';
  $("#account-theme").addEventListener("click", toggleTheme);
  $("#account-location").addEventListener("click", () => notify("A localização não está ativa. Esta cidade é apenas ilustrativa."));
  $("#account-premium").addEventListener("click", () => notify("O Premium de 167 MT/mês é apenas uma apresentação. Pagamentos desligados."));
  $("#reset-demo").addEventListener("click", resetDemo);
  $("#leave-demo").addEventListener("click", () => setDemoOpen(false));
}
function resetDemo() {
  state = cloneDefaultState();
  saveState();
  showView(activeView);
  notify("Demonstração reiniciada.");
}
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("mozmatch-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  if (activeView === "account") renderAccount();
}
if (localStorage.getItem("mozmatch-theme") === "dark") document.documentElement.classList.add("dark");

window.addEventListener("offline", () => { $("#offline-banner").hidden = false; });
window.addEventListener("online", () => { $("#offline-banner").hidden = true; notify("Ligação restabelecida."); });
$("#offline-banner").hidden = navigator.onLine;

const installGuide = $("#ios-install-dialog");
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isStandalone = navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
if (isIOS && window.location.protocol === "https:" && !isStandalone) {
  document.querySelectorAll(".ios-install-button").forEach((button) => { button.hidden = false; });
}
document.querySelectorAll(".ios-install-button").forEach((button) => button.addEventListener("click", () => installGuide.showModal()));
document.querySelectorAll("[data-close-install-guide]").forEach((button) => button.addEventListener("click", () => installGuide.close()));
if ("serviceWorker" in navigator && /^https?:$/.test(window.location.protocol)) {
  navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("Não foi possível preparar o modo offline.", error));
}
