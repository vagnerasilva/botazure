

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
    (session, results,next ) =>{
        builder.Prompts.text(session, `Ola Qual e o seu nome ?`)
    },
    (session, results) =>{
        session.dialogData.nome = results.response;
        builder.Prompts.text(session, `Oi ${session.dialogData.nome}.Qual e sua profissao?`)
    
    },
    (session, results) =>{
        session.dialogData.profissao= results.response
        builder.Prompts.number(session,`${session.dialogData.profissao} quantos anos voce tem ?   `)
    },

    (session, results) =>{
        session.dialogData.idade = results.response
        builder.Prompts.time(session,`Vc pode informar que horas sao agora   `)
    },

    (session, results) =>{
        session.dialogData.horaAtual = builder.EntityRecognizer.resolveTime([results.response])
        builder.Prompts.confirm(session, `Voce deseja ver questionario?`,
        {listStyle: builder.ListStyle.button })
    },
    (session, results) =>{
        if(results.response){
            session.endDialog(`Os detalhes do seu questionario foi: 
                              <br/ > Nome:**${session.dialogData.nome}** 
                              <br/ > Profissao:**${session.dialogData.profissao}**
                              <br/ > Idade: **${session.dialogData.idade }**
                              <br/ > Hora Atual:** ${session.dialogData.horaAtual}**
                              `

            
        )
        }else{
            session.endDialog(`Ate a proxuima !Tchau`)
        }
    }

]);