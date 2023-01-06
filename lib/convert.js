const validate = (valor) => {
    if (valor.indexOf(',') !== -1) {
      valor = valor.replace(',', '.');
    }
    return valor;
  };
  
  const convert = (cotacao, quantidade) => {
    return cotacao * quantidade;
  };
  
  const toMoney = (valor) => {
    return parseFloat(valor).toFixed(2);
  };
  
  module.exports = {
    validate,
    convert,
    toMoney,
  };
  