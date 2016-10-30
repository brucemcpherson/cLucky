/**
 * various useful things to do with randomizing
 * @namespace Lucky 
 */
var Lucky = (function(ns) {

  /**
   * ushuffle an array or a string
   * @param {[*]|string} shuffleThis the array or string to shuffle
   * @param {number} seed must have a seed to be unshuffleable
   * @return {[*]|string} the shuffle
   */
  ns.unShuffle = function(shuffled, seed) {
    if (typeof seed === typeof undefined) {
      throw 'a seed is needed to unshuffle';
    }
    return ns.shuffle(shuffled, seed, true);
  };
  /**
   * shuffle an array or a string
   * @param {[*]|string} shuffleThis the array or string to shuffle
   * @param {number} [seed] if specified then the shuffle is repeatable
   * @param {boolean} [unShuffling] whether im unshuffling
   * @return {[*]|string} the shuffle
   */
  ns.shuffle = function(shuffleThis, seed, unShuffling) {
    var target = Array.isArray(shuffleThis) ? shuffleThis.slice() : shuffleThis.split("");

    var shuffler = ns.get({
      minSize: target.length,
      maxSize: target.length,
      min: 0,
      max: target.length - 1,
      seed: seed
    });

    var seq = target.map(function(d, i) {
      return i;
    });

    seq.forEach(function(d, i, a) {
      var t = a[shuffler[i]];
      a[shuffler[i]] = a[i];
      a[i] = t;
    }); 

    var result = target.map(function(d, i, a) {
      return unShuffling ? a[seq.indexOf(i)] : a[seq[i]];
    })

    return Array.isArray(shuffleThis) ? result : result.join("");
  };

  /**
   * return a rand int between
   * @param {number} min the min
   * @param {number} max the max
   * @return [number} the random
   */
  ns.getRandBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * generate a random array of some length of some numbers
   * @param {object} [options] the options
   * @param {number} options.max the higher character
   * @param {number} options.min the lower character
   * @param {number} options.minSize the min size of the string
   * @param {number} options.maxSize the max size of the string
   * @param {number} options.seed if specified generates repreatable sequence with the same seed
   * @return {[number]} the array
   */
  ns.getString = function(options) {
    var params = applyDefaults_({
      min: 'a',
      max: 'z',
      rx: null,
      minSize: 0,
      maxSize: 0,
      seed: 0
    }, options);

    var size = params.size;
    
    if (typeof params.min !== 'string' || typeof params.max !== 'string' || params.min > params.max) {
      throw 'Min and max are incompatible ' + JSON.stringify(params);
    }
    // can use a regex if necessary
    var values;
    if (params.rx) {
      values = Array.apply(null, new Array(256))
        .map(function(d, i) {
          return i;
        })
        .filter(function(d) {
          return String.fromCharCode(d).match(params.rx);
        });
    }
    else {
      var min = params.min.charCodeAt(0);
      var max = params.max.charCodeAt(0);

      // these are the consecutive values
      values = Array.apply(null, new Array(max - min + 1)).map(function(d, i) {
        return min+i;
      });
    }
    
    // now shuffle the values
    return ns.shuffle(values, params.seed).map(function(d) {
        return String.fromCharCode(d);
      })
      .slice(0, size)
      .join('');

  };
  
  /**
   * get a unique string
   * @param {number} [size=12] string size
   * @return {string} a string
   */
  ns.getUniqueString = function (size) {

    var now32 = new Date().getTime().toString(32);
    size = size || now32.length +3;
    if (size < now32.length) {
      throw 'unique string must be at least ' + now32.length;
    }
    return  ns.getString ({maxSize:size-now32.length}) + ns.shuffle(now32);
  }
  /**
   * generate a random array of some length of some numbers
   * @param {object} [options] the options
   * @param {number} options.max the higher number
   * @param {number} options.min the lower number
   * @param {number} options.minSize the min size of the array
   * @param {number} options.maxSize the max size of the array
   * @param {number} options.seed if specified generates repreatable sequence with the same seed
   * @return {[number]} the array
   */
  ns.get = function(options) {
    // default options
    var params = applyDefaults_({
      min: 0,
      max: 0,
      rx: null,
      minSize: 0,
      maxSize: 0,
      seed: 0
    }, options);

    var size = params.size;

    // set seed if needed
    var oldSeed;
    if (params.seed) {
      oldSeed = Math.seed;
      Math.seed = params.seed;
    }

    // decide which random to use
    var rf = params.seed ? function() {
      // thanks to http://indiegamr.com/generate-repeatable-random-numbers-in-js/
      // I have no idea why this works, but it does
      Math.seed = (Math.seed * 9301 + 49297) % 233280;
      return Math.seed / 233280;
    } : Math.random;

    //generate the random array
    var result = Array.apply(null, new Array(size)).map(function(d) {
      return Math.floor(rf() * (params.max - params.min + 1) + params.min);
    });

    // restore the seeed
    if (params.seed) {
      Math.seed = oldSeed;
    }
    return result;
  };

  function applyDefaults_(defaults, given) {
    
    // merge with the defaults;
    var options = given ?
      Object.keys(given)
      .reduce(function(p, c) {
        p[c] = given[c];
        return p;
      }, {}) : {};
    
  
    // if a minSize is given, but no maxSize then assume it
    options.maxSize = options.maxSize || options.minSize;
    options.minSize = options.minSize || options.maxSize;
    var params = Object.keys(options).reduce(function(p, c) {
      if (!p.hasOwnProperty(c)) {
        throw 'invalid option property:' + c;
      }
      p[c] = options[c];
      return p;
    }, defaults);

    // check it makes sense
    if (params.minSize > params.maxSize) {
      throw 'incompatible size options' + JSON.stringify(params);
    }
    // pick a given or random size
    var size = ns.getRandBetween(params.minSize, params.maxSize);
    if (size < 0) {
      throw 'invalid size option' + size;
    }
    if (params.min > params.max) {
      throw 'incompatible min and max options ' + JSON.stringify(params);
    }
    params.size = size;
    return params;
  }

  return ns;
})(Lucky || {});


