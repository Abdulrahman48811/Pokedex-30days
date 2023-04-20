const baseAPI = "https://pokeapi.co/api/v2/";
const flexContainer = document.getElementById("flex-container");
const placeholder = document.getElementById("placeholder");
const totalPokemon = document.getElementById("total-pokemon");
const modalBackdrop = document.getElementById("backdrop");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");

let page = 0;
let pokemonArray = [];
let currentChart;

const showModal = (pokemonId) => {
  const foundPokemon = pokemonArray.find((p) => p.id === pokemonId);

  modalTitle.innerText = foundPokemon.name;
  modalImage.src = foundPokemon.sprites.front_default;
  renderChart();

  modalBackdrop.classList.remove("hidden");
};

const addCard = (pokemon) => {
  const newCard = placeholder.cloneNode(true);
  const loadingSpinner = newCard.querySelector(".lds-ring");

  loadingSpinner.remove();

  const title = newCard.querySelector(".title");
  title.innerText = pokemon.name;

  const image = newCard.querySelector("img");
  image.src = pokemon.sprites.front_default;

  const typesDiv = newCard.querySelector(".types");
  const types = pokemon.types.map((type) => type.type.name);
  typesDiv.innerText = types.join(", ");

  const weightDiv = newCard.querySelector(".weight");
  weightDiv.innerText = `${pokemon.weight} kg`;

  newCard.id = pokemon.id;

  newCard.onclick = () => showModal(pokemon.id);

  flexContainer.appendChild(newCard);
};

const getPokemonList = () => {
  fetch(`${baseAPI}pokemon?limit=20&offset=${page * 20}`)
    .then((res) => res.json())
    .then((data) => {
      const fetchedPokemon = data.results;

      const requests = fetchedPokemon.map((pokemon) => {
        return fetch(pokemon.url)
          .then((res) => res.json())
          .then((data) => {
            pokemonArray.push(data);
            console.log(pokemonArray);
            addCard(data);
          });
      });

      return Promise.all(requests);
    })
    .finally(() => {
      placeholder.classList.add("hidden");
    });
};

const renderChart = () => {
  const chartCanvas = document.getElementById("statsChart");
  currentChart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: ["HP", "Attack", "Defense", "Special A", "Special D", "Speed"],
      datasets: [
        {
          label: "Value",
          data: [59, 63, 80, 65, 80, 58],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 255,
        },
      },
    },
  });
};

const showAndMovePlaceholder = () => {
  placeholder.classList.remove("hidden");
  placeholder.remove();
  flexContainer.appendChild(placeholder);
};

const nextPage = () => {
  showAndMovePlaceholder();
  page++;
  getPokemonList();
  totalPokemon.innerText = (page + 1) * 20;
};

const dismissModal = (e) => {
  console.log("here");
  if (e.currentTarget === e.target) {
    modalBackdrop.classList.add("hidden");
    currentChart.destroy();
  }
};

modalBackdrop.onclick = dismissModal;

getPokemonList();
