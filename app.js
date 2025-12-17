import { json } from "stream/consumers";
import api from "./utils/api.js";
import file from "./utils/fileHandling.js";
import math from "./utils/mathTools.js";

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

async function getTranscriptions() {
  let transcriptions = await file.read("data/TRANSCRIPTIONS.json");
  transcriptions = JSON.parse(transcriptions);
  return transcriptions;
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
  getPeopleBy("name", name);
}

function getPeopleByAge(age) {
  getPeopleBy("age", age);
}

function cleanString(str) {
  return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "");
}

async function getDangerousByAge() {
  const dangerousWords = ["death", "knife", "bomb", "attack"];
  const transcriptions = await getTranscriptions();
  const dangerousByAge = {};
  transcriptions.forEach((transcription) => {
    const text = transcription.content.split(" ");
    const sumDangerousWords = text.filter((word) =>
      dangerousWords.includes(cleanString(word).toLowerCase())
    ).length;
    if (sumDangerousWords > 0) {
      if (!dangerousByAge.hasOwnProperty(transcription.age)) {
        dangerousByAge[transcription.age] = [];
      }
      dangerousByAge[transcription.age].push(sumDangerousWords);
    }
  });
  return dangerousByAge;
}

async function avgDangerousByAge() {
  const dangerousByAge = await getDangerousByAge();
  const avgOfAge = {};
  Object.keys(dangerousByAge).forEach((age) => {
    avgOfAge[age] = math.avg(dangerousByAge[age]);
  });
  return avgOfAge;
}

async function getTopDangerousAges() {
  const avgOfAge = await avgDangerousByAge();
  const sorted = Object.entries(avgOfAge)
    .sort((a, b) => a[1] - b[1])
    .reverse();
  const top = sorted.slice(0, 3).map((age) => age[0]);
  return top;
}

async function getMostDangerousPeople() {
  const topDangerousAges = await getTopDangerousAges();
  const transcriptions = await getTranscriptions();
  return transcriptions.filter((people) => {
    if (topDangerousAges.includes(people.age.toString())) {
      return people;
    }
  });
}
console.log(await getMostDangerousPeople());
