import { View, Text, Image } from "@react-pdf/renderer";
import FixrLogo from "../FixrLogo";
import React from "react";

export function Header({
    estNumber,
    estDate,
    companyImg,
}: {
    estNumber: number;
    estDate: string;
    companyImg: string | undefined;
}) {
    return (
        <View style={{ flexDirection: "row", paddingHorizontal: "10px" }} fixed>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontSize: "21px",
                        fontWeight: "semibold",
                        letterSpacing: "-0.75px",
                    }}
                >
                    Orçamento
                </Text>
                <View
                    style={{
                        marginTop: "16px",
                        fontSize: "8.5px",
                        color: "#6B7280",
                        gap: "2px",
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Número do orçamento</Text>
                        <Text style={{ color: "#000", flex: 2 }}>
                            {String(estNumber).padStart(4, "0")}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>Data do orçamento</Text>
                        <Text style={{ fontWeight: "semibold", color: "#000", flex: 2 }}>
                            {estDate}
                        </Text>
                    </View>
                </View>
            </View>
            {companyImg ? (
                <Image
                    src={companyImg}
                    style={{ maxWidth: "128px", maxHeight: "68px", objectFit: "contain" }}
                />
            ) : (
                <FixrLogo style={{ width: "128px" }} />
            )}
        </View>
    );
}
