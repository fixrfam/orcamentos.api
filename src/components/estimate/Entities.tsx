import { estimatePropsSchema } from "@/src/interfaces/pdf";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { z } from "zod";

type estimateProps = z.infer<typeof estimatePropsSchema>;

export function Entities({
    company,
    client,
}: {
    company: estimateProps["company"];
    client: estimateProps["client"];
}) {
    return (
        <View style={{ flexDirection: "row", marginTop: "20px", paddingHorizontal: "10px" }}>
            <View style={{ flex: 1, gap: "6px" }}>
                <View style={{ gap: "2px" }}>
                    <Text
                        style={{
                            fontSize: "10px",
                            fontWeight: "semibold",
                            letterSpacing: "-0.25px",
                        }}
                    >
                        Emissor
                    </Text>
                    <Text
                        style={{
                            fontSize: "14px",
                            fontWeight: "semibold",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        {company.businessName}
                    </Text>
                </View>
                <View style={{ gap: "1px" }}>
                    {Object.entries(company).map(([key, value]) => {
                        if (["img", "businessName"].includes(key)) return null;
                        return (
                            <Text style={{ fontSize: "8.5px" }} key={key}>
                                {value}
                            </Text>
                        );
                    })}
                </View>
            </View>

            <View style={{ textAlign: "right", flex: 1, gap: "6px" }}>
                <Text
                    style={{
                        fontSize: "10px",
                        fontWeight: "semibold",
                        letterSpacing: "-0.25px",
                    }}
                >
                    Cliente
                </Text>
                <Text
                    style={{
                        fontSize: "14px",
                        fontWeight: "semibold",
                        letterSpacing: "-0.5px",
                    }}
                >
                    {client.contactName}
                </Text>
                <View style={{ gap: "1px" }}>
                    {Object.entries(client).map(([key, value]) => (
                        <Text style={{ fontSize: "8.5px" }} key={key}>
                            {value}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
}
