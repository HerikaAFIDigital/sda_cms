
# Certificate Generation Service in Safe-delivery-api

## Overview

Safe-delivery-api is designed for microservices, such as certificate service, APK service, and duration service. It interacts with safe-delivery-cms.Certification generation service, enabling users to generate certificates using provided data.It generates a CHAMPIAN certificate. It leverages the Koa web framework for Node.js and the Canvas library for graphics."

## Key Components

1. app.ts
This file configures the Koa application, sets up middleware for body parsing, authorization checks, and logging. It also defines routes using the provided router middleware.

2. router.ts
Responsible for routing incoming requests to the appropriate handlers. Defines routes such as '/' for a welcome message and '/cert' for handling certificate generation.

3. genCert.ts
Contains the main handler for generating certificates (handleGeneration). It includes functions for fetching base certificate images (getBaseFile) and rendering certificates (renderCertificate).


## Access the Service:

The service is accessible on http://localhost:3010.

## Folder Structure

    - assets
      - fonts
        - *.ttf
      - templates
        - *.png
      - *.png

    - src
      - canvas.d.ts
      - config.ts
      - genCert.ts
      - helper.ts
      - index.ts
      - interfaces.ts
      - router.ts
      - utils.ts
      - logger.ts

---

## assets:

 This is the main directory containing various types of project assets.

### fonts: 

Subdirectory under assets, specifically for font files.

*.ttf: This indicates that the directory contains TrueType Font files. Each font file may have its own subdirectory or directly reside in the "fonts" directory.Different fonts are used for different language versions on the certificate.

### templates: 

Subdirectory under assets, specifically for template images.

*.png: This indicates that the directory contains PNG files serving as templates. Each template image file may have its own subdirectory or directly reside in the "templates" directory.

*.png:  It represent additional PNG files at the root level of the "assets" directory.

### src:

1. #### config.ts - Contains key value pair information about external services such as URL, connection strings etc that this service may communicate with.

   - apiKey - Key used to authenticate requests made to this service.

2. #### canvas.d.ts - Declares the canvas module.

3. #### genCert.ts - Contains functions which are responsible for creating the certificates.

   
   ##### Handle Generation Function:

    handleGeneration is the main handler function for generating a CHAMPION certificate using the parameters received in the POST request. It sets the response type to 'png' and sets the response body to the result of renderCertificate function.It also Check for any missing parameters.

   ##### Get Base File Function:

    getBaseFile is a function that retrieves the base image file for the certificate from the assets folder based on the country and whether it's a module certificate.

   ##### Render Certificate Function:

    renderCertificate is the main function responsible for rendering the certificate.It creates the certificate based upon the input parameters by the user. It utilizes the canvas library to create a canvas, draw images and text on it, and finally returns the generated certificate as a buffer.
 
   ##### Font Registration:

    Fonts are registered based on the specified language to ensure correct text rendering on the certificate.

   ##### Drawing on Canvas:

    Various elements such as stars, text, and images are drawn on the canvas using the context.drawImage and context.fillText methods.
    Buffer Return:

    The function returns the generated certificate as a buffer using canvas.toBuffer().


4. #### helper.ts

   - prettyPrintCertDate - Returns the date in the "DD.MM.YYYY" Format.
   - nonEmptyString - Check if the input is an empty string or it is null or anything other than a string.
   - prettyPrintValidDate - Returns the date in the valid "DD MMMM YYYY" Format.

5. #### utils.ts - Contains function to check for missing parameters.

   - missingParameter - Checks if there are many missing parameters in the request by the user.

6. #### interfaces.ts- Creating an interface for the certificate fields.



## Endpoints:

/: Returns a message.

/cert: Generates a certificate based on provided data.

- POST

  - Function
    - genCrt.handleGeneration
  - Request Body Parameters

    ```
        {
                "name":<string>,
                "jobTitle": <string>,
                "certHeader" : <string>,
                "certBody" :<string>,
                "certBody1" : <string>,
                "certBody2" : <string>,
                "certDates" : <date>
        }
    ```
    - Response Codes
    - Success (200)
    - Bad Request (400)
    - Internal Server Error (500)
  - **Success (200) Sample Response**

    ```
        *CERTIFICATE IN PNG FORMAT*
    ```

  - **Bad Request(400) Sample Response**

    ```
        {
        msg: `Missing parameter '${parameter}'`
        }
    ```

## Building

- Compile typescript into an output folder (dist/)

  ```
      tsc
  ```

- Copy assets into the output folder (dist/)

  ```
    rm -rf dist/assets && cp -r assets dist/
  ```

- Run the following command from dist/ folder

  ```
    node .
  ```

### Run the project using project manager such as PM2

## Configuration

API key is configured in Config.apiKey.

## Dependencies

Koa: Web framework for Node.js.

Canvas: Node.js library for canvas graphics.

... (other dependencies listed in package.json)


# Certificate Services in Safe-delivery-cms

## Overview

This documentation provides information about the Certificate Services API. The Certificate Services API allows you to perform operations related to certificates, including creating, updating, retrieving, and deleting certificates.

The `certificationService` configuration contains details for connecting to the Certification Service API.

## Configuration Details

- **API Key**: `"api_key"`
- **Host**: `"host"`
- **Port**: `port`

## Usage

This configuration is utilized to connect to the Certification Service API and perform various operations related to certificates.

### Example

```javascript
const certificationServiceConfig = {
  apiKey: "api_key",
  host: "host",
  port: port,
};
```
Ensure to replace the placeholder values (api_Key, host, port) with the actual values provided by the service provider.



## API Endpoints

### List Certificates

- **Endpoint**: `GET /certificates/`
- **Description**: Retrieve a list of certificates.
- **Parameters**:
  - `langId` (optional): Language ID for localization.

### Get Certificate by Key

- **Endpoint**: `GET /certificates/:certKey`
- **Description**: Retrieve a specific certificate by its key.
- **Parameters**:
  - `certKey`: Key of the certificate.
  - `langId` (optional): Language ID for localization.

### Create Certificate

- **Endpoint**: `POST /certificates/`
- **Description**: Create a new certificate.
- **Request Body**: Certificate details.

### Update Certificate

- **Endpoint**: `PUT /certificates/`
- **Description**: Update an existing certificate.
- **Request Body**: Updated certificate details.

### Delete Certificate

- **Endpoint**: `DELETE /certificates/:certKey`
- **Description**: Delete a certificate by its key.
- **Parameters**:
  - `certKey`: Key of the certificate.

## Data Models

### Certificate Model

Model Handles database operations related to certificates.

```json
{
  "key": "certificate_key",
  "description": "Certificate description",
  "langId": "en",   
  // Other certificate properties...
}
```
### Service Integration
certificates.service.js
Integrates with external services, such as DocumentDB.
```json
"use strict";

import { stampDoc, dbClient } from "../../lib/documentdb";
import { saveMapping } from "../../lib/datacollection";
import { mergeContent } from "../../lib/richdocument";
import { casesModel } from "../cases/cases.model";

const CERT = "certificates";
const caseIds = [];

```

[Go back to README](../README.md)





