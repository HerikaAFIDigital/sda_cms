# About

About is a screen which contains :

Introduction
Developers 
Thank you 
copyright 
Disclaimer etc.


 ```javascript
 About.json: It is a JSON file stored in Azure Cosmos DB. The absence of the id in the langId field indicates that it is from the Master dataset.

{
  "key": "about",
  "content": "About",
  "langId": "",
  "_table": "screens"
}

about.json file with langId shows that it is created from language version:

{
  "key": "about",
  "content": "About",
  "langId": "45674rt532j67k9456",
  "_table": "screens"
}
 ```

The "about" functionality is structured across three main files:

## `index.js` (Entry Point)

The `index.js` file serves as the entry point for the application. It defines routes related to the "about" functionality using the Koa router.


1. Importing necessary functions from about.controller
 ```
import { index, put } from './about.controller';
import router from 'koa-router';
 ```

2. Creating a router instance for the about functionality
 ```
const about = router();
 ```

3. Defining routes for getting and updating about sections
 ```
about.get('/:section', index);
about.put('/:section', put);
 ```

4. Exporting the about router
   export default about;

### about.controller.ts

The about.controller.js file handles incoming HTTP requests for the "about" functionality. It contains two functions:

1. index: Handles GET requests for fetching information about specific sections. It extracts the language ID and section from the request parameters, fetches data using the list function from the model, and responds with the data.

2. put: Handles PUT requests for updating information about specific sections. It extracts the section and updates data using the update function from the model, then responds with the updated data.

This controller file acts as a bridge between the routes defined in index.js and the data manipulation functions in about.model.ts. It encapsulates the logic for handling different types of requests related to the "about" functionality.

### about.model.:ts
The about.model.ts file manages data storage and retrieval for the "about" functionality. It includes functions to retrieve a section from the database based on language and section, list content for a section considering language variations, and update content for a section.

getSection: Retrieves a section from the database based on language and section.

list: Lists content for a section considering language variations. This function merges the master content with translated content.

update: Updates content for a section. This function interacts with the database to perform the update operation.

This model file interacts with the underlying database to fetch and update data, providing a structured approach to handling the data associated with the "about" functionality.

#### GET – Getting information about a particular language and section.

Path parameter - section
Query parameter - langId (Language ID)

Function:
 ```
- index (about/index.js)
- index (about/about.controller.js)
- list (about/about.model.js)
 ```

##### HTTP Codes:-

- 200 : Success

#### PUT (section param) – Updating the information about a particular language and section.

Path parameter - section

Function:
 ```
- put (about/index.js)
- put (about/about.controller.js)
- update (about/about.model.js)
 ```

##### HTTP Codes:-

- 200 : Success
 ```javascript


{
			"name": "About the section",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{API_URL}}/api/{section}?langId=e3116616-a17f-4884-a7f8-3993f098e5d0",
					"host": [
						"{{API_URL}}"
					],
					"path": [
						"api",
						"{section}"
					],
					"query": [
						{
							"key": "langId",
							"value": "e3116616-a17f-4884-a7f8-3993f098e5d0"
						}
					]
				}
			},
			"response": []
		},
 ```
 
[Go back to README](../README.md)
