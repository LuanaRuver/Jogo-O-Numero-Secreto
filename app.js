let numerosSorteados = [];
let limiteNumerosSorteados = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;
console.log(numerosSorteados)

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha em numero de 1 a 10';

function exibirTextoNaTela (tag, texto) {
   let campo = document.querySelector(tag);
   campo.innerHTML = texto; 
   responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha em numero de 1 a ${limiteNumerosSorteados}`);    
}

mensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas'
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é maior');
        } else {
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        tentativas++
        limparCampo();
    }
}

function numeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * limiteNumerosSorteados + 1);
    let quantiadeNumerosSorteados = numerosSorteados.length
    if (quantiadeNumerosSorteados == limiteNumerosSorteados) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroEscolhido)) {
        return numeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }   
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas=1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}