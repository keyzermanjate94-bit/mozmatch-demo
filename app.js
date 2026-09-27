/* MOZMATCH public demo: fictitious profiles and browser-local interactions only. */
const $ = (selector) => document.querySelector(selector);
const profileCatalog = [
  { id: "amelia", name: "Amélia", age: 24, city: "Maputo", distance: "2 km", initials: "AM", art: "art-coral", photo: "https://images.pexels.com/photos/15324080/pexels-photo-15324080/free-photo-of-smiling-woman-portrait.jpeg?auto=compress&cs=tinysrgb&w=1000", bio: "Café, música ao vivo e passeios pela marginal. Acredito que as melhores conversas começam com um olá.", tags: ["Música", "Café", "Praia"], matchOnLike: true },
  { id: "luis", name: "Luís", age: 27, city: "Matola", distance: "8 km", initials: "LM", art: "art-blue", photo: "https://images.pexels.com/photos/15399495/pexels-photo-15399495.jpeg?auto=compress&cs=tinysrgb&w=1000", bio: "Fotografia, futebol e descobrir bons lugares para comer. Sempre pronto para uma nova aventura.", tags: ["Fotografia", "Futebol", "Comida"] },
  { id: "yara", name: "Yara", age: 23, city: "Beira", distance: "12 km", initials: "YC", art: "art-violet", photo: "https://images.pexels.com/photos/36439572/pexels-photo-36439572.jpeg?auto=compress&cs=tinysrgb&w=1000", bio: "Apaixonada por viagens, livros e conversas que passam da meia-noite.", tags: ["Viagens", "Leitura", "Arte"], matchOnLike: true },
  { id: "mateus", name: "Mateus", age: 26, city: "Nampula", distance: "5 km", initials: "MC", art: "art-green", bio: "Engenheiro durante o dia, cozinheiro experimental aos fins de semana.", tags: ["Culinária", "Natureza", "Séries"] },
  { id: "celina", name: "Celina", age: 25, city: "Maputo", distance: "4 km", initials: "CM", art: "art-rose", photo: "https://images.pexels.com/photos/2362887/pexels-photo-2362887.jpeg?auto=compress&cs=tinysrgb&w=1000", bio: "Gosto de dançar, conhecer culturas e rir até doer a barriga.", tags: ["Dança", "Cultura", "Humor"], matchOnLike: true },
  { id: "ivo", name: "Ivo", age: 29, city: "Quelimane", distance: "9 km", initials: "IM", art: "art-gold", bio: "Mente curiosa, pés no caminho e sempre à procura do melhor pôr do sol.", tags: ["Corrida", "Música", "Praia"] },
  { id: "ines", name: "Inês", age: 28, city: "Pemba", distance: "7 km", initials: "IM", art: "art-teal", bio: "Mar, fotografia e planos espontâneos. Vamos trocar recomendações de viagem?", tags: ["Mar", "Fotografia", "Viagens"] },
  { id: "dario", name: "Dário", age: 26, city: "Maputo", distance: "3 km", initials: "DA", art: "art-gold", photo: "https://images.pexels.com/photos/15399495/pexels-photo-15399495.jpeg?auto=compress&cs=tinysrgb&w=1000", bio: "Marrabenta, praia e conversas que começam sem pressa.", tags: ["Música", "Praia", "Maputo"] },
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
const gameQuestions = [
  { prompt: "Uma primeira conversa ideal começa com…", answers: ["Um café e uma conversa sem pressa", "Um passeio ao fim da tarde", "Uma playlist para partilhar"] },
  { prompt: "Que som combina com um sábado em Maputo?", answers: ["Marrabenta para dançar", "Afro-pop no caminho", "Uma música surpresa"] },
  { prompt: "Escolhe um plano simples para o fim de semana:", answers: ["Praia e pôr do sol", "Mercado local e petiscos", "Filme, conversa e pipocas"] },
];
const feedStories = [
  { name: "Lia", initials: "LI", photo: "https://images.pexels.com/photos/2362887/pexels-photo-2362887.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Amélia", initials: "AM", photo: "https://images.pexels.com/photos/15324080/pexels-photo-15324080/free-photo-of-smiling-woman-portrait.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Dário", initials: "DA", photo: "https://images.pexels.com/photos/15399495/pexels-photo-15399495.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Yara", initials: "YA", photo: "https://images.pexels.com/photos/36439572/pexels-photo-36439572.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Celina", initials: "CE", photo: "https://images.pexels.com/photos/2362887/pexels-photo-2362887.jpeg?auto=compress&cs=tinysrgb&w=500" },
];
const feedPosts = [
  { name: "Lia", initials: "LI", city: "Maputo", photo: "https://images.pexels.com/photos/2362887/pexels-photo-2362887.jpeg?auto=compress&cs=tinysrgb&w=1000", art: "art-rose", caption: "Um café, boa música e uma conversa sem pressa ☕", alt: "Fotografia ilustrativa de uma mulher sorridente" },
  { name: "Amélia", initials: "AM", city: "Matola", photo: "https://images.pexels.com/photos/15324080/pexels-photo-15324080/free-photo-of-smiling-woman-portrait.jpeg?auto=compress&cs=tinysrgb&w=1000", art: "art-green", caption: "A guardar pequenos momentos bonitos da semana 🌿", alt: "Fotografia ilustrativa de uma mulher sorridente" },
];
const DEMO_STORAGE_KEY = "mozmatch-demo-state-v1";
const DEFAULT_STATE = { viewed: [], matches: ["yara", "celina"], chats: initialMessages, gameMode: "intro", gameQuestionIndex: 0 };
let state = loadState();
let activeView = "feed";
let currentChat = null;
let messagesPanel = "chats";
let messageMapCity = "Maputo";
let chatReplyTimer;
let toastTimer;
let loginOpen = false;

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY));
    if (stored && Array.isArray(stored.viewed) && Array.isArray(stored.matches)) {
      return { viewed: stored.viewed, matches: stored.matches, chats: stored.chats || cloneDefaultState().chats,
        gameMode: stored.gameMode || "intro", gameQuestionIndex: Number.isInteger(stored.gameQuestionIndex) ? stored.gameQuestionIndex : 0 };
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
  const image = profile.photo ? '<img src="' + escapeHtml(profile.photo) + '" alt="" loading="lazy">' : escapeHtml(profile.initials);
  return '<span class="avatar ' + escapeHtml(profile.art) + " " + (sizeClass || "") + (profile.photo ? ' image-avatar' : '') + '" aria-hidden="true">' + image + "</span>";
}
function setDemoOpen(isOpen) {
  loginOpen = false;
  $("#auth-page").hidden = isOpen;
  $("#login-page").hidden = true;
  $("#app-page").hidden = !isOpen;
  if (isOpen) showView(activeView);
}

