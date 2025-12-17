function sum(a, b) {
  return a + b;
}

//arrow fn

const summ = (a, b) => {
  return a + b;
};

//map
//given an array, return an array in which each value is multiplied by 2
const input = [1, 2, 3, 4, 5];

let newarr = [];

for (let i = 0; i < input.length; i++) {
  newarr.push(input[i] * 2);
}

console.log(newarr);

//map
function transform(i) {
  return i * 2;
}

const ans = input.map(transform);
//or
const anss = input.map(function(i){
    return i * 2;
});

console.log(ans);
console.log(anss);

//custom map

const mapp = (arr,fn) =>{
const transformed = [];
for(let i = 0; i<arr.length;i++){
    transformed.push(fn(arr[i]));
}
return transformed;
}

console.log(mapp([1, 2, 3], x => x * 3));

//filtering
//given an input array, give back all even values 
const arr = [1,2,3,4,5];

const newArr = [];
for(let i = 0; i<arr.length;i++){
    if(arr[i] % 2 == 0){
        newArr.push(arr[i]);
    }
}
console.log(newArr);

//filter
const result = arr.filter(function(i){
    return i%2 == 0;
})

console.log(result);

//return names starting with m
const names = ["manya","harkirat","mamta","sanya"];
const namee = names.filter((n) => {
    if(n.toLowerCase().startsWith("m")){
        return true;
    }else{
        return false;
    }
})

console.log(namee);

