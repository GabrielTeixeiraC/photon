# Escopo do Sistema
## Objetivo
O objetivo do nosso sistema é criar uma rede de compartilhamento de imagens.
## Principais Features
- Página de Login
- Feed de Imagens adicionadas por pessoas às quais o usuário se conectou ou imagens que se encaixam em uma categoria escolhida
- Sistema para postagem de imagens próprias do usuário
# Membros da Equipe
- Gabriel Lima Barros - Backend Dev
- Gabriel Teixeira Carvalho - Full Stack
- Mateus Braghini Pardini - Full Stack
# Tecnologias
- NodeJs
- TypeScript
- ReactJs
- SQLite
# Backlog do Produto
## Armazenar fotos dos usuários
- Como usuário quero poder enviar uma foto para o sistema e ter ela armazenada.
## Deletar uma foto
- Como usuário quero poder deletar uma foto.
## Ver os números do próprio usuário
- Como usuário quero poder ver os números de um perfil (seguidores, seguindo, likes, publicações).
## Ver uma foto específica
- Como usuário quero poder clicar e ver uma foto específica, seus likes, o usuário que postou e os comentários.
## Ver todas as fotos de um usuário
- Como usuário quero poder ver todas as fotos de um perfil (as próprias na página Perfil).
## Ver as fotos em alta
- Como usuário quero poder ver as fotos mais curtidas no último dia na seção Trending.
## Ver fotos de uma categoria
- Como usuário quero poder ver fotos de uma categoria específica na seção Filter.
# Backlog da Sprint
- História#1 - Como usuário, quero me cadastrar na rede social.
  - Configurar ambiente do back-end [Gabriel Lima]
  - Configuração do express e .env [Gabriel Lima]
  - Criar BD [Gabriel Lima]
  - Fazer rota [Gabriel Lima]
  - Fazer funcionalidade no back-end [Gabriel Lima]
  - Fazer botão de cadastrar [Gabriel Teixeira]
  - Fazer form de cadastro [Gabriel Teixeira]
  - Conectar com o back [Gabriel Teixeira]
  - Estilizar [Gabriel Teixeira]
- História#2 - Como usuário quero poder logar na minha conta cadastrada no sistema.
  - Criar página de login [Gabriel Teixeira]
  - Fazer estilização do login [Gabriel Teixeira]
  - Criar lógica de login no backend [Gabriel Lima]
  - Fazer validação de dados no input [Mateus Pardini]
  - Criar alerta pra validar login do usuário (AddToast) [Mateus Pardini]
  - Fazer rota de acesso ao menu principal enquanto logado [Gabriel Lima]
  - Configurar o header para usuário logado/deslogado [Gabriel Teixeira]
- História#3 - Como usuário quero ter uma área de perfil.
  - Criar rota da página de perfil [Gabriel Lima]
  - Criar página de perfil de acordo com o design [Gabriel Teixeira]
  - Linkar página de perfil com o usuário logado [Mateus Pardini]
- História#4 - Como usuário quero seguir e deixar de seguir outros usuários
  - Criar botão para seguir/deixar de seguir um usuário em seu perfil [Mateus Pardini]
  - Implementar a lógica de seguir/ deixar de seguir um usuário no Backend [Gabriel Lima]
  - Implementar número de pessoas seguidas no perfil do usuário [Gabriel Teixeira]
- História#5 - Como usuário quero postar uma foto no meu perfil
  - Adicionar área para fazer o upload da(s) foto(s) escolhida(s) [Gabriel Teixeira]
  - Implementar como adicionar uma foto ao sistema [Mateus Pardini]
  - Linkar foto(s) com o perfil que está adicionando a foto [Gabriel Lima]
  - Implementar lógica para que a(s) foto(s) postada(s) apareça(m) para os usuários que seguem esse perfil [Mateus Pardini]

