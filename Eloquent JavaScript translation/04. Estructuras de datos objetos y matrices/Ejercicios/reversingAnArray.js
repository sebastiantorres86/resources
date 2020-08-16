/* Reversing an array

Arrays have a reverse method that changes the array by inverting the order in which its elements appear. 
For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, 
takes an array as argument and produces a new array that has the same elements in the inverse order. The 
second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument 
by reversing its elements. Neither may use the standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous chapter, which variant 
do you expect to be useful in more situations? Which one runs faster?*/

// Your code here.

function reverseArray(array) {
  let reversedArray = [];
  for (let index = 0; index < array.length; index++) {
    reversedArray.unshift(array[index]);
  }
  return reversedArray;
}

function reverseArrayInPlace(array) {
  for (let index = 0; index < Math.floor(array.length / 2); index++) {
    let valueA = array[array.length - 1 - index]
    let valueB = array[index]
    array[array.length - 1 - index] = valueB
    array[index] = valueA;
  }
  return array;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
