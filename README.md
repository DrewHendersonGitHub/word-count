Describe: mostUsedWords()

Test: "It should return each word if there are three words"
Code:
const word = "one two three";
one: 1
two: 1
three: 1

Describe: censorText(text)
Test: "If there are no banned words, should return original text"
Code:
censorText("hello this is fine");
Result: "hello this is fine"


Test: "If there are banned words, should remove and return rest of text."
Code:
censorText("hello this loopdaloop is zoinks fine")
Results: "hello this is fine"

Test: "