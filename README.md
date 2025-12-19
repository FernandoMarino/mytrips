# Seja bem vindo ao myTripsPlan

Projeto desenvolvido por Fernando Marino dos Santos para a disciplina de Frontend Jamstack com Next.JS

Etapas de desenvolvimento:

* Criação rota principal
* Criação de rotas dinâmicas `/my-trips/[tripId]`
* Criação de banco de dados NoSQL (Firestore)
* Autenticação 
    * criação de usuário  -> Cria novo documento em "users"  
    * autenticação (login) -> 
* Implementação de criação de viagens pelo usuário -> REsulta em um novo documento na coleção "trips"




- **Autenticação**
  - Usuário criado com formulário validado - ShadCN (Form) + Zod (Form Validation) + Server Action (handleSignUp) + API Routes (createUser + persistência em /users/)
  - Login utilizando Firebase Authentication & session cookies
  - Rotas protegidas via proxy (`/my-trips`)

- **UI/UX**
  - Navbar responsiva mostrando o nome e email do usuário após autenticado
  - Forms de Login/signup implementados com validaçao em cada campo utilizando zod e com aria-invalid ativo para acessibilidade
  - Botão de Logout no navbar
  - Implementado suporte para alterar o tema da página

- **API Routes**
  - `/api/sign-up` - Criação de novo user no Firebase Authentication e persistência no Firestore
  - `/api/login` - Autenticação com Firebase e retorno de idToken para criação de cookie de sessãono server actions

- **Server Actions**
  - Camada de Server actions implementada para: 
    - Capturar dados dos formulários
    - Chamar zod para validar formulários
    - Chamar API Routes (Server Side) 
    - lidar com criação, verificação e remoção de cookies de sessão
    - Buscar na API user trips e renderizar o retorno na rota protegida `/my-trips`


### Implementações pendentes
- Consulta com graphQL
- Editar e deletar Trips
- Funcionalidade para o usuário buscar e filtrar Trips utilizando campos específicos
- Compartilhamento de trip com outros usuários
- Criação de eventos nas viagens