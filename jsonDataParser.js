/** @module jsonDataParser */
/** @desc
* parses recursively highly nested JSON to extract required entity
* i.e., let our JSON is  a word from some dictionary
* we need to handle only its definitions -
* for cases like:
* res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions
*
* @param {(string|Object)} myJSON -> some JSON body
* @param {string} myKey -> required entity 
* @example
* // returns array corresponded to myKey
* jsonDataParser(res.data, definitions)
* where res.data - res.data for the word
* definitions - its definitions
*/

const jsonDataParser = (myJSON, myKey) => {
  const myObj = JSON.parse(myJSON);
  const outputArr = [];
  /** search for values of [key] in array values */
  const _recursFunc = (obj, arr, key) => {
    /** check if current [obj] is a proper Object */
    if (typeof obj === 'object' && obj !== null && obj.constructor !== Array) {
      for (let [_key, value] of Object.entries(obj)) {
        /** check if we've found what is required */
        if (_key === key) {        
          if (typeof value === 'object' && obj !== null) {
            /** stringifies one-item array */
            value = value.toString();
          }
          outputArr.push(value);
        } else {
          /** if not, then repeat starting from [value] */
          if (typeof value === 'object' && obj !== null) {
            _recursFunc(value, arr, key);
          }
        }
      }
    } else if (obj.constructor === Array) {
      /** handle if [obj] is an array, jump to "object case" in the next iteration */
      for (let item of obj) {
        _recursFunc(item, arr, key)
      }
    }
  }
  _recursFunc(myObj, outputArr, myKey);
  return outputArr;
}

/** module.exports = jsonDataParser; */
export default jsonDataParser; 

