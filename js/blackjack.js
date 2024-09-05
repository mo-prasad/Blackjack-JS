// Lesson 08.03 - START

// Blackjack - Pt. 1: DEAL..!
// Review of Lesson 05.04: Making a deck of cards with a nested loop
// New for Lesson 08.03: Deal Blackjack on a timer with setInterval
// Keep score and display the score to the DOM
// Detect Blackjack (21) for the Player, the Dealer -- or both
// Prompt Player to Hit or Stand

// Review the code for making a deck of cards as array of objects

// 1. Given: Arrays for making and storing the cards:
const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];

// 2. Review: Set up a nested for loop that iterates over 
// the kinds and suits arrays:
kinds.forEach(kind => {
    suits.forEach(suit => {
        

        
        // 4. Concatenate the card name and image file names:
        // - name "Queen of Diamonds" corresponds to file "Queen-of-Diamonds.png"
        let name = `${kind} of ${suit}`;
        let file = `${kind}-of-${suit}.png`;

        // 5. Declare a variable, valu, with an inital value of 0;
        // - valu is for storing the numeric value of the card
        let valu = 0;

        // 6. Set the valu property based on the kind of card
        // - the length of the kind string reveals if it is a face card
        // as only "Jack", "Queen", "King" have more than 3 characters

        // if (kind === 'Ace') {
        //     valu = 11;
        // } else if (kind.length > 3) {
        //     valu = 10;
        // } else {
        //     valu = kind;
        // }

        valu = kind == 'Ace' ? 11 : kind.length > 3 ? 10 : kind;

        // Review: Each card is an object with 5 properties:
        /* 
            - name: the name of the card: "Jack of Hearts"
            - file: the card file name: "Jack-of-Hearts.png"
            - kind: 2-10, 'Jack', 'Queen', 'King', 'Ace'
            - suit: 'Diamonds', 'Hearts', 'Spades', 'Clubs'
            - valu: numeric value; face card = 10, Ace = 11
        */

        // 7. Declare a card object with the 5properties, the values of which are
        // the 5 corresponding variables 

        const card = {
            name: name,
            file: file,
            kind: kind,
            suit: suit,
            valu: valu
        };

        // 8. Push the card object into the deck array:
        deck.push(card)
    })
})
// 9. Review: Shuffle (randomize) the deck:

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator

const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck]

// 11. Review: Shuffle (randomize) the shoe:

shoe.sort(() => Math.random() - 0.5);



// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked

const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);

// - Get the HIT and STAND buttons, which won't be assigned listeners yet
// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const hitBtn = document.getElementById('hit-btn');
hitBtn.addEventListener('click', hit);

const standBtn = document.getElementById('stand-btn');
standBtn.addEventListener('click', () => setTimeout(() => stand (), 500));

const feedbackH2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer hands and 
// that display the player and dealer scores

const playerCardsDiv = document.getElementById('player-cards-div');
const dealerCardsDiv = document.getElementById('dealer-cards-div');
const playerScoreSpan = document.getElementById('player-score-span');
const dealerScoreSpan = document.getElementById('dealer-score-span');



// 14. Declare global vars need for keeping track of the deal
// - arrays for holding player and dealer cards 
let playerHand = [];
let dealerHand = [];

// variables for keeping score:

let playerScore = 0;
let dealerScore = 0;
// - dealCounter keeps track of total cards dealt
let dealCounter = 0;

// DEAL
// Now, that we have the shoe, let's deal a hand of Blackjack. We dealt a hand of
// poker in the earlier lesson where we made the deck of cards, BUT this will be
// different: to better emulate game play, we will use setInterval to deal on a 
// 1-second delay between cards
// the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards
// the dealer's first card is dealt face down -- the "hole card"




