const express = require("express");
const app = express();

let quotes = require("./quotes.json");


app.use(express.json())

app.get('/', function (request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function (request, response) {
  response.send(quotes)
});


app.post("/quotes", function (req, res) {
  const quote = req.body

  if (notValidQuote(quote)) {
    return res.status(400).send({ success: false })
  }

  quotes.push(quote)
  res.status(201).send({ success: true })
})



const notValidQuote = (quote) => {
  if (quote.id == undefined ||
    quote.author == undefined ||
    quote.quote == undefined) {
    return true

  }
  return false
}

app.put('/quotes/:id', function (req, res) {

  const id = req.params.id

  const quotesFiltered = quotes.filter(e => e.id != id)

  const quoteUpdated = {
    id: id,
    author: req.body.author,
    quote: req.body.quote
  }

  quotesFiltered.push(quoteUpdated)
  quotes = quotesFiltered

  res.status(201).send({ success: true })
})

app.listen(3000, () => console.log("Listening on port 3000"));
