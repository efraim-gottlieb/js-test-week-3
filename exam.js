import api from "./api.js";
import file from "./fileHandling.js";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

const book = { title: "foo", body: "bar", userId: 1 };

const a = await api.post(baseUrl + "/posts", book);
console.log(a);
const user = '1'
const b = await api.get(baseUrl + `/${user}`);
console.log(b);

file.write('123.txt', JSON.stringify(b))