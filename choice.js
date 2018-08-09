//saudacao.js
//vagner 07/08/18

const restify = require('restify');
const builder = require('botbuilder')

const server = restify.createServer();
server.listen(process.env.port|| process.env.PORT || 3978, () => {
    console.log("%s aplicacao esta executando na porta %s", server.name, server.url);
})

// Criando um conector para usar bot via console
let connector = new builder.ChatConnector({
    appId:'',
    appPassword:''
});

server.post('/api/messages', connector.listen())

const bot = new builder.UniversalBot(connector);

bot.dialog('/',[
    session =>{
        builder.Prompts.text(session, "Ola ! Qual e o seu nome")
    },
    (session, results) =>{
        session.userData.nome = results.response;
        builder.Prompts.number(session, `oi ${session.userData.nome} ,quanto tempo vc programa`)
     
    },
    (session, results) =>{
        session.userData.linguagemProgramacao= results.response;
        builder.Prompts.choice(session,
                    "Qual e sua linguagem",
                     "Typescript | Javascript| Nodejs",
                     {listStyle:builder.ListStyle.button}
                    );
    },
    (session, results) =>{
        session.userData.linguagem = results.response.entity;
        session.endConversation('Ah ... Beleza!'
        + session.userData.nome + 'voce tem trabalhado com progrm'
        + session.userData.linguagemProgramacao+ 'anos de programacao '
        + session.userData.linguagemProgramacao)
    },

 
]);

bot.dialog('/pedido',[
    session =>{
        builder.Prompts.text(session, "Ola ! Qual e o seu nome")
    },
    (session, results) =>{

    }
])