
# Introduction:
Welcome to the Maternity Foundation's Content Management System (CMS), a powerful tool designed to manage and deliver crucial content in the field of maternal health. Our CMS is custom-built, offering unique features such as offline functionality and the ability to tailor content downloads within the application.

## Overview:
The CMS consists of two main versions: the Masters Version and the Language Versions. The Masters Version serves as a comprehensive template, encompassing all modules and acting as the foundation for content development. On the other hand, Language Versions are adaptations to local settings, allowing users to choose specific content tailored to their needs.

## Purpose:
The primary purpose of the CMS is to facilitate the efficient management and delivery of essential maternal health content. It empowers our clinical team at Maternity Foundation to oversee and customize content, ensuring that the information provided aligns with global standards while accommodating regional preferences.

## Key Features:
Offline Functionality: The CMS is capable of functioning in offline mode, enabling users to access critical content even in areas with limited connectivity.

Adaptive Content Delivery: Users can choose between the Masters and Language Versions, adapting content to local settings, languages, and preferences.

Comprehensive Modules: Modules such as learning materials, notifications, action cards, and more are part of the CMS, providing a holistic approach to maternal health education and support.

## How It Works:
During the app download process, users are prompted to select their preferred version (Masters or Language). The Masters Version acts as a template, and any updates made in the Masters are reflected in the Language Versions.The CMS interface includes three main tabs: "Safe Delivery CMS," "Admin," and "Logout."

## Safe Delivery CMS:




<img src=".\Screenshot 2024-01-08 150713.png" alt="Example Image" style="width:600px;"/>

The following image shows all the contents of the master's version, with a list of modules.



<img src=".\Screenshot (47).png" alt="Example Image" style="width:600px;"/>
<img src=".\Screenshot (72).png" alt="Example Image" style="width:200px;"/>



When any language is created, it always originates from the masters. If any updates occur in the masters, these changes are reflected in the language versions.


What will be displayed on the app depends on what has been added in the language version and published.A module without content will not be displayed on the app. When selecting any language by clicking on "Edit Draft," it shows all the contents of that language, such as screens, about, notifications, drugs, etc. Content can be added or removed.The following image shows a list of language versions.





<img src=".\Screenshot 2024-01-16 143816.png" alt="Example Image" style="width:600px;"/>



If we want to add more modules, action cards, or drugs, etc., we can add them in the masters version, not in the language versions. Once a module is added to the master, it will reflect in all language versions. However, it will only be displayed in the app if videos have been added to the module, and we have published it, as content-bundle.json file create during the publishing process only.



Draft Version:   The Draft Version serves as an internal testing environment, exclusively accessible for testing purposes within our development team. It is not accessible to the external world or end-users. During this phase, contents and modifications are stored in the development content repository (devcontent), allowing the team to review, test, and refine the app's features and content before making them available to a wider audience. The Draft Version is a critical step in the development and quality assurance process, ensuring that any issues or improvements are addressed before the content is released to the public.

Asset Version:  The Asset Version plays a pivotal role in determining the type of images that are intended to be displayed on the app, aligned specifically with the language version selected by the user. It serves as a configuration or setting that guides the system in presenting images that are culturally and linguistically relevant to the chosen language.
For instance, when a user selects a particular language version, the Asset Version ensures that the images presented within the app are tailored to suit the visual preferences, cultural nuances, and linguistic context of that specific language. This approach enhances the overall user experience by providing a more personalized and regionally-appropriate visual content representation.

Associated Country:  The "Associated Country" can take on one of two values: "WHO (Global)" or another language version. When "WHO (Global)" is selected, the system adheres to guidelines set by the World Health Organization (WHO). This setting ensures that content, protocols, or information aligns with global standards established by WHO.
By selecting a specific language version other than "WHO (Global)," the system tailors content to the guidelines, preferences, and regional considerations of that language version. This customization allows for a more localized and contextually relevant user experience, accommodating diverse linguistic and cultural requirements.

