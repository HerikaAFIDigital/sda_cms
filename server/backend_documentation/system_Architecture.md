System Architecture:

The architecture depicts the interconnection of components. The CMS and learning API are linked with the Safe Delivery App installed on devices. Events captured from the devices are stored in the SQL server, functioning as the Enterprise Data Warehouse (EDW). This data serves as the foundation for visualization and report generation, with Power BI being the focal point in this project.



  <img src=".\Screenshot (24).png" alt="Example Image" style="width:600px;"/>


The second flow incorporates Data Lake for AI and ML, implemented on Azure. The Safe Delivery App is available for installation through the Apple App Store or Google Play Store. Additionally, it is seamlessly connected to two external agents: Mailgun, primarily used for sending and receiving certificates via email, and Bugsnag, which captures and logs app errors


  <img src=".\Screenshott.png" alt="Example Image" style="width:600px;"/>


Events originating from the Safe Delivery App follow this flow: Safe Delivery App → Data Factory → SQL Server → Enterprise Data Warehouse (EDW) for staging and production → Report Generation. Events are stored in Azure Storage, and Data Factory retrieves data every four hours. Batch processing from Azure SQL Server to EDW takes place on a daily basis, occurring every 24 hours


[Go back to README](../README.md)
