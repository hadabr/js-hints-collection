#### jsonDataParser.js

useful for highly or chaotic nested JSON - simplifies handling res.data body   

i.e., URI request = `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${endpoint}`, {endpoint} = a word to search  
we need to retrieve only its definitions  
in the case the full adress could be something like:  
response.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]  
what means a lot of repeating or too complex code    
  
this recursive parser will solve that


#### API
  
pass as myObj your JSON (i.e. response.data body)  
and as myKey - the key you're trying to reach (i.e., definitions)  
jsonDataParser(res.data, definitions)  
 
#### Honorable mention

for small apps and solutions  
  
check 
