import { FastifyReply } from "fastify";
import { estimatePropsSchema } from "../interfaces/pdf";
import { z } from "zod";
import { EstimatePdf } from "../components/Estimate";
import { renderToBuffer } from "@react-pdf/renderer";

export async function getGenerateEstimatePdf(
    reply: FastifyReply,
    estimateData: z.infer<typeof estimatePropsSchema>
) {
    try {
        const buffer = await renderToBuffer(EstimatePdf({ estimateProps: estimateData }));

        return reply
            .header("Content-Type", "application/pdf")
            .header("Content-Disposition", "inline; filename=documento.pdf")
            .send(buffer);
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        return reply.status(500).send({ message: "Erro ao gerar o PDF", error: error });
    }
}