When we click on "Edit Draft" for any language version, it displays all the contents of the application, including screens, about, notifications, drugs, etc. Taking the example of screens,the term "Screen" refers to the text visible on the app, including items like about, accept, "This account does not have an online profile," etc. These texts can be translated, and after translation, they are rendered on the app in that particular language.As shown in the following image, there are three columns: Masters, Adopted, and Translated. Translated contents appear in the Translated section, which is further rendered in the app.Here, in the following image, the content is translated into Hindi. Consequently, on the app, it will be displayed in the Hindi language.

<img src=".\Screenshot (59).png" alt="Example Image" style="width:600px;"/>

<img src=".\Screenshot (60).png" alt="Example Image" style="width:200px;"/>

let's delve into the example of the "About" section within the settings of the app, specifically focusing on the "Introduction" subsection.

In the "About" section, there are various components such as Introduction, Developers, Thank You, Copyright, Disclaimer, etc. If we navigate to the "Introduction" subsection, we can observe that the content in this section has both an "Adopted" version and a "Translated" version.

The "Adopted" version refers to the content that has been incorporated or adapted from a source,the masters version. This content serves as a base for further modifications.
 
The "Translated" version, on the other hand, is the adapted content that has undergone translation into a specific language. This ensures that the app's users can access the information in their preferred language. The translated content is then rendered on the app, providing a localized and user-friendly experience for individuals using the app in various languages.

<img src=".\Screenshot (62).png" alt="Example Image" style="width:600px;"/>


<img src=".\Screenshot (63).png" alt="Example Image" style="width:600px;"/>

When it comes to the drug list, it initially displays all the drugs available in the master list. However, if there is a need to include a specific drug for a particular language which is approved for that region, it can be selectively added. Only the drugs that are included for a specified language will be displayed on the app.

In the provided image, for instance, only the drug "Adrenaline" has been included for display on the app. This selective inclusion allows for customization based on language preferences, ensuring that the drug list presented to users is tailored to their specific language needs.

<img src=".\Screenshot (64).png" alt="Example Image" style="width:600px;"/>



## Admin :

<img src=".\Screenshot 2024-02-08 111116.png" alt="Example Image" style="width:600px;"/>



1. Event Ckeck: An event in the context of our system refers to any action initiated by the user. The system captures and records these events for analytical purposes. To retrieve all actions taken by a specific user, the system requires the user's app ID, serving as a unique identifier associated with that particular user. The app ID is utilized to query and retrieve the relevant event data, providing insights into the user's interactions within the application.


<img src=".\Screenshot (58).png" alt="Example Image" style="width:300px;"/>


2. Certificate Verifier: The Certificate Verifier is a component designed to validate certificates within our system. This verification process involves cross-referencing the information provided on a certificate with the corresponding certificate ID. By utilizing the unique certificate ID associated with each certificate, the verifier ensures the authenticity and validity of the certificate in question. This step adds a layer of security and reliability, confirming that the certificate has not been tampered with and is genuine within the system.

4. Certificate Generater:  If an individual successfully completes all the modules, but encounters a technical issue leading to the failure of certificate generation, a new certificate can be generated for them. This process involves using the email ID associated with that user. By initiating the certificate generation again with the user's email ID, the system ensures that the individual receives the deserved certification, resolving any issues encountered during the initial attempt. This flexibility in certificate generation facilitates a smoother user experience and addresses technical glitches that may arise in the certification process.

5. CMS log:The CMS log provides a chronological record of actions, changes, updates, and other relevant activities within the CMS. This log is valuable for tracking system behavior, monitoring user interactions, troubleshooting issues, and ensuring the security and integrity of the content.


## Logout: 

## Summary

The Maternity Foundation's Content Management System (CMS) is a powerful tool designed for efficient maternal health content management and delivery. Key features include offline functionality, flexible content delivery, and a holistic approach to education. The CMS empowers clinical teams, offers user-centric content management, and provides essential administrative functionalities. With an intuitive interface, the CMS contributes to advancing maternal health globally.

[Go back to README](../README.md)