// 15. Define the deal function:
function deal() {

    // Deactivate the deal btn so that it cannot be clicked again mid-game
    dealBtn.disabled = true;
    dealBtn.classList.toggle('disabled-btn');
    // 16. Since this is a new hand, reset the scores and "clear the table"

    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';

    // - reset the player and dealer scores

    playerScore = 0;
    dealerScore = 0;
    playerScoreSpan.innerHTML = 'Player Score: 0';
    dealerScoreSpan.innerHTML = 'Dealer Shows: 0';
    
    // - clear the text from the output h2

    feedbackH2.innerHTML = '';

    // - empty the arrays that store the player and dealer

    playerHand = [];
    dealerHand = [];

    // - empty the arrays that store the player and dealer handsdealCounter = 0;

    dealCounter = 0;

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(() => {
        dealCounter++;
        if (dealCounter <= 4) {
            const cardImg = new Image();
            const cardObj = shoe.pop();
            /*
            For testing purposes
            const cardObj = {
                name: "Ace of Diamonds",
                file: "Ace-of-Diamonds.png",
                suit: "Diamonds",
                valu: 11,
                kind: "Ace"
            }
            */
            cardImg.src = `images/cards350px/${cardObj.file}`;
            if (dealCounter % 2 == 1) {
                playerCardsDiv.appendChild(cardImg);
                playerHand.push(cardObj);
                playerScore += cardObj.valu;

                if(playerScore > 21) {
                    playerScore -= 10;
                    playerHand[playerHand.findIndex(item => item.valu == 11)].valu = 1;
                }

                playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;
                console.log("Player Hand: ", playerHand)
            } else {
                dealerScore += cardObj.valu;
                dealerHand.push(cardObj);

                if(dealerScore > 21) {
                    dealerScore = 12;
                    dealerHand[dealerHand.findIndex(item => item.valu == 11)].valu = 1;
                }

                if(dealCounter == 4) {
                    cardImg.src = `images/cards350px/0-Back-of-Card-Red.png`;

                    // testing code
                    // playerScore = 21;
                    // dealerScore = 21;

                    setTimeout(() => {    
                        if (dealerScore == 21 && playerScore == 21) {
                            cardImg.src = `images/cards350px/${cardObj.file}`;
                            feedbackH2.innerHTML = "BOTH have Blackjack! It's a PUSH..!";
                            dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
                            enableDealBtn ();
                        } else if (playerScore == 21) {
                            feedbackH2.innerHTML = "You have Blackjack! You WIN...!";
                            enableDealBtn ();
                        } else if (dealerScore == 21) {
                            cardImg.src = `images/cards350px/${cardObj.file}`;
                            feedbackH2.innerHTML = "Dealer has Blackjack! You LOSE...";
                            dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
                            enableDealBtn ();
                        } else {
                            feedbackH2.innerHTML = "Hit or Stand..?";
                            hitBtn.disabled = false;
                            hitBtn.classList.toggle('disabled-btn');
                            standBtn.disabled = false;
                            standBtn.classList.toggle('disabled-btn');
                        }
                    }, 1000)
                } else {
                    dealerScoreSpan.innerHTML = `Dealer Shows: ${dealerScore}`;
                }
                dealerCardsDiv.appendChild(cardImg);
                cardImg.style.width = '95px';
                console.log('Dealer Hand: ', dealerHand);
            }
            
        } else {
            clearInterval(dealInterval);
        }
        
    }, 1000)

        // 18. Increment the counter that keeps track of how many card have been dealt

        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)

        // 20. Instantiate a new image object to hold the card image
        let pic;

        // 21. Pop a card object off the shoe array and save it as a new card
        let card;

        // 22. If this is not the 2nd card / 1st dealer card, set the image 
        // source equal to the card image file path:
       
        // 23. ELSE if this IS the 1st dealer card; deal the "hole card" 
        // face-down by setting its source equal to the back of the card image

       // 24. Set up an if-else statement to handle the logic for dealing two cards 
       // each to player and dealer, starting with the player.
       // Th if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player

            // 25. Output the card to the player's div

            // 26. Push the card into the player's hand
      
            // 27. Increment the player's score
      
        // 28. Add the else part to handle dealers dealt to the dealer
    
            // 29. Make the dealer cards a bit smaller, to make them appear farther away
          
            // 30. Output the card to the dealer's div
      
            // 31. Push the card into the dealer's hand
        
            // 32. Update the dealer's score

        // 33. Update "Dealer Show"s" once the deal ends--this is not
        // the dealer's score, just the value of the ONE card that IS showing
        // this value equals the dealer's score minus the value of the the hole card

            // 34. Log the dealer's hidden hand and secret score to the console

            // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again

                // 36. Mute the color of the DEAL button so that it looks unclickable

                // 37. Un-mute the HIT and STAND buttons and set their disabled to false
                // the buttons appearance is handled by removing and adding classes
    
            // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
            // do the prompt on a 15-second delay with setTimeout

            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
    
            //40. Set the setInterval timer for the card dealing to repeat every 1 second:

            // 41. Run the file in the browser and click DEAL, being sure to check the 
            // console for the shuffled deck, shuffled shoe and dealer hand / score
}

