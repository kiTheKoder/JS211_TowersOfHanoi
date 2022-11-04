"use strict";

const assert = require("assert");
const { normalize } = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// An object that represents the three stacks of Towers of Hanoi;
// * each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};

// shows stacks in console
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};

const movePiece = (startStack, endStack) => {
  //pop the top element of startStack and push it to the top of the endStack 
  let startsLastElement = stacks[startStack].pop();
  stacks[endStack].push(startsLastElement);
};

const isLegal = (startStack, endStack) => {
  //move is legal if the startStack end piece is smaller than the endStacks end piece or the endStack is empty 
  if (
    stacks[startStack].slice(-1) < stacks[endStack].slice(-1) ||
    stacks[endStack].length === 0
  ) {
    return true;
  } else {
    return false;
  }



}


const checkForWin = () => {
  //we check to see if either stack b or c's length is equal to 4 (the total amount of pieces)
  if (stacks["b"].length === 4 || stacks["c"].length === 4) {
    return true;
  } else {
    return false;
  }
}

//a counter for players turn number
let turnNumber = 0
//this puts all of our functions together to actually play the game
const towersOfHanoi = (startStack, endStack) => {
  // first we check to see  if move is legal (isLegal)  
  if (isLegal(startStack, endStack)) {
    //if move is legal, then we move the piece
    movePiece(startStack, endStack);
    // increases by 1 each time a turn is played and displays that value
  turnNumber = turnNumber+1

  console.log("Turn number: " + turnNumber)

  } else {
    //otherwise we log an error
    console.log("Error : Invalid move !");
  }
//check to see if player won and log statement
  if (checkForWin()) {
    console.log("You won!");
  }
};


const getPrompt = () => {
  printStacks();
  rl.question("start stack: ", (startStack) => {
    rl.question("end stack: ", (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
};

// Tests

if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal("a", "b"), false);
    });
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal("a", "c"), true);
    });
  });
  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}

