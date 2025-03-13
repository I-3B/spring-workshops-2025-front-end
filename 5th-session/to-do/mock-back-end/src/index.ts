import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { cors } from "hono/cors";

const app = new OpenAPIHono();

app.use("/todos/*", cors());

let todos = [
  { id: 1, description: "Buy groceries", category: "Shopping", completed: false },
  { id: 2, description: "Write report", category: "Work", completed: false },
  { id: 3, description: "Exercise", category: "Fitness", completed: false },
];

// Zod schemas for validation
const todoSchema = z.object({
  id: z.number(),
  description: z.string(),
  category: z.string(),
  completed: z.boolean(),
});

const todoFindOneParamSchema = z.object({
  id: z.string().transform(Number),
});

const todoFindOneResponseSchema = todoSchema;

const todoListResponseSchema = z.array(todoSchema);

const todoCreateSchema = z.object({
  description: z.string(),
  category: z.string(),
});

const todoUpdateSchema = z.object({
  description: z.string().optional(),
  category: z.string().optional(),
  completed: z.boolean().optional(),
});

// GET /todos
app.openapi(
  createRoute({
    method: "get",
    tags: ["To-do"],
    path: "/todos",
    responses: {
      200: {
        description: "List of todos",
        content: {
          "application/json": { schema: todoListResponseSchema },
        },
      },
    },
  }),
  (c) => {
    return c.json(todos);
  }
);

// GET /todos/:id
app.openapi(
  createRoute({
    method: "get",
    path: "/todos/{id}",
    tags: ["To-do"],
    request: { params: todoFindOneParamSchema },
    responses: {
      200: {
        description: "Todo details",
        content: {
          "application/json": { schema: todoFindOneResponseSchema },
        },
      },
      404: { description: "Todo not found" },
    },
  }),
  (c) => {
    const id = c.req.valid("param").id;
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      return c.json({ message: "Todo not found" }, 404);
    }
    return c.json(todo);
  }
);

// POST /todos
app.openapi(
  createRoute({
    method: "post",
    path: "/todos",
    tags: ["To-do"],
    request: {
      body: {
        content: {
          "application/json": { schema: todoCreateSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Todo created",
        content: {
          "application/json": { schema: todoFindOneResponseSchema },
        },
      },
    },
  }),
  async (c) => {
    const { description, category } = await c.req.json();
    const newTodo = {
      id: Date.now(),
      description: description,
      category: category,
      completed: false,
    };
    todos.push(newTodo);
    return c.json(newTodo, 201);
  }
);

// PUT /todos/:id
app.openapi(
  createRoute({
    method: "put",
    path: "/todos/{id}",
    tags: ["To-do"],
    request: {
      params: todoFindOneParamSchema,
      body: {
        content: {
          "application/json": { schema: todoUpdateSchema },
        },
      },
    },
    responses: {
      200: {
        description: "Todo updated",
        content: {
          "application/json": { schema: todoFindOneResponseSchema },
        },
      },
      404: { description: "Todo not found" },
    },
  }),
  async (c) => {
    const id = c.req.valid("param").id;
    const updatedTodo = await c.req.json();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return c.json({ message: "Todo not found" }, 404);
    }
    todos[index] = { ...todos[index], ...updatedTodo };
    return c.json(todos[index]);
  }
);

app.get("/documentation", swaggerUI({ url: "/doc" }));
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "To-Do List API",
  },
});
serve({ fetch: app.fetch, port: 3001 }).on("listening", () => {
  console.log("API Documentation: http://localhost:3001/documentation");
});
