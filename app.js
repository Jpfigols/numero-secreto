//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function textoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.0}); //voz narradora (não nativo do JavaScript)
}

function mensagemInicial(){
    textoNaTela('h1', 'Jogo do número secreto');
    textoNaTela('p', 'Escolha um número entre 1 e 100');
}
mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
    let mensagem = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    document.getElementById('reiniciar').removeAttribute('disabled');

    if (chute == numeroSecreto){
        textoNaTela('h1', 'Acertou!');
        textoNaTela('p', mensagem );
    } else {
        if (chute > numeroSecreto){
            textoNaTela('p', 'O número secreto é menor');
        } else {
            textoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    console.log(numeroEscolhido);

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){ //includes busca o parâmetro na lista
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //push adiciona o parâmetro na lista
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}