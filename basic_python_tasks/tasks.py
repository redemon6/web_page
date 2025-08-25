# Task 1
number = int(input("Enter number: "))
if number % 5 == 0:
    print(f"{number} ededi 5-e bolunur")
else:
    print(f"{number} ededi 5-e bolunmur")



# Task 2
number1, number2, number3 = map(int, input("Enter numbers with spaces: ").split())
if number1 > number2:
    bigger_number = number1
else:
    bigger_number = number2


if bigger_number > number3:
    biggest_number = bigger_number
else:
    biggest_number = number3

print("The biggest number is:", biggest_number)     



# Task 3
number1, number2 = map(int, input("Enter numbers with spaces: ").split())
operation = input("Enter the operation (+,-,*,/): ")
if operation == '+':
    output = number1 + number2
elif operation == '-':
    output = number1 - number2
elif operation == '*':
    output = number1 * number2
elif operation == '/':
    if number2 != 0:
        output = number1 / number2
    else:
        print("Error: Cannot be divided by zero")
else:
    print("Error: Invalid operator")

print("Answer:", output)



# Task 4
N = M = int(input("Enter number: "))
if N < 1:
    print("Number you entered should be bigger than 0 and can't be negative")
else:
    sum = 0
    while N > 0:
        sum += N
        N -= 1 
    print(f"The sum of all numbers from 1 to {M} is {sum}")



# Task 5
number = int(input("Enter number: "))
if number < 0:
    print("Number you entered can't be negative")
else:
    factorial = 1
    for num in range(1, number + 1):
        factorial *= num
    print("The factorial of {} equals to {}".format(number, factorial))

