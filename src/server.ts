import { fastify } from "fastify";
import { ZodError } from "zod";
import { pdfRoutes } from "./routes/pdf";
import cors from "@fastify/cors";

export const server = fastify();

server.register(cors, {
    origin: [
        "http://localhost:3000",
        "http://192.168.0.100:3000",
        "https://orcamentos.fixr.ricardo.gg",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Cookie"],
    credentials: true,
});

server.register(pdfRoutes, {
    prefix: "/pdf",
});

server.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            issues: error.issues,
        });
        return;
    }

    reply.send(error);
});

server.get("/health", (request, reply) => {
    reply.send("OK");
});

server.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
});

console.log("Server listening at localhost:3333");

export default server;
