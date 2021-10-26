// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function censorText(text) {
  const textArray = text.split(" ");
  const bannedWords = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"];
  let censoredArray = [];
  textArray.forEach(function(word) {
    let isBannedWord = false;
    bannedWords.forEach(function(censoredWord) {
      if (word.toLowerCase().includes(censoredWord)) {
        isBannedWord = true;
      }      
    });
    if (!isBannedWord) {
      censoredArray.push(word);
    }
  });
  return censoredArray.join(" ");
}


  /*
  newArray = [];
  for each word in text:
    count = numberOfOccurrencesInText(word, text)
    let insertedAlready = false
    for each element in newArray {
      if (elementWord === word)
        insertedAlready = true
    }
    if !insertedAlready {
      newArray.push([word, count])
    }
  return newArray
  */
function mostUsedWords(text) {
  let wordArray = text.split(" ");
  let countArray = [];
  let count = 0;
  wordArray.forEach(function(words) {
    let alreadyInserted = false;
    count = numberOfOccurrencesInText(words, text);
    
    countArray.forEach(function(countWords) {
      if (words === countWords[1]) {
        alreadyInserted = true;
      }
    });
    if (alreadyInserted === false) {
      countArray.push([count, words])
    }
  });
  countArray.sort().reverse();

  return countArray;
}

// UI Logic

function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function commonWords(countArray) {
  let htmlString = "";
  if (countArray.length > 0 && countArray[0][0] != 0) {
    htmlString = htmlString.concat("<li>" + countArray[0][1] + ": " + countArray[0][0] + "</li>");
  }  
  if (countArray.length > 1 && countArray[1][0] != 0) {
    htmlString = htmlString.concat("<li>" + countArray[1][1] + ": " + countArray[1][0] + "</li>");
  }
  if (countArray.length > 2 && countArray[2][0] != 0) {
    htmlString = htmlString.concat("<li>" + countArray[2][1] + ": " + countArray[2][0] + "</li>");
  }
  return htmlString;
}

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = censorText($("#text-passage").val());
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const countArray = mostUsedWords(passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#most-common-words").html(commonWords(countArray));
  });
});
