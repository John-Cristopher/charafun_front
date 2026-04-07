// Capturando os elementos HTML
const cardInner = document.getElementById('card-inner')
const campoPergunta = document.getElementById('pergunta')
const campoResposta = document.getElementById('resposta')
const btnNova = document.getElementById('btn-nova')

// Evento que faz o card girar
cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('[transform:rotateY(180deg)]')
})

buscaCharada()

// Função que vai buscar as charadas na API
async function buscaCharada() {
    try {
        const baseUrl = "https://charafun.vercel.app"
        const endPoint = `/charadas/random`

        // Impressão no console log para verificar a URL completa
        console.log("URL completa:", baseUrl + endPoint)
        // Busca assincrona da rota concateada
        const respostaApi = await fetch(baseUrl + endPoint)
        console.log("Resposta da API:", respostaApi)
        const dados = await respostaApi.json()
        console.log("Dados recebidos:", dados)

        // Atualiza os campos da pergunta e resposta
        campoPergunta.textContent = dados.pergunta
        campoResposta.textContent = dados.resposta

    } catch (erro) {
        campoPergunta.textContent = "Erro ao conectar com o servidor backend!"
        console.error("Erro na busca:", erro)
    }
}

// Ação do botão nova charada
btnNova.addEventListener('click', () => {
    // devira o card para ocultar a resposta
    cardInner.classList.remove('[transform:rotateY(180deg)]')
    // Busca uma nova charada
    buscaCharada()
})