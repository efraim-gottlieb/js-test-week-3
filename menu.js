import {
  fetchPeople,
  fetchRecords,
  getPeopleByName,
  getPeopleByAge,
  getMostDangerousPeople,
} from "./app.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log(
    "1. fetch peoples\n2. fetch records\n3. search people by name\n4. search people by age\n5.get most dangerous people\n6. exit"
  );
  let choice;
  while (choice !== "6") {
    choice = await input("Enter your choice ");
    if (choice == "1") {
      await fetchPeople();
      console.log("people fetched!");
    }
    if (choice == "2") {
      await fetchRecords();
      console.log("records fetched!");
    }
    if (choice == "3") {
      const name = await input("Enter name ");
      await getPeopleByName(name);
    }
    if (choice == "4") {
      const age = await input("Enter age ");
      await getPeopleByAge(age);
    }
    if (choice == "5") {
      const response = await getMostDangerousPeople();
      console.log(response);
    }
  }
  rl.close();
}
main();
