const input = require("./day14_input");
const testInput1 = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;

const testInput2 = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;

class Resourse {
  constructor(recipe, name) {
    this.name = name;
    this.existing = 0;
    this.produces = parseInt(recipe[1].split(" ")[0]);
    this.requires = {}

    // add content to this.requires object
    const recipeSplit = recipe[0].replace(/,/g, "").split(" ");
    for (let i = 1; i < recipeSplit.length; i += 2) {
      this.requires[recipeSplit[i]] = parseInt(recipeSplit[i - 1]);
    };
  };

  requiring(num, resources) {
    let c = 0;
    let resource;

    // substract number of required resources from this.existing
    this.existing -= num;

    if (this.existing < 0) {

      // calculate how many times this resource has to be produced
      let missing = Math.ceil(Math.abs(this.existing) / this.produces);

      // iterate over recipe (this.requires)
      for (let [key, value] of Object.entries(this.requires)) {
        if (key === "ORE") {
          c += missing * value
          continue;
        }

        // find resource in array passed as argument
        resource = resources.find(res => res.name === key)

        // increase c by the value returned from requiring the resource as often as specified in recipe (value)
        c += resource.requiring(missing * value, resources)
      }	
      
      this.existing += missing * this.produces;

    }
    return c;
  }

};



function createResourceObjects(input) {
  // split input into array of recipes
  const arr = input.split("\n");

  // split recipes into tuples of ingredients and results
  const tuples = arr.map(recipe => recipe.split(" => "));

  // create Resource objects for each recipe
  let resources = [];
  tuples.forEach(recipe => {
    resources.push(new Resourse(recipe, recipe[1].split(" ")[1]));
  });

  return resources;
};


function spendOre(num, resources) {
  let oreUsed = 0;
  let fuelProduced = 0;

  // find fuel resource object
  const fuel = resources.find(res => res.name === "FUEL");

  // spend ore, starting with large steps (have to be adjusted for higher num value and for fuel-intensive input values)
  while (oreUsed < num) {
    fuelProduced += (oreUsed < 950000000000) ? 10000 : (oreUsed < 990000000000) ? 1000 : 1;
    oreUsed += (oreUsed < 950000000000)
        ? fuel.requiring(10000, resources)
        : (oreUsed < 990000000000)
        ? fuel.requiring(1000, resources)
        : fuel.requiring(1, resources);
  }

  console.log("oreUsed", oreUsed, "fuelProduced", fuelProduced);
  return fuelProduced - 1;
}


const resources = createResourceObjects(input);
// const fuel = resources.find(res => res.name === "FUEL");
// console.log(fuel.requiring(1, resources))
console.log(spendOre(1000000000000, resources));