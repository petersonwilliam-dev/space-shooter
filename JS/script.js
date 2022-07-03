var frames;
var teclaCode;
var LarguradaTela, AlturadaTela;
var NaveJogador, VidaJogador, Direcao_X_NaveJogador, Direcao_Y_NaveJogador, Posicao_X_NaveJogador, Posicao_Y_NaveJogador, VelocidadeNave, VelocidadeTiro;
var JogoIniciado = false;
var idSomTiro, indiceExplosao, indiceSomExplosao;
var Numero_Monstros;
var Temporizador_Monstros;
var Temporizador_Tiro_Monstro;
var RemoveExplosao;

/////////////////// JOGADOR ///////////////////////

function teclaDown() {
    teclaCode = event.keyCode;

    switch (teclaCode) {
        case 37:
            Direcao_X_NaveJogador = -1;
        break;
        case 38:
            Direcao_Y_NaveJogador = -1;
        break;
        case 39:
            Direcao_X_NaveJogador = 1;
        break;
        case 40:
            Direcao_Y_NaveJogador = 1;
        break;
        case 32:
        
        break;
    }
}

function teclaUp() {
    teclaCode = event.keyCode;

    switch (teclaCode) {
        case 37:
            Direcao_X_NaveJogador = 0;
        break;
        case 38:
            Direcao_Y_NaveJogador = 0;
        break;
        case 39:
            Direcao_X_NaveJogador = 0;
        break;
        case 40:
            Direcao_Y_NaveJogador = 0;
        break;
        case 32:
            atirar(Posicao_X_NaveJogador+13, Posicao_Y_NaveJogador-10);
        break;
    }
}

function atirar(x,y) {
    let tiro = document.createElement("div");
    let confgTiro = document.createAttribute("style")

    confgTiro.value = "top:"+y+"px; left:"+x+"px;";
    tiro.setAttributeNode(confgTiro)
    tiro.setAttribute("class", "tiroJogador")

    let audioTiro = document.createElement("audio")
    let idTiro = document.createAttribute("id")
    idTiro.value = "som"+idSomTiro;

    audioTiro.setAttributeNode(idTiro)
    audioTiro.src = "img/tiro.wav?"+new Date();
    tiro.appendChild(audioTiro)

    document.getElementById("TelaJogo").appendChild(tiro)
    document.getElementById("som"+idSomTiro).play()

    idSomTiro++;
}

function controleTiro() {
    let tiros = document.getElementsByClassName("tiroJogador")

    for (let i = 0; i < tiros.length; i++) {
        if (tiros[i]) {
            let PosicaoTiroY = tiros[i].offsetTop;
            tiros[i].style.top = (PosicaoTiroY - VelocidadeTiro)+"px"; 
            colisaoTiroJogador(tiros[i])
            if (PosicaoTiroY < 0) {
                tiros[i].remove();
            }
        }
    }
}

function movimentaJogador() {
    Posicao_X_NaveJogador += Direcao_X_NaveJogador * VelocidadeNave;
    Posicao_Y_NaveJogador += Direcao_Y_NaveJogador * VelocidadeNave;

    NaveJogador.style.left = Posicao_X_NaveJogador+"px";
    NaveJogador.style.top = Posicao_Y_NaveJogador+"px";
}

function colisaoTiroJogador(tiroJ) {
    let monstrosEmJogo = document.getElementsByClassName("monstro")

    for (let i = 0; i < monstrosEmJogo.length; i++) {
        if ( (tiroJ.offsetTop <= (monstrosEmJogo[i].offsetTop + 37)) && (tiroJ.offsetLeft >= monstrosEmJogo[i].offsetLeft) && (tiroJ.offsetLeft <= (monstrosEmJogo[i].offsetLeft + 50)) ) {
            criaExplosao(monstrosEmJogo[i].offsetLeft+20, monstrosEmJogo[i].offsetTop);
            tiroJ.remove();
            monstrosEmJogo[i].remove();
            criaMonstros();
        }
    }
}

/////////////////// MONSTROS ///////////////////////

function criaMonstros() {
    if (JogoIniciado) {
        if (Numero_Monstros > 0) {
            let Posicao_Y_Monstro = 0;
            let Posicao_X_Monstro = Math.round(Math.random() * LarguradaTela)
        
  
            let Monstro = document.createElement("div")
            let AtributoMostro = document.createAttribute("style")
            AtributoMostro.value = "top:"+Posicao_Y_Monstro+"px; left:"+Posicao_X_Monstro+"px;";
            Monstro.setAttribute("class", "monstro")
            Monstro.setAttributeNode(AtributoMostro)

            document.getElementById("TelaJogo").appendChild(Monstro)

            Numero_Monstros--;
        }
    }
}
function monstroAtira() {
    let Monstros_em_Jogo = document.getElementsByClassName("monstro")
    
    for (let i = 0; i < Monstros_em_Jogo.length; i++) {
        Temporizador_Monstros = new Promise(() => { 
            setTimeout(() => { 
            y = 37;
            x = Monstros_em_Jogo[i].offsetLeft + 20;

            let TiroMonstro = document.createElement("div")
            let AtributoTiroMonstro = document.createAttribute("style")
            AtributoTiroMonstro.value = "top"+y+"px; left:"+x+"px;"
            TiroMonstro.setAttribute("class", "tiro_monstro")
            TiroMonstro.setAttributeNode(AtributoTiroMonstro)

            document.getElementById("TelaJogo").appendChild(TiroMonstro)
        }, 3000)
    });
    }
}
function controleTiroMonstro() {
    let Tiros_dos_Monstros = document.getElementsByClassName("tiro_monstro")

    for (let i = 0; i < Tiros_dos_Monstros.length; i++) {
        if (Tiros_dos_Monstros[i]) {
            let PosicaoTiroMonstroY = Tiros_dos_Monstros[i].offsetTop;
            Tiros_dos_Monstros[i].style.top = (PosicaoTiroMonstroY + VelocidadeTiro)+"px";
            colisaoTiroMonstro(Tiros_dos_Monstros[i])
            if (PosicaoTiroMonstroY > AlturadaTela) {
                Tiros_dos_Monstros[i].remove();
            }
        }
    }
}
function colisaoTiroMonstro(tiroM) {
    if ( (tiroM.offsetTop == NaveJogador.offsetTop) && (tiroM.offsetLeft <= (NaveJogador.offsetLeft + 50)) && (tiroM.offsetLeft >= (NaveJogador.offsetLeft - 10)) ) {
        VidaJogador -= 20;
        document.getElementById("barra_de_vida").style.width = VidaJogador+"px";
        criaExplosao(NaveJogador.offsetLeft-20, NaveJogador.offsetTop-20)
        tiroM.remove();
    }
}

