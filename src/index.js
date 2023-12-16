function pickproparray(array,prop){
  let res = [];
  for(let index =0; index<array.length; index++){
      let element = array[index];
      if(element.hasOwnProperty(prop)){
          res.push(element[prop])
      }
  }
  return res;
}

const students = [
  { name: 'Павел', age: 20 },
  { name: 'Иван', age: 20 },
  { name: 'Эдем', age: 20 },
  { name: 'Денис', age: 20 },
  { name: 'Виктория', age: 20 },
  { age: 40 },
];
const res = pickproparray(students, 'name');
console.log(res)


function createcounter() {
  let count = 0;
  return function () {
      count++;
      console.log(count)
  }
}

const counter1 = createcounter();
counter1();
counter1();

const counter2 = createcounter()
counter2();
counter2();



function spinwords(str){
  const words = str.split(' ');
  for(let index = 0; index<words.length; index++){
      if(words[index].length>=5){
          words[index] = words[index].split('').reverse().join('');
      }
  }
  return words.join(' ');
}


let result1 = spinwords("Привет от Legacy")
console.log(result1)

let result2 = spinwords("This is a test")
console.log(result2)