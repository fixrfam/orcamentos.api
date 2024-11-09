import { formatBRL } from "@/src/helpers/format";
import { estimatePropsSchema } from "@/src/interfaces/pdf";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { z } from "zod";

export function Totals({
    items,
    discountPercentage,
}: Readonly<{
    items: z.infer<typeof estimatePropsSchema>["items"];
    discountPercentage?: number;
}>) {
    const estimateTotal = items.reduce((acc, item) => {
        return acc + item.value * item.quantity;
    }, 0);

    const discount = estimateTotal * ((discountPercentage ?? 0) / 100);

    const finalValue = estimateTotal - discount;

    return (
        <View style={{ flexDirection: "row", gap: "25px", paddingHorizontal: "10px" }}>
            <View style={{ flex: 1, gap: "6px", fontSize: "9px" }}>
                <Text style={{ fontWeight: "semibold" }}>Notas</Text>
                <Text
                    style={{
                        color: "#6B7280",
                        textAlign: "justify",
                        letterSpacing: "-0.15px",
                        maxWidth: "200px",
                    }}
                >
                    Este orçamento é válido por 30 dias a partir da data de emissão e deve ser
                    aceito formalmente para que os serviços possam ser realizados. Quaisquer
                    alterações solicitadas podem impactar os valores apresentados.
                </Text>
            </View>

            <View style={{ fontSize: "10px", flex: 1, gap: "8px" }}>
                <View style={{ flexDirection: "row", fontWeight: "semibold", gap: "15px" }}>
                    <Text style={{ flex: 1 }}>Subtotal</Text>
                    <Text style={{ textAlign: "right" }}>{formatBRL(estimateTotal)}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: "15px",
                        borderBottom: "1px solid #e0e0e0",
                        paddingBottom: "8px",
                    }}
                >
                    <Text style={{ flex: 1 }}>Desconto ({discountPercentage ?? 0}%)</Text>
                    <Text style={{ textAlign: "right" }}>{formatBRL(discount)}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        fontWeight: "semibold",
                        fontSize: "14px",
                        gap: "15px",
                    }}
                >
                    <Text style={{ flex: 1 }}>Valor à pagar</Text>
                    <Text style={{ textAlign: "right" }}>{formatBRL(finalValue)}</Text>
                </View>
            </View>
        </View>
    );
}
