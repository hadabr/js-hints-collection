  
// useful for small, but highly nested JSON response body in a combination with precise URI request
// i.e., https://od-api.oxforddictionaries.com/api/v2/${endpoint}/en-us/`, where {endpoint} is a word to search
// and we need to retrieve only short definitions:
// the adress would be something like response.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
// retrieving all definitions for the output could mean a lot of repeating code
// but not today
// this recursive parser will solve that - just pass as myObj API data (i.e. JSON body about a request word)
// and as myKey - i.e., the word which definitions we need
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
