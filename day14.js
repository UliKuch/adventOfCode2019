const input = require("./day14_input");
const testInput1 = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;


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

    // produce resource invoking recipe (this.requires) until this.existing is larger or equal to 0
    while (this.existing < 0) {

      // iterate over recipe (this.requires)
      for (let [key, value] of Object.entries(this.requires)) {
        if (key === "ORE") {
          c += value
          continue;
        }

        // find resource in array passed as argument
        resource = resources.find(res => res.name === key)

        // increase c by the value returned from requiring the resource as often as specified in recipe (value)
        c += resource.requiring(value, resources)
      }

      this.existing += this.produces;
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


const resources = createResourceObjects(input);
const fuel = resources.find(res => res.name === "FUEL");
console.log(fuel.requiring(1, resources))
