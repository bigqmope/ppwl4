import { Elysia } from "elysia";
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


  app.get("/product", () => ({
  id: 1,
  name: "Laptop"
}))


app.listen(3000)
console.log("Server running at http://localhost:3000")