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
        let nome = results.response;
        session.send(`Ola! ${nome}. Seja bem vindo (a) Lanchonete Focanocodigo`)
        session.beginDialog(`/pedido`)
    }
]);

bot.dialog(`/pedido`,[
    session =>{
        builder.Prompts.text(session, "Qual e o seu pedido")
    },
    (session, results) =>{
        let pedido = results.response;
        session.send(`Ok! voce pediu ${pedido}`)
        builder.Prompts.confirm(session, "Gostaria de finalizar o seu pedido?", { listStyle: builder.ListStyle.button })
    },
    session =>{
        session.endDialog(`Ok ! seu pedido sera entregue em breve`)
    },
])