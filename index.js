const express = require('express');
const app = express();
const path = require('path');
const { convert, validate } = require('./lib/convert');
const apiBCB = require('./lib/api.bcb');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const cotacao = await apiBCB.getCotacao()
  res.render('home', {
    cotacao
  })
});

app.get('/cotacao', (req, res) => {
  // Validate the quote and amount values here
  const cotacao = validate(req.query.cotacao);
  const quantidade = validate(req.query.quantidade);
  if (cotacao && quantidade) {
    const conversao = convert(cotacao, quantidade);
    res.render('cotacao', {
      error: false,
      cotacao: cotacao,
      quantidade: quantidade,
      conversao: conversao
    });
  } else {
    res.render('cotacao', {
      error: 'Invalid values'
    });
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log('Unable to start');
  } else {
    console.log('ConvertMyMoney is online');
  }
});
