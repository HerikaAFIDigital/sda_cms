### Documentation

Service that generates a CHAMPIAN certificate.

---

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

## API Endpoints

1. /cert

### /cert

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

---

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