function showLogin() {
  loginOpen = true;
  $("#auth-page").hidden = true;
  $("#login-page").hidden = false;
  $("#app-page").hidden = true;
  $("#login-email").focus();
}

$("#enter-demo").addEventListener("click", () => setDemoOpen(true));
$("#open-login").addEventListener("click", showLogin);
$("#back-to-welcome").addEventListener("click", () => {
  loginOpen = false;
  $("#login-page").hidden = true;
  $("#auth-page").hidden = false;
});
$("#login-guest").addEventListener("click", () => setDemoOpen(true));
$("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  event.currentTarget.reset();
  setDemoOpen(true);
  notify("Entrada de demonstração. Nenhum dado foi enviado ou guardado.");
});
$("#forgot-password").addEventListener("click", () => notify("A recuperação será ligada quando o MOZMATCH tiver contas reais. Nesta demonstração, podes entrar com qualquer e-mail."));
$("#theme-button").addEventListener("click", toggleTheme);
$("#demo-info").addEventListener("click", () => $("#demo-info-dialog").showModal());
document.querySelectorAll("[data-close-info]").forEach((button) => button.addEventListener("click", () => $("#demo-info-dialog").close()));
document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));

function renderFeed() {
  const root = $("#feed-view");
  const stories = feedStories.map((story, index) => '<button class="feed-story" data-story-index="' + index + '" type="button" aria-label="Ver story fictício de ' + escapeHtml(story.name) + '"><span class="feed-story-ring"><img src="' + escapeHtml(story.photo) + '" alt="" loading="lazy"></span><span class="feed-story-name">' + escapeHtml(story.name) + '</span></button>').join("");
  const posts = feedPosts.map((post, index) => '<article class="feed-post"><div class="feed-post-head"><span class="avatar image-avatar feed-post-avatar"><img src="' + escapeHtml(post.photo) + '" alt="" loading="lazy"></span><div class="feed-post-copy"><strong>' + escapeHtml(post.name) + ' · perfil fictício</strong><small>' + escapeHtml(post.city) + ' · publicação ilustrativa</small></div><span class="feed-demo-tag">DEMO</span></div><p class="feed-post-text">' + escapeHtml(post.caption) + '</p><div class="feed-photo-wrap"><img class="feed-photo" src="' + escapeHtml(post.photo) + '" alt="' + escapeHtml(post.alt) + '" loading="lazy"><span class="feed-photo-label">FOTO ILUSTRATIVA</span></div><p class="feed-photo-credit">Imagem de stock do Pexels. A pessoa da foto não é utilizadora do MOZMATCH.</p><div class="feed-post-actions"><button type="button" data-feed-like="' + index + '">♡&nbsp; Gostar</button><button type="button" data-feed-comment="' + index + '">◯&nbsp; Comentar</button><button type="button" data-feed-share="' + index + '">↗&nbsp; Partilhar</button></div></article>').join("");
  root.innerHTML = '<section class="feed-hero"><p class="eyebrow">MOZMATCH · MOÇAMBIQUE</p><h2>As boas conexões começam com um olá.</h2><p>Descobre pessoas, partilha momentos e deixa a conversa acontecer.</p></section>' +
    '<div class="feed-section-heading"><h2>Stories de hoje</h2><span>Perfis fictícios</span></div><div class="feed-stories"><button class="feed-story add" data-create-story type="button"><span class="feed-story-ring"><span class="feed-story-placeholder">+</span></span><span class="feed-story-name">O teu</span></button>' + stories + '</div>' +
    '<div class="feed-section-heading"><h2>Para ti</h2><span>Fotos de demonstração</span></div>' + posts +
    '<div class="feed-section-heading"><h2>Vídeo no feed</h2><span>Stock · Pexels</span></div><article class="feed-post"><div class="feed-post-head"><span class="avatar art-violet feed-post-avatar">YA</span><div class="feed-post-copy"><strong>Yara · perfil fictício</strong><small>Praia em Moçambique · vídeo ilustrativo</small></div><span class="feed-demo-tag">DEMO</span></div><video class="feed-video" controls playsinline preload="none" poster="https://images.pexels.com/videos/35263579/free-video-35263579.jpg?auto=compress&cs=tinysrgb&w=900"><source src="https://videos.pexels.com/video-files/35263579/14939375_1920_1080_60fps.mp4" type="video/mp4">O teu navegador não conseguiu abrir este vídeo.</video><p class="feed-video-credit">Vídeo de stock do Pexels · reprodução só começa quando tocares em Play.</p></article>' +
    '<div class="feed-section-heading"><h2>Reels</h2><span>Vídeos curtos</span></div><div class="reel-section"><article class="reel-preview"><span class="reel-preview-label">REEL · MAPUTO</span><video controls playsinline preload="none" poster="https://images.pexels.com/videos/35263579/free-video-35263579.jpg?auto=compress&cs=tinysrgb&w=900"><source src="https://videos.pexels.com/video-files/35263579/14939375_1920_1080_60fps.mp4" type="video/mp4">Vídeo não suportado.</video></article><article class="reel-preview"><span class="reel-preview-label">REEL · DANÇA</span><video controls playsinline preload="none" poster="https://images.pexels.com/videos/9653700/free-video-9653700.jpg?auto=compress&cs=tinysrgb&w=900"><source src="https://videos.pexels.com/video-files/9653700/9653700-hd_1920_1080_25fps.mp4" type="video/mp4">Vídeo não suportado.</video></article></div>' +
    '<p class="local-note">Fotos, stories, perfis e publicações são ilustrativos e não representam contas reais.</p>';
  root.querySelectorAll("[data-story-index]").forEach((button) => button.addEventListener("click", () => {
    const story = feedStories[Number(button.dataset.storyIndex)];
    $("#story-title").textContent = story.name + " · perfil fictício";
    $("#story-photo").src = story.photo;
    $("#story-dialog").showModal();
  }));
  root.querySelector("[data-create-story]").addEventListener("click", () => notify("Adicionar Stories estará disponível numa versão futura."));
  root.querySelectorAll("[data-feed-like]").forEach((button) => button.addEventListener("click", () => {
    const liked = button.classList.toggle("liked");
    button.innerHTML = liked ? "♥&nbsp; Gostaste" : "♡&nbsp; Gostar";
  }));
  root.querySelectorAll("[data-feed-comment]").forEach((button) => button.addEventListener("click", () => notify("Comentários de demonstração.")));
  root.querySelectorAll("[data-feed-share]").forEach((button) => button.addEventListener("click", () => notify("Partilha de demonstração.")));
}

