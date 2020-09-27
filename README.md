#### jsonDataParser.js

Useful for highly or chaotic nested JSON - simplifies handling res.data body   

i.e., URI request = `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${someWord}`, {endpoint} = a word to search  
we need to retrieve only {someWord} definitions  
in the case it could be something like:  
response.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]  
what means a lot of repeating or too complex code    
  
this recursive parser will solve that

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
