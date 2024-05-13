# Feature Flag Documentation

## Introduction

Feature flags, also known as feature toggles or feature switches, are a software development technique that allows developers to turn features on and off dynamically without deploying new code. This document serves as a comprehensive guide to understand and manage feature flags within our application.



### Overview <a name="overview"></a>

Feature flags allow us to control the availability of features in our application dynamically. By leveraging feature flags, we can enable or disable features for specific users, groups, or environments without modifying the codebase.

### Feature Flag Configuration <a name="feature-flag-configuration"></a>

Feature flags are configured using a JSON file hosted on our server. The structure of the JSON file is as follows:
```
{
  "version": 1,
  "flags": {
    "SELECTIVE_DOWNLOAD": {
      "needsWhitelist": true,
      "whitelist": ["7cf6efab-a9d7-54d2-2cbd-ec82efe4a7da"]
    },
    "ZOOMABLE_VIEWS": {
      "needsWhitelist": false
    },
    "MODULE_CERTIFICATION": {
      "needsWhitelist": true,
      "whitelist": [
        "52510488-1303-5e36-6616-cc66413a73f1",
        "9f9139fa-8d00-28b8-13b9-34ce26df08cd"
      ]
    }
  }
}

```

"needsWhitelist" attribute specifies whether the feature requires a whitelist of allowed users or environments.

"whitelist" attribute contains an array of identifiers (e.g., language IDs) allowed to access the feature.

"version" attribute denotes the version of the feature flag configuration.



## SELECTIVE_DOWNLOAD:

needsWhitelist: This indicates that the feature SELECTIVE_DOWNLOAD is restricted to specific users listed in the whitelist.

whitelist: Lists the user IDs (e.g., "7cf6efab-a9d7-54d2-2cbd-ec82efe4a7da") who are permitted to access this feature.

## ZOOMABLE_VIEWS:

needsWhitelist: This is set to false, which means the ZOOMABLE_VIEWS feature is available to all users without any restriction.

## MODULE_CERTIFICATION:

needsWhitelist: Indicates that the MODULE_CERTIFICATION feature is restricted to specific users.

whitelist: Lists the user IDs who are allowed to access this feature ("52510488-1303-5e36-6616-cc66413a73f1" and "9f9139fa-8d00-28b8-13b9-34ce26df08cd").

In summary:

SELECTIVE_DOWNLOAD and MODULE_CERTIFICATION are restricted features that require users to be on a whitelist to access them.
ZOOMABLE_VIEWS is a feature that is available to all users without any whitelist restrictions.
This type of configuration allows developers to control feature access dynamically based on user IDs or other criteria specified in the flags. When a feature is behind a whitelist, only users listed in the whitelist will have access to that feature.


Tanzanis Swahili: 9f9139fa-8d00-28b8-13b9-34ce26df08cd

Tanzania English: 52510488-1303-5e36-6616-cc66413a73f1


<!-- ```

{
  "flags": {
    "FEATURE_NAME_1": {
      "needsWhitelist": true,
      "whitelist": ["languageId1", "languageId2"]
    },
    "FEATURE_NAME_2": {
      "needsWhitelist": false
    },
    ...
  },
  "version": 1
}
``` -->

## Handling Feature Flag at FrontEnd:

### Feature Flag Redux State 

The Redux state for feature flags consists of the following attributes:

version: The version of the feature flag configuration.

didInvalidate: A flag indicating whether the feature flag information is invalidated.

isFetching: A flag indicating whether a request to fetch feature flags is in progress.

flags: An object containing the feature flags retrieved from the server.

### Feature Flag Actions 

We use TypeScript-FSA (typescript-fsa) to define actions for feature flags. The available actions are:

fetchFeatureFlag: Initiates fetching feature flags from the server.

fetchFeatureFlagIfNeeded: Checks if feature flags need to be fetched and triggers the fetching if necessary.

successFeatureFlagFetch: Signals successful fetching of feature flags and updates the Redux state with the retrieved data.

invalidateFeatureFlagInfo: Invalidates the feature flag information, indicating that it needs to be refetched.

failedFeatureFlagFetch: Indicates failed fetching of feature flags.

### Redux Sagas for Feature Flags 

Redux Sagas are used to handle asynchronous operations related to feature flags. We have the following sagas:

fetchFeatureFlagSaga: Fetches feature flags from the server.

fetchFeatureFlagIfNeededSaga: Checks if feature flags need to be fetched and dispatches the appropriate action accordingly.

featureFlagSaga: Root saga that orchestrates the flow of feature flag-related actions.

### Integration with Components 

Components can utilize the hasFeature function to check if a particular feature is enabled. This function takes a feature name and a language ID as parameters and returns a boolean indicating whether the feature is available.


### Feature Flag Utility

This utility provides functionality to check whether a specific feature is enabled based on feature flags stored in the application's state.


FeatureFlagState: A TypeScript interface representing the state of feature flags.

store: The Redux store instance.

### FEATURE_FLAGS: 

An object containing keys representing various features and their corresponding values as strings. These strings serve as identifiers for different features.

SELECTIVE_DOWNLOAD: Feature flag for selective download.
ZOOMABLE_VIEWS: Feature flag for zoomable views.
MODULE_CERTIFICATION: Feature flag for module certification.

### Functions:

#### hasFeature(feature: string, languageId: string): boolean

feature: A string representing the feature to be checked.
languageId: A string representing the language identifier.
Returns:
true if the feature is enabled; false otherwise.
Description:
Retrieves the current state of feature flags from the Redux store and checks if the specified feature is enabled for the given language.
Logs the feature, language ID, and feature flags for debugging purposes.

#### checkFeature(feature: string, languageId: string, state: FeatureFlagState): boolean

feature: A string representing the feature to be checked.
languageId: A string representing the language identifier.
state: The current state of feature flags.
Returns:
true if the feature is enabled; false otherwise.
Description:
Checks whether the specified feature is enabled based on the provided feature flags state.
If the feature flag list is not found or the requested feature does not exist, it returns false.
If the feature requires whitelist validation, it checks if the language ID is included in the whitelist.
Otherwise, it returns true.
Usage
Import the hasFeature function from this utility.
Call hasFeature with the desired feature identifier and language ID to check if the feature is enabled.

import { hasFeature, FEATURE_FLAGS } from './featureFlagUtility';

const featureEnabled = hasFeature(FEATURE_FLAGS.SELECTIVE_DOWNLOAD, 'en_US');

console.log('Is selective download enabled?', featureEnabled);


### Best Practices

Use descriptive feature flag names to clearly indicate the purpose of each feature.
Keep the feature flag configuration up-to-date and versioned.
Regularly review and update feature flag usage to ensure optimal feature management.
Avoid excessive use of feature flags as they can complicate code logic and maintenance.
This documentation provides a comprehensive understanding of feature flags within our application, including their configuration, management, and usage. By effectively leveraging feature flags, we can maintain flexibility and control over feature deployment while delivering a seamless user experience.

[Go back to README](../README.md)












