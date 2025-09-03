const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a positive integer: ", function (input) {
    const number = parseInt(input);

    if (isNaN(number) || number <= 0) {
        console.log("Please enter a valid positive integer.");
        rl.close();
        return;
    }

    // Task 14: Find the divisors
    const divisors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }

    // Task 15: Number of divisors
    const numOfDivisors = divisors.length;

    // Task 16: Sum of the divisors
    const sumOfDivisors = divisors.reduce((sum, val) => sum + val, 0);

    // Task 17: Product of the divisors
    const productOfDivisors = divisors.reduce((product, val) => product * val, 1);

    // Convert number to string for digit operations
    const digits = input.split('').map(Number);

    // Task 18: Number of digits
    const numOfDigits = digits.length;

    // Task 19: Sum of digits
    const sumOfDigits = digits.reduce((sum, val) => sum + val, 0);

    // Task 20: Product of digits
    const productOfDigits = digits.reduce((product, val) => product * val, 1);


    console.log(`14. Divisors: ${divisors.join(", ")}`);
    console.log(`15. Number of divisors: ${numOfDivisors}`);
    console.log(`16. Sum of divisors: ${sumOfDivisors}`);
    console.log(`17. Product of divisors: ${productOfDivisors}`);
    console.log(`18. Number of digits: ${numOfDigits}`);
    console.log(`19. Sum of digits: ${sumOfDigits}`);
    console.log(`20. Product of digits: ${productOfDigits}`);

    rl.close();
});
