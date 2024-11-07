import { describe, it, expect } from "vitest";
import server from "../server";

describe("Estimate Generation", () => {
    it("should return a PDF", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/pdf/estimate",
            body: {
                number: 1,
                date: "19 de Julho de 2024",
                company: {
                    businessName: "Acme Inc.",
                    contactName: "John Doe",
                    address: "9999 Main St, Springfield, IL",
                    email: "mail@acme.inc",
                    phone: "(555) 555-5555",
                    website: "https://acme.com",
                    cnpj: "12.345.678/0001-90",
                    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/800px-Xiaomi_logo_%282021-%29.svg.png",
                },
                client: {
                    contactName: "Jane Doe",
                    address: "9999 Elm St, Springfield, IL",
                    email: "jane.doe@gmail.com",
                    phone: "(111) 222-3333",
                },
                items: [
                    {
                        name: "Bateria Original Samsung",
                        type: "Peça",
                        value: 250,
                        quantity: 1,
                    },
                ],
            },
        });

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toBe("application/pdf");
    });

    it("should return an invalid_type issue when the pdf schema is not respected", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/pdf/estimate",
            body: {
                number: "XXXXX",
                date: 9999,
                company: {
                    businessName: 9999,
                    contactName: 9999,
                    address: 9999,
                    email: 9999,
                    phone: 9999,
                    website: 9999,
                    cnpj: 9999,
                    img: 9999,
                },
                client: {
                    contactName: 9999,
                    address: 9999,
                    email: 9999,
                    phone: 9999,
                },
                items: [
                    {
                        name: 9999,
                        type: 9999,
                        value: "XXX",
                        quantity: "XXX",
                    },
                ],
            },
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toMatchObject({
            statusCode: 400,
            error: "Bad Request",
            issues: expect.arrayContaining([expect.objectContaining({ code: "invalid_type" })]),
        });
    });
});
