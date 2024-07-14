import { serve } from "bun";

const port = 3000;

const server = Bun.serve({
  port: port,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/api/token") {
      const body = await req.json();

      const resposne = await fetch(`https://discord.com/api/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.VITE_DISCORD_CLIENT_ID as string,
          client_secret: process.env.DISCORD_CLIENT_SECRET as string,
          grant_type: "authorization_code",
          code: body.code,
        }),
      });

      const { access_token } = await resposne.json();

      return Response.json({ access_token });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server started on port ", port);
