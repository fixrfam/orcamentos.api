import { FastifyReply } from "fastify";
import { estimatePropsSchema } from "../interfaces/pdf";
import { z } from "zod";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import puppeteer from "puppeteer";
import { EstimatePdf, EstimateFooter } from "../components/Estimate";

export async function getGenerateEstimatePdf(
    reply: FastifyReply,
    estimateData: z.infer<typeof estimatePropsSchema>
) {
    try {
        const footerContent = renderToStaticMarkup(
            <EstimateFooter
                businessName={estimateData.company.businessName}
                cnpj={estimateData.company.cnpj}
            />
        );
        const htmlContent = renderToStaticMarkup(<EstimatePdf estimateProps={estimateData} />);

        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "64px", right: "64px", bottom: "64px", left: "64px" },
            displayHeaderFooter: true,
            headerTemplate: "<span>-</span>",
            footerTemplate: footerContent,
        });

        await browser.close();

        return reply
            .header("Content-Type", "application/pdf")
            .header("Content-Disposition", "inline; filename=documento.pdf")
            .send(pdfBuffer);
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        return reply.status(500).send({ message: "Erro ao gerar o PDF", error: error });
    }
}
