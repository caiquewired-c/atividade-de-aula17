const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Rota principal que consome a API de frases
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
    const quote = response.data[0]; // A API retorna um array com 1 frase
    res.render('index', { quote, error: null });
  } catch (error) {
    console.error('Erro ao consumir a API:', error.message);
    res.render('index', { quote: null, error: 'Não foi possível carregar a mensagem do dia.' });
  }
});

app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
