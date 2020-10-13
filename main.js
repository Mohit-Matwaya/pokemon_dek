import { Pokemon } from './src/Pokemon.js';
const root = document.querySelector('#root');
const nextPgBtn = document.querySelector('#nextpg');
const prevPgBtn = document.querySelector('#prevpg');

const API = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0;
const fetchData = async () => {
  const response = await fetch(API + '?limit=40&offset=' + offset);
  const data = await response.json();
  const pokemons = data.results;
  createPokemon(pokemons);
};

const createPokemon = pokemons => {
  pokemons.forEach(pokemon => {
    var pokemonId = pokemon.url.split('/')[6];
    const newPokemon = Pokemon({ ...pokemon, id: pokemon.url.split('/')[6] });
    const pokemonDiv = document.createElement('div');
    pokemonDiv.innerHTML = `
      <img src="${newPokemon.thumb}" />
      <p id="${newPokemon.id}">${newPokemon.name}</p>
    `;
    pokemonDiv.addEventListener('click', () => {
      fetchPokemonDetail(newPokemon.id);
    });
    root.appendChild(pokemonDiv);
  });
};

window.addEventListener('load', fetchData);
nextPgBtn.addEventListener('mouseup', () => {
  if (offset < 200) offset += 40;
  fetchData();
});

prevPgBtn.addEventListener('mouseup', () => {
  offset = Math.max(0, offset - 40);
  fetchData();
});
