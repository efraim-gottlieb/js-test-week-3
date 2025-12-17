import {
  fetchPeople,
  fetchRecords,
  getPeopleByName,
  getPeopleByAge,
  reportMostDangerousPeople,
  getMostDangerousPeople
} from "./app.js";
import input from "analiza-sync";

async function main() {
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

main();
