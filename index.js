const http = require('http');
const axios = require('axios');
const url = require('url');
const fs = require('fs')


const pokemones = []

const getPokemon = async (id) => {
  const {
    data
  } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const nombrePokemon = data.name
  const urlImagePokemon = data.sprites.front_default
  return {
    nombre: nombrePokemon,
    img: urlImagePokemon
  }
}

http.createServer((req, res) => {
    if (url.parse(req.url, true).path === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      fs.readFile('index.html', 'utf8', (err, data) => {
        res.write(data)
        res.end()
      })

    }

    if (req.url.startsWith('/pokemones')) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })

      for (let i = 1; i <= 150; i++) {
        pokemones.push(getPokemon(i))
      }

      Promise.all(pokemones).then(result => {
        // console.log(result)
        res.write(JSON.stringify(result))
        res.end()
      })

    }


  })
  .listen(3000, () => console.log('Escuchando el puerto 3000'))