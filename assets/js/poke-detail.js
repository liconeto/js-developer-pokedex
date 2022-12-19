const loadPreviusButton = document.getElementById("loadPreviusButton");
const loadNextButton = document.getElementById("loadNextButton");
const pokemonData = document.getElementById("pokemonData");

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("pokemonId");

function pokemonToLi(pokemonId) {
  return `
        <li class="pokemonStat ">
            <div class="detail">
            
                <ul class='abilities'>
                ${pokemonId.abilities
                  .map(
                    (ability) =>
                      `<li class='ablilty'>${ability.ability.name}</li>`
                  )
                  .join("")}
                </ul>
            
                <ol class="stats">
                ${pokemonId.stats
                  .map(
                    (stat) =>
                      `<li class="base_stat ">${stat.stat.name} = <span class="number">${stat.base_stat}</span></li>`
                  )
                  .join("")}

                </ol>
            </div>
        </li>
    `;
}

function loadpokemonDetails(id) {
  const idPokemon = id;

  pokeApi.getPokemonStats(idPokemon).then((pokemonStat) => {
    const newHtml = pokemonToLi(pokemonStat);
    pokemonData.innerHTML += newHtml;
  });
}

loadpokemonDetails(pokemonId);
