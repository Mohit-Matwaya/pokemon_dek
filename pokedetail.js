const detailPanel = document.querySelector("#detailpanel");

const fetchPokemonDetail = async _id => {
  const response = await fetch(API + `/${_id}`);
  const pokemon_details = await response.json();
  showPokemonDetail(pokemon_details);
  console.log(pokemon_details);
};

//<------------------------->
showPokemonDetail = _details => {
  //pokemon image
  const imgSrc = _details.sprites.front_default;
  const pokemonImage = document.querySelector("#pokemonImage");
  pokemonImage.setAttribute("src", imgSrc);

  //pokemon general
  const pokemonNameNode = document.querySelector("#pokemonName");
  const pokemonWeightNode = document.querySelector("#pokemonWeight");
  const pokemonHeightNode = document.querySelector("#pokemonHeight");
  const pokemonExpNode = document.querySelector("#pokemonExp");
  pokemonNameNode.innerText = _details.name;
  pokemonWeightNode.innerText = _details.weight;
  pokemonHeightNode.innerText = _details.height;
  pokemonExpNode.innerText = _details.base_experience;

  //pokemon abilities
  const pokemonAbilities = document.querySelector("#pokemonAbilities");
  pokemonAbilities.innerHTML = "";
  _details.abilities.forEach(ability => {
    const abilityTrNode = document.createElement("tr");
    abilityTrNode.appendChild(document.createTextNode(ability.ability.name));
    pokemonAbilities.appendChild(abilityTrNode);
  });

  //pokemon types ------------------>
  const pokemonTypes = document.querySelector("#pokemonTypes");
  pokemonTypes.innerHTML = "";
  for (const c of _details.types) {
    const typeTrNode = document.createElement("tr");
    typeTrNode.appendChild(document.createTextNode(c.type.name));
    pokemonTypes.appendChild(typeTrNode);
  }
};
