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
## Postar uma foto
- Como usuário quero poder postar uma foto com uma categoria.
## Armazenar fotos dos usuários
- Como usuário quero poder enviar uma foto para o sistema e ter ela armazenada.
## Deletar uma foto
- Como usuário quero poder deletar uma foto.
## Ver os números do próprio usuário
- Como usuário quero poder ver os números de um perfil (seguidores, seguindo, likes, publicações).
## Ver uma foto específica
- Como usuário quero poder clicar e ver uma foto específica, seus likes, o usuário que postou e os comentários.
## Seguir um usuário
- Como usuário quero poder seguir um usuário e ser seguido.
## Ver todas as fotos de um usuário
- Como usuário quero poder ver todas as fotos de um perfil (as próprias na página Perfil).
## Ver as fotos em alta
- Como usuário quero poder ver as fotos mais curtidas no último dia na seção Trending.
## Ver fotos de uma categoria
- Como usuário quero poder ver fotos de uma categoria específica na seção Filter.
## Ver fotos apenas dos usuários seguidos
- Como usuário quero poder ver as fotos  apenas dos usuários que eu sigo na seção Following.
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
