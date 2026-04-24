export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Loopin API",
    version: "1.0.0",
    description:
      "Interactive API documentation for the Loopin backend routes built with Next.js Route Handlers.",
  },
  servers: [
    {
      url: "/",
      description: "Current application origin",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication routes" },
    { name: "Posts", description: "Post creation and feed routes" },
    { name: "Users", description: "User profile, search, and listing routes" },
    { name: "Reactions", description: "Post reaction routes" },
    { name: "Media", description: "Upload routes" },
    { name: "System", description: "Protected and test routes" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
      JwtUser: {
        type: "object",
        properties: {
          userId: { type: "string" },
          email: { type: "string", format: "email" },
          iat: { type: "number" },
          exp: { type: "number" },
        },
      },
      AuthUser: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          email: { type: "string", format: "email" },
          profilePic: { type: "string" },
          bio: { type: "string" },
          interests: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
      PublicUser: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          profilePic: { type: "string" },
          bio: { type: "string" },
          interests: {
            type: "array",
            items: { type: "string" },
          },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      SearchUser: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          profilePic: { type: "string" },
        },
      },
      PostAuthor: {
        type: "object",
        properties: {
          _id: { type: "string" },
          username: { type: "string" },
          profilePic: { type: "string" },
        },
      },
      Post: {
        type: "object",
        properties: {
          _id: { type: "string" },
          userId: {
            oneOf: [
              { type: "string" },
              { $ref: "#/components/schemas/PostAuthor" },
            ],
          },
          content: { type: "string" },
          imageUrl: { type: "string" },
          category: { type: "string" },
          likes: {
            type: "array",
            items: { type: "string" },
          },
          piss: {
            type: "array",
            items: { type: "string" },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      SignupRequest: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
          username: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
          profilePic: { type: "string" },
          imageUrl: { type: "string" },
        },
      },
      CreatePostRequest: {
        type: "object",
        required: ["content"],
        properties: {
          content: { type: "string" },
          imageUrl: { type: "string" },
        },
      },
      ReactionRequest: {
        type: "object",
        required: ["postId", "type"],
        properties: {
          postId: { type: "string" },
          type: {
            type: "string",
            enum: ["like", "piss"],
          },
        },
      },
    },
  },
  paths: {
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    token: { type: "string" },
                    user: { $ref: "#/components/schemas/AuthUser" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing login fields",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "401": {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Create a new user account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignupRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    user: { $ref: "#/components/schemas/AuthUser" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing signup fields",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Signup failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/posts/feed": {
      get: {
        tags: ["Posts"],
        summary: "Get latest feed posts",
        responses: {
          "200": {
            description: "Feed loaded",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    posts: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Post" },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Feed loading failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/posts/create": {
      post: {
        tags: ["Posts"],
        summary: "Create a new post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreatePostRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Post created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    post: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing content",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/reactions": {
      post: {
        tags: ["Reactions"],
        summary: "Toggle a reaction on a post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ReactionRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Reaction updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    post: { $ref: "#/components/schemas/Post" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid reaction request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/upload": {
      post: {
        tags: ["Media"],
        summary: "Upload an image file",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["file"],
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "File uploaded",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    url: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing file",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Upload failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/protected": {
      get: {
        tags: ["System"],
        summary: "Check a protected route using Bearer auth",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Access granted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    user: { $ref: "#/components/schemas/JwtUser" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/test-db": {
      get: {
        tags: ["System"],
        summary: "Test database connectivity",
        responses: {
          "200": {
            description: "Database connected",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Database connection failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/users/search": {
      get: {
        tags: ["Users"],
        summary: "Search users by username",
        parameters: [
          {
            name: "q",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Username search query",
          },
        ],
        responses: {
          "200": {
            description: "Users found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    users: {
                      type: "array",
                      items: { $ref: "#/components/schemas/SearchUser" },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Search failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/users/{username}": {
      get: {
        tags: ["Users"],
        summary: "Get a public profile and posts by username",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Public username slug",
          },
        ],
        responses: {
          "200": {
            description: "Profile loaded",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/PublicUser" },
                    posts: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Post" },
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Profile loading failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/users/userData": {
      get: {
        tags: ["Users"],
        summary: "Get all user records without sensitive fields",
        responses: {
          "200": {
            description: "Users loaded",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    "Users data": {
                      type: "array",
                      items: { $ref: "#/components/schemas/PublicUser" },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "User listing failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
} as const;

