#### jsonDataParser.js

Useful for highly or chaotic nested JSON - simplifies handling res.data body   

i.e., URI requst is `https://od-api.oxforddictionaries.com/{something}/{wordToFind}`  
we retrive all {wordToFind} data, but need to treat only definitions  
in the case it could be something like:  
```response.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]``` 
what could mean a lot of repeating (i.e., loops) or too complex code.    
  
This recursive parser will solve that for you.

#### API
  
Pass as myObj your JSON (i.e. res.data body),  
and as myKey - the key you're trying to reach (i.e., definitions)  
jsonDataParser(res.data, definitions)  
 
#### Normalization

This is only for small apps and solutions, as it parses repsonse data allowing to write less codem but doesn't normalize.
To normalize data:
  
- Database normalization on [Wikipedia]
- check [Normalizr] utility by Paul Armstrong  
- an [example] of normalizing API Responses in Redux by Dan Abramov  

   [Wikipedia]: <https://en.wikipedia.org/wiki/Database_normalization>
   [Normalizr]: <https://github.com/paularmstrong/normalizr>
   [example]: <https://egghead.io/lessons/javascript-redux-normalizing-api-responses-with-normalizr>
