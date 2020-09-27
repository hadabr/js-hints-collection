// useful for highly nested JSON 
// i.e., url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${endpoint}`, {endpoint} = a word to search
// we need to retrieve only its definitions
// in the case the full adress could be something like:
// response.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
// what means a lot of repeating or too complex code
// 
// this recursive parser will solve that
// pass as myObj your JSON (i.e. response.data body)
// and as myKey - the key you're trying to reach (i.e., definitions)
// jsonDataParser(res.data, definitions)

const jsonDataParser = (myObj, myKey) => {
  const outputArr = [];
  // recursively search for values of [key] in JSONarray
  const _recursFunc = (obj, arr, key) => {
    // check if current [obj] is a proper Object
    if (typeof obj === 'object' && obj !== null && obj.constructor !== Array) {
      for (let [_key, value] of Object.entries(obj)) {
        // check if we've found what is needed
        if (_key === key) {        
          if (typeof value === 'object' && obj !== null) {
            // stringifies one-item array
            value = value.toString();
          }
          outputArr.push(value);
        } else {
          // if not, then repeat starting from [value]
          if (typeof value === 'object' && obj !== null) {
            _recursFunc(value, arr, key);
          }
        }
      }
    } else if (obj.constructor === Array) {
      // handle if [obj] is an array, jump to "object case" in the next iteration
      for (let item of obj) {
        _recursFunc(item, arr, key)
      }
    }
  }
  _recursFunc(myObj, outputArr, myKey);
  return outputArr;
}

module.exports = jsonDataParser;
