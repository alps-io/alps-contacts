## ALPS Trivial Example - Contacts ##

This example node project shows a trivial example of using ALPS to create a common interface. It shows a simple example of taking local storage and an internal object model, mapping that to a shared interface described by an ALPS document, and outputing that in a registered hypermedia type (collection+JSON). In a fully functioning service, the work of mapping and creating response representation is the final step in a service that accepts requests, processes them and finally creates the response.

+ contact-storage.js : This is the stored data on the server. Note the field names are unique to local storage
+ contact-alps.xml : This is the ALPS document (in XML format) that describes the shared interface for contacts including field names (givenName, familyName, email, telephone) and a safe idempotent hypermedia transition ("search").
+ contact-alps.js : The same ALPS document in JSON format.
+ app.js : This is the nodejs application to illustrate using ALPS. The only task in this example is to map storage to the shared interface described by ALPS and output the results in a selected hypermedia type (collection+JSON). 
+ contacts-output.js : This is the response output from the app.js service.

