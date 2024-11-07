import { formatBRL } from "@/src/helpers/format";
import { estimatePropsSchema } from "@/src/interfaces/pdf";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { z } from "zod";

export function ItemsTable({ items }: { items: z.infer<typeof estimatePropsSchema>["items"] }) {
    return (
        <View style={{ marginVertical: "20px" }}>
            <View
                style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #e0e0e0",
                    padding: "10px",
                    gap: "17.5px",
                    fontSize: "7.5px",
                }}
            >
                <Text
                    style={{
                        fontWeight: "semibold",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        flex: 3,
                    }}
                >
                    Item
                </Text>
                <Text
                    style={{
                        fontWeight: "semibold",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        flex: 0.75,
                    }}
                >
                    Tipo
                </Text>
                <Text
                    style={{
                        fontWeight: "semibold",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        textAlign: "right",
                        flex: 1,
                    }}
                >
                    Valor
                </Text>
                <Text
                    style={{
                        fontWeight: "semibold",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        flex: 0.5,
                    }}
                >
                    Qtd
                </Text>
                <Text
                    style={{
                        fontSize: "7.5px",
                        fontWeight: "semibold",
                        color: "#6B7280",
                        textTransform: "uppercase",
                        textAlign: "right",
                        flex: 1,
                    }}
                >
                    Total
                </Text>
            </View>
            {items.map((item, index) => (
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: index % 2 === 0 ? "transparent" : "#f9fafb",
                        padding: "10px",
                        gap: "17.5px",
                        fontSize: "8.5px",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            flex: 3,
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            flex: 0.75,
                        }}
                    >
                        {item.type}
                    </Text>
                    <Text
                        style={{
                            textAlign: "right",
                            flex: 1,
                        }}
                    >
                        {formatBRL(item.value)}
                    </Text>
                    <Text
                        style={{
                            flex: 0.5,
                        }}
                    >
                        {item.quantity}
                    </Text>
                    <Text
                        style={{
                            textAlign: "right",
                            flex: 1,
                            fontWeight: "semibold",
                        }}
                    >
                        {formatBRL(item.value * item.quantity)}
                    </Text>
                </View>
            ))}
        </View>
    );
}
