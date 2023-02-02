const axios = require('axios')



const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = (data) => axios.get(getUrl(data))
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

}
const getCotacao = async () => {
    try {
        let data = new Date(); // obtém a data atual
        let diaDaSemana = data.getDay(); // obtém o número do dia da semana (0 
        if (diaDaSemana === 0) {

            const today = data.setDate(data.getDate() - 2);
            const res = await getCotacaoAPI(today)
            const cotacao = extractCotacao(res).toFixed(2)
            return cotacao
        }
        if (diaDaSemana === 6) {

            const today = data.setDate(data.getDate() - 1);
            const res = await getCotacaoAPI(today)
            const cotacao = extractCotacao(res).toFixed(2)
            return cotacao
        }
        const today = getToday()
        const res = await getCotacaoAPI(today)
        const cotacao = extractCotacao(res).toFixed(2)
        return cotacao

    } catch (err) {
        return 'Cotação não disponível - Digite o valor para continuar'
    }

}

module.exports = {
    getCotacaoAPI,
    getCotacao,
    extractCotacao
}
