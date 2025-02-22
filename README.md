# Express Backend for Generating Embeddings
API-https://embeddings-server.ashishtiwari.net?token=${token}
## Overview
This is an Express.js-based backend that generates text embeddings using the `Xenova/all-MiniLM-L6-v2` model from Hugging Face. The API validates user tokens, accepts text input, and returns numerical embeddings.

## Features
- **Authentication**: Uses token-based validation.
- **Text Embeddings**: Extracts embeddings using the `feature-extraction` pipeline from `@huggingface/transformers`.
- **Validation**: Ensures valid input using `zod`.
- **CORS Support**: Allows cross-origin requests.

## Installation

1. Clone the repository:
   ```sh
   git clone <repo_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm run dev
   ```
   The server runs on **port 7078** by default.

## API Endpoints

### **GET /**
- **Description**: Generates embeddings for a given text input.
- **Request Parameters**:
  - `token` (query string): Authentication token.
- **Request Body (JSON)**:
  ```json
  {
    "data": "Your text here"
  }
  ```
- **Responses**:
  - `200 OK`: Returns embeddings.
  - `400 Bad Request`: Invalid input format.
  - `403 Forbidden`: Unauthorized request (invalid token).
  - `500 Internal Server Error`: Unexpected error.

- **Example Request**:
  ```sh
  curl -X GET "http://localhost:4000/?token=your_token" \
       -H "Content-Type: application/json" \
       -d '{"data": "Hello world"}'
  ```

- **Example Response**:
  ```json
  {
    "embeddings": [0.123, 0.456, 0.789, ...]
  }
  ```

## Technology Stack
- **Backend**: Node.js, Express.js
- **Machine Learning**: Hugging Face Transformers (`Xenova/all-MiniLM-L6-v2`)
- **Validation**: Zod
- **Authentication**: Custom token validation using hashing current TIME DD/MM/YY, HH:MM am/pm with secret.

## Docker Support
To build and run with Docker:
```sh
docker build -t embeddings-api .
docker run -p 7078:7078 embeddings-api
```

You can also get the Docker image directly:
```sh
docker pull asisserver/embeddings
```
