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

async function getPeople() {
  let people = await file.read("data/PEOPLE.json");
  people = JSON.parse(people);
  return people;
}

async function getPeopleByName(name) {
  const people = await getPeople();
  const result = people.filter(
    (people) => people.name.toLowerCase() == name.toLowerCase()
  );
  if (result.length === 0) {
    console.log(`${name} not found!`);
    return;
  }
  console.log(result[0])
}
fetchPeople();
fetchRecords();
const name = "leah";
getPeopleByName(name)
