const wa = require('@open-wa/wa-automate');

wa.create().then(client => start(client));

var acidente = false

function start(client) {
  client.onMessage(message => {

    switch(message.body){
      case '1':
        client.sendText(message.from, 'teste');
        break;

      case '2':
        client.sendText(message.from, 'Você deseja reportar o acidente por áudio ou chat?');
        acidente = true

      default:
        if(acidente){

        }else{
          client.sendText(message.from, 'Olá,o que você deseja fazer? 1 - Ouvir Musica \n2 - Reportar acidente');
        }
       
    }
  });
}