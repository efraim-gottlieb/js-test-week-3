import { getMostDangerousPeople } from "./app.js";

console.log("Testing getMostDangerousPeople...");
const result = await getMostDangerousPeople();
console.log("\nResult:");
console.log(result);
console.log("\nNumber of dangerous people:", result.length);
