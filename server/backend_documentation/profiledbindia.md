# ProfileDB India Documentation

## Introduction

ProfileDB India is a comprehensive module designed for managing user profiles, specifically tailored for the Indian region. This module seamlessly integrates with Cosmos DB as its backend database. The following documentation provides an in-depth overview of its functionalities, including profile creation, authentication, and data retrieval.

## Configuration

To effectively utilize ProfileDB India, it's essential to configure the connection details for Cosmos DB. The configuration encompasses the Cosmos DB endpoint URL and the corresponding access key. Here is an example of the configuration:

```javascript
profiledDbIndia: {
    url: "https://sdaprofile-india.documents.azure.com:443/",
    key: "key",
}
```
## Functions
randomProfilePassword
Generates a random password for a user profile.

### findProfileByEmail
Finds a user profile by email, checking both global and Indian profiles.

### findProfileById
Finds a user profile by ID, checking both global and Indian profiles.


## Profile Controller
The module includes a controller designed for handling HTTP requests related to profiles.

### index
Handles a GET request to retrieve a profile by email.
```javascript
"use strict";

import crypto from "crypto";
import { profileDbIndiaClient } from "../../lib/profiledbIndia";

function randomString(length, chars) {
  if (!chars) {
    throw new Error("Argument 'chars' is undefined");
  }

  var charsLength = chars.length;
  if (charsLength > 256) {
    throw new Error(
      "Argument 'chars' should not have more than 256 characters" +
        ", otherwise unpredictability will be broken"
    );
  }

  var randomBytes = crypto.randomBytes(length);
  var result = new Array(length);

  var cursor = 0;
  for (var i = 0; i < length; i++) {
    cursor += randomBytes[i];
    result[i] = chars[cursor % charsLength];
  }

  return result.join("");
}

export function randomProfilePassword() {
  return randomString(6, "abcdefghijklmnopqrstuvwxyz0123456789");
}

/**
 *
 * @param {string} email
 * @returns {Promise<{ profile: any; foundInGlobal: boolean; }>}
 */
export async function findProfileByEmail(email) {
  // Check in global
  const indianProfiles = await profileDbIndiaClient.queryDocs("appusers", {
    query: "c.profileEmail = @profileEmail",
    parameters: [{ name: "@profileEmail", value: email }],
  });

  // Result found in local
  if (indianProfiles.length > 0) {
    return {
      profile: indianProfiles[0],
      foundInGlobal: false,
    };
  }

  // Not found in either
  return {
    profile: undefined,
    foundInGlobal: false,
  };
}

/**
 *
 * @param {string} ProfileId
 * @returns {Promise<{ profile: any; foundInGlobal: boolean; }>}
 */
export async function findProfileById(id) {
  // Check in global
  const indianProfiles = await profileDbIndiaClient.queryDocs("appusers", {
    query: "c.id = @id",
    parameters: [{ name: "@id", value: id }],
  });

  // Result found in local Cosmos
  if (indianProfiles.length > 0) {
    return {
      profile: indianProfiles[0],
      foundInGlobal: false,
    };
  }

  return {
    profile: undefined,
    foundInGlobal: false,
  };
}
```


# Conclusion

ProfileDB India offers a robust set of functions for managing user profiles within the Indian context. This includes features for profile creation, authentication, and data retrieval. The module is intricately designed for seamless integration into applications utilizing Cosmos DB as the backend database.

[Go back to README](../README.md)





