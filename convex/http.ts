import { httpRouter } from "convex/server";
import { helloHandler, postHandler } from "./api";



const http = httpRouter();

http.route({
  path: "/hello",
  method: "GET",
  handler: helloHandler,
});

http.route({
  path: "/post",
  method: "POST",
  handler: postHandler,
});



//convex expects "http" to be the default export
export default http;
