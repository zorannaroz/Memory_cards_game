const gameBoard = document.querySelector(".game-board");
let cards = [];
let flippedCards = [];

const cardFrontImage = "images/card_front.jpg";
const pairFoundImage = "images/pair_found.jpg";

function createCard(image) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.innerHTML = `<img src="${cardFrontImage}" alt="Card Front">`;

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.innerHTML = `<img src="${image}" alt="Card Back">`;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.addEventListener("click", () => {
    if (!card.classList.contains("flipped") && flippedCards.length < 2) {
      card.classList.add("flipped");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        setTimeout(() => {
          checkMatch(cards); 
        }, 1000);
      }
    }
  });

  return card; 
}

function checkMatch(cards) {
  const [firstCard, secondCard] = flippedCards;
  const isMatch =
    firstCard.querySelector(".card-back img").src ===
    secondCard.querySelector(".card-back img").src;
  if (isMatch) {
    flippedCards = [];
    setTimeout(() => {
      firstCard.innerHTML = `<img src="${pairFoundImage}" alt="Pair Found" style="width: 100%; height: 100%;">`;
      secondCard.innerHTML = `<img src="${pairFoundImage}" alt="Pair Found" style="width: 100%; height: 100%;">`;
      const allMatched = cards.every((card) =>
        card.innerHTML.includes(pairFoundImage)
      );
      if (allMatched) {
        console.log("All pairs matched!");
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "flex";
      }
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      flippedCards = [];
    }, 200);
  }
}

function generateDeck(size) {
  const images = [
    "images/abstract.png",
    "images/boy-and-a-dog.jpg",
    "images/boy-and-a-girl-with-baloon.jpg",
    "images/dog-in-the-bathtub.png",
    "images/father-and-son.jpg",
    "images/fox-in-autumn.png",
    "images/fox-in-love.jpg",
    "images/frog-1.jpg",
    "images/frog-2.jpg",
    "images/frog-3.jpg",
    "images/frog-4.png",
    "images/hand.jpg",
    "images/hearts.jpg",
    "images/man-and-a-woman-in-love.jpg",
    "images/sad-cat.jpg",
    "images/teddy-bear.jpg",
  ];
  const cards = [];
  for (let i = 0; i < size / 2; i++) {
    const index = Math.floor(Math.random() * images.length);
    const image = images.splice(index, 1)[0];
    cards.push(createCard(image));
    cards.push(createCard(image));
  }
  return shuffle(cards);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  cards = generateDeck(32);
  gameBoard.innerHTML = "";
  cards.forEach((card) => {
    gameBoard.appendChild(card);
  });
}
initGame();
