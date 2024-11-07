import { FastifyInstance, FastifyRequest } from "fastify";
import { getGenerateEstimatePdf } from "../controllers/pdf";
import { estimatePropsSchema } from "../interfaces/pdf";

export async function pdfRoutes(fastify: FastifyInstance) {
    fastify.post("/estimate", async (request: FastifyRequest, reply) => {
        const estimateData = await estimatePropsSchema.parse(request.body);

        await getGenerateEstimatePdf(reply, estimateData);
    });
}
