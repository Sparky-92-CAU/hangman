// initialize game variables  
let guesses = 10;
let lettersUsed = [];
let wins = 0;  
let wordBank= ['mimosa','gimlet','mojito','manhattan','martini'];
let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
// set random word from wordbank
let word = wordBank[Math.floor(Math.random() *wordBank.length)];
let wordArray = word.split();
// build placeholder for the random word
let wordPlaceholder = [];
    for(let i =0;i<word.length;i++){
        wordPlaceholder.push('_ ');
    };
//audio files
var win = new Audio("../hangman/assets/win.mp3");
var lose = new Audio('../hangman/assets/lose.mp3');

       

// get element id's
const guessesID = document.querySelector('#guesses');
const usedID = document.querySelector('#used');
const winsID = document.querySelector('#wins');
const wordDisplayed = document.querySelector('#word');
const picID = document.querySelector('#picture')

// place values in html  
const setBoard = function(){

    wordDisplayed.innerText = wordPlaceholder.join('');    
    guessesID.innerText = `Guesses Left: ${guesses}`;
    usedID.innerText = `Letters Used: ${lettersUsed}`;
    winsID.innerText = `Number of Wins: ${wins}`;
//place image value that matches with the random word
    if (word == 'mimosa'){
        picID.src = '../hangman/assets/mimosa.png';
         
    }
    else if(word == 'gimlet'){
        picID.src ="../hangman/assets/mimosa.png";

    }
    else if (word=='mojito'){
        picID.src = '../hangman/assets/mojito.png';

    }
    else if(word=='manhattan'){
        picID.src = '../hangman/assets/man.png';

    }
    else if(word=='martini'){
        picID.src = '../hangman/assets/martini.png';

    }
    else{
        picID.src = '#';

    };

    console.log(word);
};
//reset values...new word
const resetBoard = function(){

    guesses = 10;
    lettersUsed = [];
    word = wordBank[Math.floor(Math.random() *wordBank.length)];
    wordArray = word.split();
    wordPlaceholder = [];
    for(let i =0;i<word.length;i++){
        wordPlaceholder.push('_ ');
    };

    
};


//take in keystroke and update game based on what was pressed
const updateBoard = function(event){
    // key that is pressed    
    const key = event.key;
    
    //key is in word and not already used
    if (word.includes(key) && !lettersUsed.includes(key)) {
        
        //add to used letters
        lettersUsed.push(key);
        //decrement guesses
        guesses--;
        console.log(`${key}`);
        
        //finds location(s) of matching letters
        let matched =[];
        for(let i = 0;i<word.length;i++){
           if (word[i]==key){matched.push(i);}
        }
        //builds array of matched letters
        for(let i=0;i<matched.length;i++){
            wordArray[matched[i]] = key;
        };
        //replaces blanks with matched letters
        for (let i=0;i<wordArray.length;i++){
            wordPlaceholder[matched[i]] = key;
        };
        console.log(wordArray);
    }
     //key not in word and not used   
     else if(!lettersUsed.includes(key) && alphabet.includes(key)) {
        
        lettersUsed.push(key);
        guesses--;
        console.log('not found');

     }
     //if theres a win, increment wins and reset board, play win sound
     if (wordPlaceholder.join('')==word){
        wins++;
        win.play();
        alert(`Congrats! you geussed the word : ${word}`);
        resetBoard();

     };
     //if no win, reset board, play lose sound
     if (guesses == 0 && wordPlaceholder.join('')!=word){
        lose.play();
        alert(`You lost! The word was: ${word}`);
        resetBoard();
     };
     //set board with new values
     setBoard();
  }

//initial board set
setBoard();
//listen for keystroke
document.addEventListener('keyup', updateBoard);
