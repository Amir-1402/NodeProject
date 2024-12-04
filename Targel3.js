function countZeros(arr) {
  let count = 0;
  for (let num of arr) {
    count += num === 0;
  }
  return count;
}

const numbers = [1, 0, 4, 0, 5, -3, 0, 7];
console.log(countZeros(numbers));

// Amir Fahmawi && Mohammad Zaaroura 49 /3