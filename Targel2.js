function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function fun1() {
  for (let i = 237; i > 2; i--) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}

fun1();
// Amir Fahmawi && Mohammad Zaaroura 49 /3