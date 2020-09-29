#### Table of contents
[Description](#Description)  
[API](#API)  
[Live example](#Live-example)  
[Normalization](#Normalization)  
 
#### Description
[<sup>↑ To the beginning</sup>](#Table-of-contents)  
Useful for highly or chaotic nested JSON - what could mean a lot of repeating, surplus code. It recursively parses a response data    
and automatically extract required entity by its key. It doesn't normalize the data, check [links](#Normalization) below. 
#### API
[<sup>↑ To the beginning</sup>](#Table-of-contents)  
```javascript
jsonDataParser(myJSON, myKey)  
```
```myJSON``` - some JSON body, - i.e., response;  
```myKey``` - the entity you're trying to reach - i.e., product name  
returns a ```value``` corresponding ```myKey``` as at-least-one-item array

#### Live example  
[<sup>↑ To the beginning</sup>](#Table-of-contents)     
we would retrive all data of <word_to_find> via Oxford dictionary API  
from https://od-api.oxforddictionaries.com/<some_url_endpoint>/<word_to_find>  
```javascript
const axios = require("axios");
const url = require("url");  

const endpoint = `https://od-api.oxforddictionaries.com/<some_url_endpoint>/`;
const wordToFind = <word_to_find>;
const URL = url.resolve(endpoint, wordToFind);
const response = async () => {
      await axios
            .get(URL, {
                 headers: {
                 "Accept": "application/json",
                 app_id: this.api_id,
                 app_key: this.api_key,
                 },
            })
            .then(res => res.data) 
            .catch(err => err.res.data);
}
// but need to treat only definitions  
// a long way to get that 
const definitions = ...
// as in this case the full "address" could be something like:  
// response.results[0].lexicalEntries[0].entries[0].senses[0].definitions;  
```
instead we can use  
```javascript
const jsonDataParser = require("./jsonDataParser");
...
// no code needed to reach response.results[0].lexicalEntries[...
const definitions = jsonDataParser(response, definitions)
// done
```

#### Normalization
[<sup>↑ To the beginning</sup>](#Table-of-contents)  
This is only for small apps and solutions, as it only parses a data,   
allowing to write less code but, as told, doesn't normalize the data.  

To normalize look at:
  
- Database normalization on [Wikipedia]
- check [Normalizr] utility by Paul Armstrong  
- an [example] of normalizing API Responses in Redux with Normalizr by Dan Abramov  

   [Wikipedia]: <https://en.wikipedia.org/wiki/Database_normalization>
   [Normalizr]: <https://github.com/paularmstrong/normalizr>
   [example]: <https://egghead.io/lessons/javascript-redux-normalizing-api-responses-with-normalizr>

