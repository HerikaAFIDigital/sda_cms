# Drugs

## drugs.controller.js

Module responsible for handling HTTP requests related to drugs.

### GET /api/drugs/

    Route for retrieving a list of drugs.

    Parameters:
    `ctx` (Object): Koa context object
    `next` (Function): The next middleware function in the stack

### PUT /api/drugs/

    Route for updating drug data.

    Parameters:
    `ctx` (Object): Koa context object
    `next` (Function): The next middleware function in the stack

### GET /api/drugs/:drugKey

    Route for retrieving details of a specific drug.

    Parameters:
    `ctx` (Object): Koa context object
    `next` (Function): The next middleware function in the stack

### POST /api/drugs/

    Route for creating a new drug entry.

    Parameters:
    `ctx` (Object): Koa context object
    `next` (Function): The next middleware function in the stack

### DELETE /api/drugs/:drugKey

    Route for deleting a specific drug entry.

    Parameters:
    `ctx` (Object): Koa context object
    `next` (Function): The next middleware function in the stack

## drugs.model.js

Module responsible for database operations related to drugs.

### index(langId, showAll)

    Retrieves a list of drugs based on language and filtering options.

    Parameters:
    `langId` (string): Language ID for localization
    `showAll` (boolean): Flag to indicate whether to show all drugs or not
    Returns:
    Promise<Array>: A Promise resolving to an array of drugs.

### put(user, drug)

    Updates drug data.

    Parameters:
        `user` (string): User ID performing the update
        `drug` (Object): Drug data to be updated
    Returns:
        Promise<Object>: A Promise resolving to the updated drug data.
  
### post(user, drug)

    Creates a new drug entry.

    Parameters:
        `user` (string): User ID creating the drug entry
        `drug` (Object): Drug data to be inserted
    Returns:
        Promise<Object>: A Promise resolving to the inserted drug data.

### get(drugKey, langId, showAll)

    Retrieves details of a specific drug.

    Parameters:
        `drugKey` (string): Unique identifier for the drug
        `langId` (string): Language ID for localization
        `showAll` (boolean): Flag to indicate whether to show all drugs or not
    Returns:
        Promise<Object>: A Promise resolving to the drug details.

### del(drugKey)

    Deletes a specific drug entry.

    Parameters:
        `drugKey` (string): Unique identifier for the drug to be deleted.
    Returns:
        Promise<Object>: A Promise indicating the success of the operation.

## screens.model.js

Module responsible for database operations related to screens.

### list(langId, showAll)

    Retrieves a list of screens based on language and filtering options.

    Parameters:
        `langId` (string): Language ID for localization
        `showAll` (boolean): Flag to indicate whether to show all screens or not
    Returns:
        Promise<Array>: A Promise resolving to an array of screens.

### update(user, screen)

    Updates screen data.

    Parameters:
        `user` (string): User ID performing the update
        `screen` (Object): Screen data to be updated
    Returns:
        Promise<Object>: A Promise resolving to the updated screen data.

### insert(user, screen)

    Inserts a new screen entry.

     Parameters:
        `user` (string): User ID creating the screen entry
        `screen` (Object): Screen data to be inserted
     Returns:
        Promise<Object>: A Promise resolving to the inserted screen data.

### find(screenKey)

    Retrieves details of a specific screen.

     Parameters:
        `screenKey` (string): Unique identifier for the screen
     Returns:
        Promise<Object>: A Promise resolving to the screen details.

### remove(screenKey)

    Deletes a specific screen entry.

     Parameters:
        `screenKey` (string): Unique identifier for the screen to be deleted
     Returns:
        Promise<Object>: A Promise indicating the success of the operation.

## documentdb.js

Module responsible for interacting with DocumentDB.

### cleanDoc(doc)

    Removes internal DocumentDB properties from a document.

     Parameters:
        `doc` (Object): Document from DocumentDB
     Returns:
        Object: Document with internal properties removed.

### stampDoc(doc, user)

    Adds metadata to a document, such as last updated information.

     Parameters:
        `doc` (Object): Document to be stamped
        `user` (string): User performing the operation
     Returns:
        Object: Document with metadata added.

### dbClient.queryDocs(table, opts)

    Queries documents from DocumentDB.

     Parameters:
        `table` (string): Table or collection name
        `opts` (Object): Query options
     Returns:
        Promise<Array>: A Promise resolving to an array of queried documents.

### dbClient.upsertDoc(table, doc)

    Upserts a document into DocumentDB.

     Parameters:
        `table` (string): Table or collection name
        `doc` (Object): Document to be upserted
     Returns:
        Promise<Object>: A Promise resolving to the upserted document.

### dbClient.deleteDoc(docId)

    Deletes a document from DocumentDB.

     Parameters:
        `docId` (string): ID of the document to be deleted
     Returns:
        Promise<void>: A Promise indicating the success of the operation.

### dbClient.readDoc(docId)

    Reads a document from DocumentDB.

     Parameters:
        `docId` (string): ID of the document to be read
     Returns:
        Promise<Object>: A Promise resolving to the read document.
