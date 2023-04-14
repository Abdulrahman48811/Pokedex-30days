const baseAPI = "https://pokeapi.co/api/v2/";
const flexContainer = document.getElementById("flex-container");
const placeholder = document.getElementById("placeholder");

const addCard = (pokemon) => {
  const newCard = placeholder.cloneNode(true);
  const loadingSpinner = newCard.querySelector(".lds-ring");

  loadingSpinner.remove();

  const title = newCard.querySelector(".title");
  title.innerText = pokemon.name;

  const image = newCard.querySelector("img");
  image.src = pokemon.sprites.front_default;

  newCard.id = pokemon.id;

  flexContainer.appendChild(newCard);
};

const getPokemonList = () => {
  fetch(`${baseAPI}pokemon?limit=20&offset=0`)
    .then((res) => res.json())
    .then((data) => {
      const fetchedPokemon = data.results;

      for (let pokemon of fetchedPokemon) {
        fetch(pokemon.url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            addCard(data);
          });
      }
    });
};

getPokemonList();