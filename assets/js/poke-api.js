const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonStats = (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonData) => ConvertPokeApiDetails(jsonData))
    .then((valueData) => valueData);
};

function ConvertPokeApiDetails(pokemonBody) {
  const pokemonDetail = new PokemonDetail();

  const types = pokemonBody.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemonDetail.number = pokemonBody.id;
  pokemonDetail.name = pokemonBody.name;
  pokemonDetail.stats = pokemonBody.stats;
  pokemonDetail.abilities = pokemonBody.abilities;
  pokemonDetail.photo = pokemonBody.sprites.other.dream_world.front_default;

  pokemonDetail.types = types;
  pokemonDetail.type = type;

  return pokemonDetail;
}