///////////// GERAL DO JOGO //////////////

function criaExplosao(x, y) {
    let Explosao = document.createElement("div")
    let ImagemExplosao = document.createElement("img")
    let AudioExplosao = document.createElement("audio")

    let Posicao_Explosao = document.createAttribute("style")
    let IdExplosao = document.createAttribute("id")
    let GifExplosao = document.createAttribute("src")
    let SomExplosao = document.createAttribute("src")
    let idSomExplosao = document.createAttribute("id")

    IdExplosao.value = indiceExplosao;
    Posicao_Explosao.value = "top:"+y+"px; left:"+x+"px;";
    GifExplosao.value = "img/explosao_ar.gif?"+new Date();
    idSomExplosao.value = "som"+indiceExplosao;

    SomExplosao.value = "img/exp1.mp3?"+new Date();


    Explosao.setAttributeNode(Posicao_Explosao)
    Explosao.setAttributeNode(IdExplosao)
    Explosao.setAttribute("class","explosao")

    ImagemExplosao.setAttributeNode(GifExplosao);

    AudioExplosao.setAttributeNode(SomExplosao);
    AudioExplosao.setAttributeNode(idSomExplosao);

    Explosao.appendChild(ImagemExplosao);
    Explosao.appendChild(AudioExplosao);

    document.getElementById("TelaJogo").appendChild(Explosao)
    document.getElementById("som"+indiceSomExplosao).play();

    indiceSomExplosao++;
    indiceExplosao++;

    RemoveExplosao = setTimeout(() => {Explosao.remove()}, 2000)
}

function gerenciaGame() {
    let QuantidadeDeMonstros = document.getElementsByClassName("monstro")

    if (VidaJogador <= 0) {
        JogoIniciado = false
        document.getElementById("TelaJogo").style.display = "none"
        document.getElementById("TelaResultado").style.display = "block"
        document.getElementById("resultado").innerHTML = "Você perdeu :(";

    } else if ( (VidaJogador > 0) && (Numero_Monstros <= 0) && (QuantidadeDeMonstros.length <= 0) ) {
        JogoIniciado = false
        document.getElementById("TelaJogo").style.display = "none"
        document.getElementById("TelaResultado").style.display = "block"
        document.getElementById("resultado").innerHTML = "Você Ganhou :("
    }
}

function ControleFrames() {
    if (JogoIniciado) {
        movimentaJogador();
        controleTiro();
        controleTiroMonstro();
        gerenciaGame();
    }
    frames = requestAnimationFrame(ControleFrames);
}

function reinicia() {
    let QuantidadeDeMonstros = document.getElementsByClassName("monstro")

    for (let i = 0; i < QuantidadeDeMonstros.length; i++) {
        QuantidadeDeMonstros[i].remove();
    }
    document.getElementById("TelaResultado").style.display = "none"
    document.getElementById("tela-inicial").style.display = "none"
    document.getElementById("TelaJogo").style.display = "block"
    cancelAnimationFrame(frames)

    Posicao_X_NaveJogador = LarguradaTela/2;
    Posicao_Y_NaveJogador = AlturadaTela-100;


    VidaJogador = 300;
    document.getElementById("barra_de_vida").style.width = VidaJogador+"px";

    JogoIniciado = true
    Numero_Monstros = 30;
    for (let i = 0; i < 11; i++) {
        criaMonstros()
    }
    clearInterval(Temporizador_Monstros)
    Temporizador_Monstros = setInterval(monstroAtira, 1500)
    ControleFrames()
}

function inicia() {
    LarguradaTela = window.innerWidth;
    AlturadaTela = window.innerHeight;
    idSomTiro = 0;
    indiceSomExplosao = 0;
    indiceExplosao = 0;
    VelocidadeTiro = 10;
    VelocidadeNave = 5;

    NaveJogador = document.getElementById("NaveJogador");
    Direcao_X_NaveJogador = Direcao_Y_NaveJogador = 0;

    window.addEventListener("keyup", teclaUp)
    window.addEventListener("keydown", teclaDown)
    document.getElementById("BotaoJogar").addEventListener("click", reinicia)
    document.getElementById("BotaoReiniciar").addEventListener("click", reinicia)
}

window.addEventListener("load", inicia)