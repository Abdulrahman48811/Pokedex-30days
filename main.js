const baseAPI = "https://pokeapi.co/api/v2/";
const flexContainer = document.getElementById("flex-container");
const placeholder = document.getElementById("placeholder");
const totalPokemon = document.getElementById("total-pokemon");

let page = 0;
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
    console.time("timer");
    fetch(`${baseAPI}pokemon?limit=20&offset=${page * 20}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedPokemon = data.results;
  
        const requests = fetchedPokemon.map((pokemon) => {
          return fetch(pokemon.url)
            .then((res) => res.json())
            .then((data) => {
              addCard(data);
            });
        });
  
        return Promise.all(requests);
      })
      .finally(() => {
        placeholder.classList.add("hidden");
      });
  };
  const nextPage = () => {
    showAndMovePlaceholder();
    placeholder.classList.remove("hidden");
    page++;
    getPokemonList();
    totalPokemon.innerText = (page + 1) * 20;
  };
  const showAndMovePlaceholder = () => {
    placeholder.classList.remove("hidden");
    placeholder.remove();
    flexContainer.appendChild(placeholder);
  };
getPokemonList();