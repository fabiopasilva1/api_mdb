# API para conexão com MongoDB

## Config cors

To configure CORS (Cross-Origin Resource Sharing) in your application, you can use the `middlewares.js` file to specify the allowed origins, methods, and user agents. This configuration is crucial for controlling which domains and HTTP methods are permitted to access your server resources.

In the provided example, the CORS middleware is set up with the following parameters:

-   `name`: A unique identifier for the middleware, in this case, "mongrest::cors".
-   `enable`: A boolean flag that indicates whether CORS is enabled.
-   `methods`: An array of HTTP methods that are allowed, such as "POST" and "GET".
-   `origins`: A list of allowed origins, including "http://uneel.com.br", "http://localhost", and "\*" (which allows all origins).
-   `useAgent`: Specifies which user agents are allowed, including "postman", "curl", "insomnia", and "node-fetch".

### Example

Here is an example configuration in the `/config/middlewares.js` file:

```javascript
module.exports = [
    {
        name: "mongrest::cors",
        enable: true,
        methods: ["POST", "GET"],
        origins: ["http://uneel.com.br", "http://localhost", "*"],
        useAgent: ["postman", "curl", "insomnia", "node-fetch"],
    },
];
```

This configuration ensures that your server only accepts requests from the specified origins and methods, providing an essential layer of security and control over your API's accessibility.
