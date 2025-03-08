//module import file

// default import
import multiply from "./mathOperations_moduleA.js";

//named import
import { add, subtract } from "./mathOperations_moduleA.js"

console.log(add(4, 6));
console.log(subtract(4, 6));
console.log(multiply(4, 6));
