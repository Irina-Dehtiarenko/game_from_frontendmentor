//stworzyć stan - state
//w stanie score
//player pick
//ai pick

const playerWinsLSKey = "playerWins";
const AIWinsLSKey = "AIWins";

const winningResultsMap = {
  paper: ["rock"],
  rock: ["scissors"],
  scissors: ["paper"],
};

let state = {
  playerWins: localStorage.getItem(playerWinsLSKey) || 0,
  AIWins: localStorage.getItem(AIWinsLSKey) || 0,
  playerPick: null,
  AIPick: null,
};
// localStorage.getItem(AIWinsLSKey) - tak się dodaję
// localStorage.setItem(playerWinsLSKey, 8) - tak się wywołuje
const renderScore = () => {
  //wpisuje wynik
  const pointsElement = document.querySelector(".points");
  pointsElement.innerText = state.playerWins - state.AIWins;
  //   albo po mojemu
  //    pointsElement.textContent = `${state.playerWins - state.AIWins}`;
};

const pick = (e) => {
  pickByPlayer(e.currentTarget.dataset.pick);
  pickByAI();
  hideOptions();
  showFight();
};

const pickByPlayer = (pickedOption) => {
  //dodajemy wybór gracza
  state = {
    ...state,
    playerPick: pickedOption,
  };
};

const pickByAI = () => {
  const options = ["paper", "scissors", "rock"];
  const AIPick = options[Math.floor(Math.random() * options.length)];
  state = {
    //doddajemy wybór komputera - losowy
    ...state,
    AIPick,
  };
  //Mój wariant
  //   const index = Math.floor(Math.random() * options.length);
  //   return options[index];
};

const hideOptions = () => {
  document.querySelector(".options").classList.add("hidden");
};

const createPickElement = (option) => {
  const pickElement = document.createElement("div");
  pickElement.classList.add("button", `button--${option}`);

  const imageContainerElement = document.createElement("div");
  imageContainerElement.classList.add("button__image-container");

  const imgElement = document.createElement("img");
  imgElement.src = `./images/icon-${option}.svg`;
  imgElement.alt = option;

  imageContainerElement.appendChild(imgElement);
  pickElement.appendChild(imageContainerElement);

  return pickElement;
};

const createElementPickedByPlayer = () => {
  const playerPick = state.playerPick;

  const pickContainerElement = document.querySelector(
    ".pick__container--player"
  );
  pickContainerElement.innerHTML = ""; //reset HTML
  pickContainerElement.appendChild(createPickElement(playerPick));
};

const createElementPickedByAI = () => {
  const AIPick = state.AIPick;

  const pickContainerElement = document.querySelector(".pick__container--ai");
  pickContainerElement.innerHTML = ""; //reset HTML
  pickContainerElement.appendChild(createPickElement(AIPick));
};

const showResult = () => {
  // console.log(winningResultsMap[state.playerPick]); // zwraca - ['paper']

  if (state.AIPick === state.playerPick) {
    console.log("draw");
  } else if (winningResultsMap[state.playerPick].includes(state.AIPick)) {
    console.log("Player wins");
  } else {
    console.log("AI wins");
  }
};

const showFight = () => {
  document.querySelector(".fight").classList.remove("hidden");
  createElementPickedByPlayer();
  createElementPickedByAI();

  showResult();
};

const bindPickEvents = () => {
  document.querySelectorAll(".options button").forEach((button) => {
    button.addEventListener("click", pick);
  });
};

const init = () => {
  //ta funkcja się odpali w momęcie startu programu

  renderScore();
  bindPickEvents();
};

init();