document.querySelectorAll("[data-close-story]").forEach((button) => button.addEventListener("click", () => $("#story-dialog").close()));

function renderGame() {
  const root = $("#game-view");
  if (state.gameMode === "playing") {
    const question = gameQuestions[state.gameQuestionIndex] || gameQuestions[0];
    root.innerHTML = '<section class="game-hero"><p class="eyebrow">MOZ PEGA-PEGA · DESAFIO</p><h2>Vamos quebrar o gelo.</h2><p>Escolhe as respostas que combinam contigo. Este desafio é fictício e decorre apenas nesta demonstração.</p></section>' +
      '<article class="game-card"><div class="game-invite"><span class="game-person-photo"><img src="' + escapeHtml(profileById("dario").photo) + '" alt="" loading="lazy"></span><div><strong>Tu e Dário</strong><small>Perfil fictício · Maputo</small></div></div><div class="game-progress">' + gameQuestions.map((_, index) => '<i class="' + (index <= state.gameQuestionIndex ? "done" : "") + '"></i>').join("") + '</div><h3 class="game-question">' + escapeHtml(question.prompt) + '</h3><div class="game-answers">' + question.answers.map((answer, index) => '<button class="game-answer" data-game-answer="' + index + '" type="button">' + escapeHtml(answer) + '</button>').join("") + '</div><p class="game-note">As respostas são de demonstração e ficam apenas neste dispositivo.</p></article>';
    root.querySelectorAll("[data-game-answer]").forEach((button) => button.addEventListener("click", () => answerGame(Number(button.dataset.gameAnswer))));
    return;
  }
  if (state.gameMode === "complete") {
    root.innerHTML = '<section class="game-hero"><p class="eyebrow">MOZ PEGA-PEGA · CONCLUÍDO</p><h2>A conversa começou! ✨</h2><p>O desafio abriu uma combinação fictícia para poderes experimentar as mensagens.</p></section><article class="game-card game-result"><span class="game-result-icon">💬</span><h3>Tu e Dário combinaram</h3><p>Na app real, só haveria Match se as duas pessoas escolhessem continuar.</p><div class="game-actions"><button class="button primary" data-game-chat type="button">Abrir conversa</button><button class="button secondary" data-game-restart type="button">Jogar outra vez</button></div></article>';
    root.querySelector("[data-game-chat]").addEventListener("click", () => openChat("dario"));
    root.querySelector("[data-game-restart]").addEventListener("click", restartGame);
    return;
  }
  root.innerHTML = '<section class="game-hero"><p class="eyebrow">DESAFIO DE CONVERSA</p><h2>Moz Pega-Pega</h2><p>Uma forma leve e divertida de começar a conhecer alguém. Responde a três perguntas e vê como a conversa pode fluir.</p></section><article class="game-card game-result"><div class="game-invite"><span class="game-person-photo"><img src="' + escapeHtml(profileById("dario").photo) + '" alt="" loading="lazy"></span><div><strong>O Dário lançou-te um desafio</strong><small>Perfil fictício · convite de demonstração</small></div></div><p>Respondam a três perguntas divertidas. No fim, a demonstração simula um Match e abre a conversa.</p><div class="game-actions"><button class="button primary" data-game-accept type="button">Aceitar desafio</button><button class="button secondary" data-game-decline type="button">Agora não</button></div><p class="game-note">Este jogo usa personagens e respostas fictícias; não envia convites a outras pessoas.</p></article>';
  root.querySelector("[data-game-accept]").addEventListener("click", () => {
    state.gameMode = "playing";
    state.gameQuestionIndex = 0;
    saveState();
    renderGame();
  });
  root.querySelector("[data-game-decline]").addEventListener("click", () => {
    state.gameMode = "declined";
    saveState();
    notify("Tudo bem. O desafio fica disponível quando quiseres.");
  });
}

