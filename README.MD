# App

Gympass style app.

## Steps to tun the application
<ol>
    <li>Clone the repo</li>
    <li>run <b>npm install</b></li>
    <li>copy <b>.env.example</b> to <b>.env</b></li>
    <li>run <b>npx prisma generate</b></li>
    <li>run <b>npx prisma migrate dev</b></li>
    <li>run <b>npm run start:dev</b></li>
</ol>

## RFs (requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academis próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser posssível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNs (requisitos de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 28 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs (requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco postgresSQL;
- [] Todas as listas de dados precisam estar paginadas com 28 itens por página;
- [] O usuário deve ser identificado por jwt;
