import { httpAction } from "./_generated/server";

export const helloHandler = httpAction(async (_ctx, _request) => {
  return new Response(JSON.stringify({ message: "Hello, Convex!" }), {
    status: 200,
  });
});

export const postHandler = httpAction(async (_ctx, request) => {
  const { author, body } = await request.json();
  return new Response(
    JSON.stringify({ message: "Hello, Convex!", author, body }),
    {
      status: 200,
    },
  );
});
