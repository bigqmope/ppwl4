import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";


const app = new Elysia()
  .use(openapi())


// Global Logger
app.onRequest(({ request }) => {
  console.log("📥", request.method, request.url)
  console.log("🕒", new Date().toISOString())
})


  // PRAKTIKUM 6
  app.onAfterHandle(({ response }) => {
  return {
    success: true,
    Message: "data tersedia",
    data: response
  }
})


// PRAKTIKUM 5 - beforeHandle
app.get(
  "/admin",
  () => ({
    stats: 99
  }),
  {
    beforeHandle({ headers, set }) {
      if (headers.authorization !== "Bearer 123") {
        set.status = 401
        return {
          success: false,
          message: "Unauthorized"
        }
      }
    }
  }
)

// PRAKTIKUM 6
  app.get("/product", () => ({
  id: 1,
  name: "Laptop"
}))

// PRAKTIKUM 7
  app.post(
  "/login",
  ({ body }) => ({
    message: "Login success",
    user: body
  }),
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 8 })
    })
  }
)
app.onError(({ code, set }) => {
  if (code === "VALIDATION") {
    set.status = 400
    return {
      success: false,
      error: "Validation Error"
    }
  }

  if (code === "NOT_FOUND") {
    set.status = 404
    return {
      success: false,
      error: "Route not found"
    }
  }

  set.status = 500
  return {
    success: false,
    error: "Internal Server Error"
  }
})


app.listen(3000)
console.log("Server running at http://localhost:3000")