# APK Service in Safe-delivery-api

The APK service is a microservice designed to construct the Safe Delivery App APK bundled with content from a specific language version. This enables comprehensive offline functionality of the Safe Delivery App, as the APK is distributed with integrated text, images, and videos.

The service needs to check out the source code of the app from

```
    git@ssh.dev.azure.com:v3/maternityfoundation/safe-delivery-app/safe-delivery-App
```
setup SSH keys in advance.

### Install dependencies:

- NodeJS
- Android SDK

### Run setup:

```
    $ ./setup.sh
```

### Run service

```
    $ cd dist
    $ node .
```

Run Node Command: Preferrably with a process manager such as `pm2`


## File Structure

./constants: Contains constant values used throughout the application.Like:
  SOURCE_LOCATION
  DOWNLOAD_RETRIES
  DOWNLOAD_OPTIONS
  ANDROID_PROJECT_LOCATION
  APK_OUTPUT_FOLDER
  LOCK_FILE
  APK_LIST_FILE

./helper: Collection of utility functions used in various parts of the application.

    1. isParsedQuery
    Checks if the given query is a parsed dictionary object.
    
    2. urlFrom
    Generates a formatted URL based on the provided content, language ID, and file.
    

    3. ensureDirectoryExistence
    Ensures that the directory part of the given file path exists. Equivalent to running mkdir -p for the directory.
    
    4. shortFilename
    Extracts and returns the short filename (last part after the last "/") from the given path.
    

    5. missingParameter
    Checks if the required parameters (langId and draft) are present in the request URL.
    
    6. filenameifyString
    Converts a string into a filename-friendly format by removing special characters, trimming, and replacing spaces with underscores.
    
./utils: Functions for handling specific utility tasks like refreshing source code, downloading language versions, building APKs, etc.

./logger: Logging configuration for the application.

./config: Configuration settings for the application.

./axios-api: Functions for making HTTP requests using Axios.

./interfaces: Definitions for various interfaces used in the application.

  1. IWithHref Interface

    Describes an object that has an href property representing a hyperlink.
    

  2. IWithSrc Interface

    Describes an object that has a src property representing a source.
    
  3. IBundle Interface

    Represents the structure of a content bundle for the Safe Delivery App APK.

    
  4. IDownloadDescription Interface
    
     Describes the structure of a download operation.
    
  5. IApkDescription Interface
    Purpose:

    Represents the structure of an APK description.
    
  6. IApkList Interface

    Represents a mapping of language IDs to an array of IApkDescription objects.
    

  7. IRoutes Interface

    Represents a mapping of string keys to functions that handle Koa contexts and URLs.
    



## 1. handleGeneration Function

Checks if another APK generation is in progress. If yes, returns a 202 status with a corresponding message.
Validates and extracts parameters from the URL.
Creates a lock file to prevent concurrent APK generation.
Updates the source code, gets the APK version, and checks if a draft version is specified.
Downloads language versions, builds APKs, and updates the APK list.
Responds with success and APK information.

## 2. handleList Function

Reads the APK list file.
If a specific language ID is provided in the URL query, filters and formats the result for that language.
Responds with the APK list.

## 3. handleDownloadLatest Function

Validates the URL parameters.
Retrieves the APK list and finds the latest non-draft release.
Responds with the details of the latest release.

## 4. handleStatus Function

Checks for the existence of a lock file.
If a lock file exists, returns a status of "BUSY" along with the current job details.
If no lock file exists, returns a status of "READY".
Additional Notes
The application uses Koa.js as the web framework.
File I/O operations are used to read and write data.
Logging is implemented using a custom logger.
The application follows an asynchronous flow using async/await for handling promises.
This documentation provides a high-level overview of the code's structure and purpose. For a more detailed understanding, further exploration of individual functions and modules may be necessary.

# Safe-Delivery-CMS

The APK Service is responsible for managing APKs (Android Package Files). Remaining part of documentation outlines the API endpoints and implementation details for interacting with the APK Service.

## APK Service Configuration

The `apkService` configuration contains details for connecting to the APK Service API.This configuration is utilized to connect to the APK Service API and perform various operations related to APKs.

- **API Key**: `"api_key"`
- **Host**: `"host"`
- **Port**: `port`


## API Endpoints

### List APKs

- **Endpoint**: `GET /apks/list`
- **Description**: Retrieve a list of APKs.
- **Parameters**:
  - `langId` (optional): Language ID for localization.

### APK Status

- **Endpoint**: `GET /apks/status`
- **Description**: Retrieve the status of the APK service.

### Generate APK

- **Endpoint**: `POST /apks/genApk`
- **Description**: Generate a new APK.
- **Request Body**:
  - `langId`: Language ID for localization.
  - `draft`: Draft information.

### Download Latest APK

- **Endpoint**: `GET /apks/latest`
- **Description**: Download the latest APK.
- **Parameters**:
  - `langId` (optional): Language ID for localization.

## Controllers

### `apks.controller.js`

Defines the API endpoints and their corresponding controller functions.

```javascript
"use strict";

import { list, status, genApk, downloadLatest } from "./apks.controller";
import router from "koa-router";

const apks = router();

apks.get("/list", list);
apks.get("/status", status);
apks.post("/genApk", genApk);
apks.get("/latest", downloadLatest);

export default apks;
```
[Go back to README](../README.md)