function answerGame() {
  if (state.gameQuestionIndex < gameQuestions.length - 1) {
    state.gameQuestionIndex += 1;
    saveState();
    renderGame();
    return;
  }
  state.gameMode = "complete";
  if (!state.matches.includes("dario")) state.matches.push("dario");
  if (!state.chats.dario) state.chats.dario = [{ from: "them", text: "Gostei das tuas respostas! Esta conversa é fictícia 😊" }];
  saveState();
  renderGame();
}

function restartGame() {
  state.gameMode = "intro";
  state.gameQuestionIndex = 0;
  saveState();
  renderGame();
}

function showView(name) {
  activeView = name;
  ["feed", "discover", "matches", "game", "messages", "account"].forEach((view) => {
    $("#" + view + "-view").hidden = view !== name;
  });
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const titles = {
    feed: ["Início", "Stories, fotos e momentos da comunidade.", "A COMUNIDADE MOZMATCH"],
    discover: ["Descobrir", "Conhece novas pessoas à tua volta.", "A TUA PRÓXIMA HISTÓRIA COMEÇA AQUI"],
    matches: ["Os teus matches", "Combinações prontas para começar.", "QUANDO A LIGAÇÃO É RECÍPROCA"],
    game: ["Moz Pega-Pega", "Uma forma leve de começar a conversa.", "DESAFIO DE CONVERSA"],
    messages: ["Mensagens", "Continua uma conversa de demonstração.", "CONVERSAS FICTÍCIAS"],
    account: ["O teu perfil", "Explora as opções da demonstração.", "BEM-VINDO AO MOZMATCH"],
  };
  $("#page-title").textContent = titles[name][0];
  $("#page-subtitle").textContent = titles[name][1];
  $("#page-kicker").textContent = titles[name][2];
  if (name === "feed") renderFeed();
  if (name === "discover") renderDiscover();
  if (name === "matches") renderMatches();
  if (name === "game") renderGame();
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
  root.innerHTML = '<article class="profile-card"><div class="profile-art ' + escapeHtml(profile.art) + (profile.photo ? ' has-photo' : '') + '">' +
    (profile.photo ? '<img class="profile-photo-image" src="' + escapeHtml(profile.photo) + '" alt="Fotografia de stock; perfil fictício" loading="eager">' : '<div class="portrait-orb orb-a"></div><div class="portrait-orb orb-b"></div><div class="portrait-glow"></div><div class="portrait-monogram">' + escapeHtml(profile.initials) + '</div>') +
    '<span class="profile-label"><i></i>PERFIL FICTÍCIO</span>' +
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
  const messageTabs = '<div class="message-tabs" role="tablist" aria-label="Mensagens"><button class="message-tab ' + (messagesPanel === "chats" ? "active" : "") + '" data-message-panel="chats" type="button" role="tab" aria-selected="' + (messagesPanel === "chats") + '">Conversas</button><button class="message-tab ' + (messagesPanel === "map" ? "active" : "") + '" data-message-panel="map" type="button" role="tab" aria-selected="' + (messagesPanel === "map") + '">Mapa</button></div>';
  root.innerHTML = messageTabs + (messagesPanel === "map" ? renderMessageMap() : renderConversationPanel());
  root.querySelectorAll("[data-message-panel]").forEach((button) => button.addEventListener("click", () => {
    messagesPanel = button.dataset.messagePanel;
    renderMessages();
  }));
  root.querySelectorAll("[data-map-city]").forEach((button) => button.addEventListener("click", () => {
    messageMapCity = button.dataset.mapCity;
    renderMessages();
  }));
  root.querySelectorAll("[data-profile-id]").forEach((button) => button.addEventListener("click", () => openChat(button.dataset.profileId)));
  root.querySelector("[data-go-discover]")?.addEventListener("click", () => showView("discover"));
}

