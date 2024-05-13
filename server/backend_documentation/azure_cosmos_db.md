# Overview:

Storage Configuration:

Both images and videos are stored in Azure Storage, while text-based content is saved in Azure Cosmos DB, a JSON-format document-based database. All the relevant information is centralized in SDACMS, which includes the paths to the images and videos stored in Azure Storage.

Data Organization in SDACMS:

Within the Data Explorer of SDACMS, content is stored in JSON format. If the "Language ID" is absent, it indicates that the content originates from the master version. The absence of a language identifier signifies that the content is not specific to any particular language version and serves as a template or foundational content applicable across all language variations.


 ```
{
  "key": "Thank you",
  "content": "Thank you",
  "langId": "",
  "_table": "screens"
  
}

If a "Language ID" is present in the content stored within SDACMS, it indicates that the content is specific to a particular language version. The presence of the language identifier signifies that the content has been adapted or translated to cater to the linguistic preferences of a targeted audience.

{
  "key": "Thank you",
  "content": "Thank you",
  "langId": "567uy7678uy6576o0i9p",
  "_table": "screens",
  "adopted":"Thank you",
  "translated":"Tak",
  ...
}
 ```
 
 <img src=".\Screenshot (65).png" alt="Example Image" style="width:600px;"/>

  <img src=".\Screenshot (66).png" alt="Example Image" style="width:600px;"/>



Query can be written to get data of choice like this:
Ex:

SELECT * FROM C WHERE c.content = 'thank you' AND langId = '675tyu7865t';

This query retrieves all columns (*) from the 'C' table where the 'content' is 'thank you' and the 'langId' is '675tyu7865t'


The '_table' indicates the location where the content will be stored.In the image provided below, the table is labeled 'drug,' signifying that the Adrenaline drug will be stored in the 'drug' table.

  <img src=".\Screenshot (67).png" alt="Example Image" style="width:600px;"/>


Images are stored in the 'content > asset > images > india' path within the storage account's containers.. When a language version is in draft status, it is stored in 'devcontent' and can be used for testing purposes, remaining invisible to others. Production data is saved in 'content.' Within 'content,' there are individual folders for each language, and all images for a specific language are stored inside their respective language folders as in this case india is selected.

  <img src=".\Screenshot (68).png" alt="Example Image" style="width:600px;"/>

 ```
Path: content > assets > images > india > icon

/content
    /assets
        /images
            /india
                /icon
        /videos
            /test1.mp4

       
   ```


From Azure Cosmos DB, all data, including 'about,' 'action card,' 'certificates,' 'drugs,' etc., is fetched and stored in the 'container' folder within the language ID folder corresponding to the selected language. This encompasses all the published content, and it is bundled together in a 'content-bundle.json' file."

  <img src=".\Screenshot (70).png" alt="Example Image" style="width:600px;"/>

```
Path: storage acounts > sdacms > container > content > language id > content-bundle.json

/storage accounts
    /sdacms
        /container
            /content
                /language id
                    /content-bundle.json


```



The 'content-bundle.json' file encompasses comprehensive information, including screens, about sections, images, videos, notifications, procedures, action cards, modules, drugs, etc. When the 'publish' action is initiated, the 'content-bundle.json' file is created and updated. Ultimately, a zip file is generated, and this zip file is downloaded onto the user's device when the user selects a specific language.

  <img src=".\Screenshot (71).png" alt="Example Image" style="width:600px;"/>


sample of content-bundle.json
-----------


```javascript
{
  "description": "English",
  "version": 42,
  "screen": {
    "ok": "Ok",
    "cancel": "Cancel",
    "next": "Next",
    "main": "Main",
    "learning": "My learning",
    "settings": "Settings",
    "actioncards": "Actioncards",
    "procedures": "Practical Procedures",
    "videos": "Videos",
    "questionaire": "Questionaire",
    "about": "About",
    "close": "Close",
    "language": "Change language",
    "drugs": "Drugs",
    "copyright": "Copyright",
    "developers": "Developers",
    "thankyou": "Thank you",
    "introduction": "Introduction"
  },
  "about": [
    {
      "id": "introduction",
      "version": 382,
      "href": "about/introduction.json"
    }
  ],

  "videos": [
    { "id": "hyp0",
      "icon": "hyp0",
      "version": 1234,
      "description": "Introduction",
      "src": "/assets/videos/Hyp_step_00.mp4"
    },
    {
      "id": "hyp1",
      "icon": "hyp1",
      "version": 1234,
      "description": "Definitions",
      "src": "/assets/videos/Hyp_step_01.mp4"
    }
  ],

  "images": [
    {
      "id": "hyp_module",
      "version": 383,
      "src": "/assets/images/icon_HYP.png"
    },
    {
      "id": "hyp_module_alt",
      "version": 383,
      "src": "/assets/images/icon_HYP.png"
    }
  ],
  "procedures": [
    {
      "id": "a77c15c1-7aa6-47a2-5b62-425a1d4d384",
      "version": 2323,
      "href": "procedures/a77c15c1-7aa6-47a2-5b62-425a1d4d384.json"
    }
  ],

  "modules": [
    {
      "id": "a77c15c1-7aa6-47a2-5b62-425a1d4d389",
      "version": 23,
      "href": "modules/a77c15c1-7aa6-47a2-5b62-425a1d4d389.json"
    }
  ]
}
```


[Go back to README](../README.md)

















