# Cryptography API - README

This project is a Text Cryptography and Decryption API built with **Node.js**, **Express**, and **TypeScript**. The API is designed to offer a robust solution for encrypting and decrypting text, while ensuring performance, security, and scalability with the use of modern technologies and best practices.

## Features

- **TypeScript**: Strong typing and enhanced development experience with TypeScript.
- **API Gateway (NGINX)**: Provides API routing, load balancing, and reverse proxy functionality.
- **Microservices Architecture**: Modular architecture that splits the API into manageable services for scalability and flexibility.
- **Node.js**: Efficient and event-driven runtime for handling high-concurrency tasks.
- **Express**: Lightweight and fast web framework for building APIs.
- **Logs**: Integrated logging system to capture important application events and errors.
- **Error Handler**: Centralized error handling mechanism to ensure consistent error responses.
- **Documentation**:
  - **Swagger**: Interactive API documentation for easy reference and testing.
  - **Redocly**: Alternative documentation view for better API exploration and understanding.
- **Rate Limiter (DDOS Protection)**: Protection against DDoS attacks by limiting the number of requests from each client.
- **Input Validation**: Ensures that all inputs are valid and safe using:
  - **ZOD**: Strong runtime validation.
  - **Lodash**: Utility library for safe and effective input validation and manipulation.
- **Docker**: Containerization for easy deployment and consistency across environments.
- **Internationalization**: Server-side translations for supporting multiple languages.

## Getting Started

### Prerequisites

To run the API locally, ensure you have the following tools installed:

- **Node.js** (version >=14.x)
- **Docker** (for containerization)
- **TypeScript** (for development, installed via `npm`)
- **Nginx** (for API Gateway setup)