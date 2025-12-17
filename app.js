import { json } from "stream/consumers";
import api from "./utils/api.js";
import file from "./utils/fileHandling.js";

const baseUrl = "https://spies-test-server.vercel.app/";

async function downloadAndSavePeople() {
  const people = await api.get(baseUrl + 'people');
  file.write("data/people.json", JSON.stringify(people));
}
downloadAndSavePeople()