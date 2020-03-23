const root = document.querySelector("#root");
const nextPgBtn = document.querySelector("#nextpg");
const prevPgBtn = document.querySelector("#prevpg");

const API = "https://pokeapi.co/api/v2/pokemon";
let offset = 0;
const fetchData = async () => {
  const response = await fetch(API + "?limit=40&offset=" + offset);
  const data = await response.json();
  const pokemons = data.results;
  createPokemon(pokemons);
};

const createPokemon = pokemons => {
  pokemons.forEach(pokemon => {
    const pokemonDiv = document.createElement("div");
    const pokemonName = document.createElement("p");
    const pokemonId = pokemon.url.split("/")[6];
    const pokemonTmbnail = document.createElement("img");
    pokemonTmbnail.setAttribute(
      "src",
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    );

    pokemonName.innerText = pokemon.name;
    pokemonName.setAttribute("id", pokemonId);
    pokemonDiv.appendChild(pokemonTmbnail);
    pokemonDiv.appendChild(pokemonName);
    pokemonDiv.addEventListener("mouseup", () => {
      fetchPokemonDetail(pokemonId);
    });
    root.appendChild(pokemonDiv);
  });
};

window.addEventListener("load", fetchData);
nextPgBtn.addEventListener("mouseup", () => {
  if (offset < 200) offset += 40;
  fetchData();
});

prevPgBtn.addEventListener("mouseup", () => {
  if (offset > 0) offset -= 40;
  fetchData();
});
