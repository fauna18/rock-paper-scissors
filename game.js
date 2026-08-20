// --- Constants ---
const CHOICES = ['rock', 'paper', 'scissors'];
const EMOJIS = { rock: '✊', paper: '🖐️', scissors: '✌️' };
const WINNING_SCORE = 5;

// --- DOM Elements ---
const choiceBtns = document.querySelectorAll('.choice-btn');
const playerPick = document.getElementById('playerPick');
const computerPick = document.getElementById('computerPick');
const roundResult = document.getElementById('roundResult');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const resetBtn = document.getElementById('resetBtn');

// --- Game State ---
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    }

    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper') 
    ) {
        return 'win';
    }

    return 'lose';
}

function playRound(playerChoice) {
    if (gameOver) return;

    const computerChoice = getComputerChoice();

    // Update display
    playerPick.textContent = EMOJIS[playerChoice];
    computerPick.textContent = EMOJIS[computerChoice];

    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);

    if (result === 'win') {
        playerScore++;
        roundResult.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
        roundResult.style.color = '#2ea043'; 
    } else if (result === 'lose') {
        computerScore++;
        roundResult.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
        roundResult.style.color = '#f85149';
    } else {
        roundResult.textContent = `It's a draw! Both Chose ${playerChoice}`;
        roundResult.style.color = '#d29922';
    }
    
    // Update scoreboard
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    //Check for match winner
    if (playerScore >= WINNING_SCORE) {
        roundResult.textContent = '🏆 You win the match!';
        roundResult.style.color = '#2ea043';
        endMatch();
    } else if (computerScore >= WINNING_SCORE) {
        roundResult.textContent = '👾 Computer wins the match!';
        roundResult.style.color = `#f85149`;
        endMatch();
    }
}

function endMatch() {
     gameOver = true;
    choiceBtns.forEach(btn => btn.disabled = true);
    resetBtn.classList.remove('hidden');
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerPick.textContent = '❓';
    computerPick.textContent = '❓';
    roundResult.textContent = '';
    choiceBtns.forEach(btn => btn.disabled = false);
    resetBtn.classList.add('hidden');
}

// --- Event Listeners ---
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const choice = btn.getAttribute('data-choice');
        playRound(choice);
    });
});

resetBtn.addEventListener('click', resetGame);

