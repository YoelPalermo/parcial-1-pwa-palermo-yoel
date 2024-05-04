





const api_url = "https://pokeapi.co/api/v2/pokemon/";
const numPokemons = 100;

const promises = [];
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
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


////////////card

function cardPoke() {

    descPokeDiv = document.createElement('div');
    descPokeDiv.setAttribute('id', 'descPokeDiv');

    descPoke = document.createElement('div');
    descPoke.setAttribute('id', 'desc');

    pokeContainer = document.getElementById('pokeContainer');

    descPokeDiv.appendChild(descPoke);
    pokeContainer.appendChild(descPokeDiv);

    descPoke.setAttribute('class', 'bg-warning text-primary rounded p-4 text-center  text-capitalize m-auto  mt-3 border border-3 border-primary rounded w-70');
    descPoke.innerHTML = `<div class="bg-primary text-warning p-4 pt-1 pb-2 rounded">
<h1>
${pokemon.id} - ${pokemon.name}
</h1>
</div>`;

    const Sprite = document.createElement('img');
    Sprite.setAttribute('class', ' sprite');
    Sprite.src = pokemon.sprites.front_default;
    descPoke.appendChild(Sprite);

    const typeTitle = document.createElement('h2');
    typeTitle.textContent = 'Type:';

    typeTitle.setAttribute('class', 'bg-dark text-warning p-3 pt-0 rounded-top text-danger m-0');

    descPoke.appendChild(typeTitle);

    const ulTypes = document.createElement('ul');
    ulTypes.setAttribute('class', 'bg-light rounded-bottom list-unstyled pb-2');

    /*/////////////////////////////////////////////*/
    pokemon.types.forEach(typeInfo => {
        const li = document.createElement("li");
        li.setAttribute('class', 'text-dark');
        li.textContent = typeInfo.type.name;
        ulTypes.appendChild(li);
        descPoke.appendChild(ulTypes);

    });



    const abilitiesTytle = document.createElement('h2');
    abilitiesTytle.textContent = 'Abilities:';
    abilitiesTytle.setAttribute('class', 'bg-dark text-warning p-3 pt-0 rounded-top text-danger m-0');
    descPoke.appendChild(abilitiesTytle);


    ulAbilities = document.createElement('ul');
    ulAbilities.setAttribute('class', 'bg-light rounded-bottom list-unstyled pb-2');


    pokemon.abilities.forEach(typeInfo => {
        const liAbility = document.createElement('li');
        liAbility.setAttribute('class', 'text-dark');
        liAbility.textContent = typeInfo.ability.name;

        ulAbilities.appendChild(liAbility);

        descPoke.appendChild(ulAbilities);

    });


    descPoke.innerHTML += `
<div >
<ul class="list-unstyled  text-light rounded d-flex">
<li class="p-2 m-1 w-50 bg-primary rounded text-light">Height: ${pokemon.height}</li>
<li class="p-2 m-1  w-50 bg-primary rounded  text-light">Weight: ${pokemon.weight}</li>
</ul>
</div>`;


    /*/////////////////////////*/

    closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.setAttribute('class', 'btn closeButton bg-danger text-center border border-0');


    descPoke.appendChild(closeButton);



    closeButton.addEventListener('click', () => {

        if (descPokeDiv) {
            descPokeDiv.remove();
        }
    })


};

////////////card




            li.addEventListener('click', () => {
             
               
                cardPoke();
            });
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


searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        searchPokemon(searchTerm);
    }
});


searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchPokemon(searchTerm);
        }
    }
});



const noResult = document.createElement('div');

searchContainer = document.getElementById('searchContainer');
searchContainer.appendChild(noResult);

function searchPokemon(name) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la información del Pokémon.');
            }
            return response.json();
        })
        .then(pokemon => {
            console.log(pokemon);
            cardPoke(pokemon);
            noResult.innerHTML = '';


        })
        .catch(error => {
            console.error('Error:', error);


            noResult.innerHTML = '<p class="bg-danger text-light p-2 rounded text-center" >¡No se encontró el Pokémon que buscas!</p>';

        });
}



function cardPoke(pokemon) {


    descPokeDiv = document.createElement('div');
    descPokeDiv.setAttribute('id', 'descPokeDiv');

    descPoke = document.createElement('div');
    descPoke.setAttribute('id', 'desc');


    pokeContainer = document.getElementById('pokeContainer');

    descPokeDiv.appendChild(descPoke);
    pokeContainer.appendChild(descPokeDiv);


    descPoke.setAttribute('class', 'bg-warning text-primary rounded p-4 text-center  text-capitalize m-auto  mt-3 border border-3 border-primary rounded w-70');
    descPoke.innerHTML = `

<div class="bg-primary text-warning p-4 pt-1 pb-2 rounded">
<h1>
${pokemon.id} - ${pokemon.name}
</h1>
</div>

`;

    const Sprite = document.createElement('img');
    Sprite.setAttribute('class', ' sprite');
    Sprite.src = pokemon.sprites.front_default;
    descPoke.appendChild(Sprite);


    const typeTitle = document.createElement('h2');
    typeTitle.textContent = 'Type:';

    typeTitle.setAttribute('class', 'bg-dark text-warning p-3 pt-0 rounded-top text-danger m-0');

    descPoke.appendChild(typeTitle);

    const ulTypes = document.createElement('ul');
    ulTypes.setAttribute('class', 'bg-light rounded-bottom list-unstyled pb-2');


    pokemon.types.forEach(typeInfo => {
        const li = document.createElement("li");
        li.setAttribute('class', 'text-dark');
        li.textContent = typeInfo.type.name;
        ulTypes.appendChild(li);
        descPoke.appendChild(ulTypes);

    });



    const abilitiesTytle = document.createElement('h2');
    abilitiesTytle.textContent = 'Abilities:';
    abilitiesTytle.setAttribute('class', 'bg-dark text-warning p-3 pt-0 rounded-top text-danger m-0');
    descPoke.appendChild(abilitiesTytle);


    ulAbilities = document.createElement('ul');
    ulAbilities.setAttribute('class', 'bg-light rounded-bottom list-unstyled pb-2');


    pokemon.abilities.forEach(typeInfo => {
        const liAbility = document.createElement('li');
        liAbility.setAttribute('class', 'text-dark');
        liAbility.textContent = typeInfo.ability.name;

        ulAbilities.appendChild(liAbility);

        descPoke.appendChild(ulAbilities);

    });


    descPoke.innerHTML += `
<div >
<ul class="list-unstyled  text-light rounded d-flex">
<li class="p-2 m-1 w-50 bg-primary rounded text-light">Height: ${pokemon.height}</li>
<li class="p-2 m-1  w-50 bg-primary rounded  text-light">Weight: ${pokemon.weight}</li>
</ul>
</div>`;




    closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.setAttribute('class', 'btn closeButton bg-danger text-center border border-0');


    descPoke.appendChild(closeButton);

    closeButton.addEventListener('click', () => {

        if (descPokeDiv) {
            descPokeDiv.remove();

        }
    })




};
