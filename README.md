# MOZMATCH — demonstração web instalável

Uma demonstração interativa da experiência MOZMATCH. Pode ser aberta num navegador e instalada no ecrã inicial do iPhone como PWA quando estiver publicada em HTTPS.

## Transparência da demonstração

- Todos os nomes, idades, biografias, perfis, matches e conversas são fictícios.
- Não há criação de conta, login, recuperação de palavra-passe ou recolha de dados pessoais.
- Mensagens e gostos são simulações locais; nada é enviado a outra pessoa.
- Não há localização real, pagamentos, Premium ativo ou contas de utilizador.
- O estado de demonstração fica guardado no armazenamento local do navegador e pode ser apagado em Perfil → Reiniciar demonstração.

Esta versão mostra o aspeto e o fluxo do produto. Não é ainda o serviço de produção para ligar pessoas reais.

## Experiência incluída

- Ecrã inicial de demonstração, com identidade visual MOZMATCH.
- Perfis fictícios de várias cidades moçambicanas, identificados como demonstração.
- Ações de passar/gostar e matches simulados.
- Lista de conversas fictícias e envio de mensagens guardadas apenas no dispositivo.
- Modo escuro.
- Estado offline e instalação como PWA no iPhone.
- Opções Premium e localização apresentadas como exemplos, sem cobrança ou rastreamento.

## Publicar no GitHub Pages

Enviar para a raiz de um repositório os ficheiros desta pasta: index.html, app.js, styles.css, manifest.webmanifest, sw.js e assets/. No GitHub, abrir Settings → Pages, escolher Deploy from a branch, branch main, pasta /(root). O GitHub Pages publica o site num endereço HTTPS.

## Instalar no iPhone

1. Abre o endereço HTTPS no Safari. Se abriste pelo Telegram, escolhe Abrir no Safari.
2. Toca em Partilhar e depois em Adicionar ao ecrã principal.
3. Ativa Abrir como app web e toca em Adicionar.

O ícone abre esta PWA em ecrã próprio. Continua a ser uma aplicação web instalada pelo navegador, não uma aplicação distribuída pela App Store.

## Próxima etapa antes de lançar para pessoas reais

Uma versão de produção precisa de backend, contas verdadeiras, regras de privacidade, armazenamento, moderação, notificações e pagamentos integrados e testados. As contas fictícias desta demonstração não representam utilizadores registados.
