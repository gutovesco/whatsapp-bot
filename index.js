const wa = require('@open-wa/wa-automate');

wa.create().then(client => start(client));

function start(client) {
  client.onMessage(message => {
    console.log(message)
    if (message.body === 'Oi' || message.body === 'oi') {

      while(message.body !== '4'){
      client.sendText(message.from, 'Olá! O que você gostaria de fazer ? \n1 - Pausar\n2- Próxima \n4- Encerrar');

        switch(message.body){
          case '1':
            client.sendText(message.from, 'Pausando a musica...');
            break;
  
          case '2':
            client.sendText(message.from, 'Pulando para a próxima musica');
            break;
        }
      }
      
    }
  });
}