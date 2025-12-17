import { json } from "stream/consumers";
import api from "./utils/api.js";
import file from "./utils/fileHandling.js";

const baseUrl = "https://spies-test-server.vercel.app/";

async function fetchPeople() {
  const people = await api.get(baseUrl + "people");
  file.write("data/PEOPLE.json", JSON.stringify(people));
}

async function fetchRecords() {
  const records = await api.get(baseUrl + "transcriptions");
  file.write("data/TRANSCRIPTIONS.json", JSON.stringify(records));
}

async function getPeoples() {
  let people = await file.read("data/PEOPLE.json");
  people = JSON.parse(people);
  return people;
}

async function getPeopleBy(by, value) {
  const people = await getPeoples();
  const result = people.filter(
    (people) =>
      people[by].toString().toLowerCase() == value.toString().toLowerCase()
  );
  if (result.length === 0) {
    console.log(`${by} ${value}, not found!`);
    return;
  }
  if (by === "name") {
    console.log(result[0]);
  } else if (by === "age") {
    console.log(result);
  }
}

function getPeopleByName(name) {
  getPeopleBy('name', name)
}

function getPeopleByAge(age) {
  getPeopleBy('age', age)
}

fetchPeople();
fetchRecords();
