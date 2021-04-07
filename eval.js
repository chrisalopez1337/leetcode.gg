class Array {
  constructor(...values) {
	this.array = [...values];
  }
  
  last() {
    return this.array[this.array.length-1];
  }
  
  first() {
    return this.array[0];
  }
}

const addTwo = (a,b) => {
  const arr = new Array(a,b);
  return arr.last() + arr.first();
};console.log(addTwo(1,2))