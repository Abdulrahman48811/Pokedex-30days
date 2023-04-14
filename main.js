const baseAPI = "https://pokeapi.co/api/v2/";
const flexContainer = document.getElementById("flex-container");
const placeholder = document.getElementById("placeholder");

const getPokemonList = () => {
  fetch(`${baseAPI}pokemon?limit=20&offset=0`)
    .then((res) => res.json())
    .then((data) => {
      let fetchedPokemon = data.results;
      console.log(fetchedPokemon);

      // more code
    });
};

getPokemonList();