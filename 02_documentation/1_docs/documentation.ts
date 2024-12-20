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
        description: "Este endpoint recebe uma senha e um texto criptografado, valida-os e retorna o texto original (descriptografado) usando o algoritmo AES-256-CBC.",
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
                    description: "Senha usada para derivar a chave e o IV para decriptação. Deve ter no mínimo 8 caracteres e não pode conter caracteres proibidos como <, >, &, ', \" ou /. ",
                    example: "SecurePass1!"
                  },
                  cryptotext: {
                    type: "string",
                    description: "Texto criptografado que será decriptografado. O tamanho máximo é 1500 caracteres. Caracteres especiais como <, >, &, ', \" não são permitidos.",
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
            description: "Resposta bem-sucedida com o texto descriptografado.",
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
                      example: "Sucesso! O texto foi descriptografado com sucesso."
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          encrypted_text: {
                            type: "string",
                            description: "O texto original (descriptografado).",
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
            description: "Requisição inválida. Parâmetros ausentes ou inválidos.",
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
                      example: "Entrada inválida ou parâmetros ausentes."
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Não autorizado. Erro na decriptação devido à senha incorreta ou texto criptografado inválido.",
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
                      example: "Texto criptografado inválido ou erro na decriptação."
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
