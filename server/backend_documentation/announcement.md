# SDA- Announcements

This document provides instructions for editing the SDA Announcements.

## Edit the announcements.json file in blob storage

The announcements are stored in a JSON file located in blob storage. You can edit this file directly to update the announcements.

- [Edit announcements.json in blob storage](https://sdacms.blob.core.windows.net/content/announcements.json)

## File Location Direct Link

- [announcements.json - Microsoft Azure](https://sdacms.blob.core.windows.net/content/announcements.json)

## Structure

  <img src=".\Screenshot (91).png" alt="Example Image" style="width:600px;"/>



The `announcements.json` file has the following structure:

```json
[
    { 
        "id": "e6bbc3b7-3bd1-473f-a996-d81a2be3d1f8",
        "link": "module:covid-19_15852200859311",
        "title": {
            "6a146956-9f21-206a-98cf-55db7b0a8301": "Nouveau module COVID-19"
        },
        "body": {
            "6a146956-9f21-206a-98cf-55db7b0a8301": "Le module COVID-19 est développé par Maternity Foundation, l'Université de Copenhague et Laerdal Global Health en collaboration avec l'UNFPA et l'ICM."
        },
        "config": {
            "aboveLangVersion": 75,
            "belowLangVersion": 92,
            "language": "6a146956-9f21-206a-98cf-55db7b0a8301"
        }
    }
]
```


z  announcement and contains the following properties:

    id: The unique identifier for the announcement.
    link: The link associated with the announcement.
    title: The title of the announcement, specified as an object with language-specific keys and corresponding values.
    body: The body content of the announcement, specified as an object with language-specific keys and corresponding values.
    config: Configuration settings for the announcement, including language version information.

## Instructions

    Access the announcements.json file.
    Edit the JSON structure as needed, including adding, removing, or modifying announcements.
    Save the changes to the announcements.json file.
    Review the updates in the application or platform where the announcements are displayed.


[Go back to README](../README.md)
