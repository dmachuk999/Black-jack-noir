let playerHand = [];
let dealerHand = [];

function drawCard() {
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['♠', '♥', '♦', '♣'];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { rank, suit };
}

function calculateValue(hand) {
    let value = 0;
    let aces = 0;
    hand.forEach(card => {
        if (['J', 'Q', 'K'].includes(card.rank)) value += 10;
        else if (card.rank === 'A') {
            value += 11;
            aces += 1;
        } else value += parseInt(card.rank);
    });
    while (value > 21 && aces > 0) {
        value -= 10;
        aces -= 1;
    }
    return value;
}

function renderHand(hand, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    hand.forEach(card => {
        const div = document.createElement('div');
        div.textContent = card.rank + card.suit;
        container.appendChild(div);
    });
}

function updateScores() {
    document.getElementById('player-score').textContent = "Score: " + calculateValue(playerHand);
    document.getElementById('dealer-score').textContent = "Score: " + calculateValue(dealerHand);
}

function checkResult() {
    const playerValue = calculateValue(playerHand);
    const dealerValue = calculateValue(dealerHand);
    const resultEl = document.getElementById('result');

    if (playerValue > 21) resultEl.textContent = "You bust!";
    else if (dealerValue > 21) resultEl.textContent = "Dealer busts. You win!";
    else if (playerValue > dealerValue) resultEl.textContent = "You win!";
    else if (dealerValue > playerValue) resultEl.textContent = "Dealer wins.";
    else resultEl.textContent = "Push.";
}

function hit() {
    playerHand.push(drawCard());
    renderHand(playerHand, 'player-cards');
    updateScores();

    if (calculateValue(playerHand) > 21) checkResult();
}

function stand() {
    while (calculateValue(dealerHand) < 17) {
        dealerHand.push(drawCard());
    }
    renderHand(dealerHand, 'dealer-cards');
    updateScores();
    checkResult();
}

function startGame() {
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    renderHand(playerHand, 'player-cards');
    renderHand(dealerHand, 'dealer-cards');
    updateScores();
    document.getElementById('result').textContent = '';
}

window.onload = startGame;