const messageMapCities = [
  { name: "Maputo", x: 87, y: 284, lat: -25.9692, lng: 32.5732 }, { name: "Matola", x: 82, y: 290, lat: -25.9622, lng: 32.4589 },
  { name: "Xai-Xai", x: 94, y: 238, lat: -25.0519, lng: 33.6442 }, { name: "Inhambane", x: 112, y: 207, lat: -23.865, lng: 35.383 },
  { name: "Beira", x: 142, y: 155, lat: -19.8436, lng: 34.8389 }, { name: "Chimoio", x: 115, y: 146, lat: -19.1164, lng: 33.483 },
  { name: "Tete", x: 115, y: 89, lat: -16.1564, lng: 33.5867 }, { name: "Quelimane", x: 174, y: 112, lat: -17.8786, lng: 36.8883 },
  { name: "Nampula", x: 220, y: 71, lat: -15.1165, lng: 39.2666 }, { name: "Lichinga", x: 155, y: 43, lat: -13.3128, lng: 35.2406 },
  { name: "Pemba", x: 247, y: 33, lat: -12.9739, lng: 40.5178 },
];
function renderMessageMap() {
  const city = messageMapCities.find((item) => item.name === messageMapCity) || messageMapCities[0];
  const selected = profileCatalog.filter((profile) => profile.city === city.name).slice(0, 2);
  const sampleProfiles = selected.length ? selected : profileCatalog.slice(0, 2);
  const streetMap = new URL("https://www.openstreetmap.org/export/embed.html");
  streetMap.searchParams.set("bbox", [city.lng - 0.36, city.lat - 0.27, city.lng + 0.36, city.lat + 0.27].join(","));
  streetMap.searchParams.set("layer", "mapnik");
  streetMap.searchParams.set("marker", city.lat + "," + city.lng);
  const pins = messageMapCities.map((item) => '<g class="message-map-pin ' + (item.name === city.name ? "selected" : "") + '" data-map-city="' + escapeHtml(item.name) + '" tabindex="0" role="button" aria-label="Escolher ' + escapeHtml(item.name) + '"><circle cx="' + item.x + '" cy="' + item.y + '" r="' + (item.name === city.name ? 7 : 5) + '"></circle>' + (["Maputo", "Xai-Xai", "Beira", "Tete", "Nampula", "Pemba"].includes(item.name) ? '<text x="' + (item.x + 9) + '" y="' + (item.y - 5) + '">' + escapeHtml(item.name) + '</text>' : "") + '</g>').join("");
  return '<section class="message-map-panel"><div class="message-map-intro"><div><p class="eyebrow">MOZMATCH EM MOÇAMBIQUE</p><h2>Descobre por cidade</h2><p>Explora locais e perfis fictícios sem sair das mensagens.</p></div><span class="message-map-mark">⌖</span></div>' +
    '<div class="message-city-current"><span>⌖</span><div><small>Área de demonstração</small><strong>' + escapeHtml(city.name) + ', Moçambique</strong></div><span class="message-map-demo">DEMO</span></div>' +
    '<div class="message-moz-map"><svg viewBox="0 0 300 320" role="img" aria-label="Mapa ilustrativo de Moçambique com cidades"><path class="message-moz-country" d="M65 12 L235 13 L246 30 L239 53 L253 78 L245 104 L253 130 L260 156 L250 182 L243 211 L226 235 L207 254 L182 266 L157 281 L130 298 L102 311 L81 300 L78 279 L86 260 L79 240 L86 220 L77 201 L85 181 L78 160 L87 139 L80 118 L90 98 L81 78 L92 57 L83 37 L92 20 Z"></path><text class="message-map-country-label" x="146" y="211" transform="rotate(-59 146 211)" text-anchor="middle">MOÇAMBIQUE</text>' + pins + '</svg><small>Toca numa cidade para a escolher</small></div>' +
    '<div class="message-city-chips">' + ["Maputo", "Beira", "Nampula", "Pemba", "Tete", "Quelimane"].map((name) => '<button class="message-city-chip ' + (messageMapCity === name ? "selected" : "") + '" data-map-city="' + name + '" type="button">' + name + '</button>').join("") + '</div>' +
    '<section class="message-street-map"><div><strong>Mapa de ruas · ' + escapeHtml(city.name) + '</strong><span>Online</span></div><iframe src="' + escapeHtml(streetMap.href) + '" title="Mapa de ruas de ' + escapeHtml(city.name) + ', Moçambique" loading="lazy"></iframe><a href="https://www.openstreetmap.org/?mlat=' + city.lat + '&mlon=' + city.lng + '#map=12/' + city.lat + '/' + city.lng + '" target="_blank" rel="noopener">© OpenStreetMap contributors · Abrir mapa</a></section>' +
    '<div class="message-nearby"><div class="message-nearby-head"><strong>Perfis de demonstração</strong><span>na comunidade</span></div>' + sampleProfiles.map((profile) => '<div class="message-nearby-row">' + avatarMarkup(profile, "message-nearby-avatar") + '<span><strong>' + escapeHtml(profile.name) + ', ' + profile.age + '</strong><small>' + escapeHtml(profile.city) + ' · perfil fictício</small></span><b>DEMO</b></div>').join("") + '</div>' +
    '<p class="message-map-privacy">A cidade é apenas ilustrativa. A demonstração não pede nem partilha a localização do teu telefone.</p></section>';
}

