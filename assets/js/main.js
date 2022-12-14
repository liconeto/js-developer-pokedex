const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonImgDetailPage = document.getElementById("pokemonImgDetailPage");
const loadPreviusButton = document.getElementById("loadPreviusButton");
const loadNextButton = document.getElementById("loadNextButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                  <a class="buttonDetail" id="pokemonImgDetailPage"  href="pokemon-detail.html" value="${
                    pokemon.number
                  }">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                  </a>
                  
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function loadpokemonDetails(id) {
  const idPokemon = id;

  pokemonImgDetailPage.addEventListener("click", () => {
    window.alert(`Esse é o ID :${idPokemon}`);
  });
}
