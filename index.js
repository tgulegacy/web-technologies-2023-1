// задание 1
function pickPropArray(students, property){
    let mas = []
    for (let student of students) {
        if (student.hasOwnProperty(property)) {
            mas.push(student[property])
        }
    }
    return mas
}
const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
]
const result = pickPropArray(students, 'name')
console.log(result)
//задание 2
function createCounter() {
    let count = 0
    return function () {
        count++
        console.log(count)
    }
}
const counter1 = createCounter()
counter1() // 1
counter1() // 2

const counter2 = createCounter()
counter2() // 1
counter2() // 2

//Задание 3
function spinWords(text){
    let words = text.split(' ')
    let newText = ''
    for (let word of words) {
        if (word.length >= 5) {
            newText += word.split('').reverse().join("") + ' '
        }
        else{
            newText += word + ' '
        }
    }
    return newText
}
const result1 = spinWords( "Привет от Legacy" )
console.log(result1) // тевирП от ycageL
const result2 = spinWords( "This is a test" )
console.log(result2) // This is a test

//Задание 4
function bread(nums, target){
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++){
            if (i !== j){
                if(nums[i] + nums[j] === target){
                    return [i, j]
                }
            }
        }
    }
}
console.log(bread([2,7,11,15], 9))