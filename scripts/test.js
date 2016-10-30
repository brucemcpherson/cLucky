function testLucky () {
  //some arrays
  var options = {
    min: 1,
    max: 100,
    maxSize: 10
  };
  for (var i = 0; i < 2 ; i++) {
    show('Array '+i, Lucky.get(options));
  }
  
  // variable lengths
  var options = {
    min: 1,
    max: 5,
    maxSize: 10,
    minSize:3
  };
  for (var i = 0; i < 2 ; i++) {
    show('Array random size '+i, Lucky.get(options));
  }
  
  // shuffle 
  show('Array shuffled', Lucky.shuffle([1, 2, 3, 4, 5]));
  
  // try with seeds
  var options = {
    min: 1,
    max: 100,
    maxSize: 10,
    seed: 90
  };
  for (var i = 0; i < 2 ; i++) {
    show('Array seeded '+i, Lucky.get(options));
  }
  // try with seeds variable length
  var options = {
    min: 1,
    max: 100,
    maxSize: 15,
    seed: 90,
    minSize: 6
  };
  for (var i = 0; i < 2 ; i++) {
    show('Array seeded random size '+i, Lucky.get(options));
  }
  
  // shuffle arrays
  var arr = ["barney", "fred", "wilma", "betty", "bambam", "pebbles"];
  show('Shuffling arrays with seeds', arr);
  var seed = 123.456;
  var shuffled = Lucky.shuffle(arr, seed);
  show("Shuffled array with seed", shuffled);
  show("Unshuffled array with seed", Lucky.unShuffle(shuffled, seed));
  
  //some strings
  var options = {
    min: 'a',
    max: 'z',
    maxSize: 10
  };
  
  for (var i = 0; i < 2 ; i++) {
    show ('String options '+i, options);
    show('String '+i, Lucky.getString(options));
  }
  
  // random size
  var options = {
    min: 'A',
    max: 'S',
    maxSize: 18,
    minSize:7
  };
  
  for (var i = 0; i < 2 ; i++) {
    show('String random size '+i, Lucky.getString(options));
  }
  
  show('string shuffle', Lucky.shuffle('abcdefghijklmnopqrstuvwxyz'));
  var options = {
    min: 'a',
    max: 'q',
    maxSize: 10,
    seed: 90
  };
  for (var i = 0; i < 2 ; i++) {
    show('String seeded '+i, Lucky.getString(options));
  }
  // try with seeds variable length
  var options = {
    min: 'd',
    max: 'v',
    maxSize: 15,
    seed: 90,
    minSize: 6
  };
  for (var i = 0; i < 2 ; i++) {
    show('String seeded random size '+i, Lucky.getString(options));
  }
  
  var str="democracy is a device that ensures we shall be governed no better than we deserve";
  show('Shuffling strings with seeds', str);
  var seed = 1.67;
  var shuffled = Lucky.shuffle(str, seed);
  show("Shuffled string with seed", shuffled);
  show("Unshuffled string with seed", Lucky.unShuffle(shuffled, seed));
  
  // use regex
  var options = {
    maxSize: 30,
    rx:/\w/
  };
  
  for (var i = 0; i < 2 ; i++) {
    show('String with regex '+i, Lucky.getString(options));
  }
  var options = {
    maxSize: 13,
    minSize: 1,
    rx:/[A-Gb#]/
  };
  
  for (var i = 0; i < 2 ; i++) {
    show('String random size with regex '+i, Lucky.getString(options));
  }
  
  // other stuff
  show ('getRandBetween',Lucky.getRandBetween (200,399));
  show ('getUniqueString',Lucky.getUniqueString ());
  show ('getUniqueString shorter',Lucky.getUniqueString (9));
  show ('getUniqueString longer',Lucky.getUniqueString (20));
  //----------------------------------------------
}

function show(div, stuff) {
  //------ browser version
  /**
  var id = div.replace(/\s/g, "-");
  var el = document.getElementById(id) || createElement(document.body, "div", id);
  el.innerHTML = "<strong>" + div + "</strong><br>"
  el.innerHTML += typeof stuff === "object" ? JSON.stringify(stuff) : stuff;
  
  function createElement(parent, type, id) {
  var elem = document.createElement(type);
  if (typeof id !== typeof undefined) {
  elem.id = id;
  }
  parent.appendChild(elem);
  return elem;
  }
  */
  //-----------------------
  
  //-----apps script version
  Logger.log("\n" + div + "\n" + (typeof stuff === "object" ? JSON.stringify(stuff) : stuff));
  //------
  return stuff
}