function renderConversationPanel() {
  const matches = state.matches.map(profileById).filter(Boolean);
  if (!matches.length) {
    return '<div class="empty-state"><span class="empty-symbol">▤</span><h2>As conversas aparecem aqui</h2><p>Cria um match de demonstração ao gostar de um perfil.</p><button class="button secondary" data-go-discover type="button">Ver perfis</button></div>';
  }
  return '<div class="conversation-list">' + matches.map((profile) => {
    const messages = state.chats[profile.id] || [];
    const lastMessage = messages.length ? messages[messages.length - 1].text : "Começa uma conversa de demonstração";
    return '<button class="conversation-item" data-profile-id="' + escapeHtml(profile.id) + '" type="button">' + avatarMarkup(profile, "avatar-conversation") +
      '<span class="conversation-copy"><strong>' + escapeHtml(profile.name) + '</strong><small>' + escapeHtml(lastMessage) + '</small></span><span class="conversation-side"><small>' + (messages.length ? "agora" : "") + '</small><b>›</b></span></button>';
  }).join("") + '</div><p class="local-note">Mensagens fictícias. O que escreveres não é enviado a ninguém.</p>';
}

function openChat(profileId) {
  const profile = profileById(profileId);
  if (!profile) return;
  currentChat = profileId;
  $("#chat-title").textContent = profile.name;
  $("#chat-avatar").className = "avatar avatar-mini " + profile.art + (profile.photo ? " image-avatar" : "");
  $("#chat-avatar").innerHTML = profile.photo ? '<img src="' + escapeHtml(profile.photo) + '" alt="">' : escapeHtml(profile.initials);
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
