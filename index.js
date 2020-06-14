const wa = require('@open-wa/wa-automate');

wa.create().then(client => start(client));

var acidente = false;
var musica = false;


function fAcidente(message){

  if(message.body === '1'){
    client.sendText(message.from, 'Acidente registrado com sucesso!');
    acidente = false;
  }else{
    if(message.type === 'chat'){
      client.sendText(message.from, 'A informação foi registrada, digite 1 para concluir!');
    }else{
      client.sendText(message.from, 'A informação por áudio foi registrada, digite 1 para concluir!');
    }
  }

}

var descricaoAcidente = "";

var reportandoChatMsg = 0;

function start(client) {
  client.onMessage(message => {

    if(!message.sender.isMyContact && !message.isGroupMsg){
      console.log(message)

    if(acidente || musica){

      if(acidente){
        
        if(reportandoChatMsg === 0){

          if(message.body === '1'){
            reportandoChatMsg = 1;
            client.sendText(message.from, 'Por favor, descreva o acidente');
          }else if(message.body === '2'){
            reportandoChatMsg = 2;
            client.sendText(message.from, 'Pode falar, as informações estão sendo registradas');
          }else{
            client.sendText(message.from, 'Para reportar por chat digite 1, para reportar por áudio digite 2 \n OBS: Informe o maior número de informações possível, como por exemplo o local do acidente, hora e veículos envolvidos.');
          }

          

        }else{
          if(message.body === '1'){

            client.sendText(message.from, 'Acidente registrado com sucesso, para voltar ao menu principal digite qualquer coisa!');
            acidente = false;

            if(reportandoChatMsg === 1 && descricaoAcidente !== ""){
              client.sendText(message.from, `Acidente registrado com sucesso. Descrição do acidente? ${descricaoAcidente} \nPara voltar ao menu principal digite qualquer coisa!`);
              acidente= "";
            }

            reportandoChatMsg = 0;

          }else{
            if(message.type === 'chat'){
              client.sendText(message.from, 'A informação foi registrada, digite 1 para concluir ou continue digitando!');
              descricaoAcidente += " " + message.body;
            }else{
              client.sendText(message.from, 'A informação por áudio foi registrada, digite 1 para concluir ou continue fornecendo mais informações!');
            }
          }
        }
        
      }

      if(musica){
        switch(message.body){
          case '1' : 
            setTimeout(function(){ client.sendText(message.from, 'Maravilha, estou montando sua playlist...'); }, 1000);
            setTimeout(function(){ client.sendText(message.from, 'Quase pronto...'); }, 4000);
            setTimeout(function(){ client.sendText(message.from, 'Prontinho! Agora basta clicar no link abaixo: \n link'); }, 6000);
            break;

          case '2' : 
            setTimeout(function(){ client.sendText(message.from, 'Maravilha, estou montando sua playlist...'); }, 1000);
            setTimeout(function(){ client.sendText(message.from, 'Quase pronto...'); }, 4000);
            setTimeout(function(){ client.sendText(message.from, 'Prontinho! Agora basta clicar no link abaixo: \n link'); }, 6000);
            break;

            case '3' : 
              setTimeout(function(){ client.sendText(message.from, 'Maravilha, estou montando sua playlist...'); }, 1000);
              setTimeout(function(){ client.sendText(message.from, 'Quase pronto...'); }, 4000);
              setTimeout(function(){ client.sendText(message.from, 'Prontinho! Agora basta clicar no link abaixo: \n link'); }, 6000);
              break;  

            case '4' : client.sendText(message.from, 'Olá, o que você deseja fazer? \n1 - Ouvir música \n2 - Reportar acidente');
            musica = false
            break;  

          default : 
          client.sendText(message.from, 'Escolha o estilo de música: \n1 - Pop \n2 - Sertanejo \n3 - Pagode \n4 - Sair');
        }
      }

    }else{

      switch(message.body){
        case '1':
          client.sendText(message.from, 'Escolha o estilo de música: \n1 - Pop \n2 - Sertanejo \n3 - Pagode \n4 - Sair');
          musica = true;
          break;
  
        case '2':
          client.sendText(message.from, 'Identificamos sua localização e vamos avisar os motoristas por perto, obrigado!');
          break;
  
        default:
            client.sendText(message.from, 'Olá,o que você deseja fazer? \n1 - Ouvir Musica \n2 - Reportar acidente');
      }

    }
    }

  });
}