### Description

> Useful for highly or chaotic nested JSON - parses response data,  
> automatically extract required data entity by its key.

i.e.  
```javascript
// we would retrive all data of {wordToFind} from Oxford dictionary API  
const url = `https://od-api.oxforddictionaries.com/{...}/{wordToFind}`  
// but need to treat only definitions  
// in this case the full "address" could be something like:  
let definitions = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions;  
// what could mean a lot of repeating (i.e., loops) or too complex code    
```
This recursive parser solves that for you.
### API

```javascript
jsonDataParser(myJSON, myKey)  
```
[myJSON] - some JSON body, - i.e., res.data;  
[myKey] - the entity you're trying to reach - i.e., definitions  
```javascript
const results = res.data;    
jsonDataParser(results, definitions)
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

