import { View, Text } from "@react-pdf/renderer";
import React from "react";
import FixrLogo from "../FixrLogo";
import { z } from "zod";
import { estimatePropsSchema } from "@/src/interfaces/pdf";

export function Footer({
    company,
}: Readonly<{
    company: z.infer<typeof estimatePropsSchema>["company"];
}>) {
    return (
        <View
            style={{
                flexDirection: "row",
                position: "absolute",
                width: "170mm",
                bottom: 20,
                alignItems: "center",
            }}
            fixed
        >
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: "8.5px", color: "#a8a8a8" }}>
                    {company.businessName} - CNPJ: {company.cnpj}
                </Text>
            </View>
            <FixrLogo style={{ width: "48px" }} />
        </View>
    );
}
