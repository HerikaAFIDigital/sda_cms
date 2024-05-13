# 1. Root Cause Analysis for Path of Assets

## Issue: Wrong Path and File Names
  Folder Name in Azure Storage: Perinatal Mental Health Images for CMS
  
  Correct Folder Name: Perinatal Mental Health


  <img src="./Screenshot (79).png" alt="Example Image" style="width:600px;"/>

  
  <img src="./Screenshot (78).png" alt="Example Image" style="width:600px;"/>


## Issue Description
  During asset deployment, an incorrect folder name was specified in Azure Storage, leading to difficulties in accessing assets.

## Issue Identified
  The discrepancy between the specified folder name and the actual folder name in Azure Storage was identified during deployment testing.

  <img src="./Screenshot (80).png" alt="Example Image" style="width:600px;"/>


## Fix Provided
  The folder name in Azure Storage was corrected to "Perinatal Mental Health" to align with the correct naming convention.

## Learning for Future
  Always verify the accuracy of folder names and file names in Azure Storage against the specified names in the draft version during asset deployment. This verification process helps prevent errors and ensures smooth deployment of assets.

  By following this practice, we can mitigate potential issues related to incorrect path and file names, ultimately improving efficiency and accuracy in asset management and deployment processes.



# 2. Root Cause Analysis for Path Display Issue in CMS

## Issue: Displaying Full File Path Instead of File Name in CMS

  File name in CMS in translated section of the videos tab of Gestational Diabetes Mellitus(GDM): 

    1. /India english/Gestational diabetes mellitus/management_of_gdm
       Correct file name: Management of GDM
    2. /India english/Gestational diabetes mellitus/medical_management
       Correct file name: Medical management
    3. /India english/Gestational diabetes mellitus/medical_nutrition_therapy
       Correct file name: Medical nutrition therapy 

       
## Issue Description:

    In the video section of the Gestational Diabetes Mellitus module in the CMS, the entire file path is displayed instead of just the file name, resulting in the full path being shown on the app.

  <img src="./Screenshot (76).png" alt="Example Image" style="width:600px;"/>

## Issue Identified:

  The problem was identified when the full path of the file was displayed in the video section of Gestational Diabetes Mellitus (GDM) on the app.

## Fix Provided:

  The file path is replaced with only the file name in the translated section of the videos tab of GDM by going through screens.

  <img src="./Screenshot (77).png" alt="Example Image" style="width:600px;"/>


## Learning for Future:

  When adding the file path in the CMS, only the name of the file should be displayed in the translated section, not the full path.
  



# 3. Image Configuration in CMS for Key Learning

Step 1: Go to the master section in the CMS.

Step 2: Select key learning points from the Learning platform.

  <img src="./Screenshot (81).png" alt="Example Image" style="width:600px;"/>


Step 3: Choose the module.

  <img src="./Screenshot (82).png" alt="Example Image" style="width:600px;"/>

Step 4: Select the question for which you want to configure the corresponding image. It may take some time to open.

  <img src="./Screenshot (83).png" alt="Example Image" style="width:600px;"/>

Step 5: Click on the edit icon and insert the image path in the "choose image" section.

  <img src="./Screenshot (84).png" alt="Example Image" style="width:600px;"/>

Step 6: Click on the save button to apply the changes. 

# 4. Path isssue 

<!-- issue of action card in Arabic language version in antenetal care as its taking image of icon of nutrition_and_lifestyle.png from https://sdacms.blob.core.windows.net/content/assets/images/mena/key%20learning%20points/Antenatal%20Care/nutrition_and_lifestyle_counselling.png while actual image is stored on this path:https://sdacms.blob.core.windows.net/content/assets/images/mena/icon/actioncard/nutrition_and_lifestyle.png

Fix: By storing actual image on this path: https://sdacms.blob.core.windows.net/content/assets/images/mena/key%20learning%20points/Antenatal%20Care/nutrition_and_lifestyle_counselling.png -->

# Issue: 

The action card in the Arabic language version of the Antenatal Care section is displaying the image icon of "nutrition_and_lifestyle.png" from the incorrect path "https://sdacms.blob.core.windows.net/content/assets/images/mena/key%20learning%20points/Antenatal%20Care/nutrition_and_lifestyle_counselling.png".

The actual image is stored at "https://sdacms.blob.core.windows.net/content/assets/images/mena/icon/actioncard/nutrition_and_lifestyle.png".

## Fix Provided

To resolve this issue, we need to store the actual image at the correct path "https://sdacms.blob.core.windows.net/content/assets/images/mena/key%20learning%20points/Antenatal%20Care/nutrition_and_lifestyle_counselling.png". This ensures that the action card in the Arabic language version of the Antenatal Care section displays the correct image.















[Go back to README](../README.md)











     








