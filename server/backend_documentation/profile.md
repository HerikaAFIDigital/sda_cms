# Flow to access user profile from Azure cosmos DB:


## Overview

`profiledb.js` is a module that provides a client for interacting with the profile database. It includes methods for querying, upserting, and deleting documents.

## Code walkthrough

```javascript
import { profileDbClient } from "./path/to/profiledb";


//Initialization
const client = profileDbClient;

const result = await profileDbClient.queryDocs("appusers", { /* query options */ });


upsertDoc(table, doc)
Upserts a document into the specified table of the profile database.

Parameters

table (string): The name of the table to upsert the document into.
doc (object): The document to upsert.
Promise: Resolves to the upserted document.

Example


const result = await profileDbClient.upsertDoc("appusers", { /* document data */ });


deleteDoc(docId, partitionKey)
Deletes a document from the profile database.

Parameters

docId (string): The ID of the document to delete.
partitionKey (string): The partition key for the document.
Promise: Indicates the success of the deletion.
Example

const result = await profileDbClient.deleteDoc("123", "United States");

```

Notes
There is proper configuration of profileDbClient with correct connection details and keys.

The cleanDoc function removes internal DocumentDB properties from retrieved documents.

## Model (model.js) and profiledb.js Interaction

The model.js file interacts with the profiledb.js module to perform operations on the profile database. Here's a general flow:

`Import profileDbClient:`

In model.js, the profileDbClient is imported from profiledb.js. This import allows access to the methods provided by the profileDbClient for interacting with the profile database.

`import { profileDbClient } from "./path/to/profiledb";`

Call queryDocs or Other Methods:

The model uses methods like queryDocs, upsertDoc, or deleteDoc from the profileDbClient to perform various operations on the profile database.

<!-- Example:
```javascript

const globalProfiles = await profileDbClient.queryDocs("appusers", {
  query: "c.country = @country AND c.profileModuleScores = @profileModuleScores",
  parameters: [
    { name: "@country", value: country },
    { name: "@profileModuleScores", value: 11 },
  ],
});

```



Here, queryDocs is used to query profiles based on specific criteria. -->

<!-- Handle the Result:

The model then handles the result obtained from the database operation. In the example above, globalProfiles would contain the profiles that match the specified criteria.

`return globalProfiles;` -->

Use in Application Logic:

The model integrates this data retrieval logic as part of its application-specific functionality. It could be used to retrieve profiles for display, analysis, or any other purpose within the application.



[Go back to README](../README.md)
