const swaggerDocument = {
    "swagger": "2.0",
    "info": {
      "description": "My Bank API description",
      "version": "1.0.0",
      "title": "My Bank API"
    },
    "tags": [
      {
        "name": "account",
        "description": "Account management"
      }
    ],
    "paths": {
      "/account": {
        "get": {
          "tags": [
            "account"
          ],
          "summary": "Get existing accounts",
          "description": "Get existing accounts description",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Successsfull operation",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Account"
                }
              }
            },
            "400": {
              "description": "Error occurred"
            }
          }
        },
        "post": {
          "tags": [
            "account"
          ],
          "summary": "Create new accounts",
          "description": "Create new accounts with the received parameters",
          "consumes": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Account object",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Account"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successsfull operation"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        },
        "put": {
          "tags": [
            "account"
          ],
          "summary": "Updated account",
          "description": "Updated account exists.",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Account object",
              "required": true,
              "schema": {
                "$ref": "#/definitions/AccountUser"
              }
            }
          ],
          "responses": {
            "400": {
              "description": "Invalid user supplied"
            }
          }
        }
      },
      "/account/{id}": {
        "get": {
          "tags": [
            "account"
          ],
          "summary": "Get existing accounts",
          "description": "Get existing accounts description",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID of account",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "200": {
              "description": "Successsfull operation",
              "schema": {
                "$ref": "#/definitions/Account"
              }
            },
            "400": {
              "description": "Error occurred"
            }
          }
        },
        "delete": {
          "tags": [
            "account"
          ],
          "summary": "Delete existing accounts",
          "description": "Delete existing accounts description",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID of account",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "200": {
              "description": "Successsfull operation"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        }
      }
    },
    "definitions": {
      "Account": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "Thiago Borges"
          },
          "balance": {
            "type": "integer",
            "example": 500.15
          }
        }
      },
      "AccountUser": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "Thiago Borges"
          },
          "balance": {
            "type": "integer",
            "example": 500.15
          }
        }
      }
    }
  }

  export default swaggerDocument;