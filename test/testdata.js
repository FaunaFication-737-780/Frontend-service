const a = [1,2,3,4,5,6,7]

for (let index = 0; index < a.length-1; index+=2) {
    

    const element = a[index];
    const element2 = a[index+1]
    console.log(`the first element is ${element} the second element is ${element2}`);
}
if (a.index % 2 != 0) {
    console.log(a[a.length-1]);
}