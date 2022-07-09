//stworzyć stan - state
//w stanie score
//player pick
//ai pick

const playerWinsLSKey = "playerWins";
const AIWinsLSKey = "AIWins";

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
const bindPickEvents = () => {
  document.querySelectorAll(".options button").forEach((button) => {
    button.addEventListener("click", (e) => {
      //   debugger;
      // przeprowadź analizę działania programu zawierających bugi, przejdź do kolejnych wywołań, itp.

      //   console.log(e.target);-element dziecka w który dokładnie kliknęliśmy,
      //   console.log(e.currentTarget);//teraz zwraca button
      //   console.log(e.currentTarget.dataset.pick); //to zwraca wartość atributa data elementu w który kliknęliśmy
      pickByPlayer(e.currentTarget.dataset.pick);
      pickByAI();
      console.log(state);
    });
  });
};

const init = () => {
  //ta funkcja się odpali w momęcie startu programu

  renderScore();
  bindPickEvents();
};

init();
