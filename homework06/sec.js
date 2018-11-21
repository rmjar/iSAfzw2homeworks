var person2 = {
    name: "jan",
    age: 20
};

console.log(person2);


var a = 20;
function changeA() {
function a() {}
a = 50;
return;
}

changeA();
console.log(a);

function someFunction() {
    var variable ="I'm a variable";
    
    var variable = function() {
        return "I'm a function";
    }
    return variable();
}

console.log(someFunction());


var x = 444;
var someFunction = function() {
    console.log(x);
    var x = 666;
};
someFunction();

const tab = [1, 2, 3];
tab.shift();
console.log(tab);