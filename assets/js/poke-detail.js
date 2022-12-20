const loadPreviusButton = document.getElementById("loadPreviusButton");
const loadNextButton = document.getElementById("loadNextButton");
const pokemonData = document.getElementById("pokemonData");

const urlParams = new URLSearchParams(window.location.search);
let pokemonId = urlParams.get("pokemonId");

function pokemonToLi(pokemonId) {
  return `
        <li class="pokemon ${pokemonId.type}">
            <span class="number">#${pokemonId.number}</span>
            <span class="name">${pokemonId.name}</span>
            <div class="detailAll">
            <img src="${pokemonId.photo}" alt="${pokemonId.name}">
            <div>
              <span class="name">Abilities</span>
              <ul class='abilities'>
                ${pokemonId.abilities
                  .map(
                    (ability) =>
                      `<li class='ablilty'>${ability.ability.name}</li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div>
                <ol class="stats">
                <span class="name">Base Stats</span>
                ${pokemonId.stats
                  .map(
                    (stat) =>
                      `<li class="base_stat ">${stat.stat.name} = <span class="number">${stat.base_stat}</span></li>`
                  )
                  .join("")}

                </ol>
            </div>
            </div>
        </li>
    `;
}

function loadpokemonDetails(id) {
  const idPokemon = id;

  pokeApi.getPokemonStats(idPokemon).then((pokemonStat) => {
    const newHtml = pokemonToLi(pokemonStat);
    pokemonData.innerHTML = newHtml;
  });
}

loadpokemonDetails(pokemonId);

loadPreviusButton.addEventListener("click", () => {
  let pokemonP = urlParams.set("pokemonId", parseInt(pokemonId) - 1);

  loadpokemonDetails(pokemonP);
});

loadNextButton.addEventListener("click", () => {
  let pokemonN = urlParams.set("pokemonId", parseInt(pokemonId) + 1);

  loadpokemonDetails(pokemonN);
});
