# Labenu Music Awards

<p>
<a href="#sobre">Sobre</a> |
<a href="#orientacoes">Orientações</a> |
<a href="documentação">Documentação</a> |
<a href="#features">Features</a> |
<a href="#tecnologia">Tecnologia</a> |
<a href="#desenvolvedores">Desenvolvedores</a>
</p>

<h1 id="sobre">📕 Projeto LaBook</h1>

<p>o **LAMA**, *Labenu Musical Awards*, um festival  com várias bandas famosas para a formatura da sua turma e, no final, vocês podem eleger a banda que mais gostaram! Entretanto, na opinião dele, vocês só serão merecedores se entregarem um sistema impecável que permita o gerenciamento completo desses shows.</p>

<h2 id="orientacoes">🚨 Orientações para acesso</h2>

- Realizar o login se já possui um cadastro;
- Realizar o cadastro com nome, email e senha.
- Realiza o cadastro de bandas e shows.
- Realiza a visualização de detalhes da banda e show.

<h2 id="documentação">🚨 Documentação do Postman</h2>

- [Postman]()

<h2 id="features">✔️ Features</h2>

👤 Login/Cadastro

- [x] O nosso sistema deve permitir o registro aos usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). O usuário deve poder se logar automaticamente após o cadastro.
- [x] Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário.

🎙 Registrar banda

- [x] O nosso sistema deve deixar registrado todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome. Somente administradores podem registrar bandas. Faça ao menos dois testes para checar se os dados estão corretos, sendo um em caso de erro e outro em caso de acerto.

🎸 Detalhes banda

- [x] Deve receber o id ou o nome da banda e retornar todas as informações salvas sobre ela.

📅 Adicionar show

- [x] Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Deve haver uma validação para indicar se o horário é válido (ou seja, se está entre 08h e 23h). Além disso os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h. Caso já exista um show marcado para o dia e o horário em questão, o seu endpoint deve retornar um erro. Faça ao menos dois testes para checar se os dados estão corretos, sendo um em caso de erro e outro em caso de show em data repetida.

🔍 Data e shows

- [x] Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.


 <h2 id="tecnologia">🛠 Tecnologia</h2>

- [TypeScript](https://www.typescriptlang.org/)

<h2 id="desenvolvedores">👨‍💻 Desenvolvedores</h2>
<table>         
<td><a href="https://github.com/future4code/silveira-Adeir-Maia"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98994187?v=4" width="100px;" alt="Imagem profile Adeir Moreira desenvolvedor"/><br /><sub><b>Ariane Mello </b></sub></a><br /> 
<td><a href="https://github.com/future4code/silveira-Eric-Silva"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/99001809?v=4" width="100px;" alt="Imagem profile Eric Silva desenvolvedor"/><br /><sub><b>Eric Silva </b></sub></a><br />
<td><a href="https://github.com/future4code/silveira-Mariana-Lima"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98923335?v=4" width="100px;" alt="Imagem profile Mariana Lima desenvolvedora"/><br /><sub><b>Mariana Lima</b></sub></a><br />
  
</table>

<a href="#voltar">Voltar para o topo ⬆️</a>
