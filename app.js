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

async function getPeopleBy(by = 'name', name) {
  const people = await getPeoples();
  const result = people.filter(
    (people) => people.by.toLowerCase() == by.toLowerCase()
  );
  if (result.length === 0) {
    console.log(`${name} not found!`);
    return;
  }
  console.log(result[0])
}
// fetchPeople();
// fetchRecords();
const name = "leah";
getPeopleByName(name)
