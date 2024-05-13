

# DocumentDB:

## Introduction:

The DocumentDBClient module provides a simplified abstraction for interacting with Azure DocumentDB. It facilitates common operations such as querying, upserting, deleting, and reading documents. This module exports an object named dbClient and a constant named CONTENT for managing document-related tasks effortlessly.


## Configuration:

The module first imports configuration settings from an external file named config and initializes a DocumentDB client using the documentdb-q-promises library.Before using the DocumentDBClient module, make sure to install the required dependencies. You can do this by running the following command:

`npm install documentdb-q-promises`


```javascript
import config from "../config/index";
const DocumentClient = require("documentdb-q-promises").DocumentClientWrapper;

export const client = new DocumentClient(config.documentdb.url, {
  masterKey: "" + config.documentdb.key,
});
```


## Collection URL Construction:

A function named dbUrl is defined to construct the URL for a specific collection based on the environment. The default collection is represented by the constant CONTENT.

```javascript
export const dbUrl = (collection) => `dbs/${config.env}/colls/${collection}`;
export const CONTENT = dbUrl("content");
```

## Document Cleaning and Stamping:

Two utility functions, cleanDoc and stampDoc, are provided for manipulating documents. cleanDoc removes internal DocumentDB properties, while stampDoc adds LastUpdatedBy and LastUpdated properties to a document.

```javascript
export const cleanDoc = (doc) => {
  let { _rid, _self, _etag, _attachments, _ts, ...res } = doc;
  return res;
};

export const stampDoc = (doc, user) => {
  const stampedDoc = { ...doc, LastUpdatedBy: user, LastUpdated: Date.now() };
  return stampedDoc;
};
```

## dbClient Object:

The dbClient object exports several methods for interacting with DocumentDB:

### Querying Documents (queryDocs):

This function queries documents in a specified 'table' with optional projection, query, orderBy, and parameters. It returns a promise that resolves to an array of cleaned documents.

### Upserting Documents (upsertDoc):

This function upserts a document into the specified 'table' and returns a promise that resolves to the cleaned upserted document.

### Deleting Documents (deleteDoc):

This function deletes a document with the specified ID and returns a promise that resolves when the document is deleted.

### Reading Documents (readDoc):

This function reads a document with the specified ID and returns a promise that resolves to the read document.
```
export const dbClient = {
  queryDocs: (table, opts) => { /* ... */ },
  upsertDoc: (table, doc) => { /* ... */ },
  deleteDoc: (docId) => { /* ... */ },
  readDoc: (docId) => { /* ... */ },
};
```

These methods make it easy to perform common operations on DocumentDB documents in a more abstract and simplified manner.

[Go back to README](../README.md)