function hit () {

    // give the player 1 card
    const cardImg = new Image();
    const cardObj = shoe.pop();
    cardImg.src = `images/cards350px/${cardObj.file}`;
    playerCardsDiv.appendChild(cardImg);
    playerHand.push(cardObj);
    playerScore += cardObj.valu;
    playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;

    if(playerScore > 21) {

        let indexOfAce11 = playerHand.findIndex(item => item.valu == 11);
        if (indexOfAce11 != -1) {
            playerHand[indexOfAce11].valu = 1;
            playerScore -= 10;
            playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;
            if (playerScore == 21) {
                setTimeout(() => stand (), 1000);
            }
        } else {
            feedbackH2.innerHTML = "You Busted! Game Over"
            disableHitStandBtns ();
            enableDealBtn ();
        }
    } else if (playerScore == 21) {
        setTimeout(() => stand (), 1000);
    } else {
        feedbackH2.innerHTML = "Hit Again or Stand...";
    }
}

function stand () {
    console.log('hello from stand function');
    disableHitStandBtns ();
    feedbackH2.innerHTML = "Dealer's Turn..."
    dealerCardsDiv.children[1].src = `images/cards350px/${dealerHand[1].file}`
    dealerTurn = setInterval(() => {
        
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`

        if (dealerScore < 17) {
            const cardImg = new Image();
            const cardObj = shoe.pop();
            dealerScore += cardObj.valu;
            cardImg.src = `images/cards350px/${cardObj.file}`;
            cardImg.style.width = '95px'
            dealerHand.push(cardObj)
            dealerCardsDiv.appendChild(cardImg);
            dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`
        } 
        
        if (dealerScore >= 17 && dealerScore <= 21) {
            evalWinner();
            clearInterval(dealerTurn);
        } 
        if (dealerScore > 21) {
            let indexOfAce11 = dealerHand.findIndex(item => item.valu == 11);
            if (indexOfAce11 != -1) {
                dealerHand[indexOfAce11].valu = 1;
                dealerScore -= 10;
                dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
                if (dealerScore == 21) {
                    evalWinner();
                    clearInterval(dealerTurn);
                }
            } else {
                feedbackH2.innerHTML = "Dealer Busted! You Win!"
                enableDealBtn ();
                clearInterval(dealerTurn);
            }
        }
    }, 1000)
}

function evalWinner () {
    if (playerScore == dealerScore) {
        feedbackH2.innerHTML = "It's a Push..!";
    } else if (playerScore > dealerScore) {
        feedbackH2.innerHTML = "You Win..!";
    } else {
        feedbackH2.innerHTML = "You Lose..."
    }
    enableDealBtn();
}

function disableHitStandBtns () {
    hitBtn.disabled = true;
    hitBtn.classList.toggle('disabled-btn');
    standBtn.disabled = true;
    standBtn.classList.toggle('disabled-btn');
}

function enableDealBtn () {
    dealBtn.disabled = false;
    dealBtn.classList.toggle('disabled-btn')
}

// END: Lesson 08.03
// NEXT: Lesson 08.04