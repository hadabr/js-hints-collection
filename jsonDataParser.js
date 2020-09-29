/** @module jsonDataParser */
/** @desc
* parses recursively highly nested JSON to extract required entity
* i.e., let our JSON is  a word from some dictionary
* we need to handle only its definitions -
* for cases like:
* res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions
*
* @param {(string|Object)} myJSON - some JSON body
* @param {string} myKey - required entity 
* @example
* // res.data - res.data for the word
* jsonDataParser(res.data, definitions)
* @returns {Object} - definitions array
*/

const jsonDataParser = (myJSON, myKey) => {
  const myObj = JSON.parse(myJSON);
  const outputArr = [];
  /** @function _recursFunc
  * @param {Object} obj - search field;
  * an Object for the descending decomposition - from initial myObj to its lowest values till we reach required
  * @param {Object} arr - a result array to return
  * @param {string} key - the target key
  * search for values of [key] in array values */
  const _recursFunc = (obj, arr, key) => {
    /** check if the current obj is a proper Object 
    * for the [key, value of Object.entries] comparison */
    if (typeof obj === 'object' && obj !== null && obj.constructor !== Array) {
      /** @param {string} _key - an inner key */
      for (let [_key, value] of Object.entries(obj)) {
        /** check if we've found what is required */
        if (_key === key) {        
          if (value.constructor === Array && value.length === 1) {
            /** exclude one-item array wrapper */
            value = value[0];
          }
          outputArr.push(value);
        } else {
          /** if not, then repeat starting in
          * @param {Object} value - a decomposed Object */
          if (typeof value === 'object' && obj !== null) {
            _recursFunc(value, arr, key);
          }
        }
      }
    } else if (obj.constructor === Array) {
      /** handle if obj is an Array, jump to Object case in the next iteration 
      * for the [key, value of Object.entries] comparison
      * @param {Object} item - an array item, when Object value was an Array */
      for (let item of obj) {
        _recursFunc(item, arr, key)
      }
    }
  }
  _recursFunc(myObj, outputArr, myKey);
  /** module.exports = jsonDataParser; */
  return outputArr;
}

/** module.exports = jsonDataParser; */
export default jsonDataParser; 

