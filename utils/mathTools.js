const sum = arr => eval(arr.join('+'));

const avg = arr => sum(arr) / arr.length

export default {sum, avg}