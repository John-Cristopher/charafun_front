const cardInner = document.getElementById('card-inner')
const campoPergunta = document.getElementById('pergunta')
const campoResposta = document.getElementById('resposta')
const btnNova = document.getElementById('btn-nova')
const pontosSpan = document.getElementById('pontos')
const comboSpan = document.getElementById('combo')
const btnContinuar = document.getElementById('btn-continuar')
const acoes = document.getElementById('acoes')

let pontos = 0
let combo = 0
const fogo = document.createElement('span')
fogo.id = 'fogo'
fogo.className = 'ml-2 transition-all'
document.getElementById('combo').after(fogo)
let modoContinuar = true // alterna comportamento

const flipSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3')

cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('[transform:rotateY(180deg)]')
    flipSound.play()
    navigator.vibrate?.(50)
})

buscaCharada()

async function buscaCharada() {
    try {
        campoPergunta.textContent = "Carregando dados neurais..."

        const baseUrl = "https://charafun.vercel.app"
        const endPoint = `/charadas/random`

        const respostaApi = await fetch(baseUrl + endPoint)
        const dados = await respostaApi.json()

        campoPergunta.textContent = dados.pergunta
        campoResposta.textContent = dados.resposta

    } catch {
        campoPergunta.textContent = "Erro ao conectar com o servidor!"
    }
}

btnNova.addEventListener('click', () => {
    resetCard()
    buscaCharada()
})

function acertou() {
    pontos++
    combo++
    atualizarHUD()
    fluxoResposta()
}

function errou() {
    pontos = Math.max(0, pontos - 1)
    combo = 0
    atualizarHUD()
    fluxoResposta()
}

function atualizarHUD() {
    pontosSpan.textContent = pontos
    comboSpan.textContent = combo

    atualizarFogo()
}

function atualizarFogo() {
    if (combo === 0) {
        fogo.textContent = ''
        return
    }

    let tamanho = Math.min(1 + combo * 0.2, 3) // escala até 3x
    let intensidade = Math.min(combo, 1)

    fogo.textContent = '🔥'.repeat(intensidade)
    fogo.style.fontSize = `${tamanho}rem`

    // brilho mais forte com combo alto
    fogo.style.textShadow = combo > 3
        ? '0 0 15px orange, 0 0 30px red'
        : '0 0 10px orange'
}

function fluxoResposta() {
    if (modoContinuar) {
        acoes.classList.add('hidden')
        btnContinuar.classList.remove('hidden')
    } else {
        proximaCharada()
    }
}

function continuar() {
    btnContinuar.classList.add('hidden')
    acoes.classList.remove('hidden')
    proximaCharada()
}

function proximaCharada() {
    resetCard()
    setTimeout(() => {
        buscaCharada()
    }, 500)
}

function resetCard() {
    cardInner.classList.remove('[transform:rotateY(180deg)]')
}