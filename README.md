### Description

Useful for highly or chaotic nested JSON - what could mean  
a lot of repeating or too complex code. It parses  
response data, automatically extract required entity  
by its key.
### API

```javascript
jsonDataParser(myJSON, myKey)  
```
[myJSON] - some JSON body, - i.e., response;  
[myKey] - the entity you're trying to reach - i.e., definitions  
```javascript
const results = res.data;    
jsonDataParser(results, definitions)
```
### Live example  
```javascript
// we would retrive all data of {word_to_find} from Oxford dictionary API  
// from https://od-api.oxforddictionaries.com/{some_url_endpoint}/{word_to_find} 
const axios = require("axios");
const url = require("url");  

const endpoint = `https://od-api.oxforddictionaries.com/{some_url_endpoint}/`;
const wordToFind = {word_to_find};
URL = url.resolve(endpoint, wordToFind);
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
// in this case the full "address" could be something like:  
const definitions = response.results[0].lexicalEntries[0].entries[0].senses[0].definitions;  
```
```javascript
// instead we can use
const jsonDataParser = require("./jsonDataParser");
const definitions = jsonDataParser(response, definitions)
```

### Normalization

This is only for small apps and solutions, as it parses response data easier,   
allowing to write less code but doesn't normalize the data.  

To normalize:
  
- Database normalization on [Wikipedia]
- check [Normalizr] utility by Paul Armstrong  
- an [example] of normalizing API Responses in Redux with Normalizr by Dan Abramov  

   [Wikipedia]: <https://en.wikipedia.org/wiki/Database_normalization>
   [Normalizr]: <https://github.com/paularmstrong/normalizr>
   [example]: <https://egghead.io/lessons/javascript-redux-normalizing-api-responses-with-normalizr>

