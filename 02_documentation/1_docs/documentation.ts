const packageJson = require('../package.json');

const documentation = {
  // configs
  openapi: "3.0.0",
  info: {
    title: packageJson.application_name.toUpperCase(),
    version: packageJson.version,
    description: packageJson.description,
  },
  // components, security etc...
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  // endpoints
  paths: {
    // HELLO WORLD
    // --------------------------------------------------
    "/helloworld/helloworld": {
      get: {
        summary: "Get hello world message",
        description: "Retrieves a hello world message. You can optionally provide a custom message via query parameter.",
        tags: ["HELLO WORLD"],
        parameters: [
          {
            name: "message",
            in: "query",
            required: false,
            description: "Custom message to be returned. Defaults to 'Hello World!!!' if not provided.",
            schema: {
              type: "string",
              example: "Hello from the API!"
            }
          }
        ],
        responses: {
          "200": {
            description: "Successful response with hello world message.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "success"
                    },
                    code: {
                      type: "integer",
                      example: 200
                    },
                    message: {
                      type: "string",
                      example: "Hello World!!!"
                    },
                    links: {
                      type: "object",
                      properties: {
                        self: {
                          type: "string",
                          example: "/helloworld/helloworld"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // -------------------------------------------------- (end hello world)

    // ENCRYPTION
    // --------------------------------------------------
    "/luckybytes/encryption": {
      post: {
        summary: "Encrypt text using AES-256-CBC",
        description: "This endpoint accepts a password and a raw text, validates them, and returns an encrypted version of the raw text using AES-256-CBC encryption.",
        tags: ["ENCRYPTION"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    type: "string",
                    description: "Password to derive encryption key and IV. Must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
                    example: "SecurePass1!"
                  },
                  rawtext: {
                    type: "string",
                    description: "The raw text to be encrypted. Maximum length is 500 characters. Special characters such as <, >, &, ' and \" are not allowed.",
                    example: "This is a secret text to encrypt."
                  }
                },
                required: ["password", "rawtext"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successful response with encrypted text.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "success"
                    },
                    code: {
                      type: "integer",
                      example: 200
                    },
                    message: {
                      type: "string",
                      example: "Success! The text has been successfully encrypted."
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          encrypted_text: {
                            type: "string",
                            description: "The encrypted version of the raw text.",
                            example: "7fbb0e8f58b91b01f0ef9c8d30d11b8b2b5206b8db63a716c8e2a655946bb7e9"
                          }
                        }
                      }
                    },
                    links: {
                      type: "object",
                      properties: {
                        self: {
                          type: "string",
                          example: "/luckybytes/encryption"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Bad request. Missing or invalid parameters.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error"
                    },
                    code: {
                      type: "integer",
                      example: 400
                    },
                    message: {
                      type: "string",
                      example: "Invalid input or parameters."
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Unauthorized. Invalid text input or encryption failure.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error"
                    },
                    code: {
                      type: "integer",
                      example: 401
                    },
                    message: {
                      type: "string",
                      example: "Invalid text input."
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // -------------------------------------------------- (end encryption)

    // DECRYPTION
    // --------------------------------------------------
    "/luckybytes/decryption": {
      post: {
        summary: "Decrypt encrypted text using AES-256-CBC",
        description: "This endpoint accepts a password and an encrypted text, validates them, and returns the original (decrypted) text using the AES-256-CBC algorithm.",
        tags: ["ENCRYPTION"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    type: "string",
                    description: "Password used to derive the key and IV for decryption. It must be at least 8 characters long and cannot contain prohibited characters such as <, >, &, ', \" or /. ",
                    example: "SecurePass1!"
                  },
                  cryptotext: {
                    type: "string",
                    description: "Encrypted text that will be decrypted. The maximum length is 1500 characters. Special characters like <, >, &, ', \" are not allowed.",
                    example: "7fbb0e8f58b91b01f0ef9c8d30d11b8b2b5206b8db63a716c8e2a655946bb7e9"
                  }
                },
                required: ["password", "cryptotext"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successful response with the decrypted text.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "success"
                    },
                    code: {
                      type: "integer",
                      example: 200
                    },
                    message: {
                      type: "string",
                      example: "Success! The text was successfully decrypted."
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          encrypted_text: {
                            type: "string",
                            description: "The original (decrypted) text.",
                            example: "This is a secret text to encrypt."
                          }
                        }
                      }
                    },
                    links: {
                      type: "object",
                      properties: {
                        self: {
                          type: "string",
                          example: "/luckybytes/decryption"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Missing or invalid parameters.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error"
                    },
                    code: {
                      type: "integer",
                      example: 400
                    },
                    message: {
                      type: "string",
                      example: "Invalid input or missing parameters."
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Unauthorized. Decryption failed due to incorrect password or invalid encrypted text.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error"
                    },
                    code: {
                      type: "integer",
                      example: 401
                    },
                    message: {
                      type: "string",
                      example: "Invalid encrypted text or decryption error."
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // -------------------------------------------------- (end decryption)

  }
};

export default documentation;
