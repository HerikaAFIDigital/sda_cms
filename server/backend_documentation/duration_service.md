# Introduction

Duration service offers solution for managing and serving video content in a Node.js environment. It leverages Koa for efficient request handling, Azure Storage for scalable content storage, and Winston for comprehensive logging capabilities. With its modular architecture and clear separation of concerns, the application is well-equipped to handle various aspects of video content management and delivery specially the duration of the videos.

# Modules:

## Koa:

Koa is a web framework for Node.js.
It's used to handle HTTP requests and responses.
## URL:

This module provides utilities for URL resolution and parsing.
It's used to parse request URLs.
## Azure Storage:

This module provides functionality to interact with Azure Blob Storage.
It's used to manage video assets and their durations.
## Child Process:

This module provides functionality to spawn child processes.
It's used to execute the ffprobe command for getting video durations.

# Files:

## config.ts:

Contains configuration settings for the application.
## logger.ts:

Sets up a logging system using Winston for logging information, warnings, and errors.
## router.ts:

Defines routing logic for the application using Koa.
Maps URL paths to corresponding handler functions.

## trigger.ts:

Contains logic for handling trigger events, primarily for updating video durations.

# Functions:

## contentURL(path: string, draft: boolean):

Generates a URL for accessing content based on its path and whether it's a draft.
Utilizes Azure Blob Storage for content management.

## listVideos(draft: boolean):

Lists videos available in the storage container based on whether they're drafts or not.

## getOldVideoLengths(draft: boolean):


Retrieves stored durations of videos from Azure Blob Storage.

## saveVideoLengths(draft: boolean, text: string):

Saves updated video durations to Azure Blob Storage.

## handleTrigger(ctx: Koa.Context, url: Url):

Handles trigger events, updating video durations based on new videos or changes.

## getVideoDuration(videoSrc: string):

Gets the duration of a video by executing the ffprobe command on its source URL.

# Middleware:

## Request Header Verification Middleware:

Checks for a specific header in incoming requests and verifies its authenticity against a configured API key.

## Logging Middleware:

Logs information about incoming requests, their URLs, statuses, and processing times.

# Duration service in safe-delivery-cms

The `durationService` configuration object appears to be a set of parameters for connecting to a service, related to duration or time-related functionalities. Below is a breakdown of the properties within the object:

## Properties:

### 1. `apiKey`
   - **Type:** String
   - **Description:** The apiKey property is a string that represents an API key. API keys are commonly used for authentication purposes when interacting with services or APIs. In this case, the apiKey is a secret token that the duration service uses to verify the identity of the client making requests. It's crucial to keep this key secure and confidential, as it grants access to the duration service.

### 2. `host`
   - **Type:** String
   - **Description:** The host property specifies the domain or host name of the duration service.The host is set to "sdacms-duration.westeurope.cloudapp.azure.com." This is the address where the client will send requests for duration-related services. 

### 3. `port`
   - **Type:** Integer
   - **Description:** The port property is an integer that represents the port number on which the duration service is listening for incoming connections. Ports are used to differentiate between different services running on the same host. Ensure that the specified port matches the configuration of the duration service.

## Example Configuration:

```javascript
durationService: {
    apiKey: "apikey",
    host: "host",
    port: port,
}
```

## Usage:

This configuration appears to be intended for use with a service that requires authentication using an API key and is accessible at the specified host and port.





[Go back to README](../README.md)







