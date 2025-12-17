import {
  fetchPeople,
  fetchRecords,
  getPeopleByName,
  getPeopleByAge,
  getMostDangerousPeople,
} from "./app.js";
import input from "analiza-sync";

async function main() {
  console.log("1. fetch peoples\n2. fetch records\n3. search people by name\n4. search people by age\n5.get most dangerous people\n6. exit");
  let choice;
  while (choice !== "6") {
    choice = input("Enter your choice ");
    if (choice == "1") {
      fetchPeople();
      console.log("people fetched!");
    }
    if (choice == "2") {
      fetchRecords();
      console.log("records fetched!");
    }
    if (choice == "3") {
      getPeopleByName(input("Enter name "));
    }
    if (choice == "4") {
      getPeopleByAge(input("Enter age "));
    }
    if (choice == "5") {
      const response = await getMostDangerousPeople();
      console.log(response);
    }
  }
}

// main();
getPeopleByAge(32)