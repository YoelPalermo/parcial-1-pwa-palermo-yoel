//const fetch = require('node-fetch');





const api_url = "https://pokeapi.co/api/v2/pokemon/";
const numPokemons = 100;

const promises = [];

const resultsDiv = document.getElementById('results');
const ul = document.createElement('ul');

async function fetchPokemons() {


    async function fetchPokemonData(i) {
        const url = `${api_url}${i}`;
        return fetch(url)
            .then(response => response.json())

            .catch(error => {
                console.log('Error:', error);
            });

    }



    function displayPokemonNames(pokemons) {

        pokemons.forEach(pokemon => {


            const li = document.createElement('li');
            li.setAttribute('class', 'p-4 rounded bg-secondary text-dark mb-3 text-center  text-capitalize ');
            li.innerHTML = `#${pokemon.id} - ${pokemon.name}`;


            ul.appendChild(li);

            resultsDiv.appendChild(ul);
        });

    }


    // Obtener datos para cada pokémon y almacenar las promesas
    for (let i = 1; i <= numPokemons; i++) {
        promises.push(fetchPokemonData(i));

    }


    // ordena por id
    function sortPokemonsById(pokemons) {
       
        return pokemons.sort((a, b) => a.id - b.id);
    }

    // esperar a tener todos los datos y despues ordenar y mostrar
    try {
        const pokemons = await Promise.all(promises);
        const sortedPokemons = sortPokemonsById(pokemons);
        displayPokemonNames(sortedPokemons);
    } catch (error) {
        console.log(`Error: ${error}`);
    }









}
fetchPokemons();