# MOZMATCH — experiência web instalável

MOZMATCH é uma demonstração interativa que abre no navegador e pode ser adicionada ao ecrã inicial do iPhone como PWA quando publicada em HTTPS.

## Compartimentos incluídos

- **Início:** Stories, publicações com fotos, vídeo no feed e Reels.
- **Descobrir:** perfis fictícios com fotos ilustrativas, gostos e ações de demonstração.
- **Moz Pega-Pega:** desafio interativo de perguntas para iniciar uma conversa.
- **Matches** e **Mensagens:** combinações e conversas simuladas, guardadas apenas neste dispositivo.
- **Mapa:** subaba de Mensagens com mapa ilustrativo de Moçambique, seleção de cidade e mapa de ruas do OpenStreetMap.
- **Perfil:** modo escuro, estado da demonstração e opções de localização e Premium ilustrativas.
- **Entrada:** ecrã de boas-vindas e formulário de login demonstrativo.

## Transparência

- Os nomes, idades, biografias, publicações, fotos, Matches e conversas são fictícios ou ilustrativos. As pessoas das fotos não são utilizadoras do MOZMATCH.
- O formulário de login não autentica contas: qualquer e-mail e palavra-passe abrem a demonstração. O conteúdo dos campos não é enviado nem guardado.
- O mapa usa uma cidade de demonstração; não pede nem partilha a localização do telefone.
- Gostos, Matches e mensagens ficam no armazenamento local do navegador. Não são enviados a outras pessoas.
- Premium de **167 MT/mês** e pagamentos por e-Mola aparecem apenas como exemplos; não há cobrança.
- Fotos, vídeos e o mapa de ruas requerem ligação à internet. Os vídeos só começam a carregar quando são reproduzidos.

As fotografias e vídeos de exemplo são do [Pexels](https://www.pexels.com/license/). O mapa de ruas usa [OpenStreetMap](https://www.openstreetmap.org/copyright).

## Publicar no GitHub Pages

Enviar para a raiz do repositório os ficheiros `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `sw.js` e a pasta `assets/`. No GitHub, abrir **Settings → Pages**, escolher **Deploy from a branch**, a branch `main` e a pasta `/(root)`. O endereço publicado usa HTTPS.

## Instalar no iPhone

1. Abre o endereço HTTPS no Safari. Se o abriste pelo Telegram, escolhe **Abrir no Safari**.
2. Toca em **Partilhar** e depois em **Adicionar ao ecrã principal**.
3. Ativa **Abrir como app web** e toca em **Adicionar**.

O ícone abre a experiência em ecrã próprio. Continua a ser uma aplicação web instalável; não é um IPA distribuído pela App Store.

## Próxima etapa para uso com pessoas reais

Antes de receber utilizadores, é necessário ligar autenticação e recuperação de conta reais, backend, base de dados, armazenamento seguro, privacidade, moderação, notificações e pagamentos. Esta publicação é uma demonstração e não liga pessoas reais.
