import React, { CSSProperties } from "react";
import { View, Text, Document, Page, Font, Image } from "@react-pdf/renderer";
import FixrLogo from "./FixrLogo";

interface Entity {
    contactName: string;
    address?: string;
    email?: string;
    phone?: string;
}

interface EstimateItem {
    name: string;
    type: string;
    value: number;
    quantity: number;
}

interface EstimateProps {
    number: number;
    date: string;
    company: {
        businessName: string;
        contactName?: string;
        website?: string;
        address?: string;
        email?: string;
        phone?: string;
        cnpj: string;
        img?: string;
    };
    client: Entity;
    items: EstimateItem[];
    discountPercentage?: number;
}

Font.register({
    family: "Inter",
    fonts: [
        {
            src: "./src/components/fonts/Inter-Regular.ttf",
            fontWeight: 400,
        },
        {
            src: "./src/components/fonts/Inter-SemiBold.ttf",
            fontWeight: 600,
        },
    ],
});

export const EstimatePdf = ({ estimateProps }: { estimateProps: EstimateProps }) => {
    const formatBRL = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const estimateTotal = estimateProps.items.reduce((acc, item) => {
        return acc + item.value * item.quantity;
    }, 0);

    const discount = estimateTotal * ((estimateProps.discountPercentage ?? 0) / 100);

    const finalValue = estimateTotal - discount;

    return (
        <Document>
            <Page
                size={"A4"}
                style={{
                    padding: "54px",
                    color: "#111827",
                    fontFamily: "Inter",
                }}
            >
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
                                    {String(estimateProps.number).padStart(4, "0")}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ flex: 1 }}>Data do orçamento</Text>
                                <Text style={{ fontWeight: "semibold", color: "#000", flex: 2 }}>
                                    {estimateProps.date}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {estimateProps.company.img ? (
                        <Image
                            src={estimateProps.company.img}
                            style={{ maxWidth: "128px", maxHeight: "68px", objectFit: "contain" }}
                        />
                    ) : (
                        <FixrLogo style={{ width: "128px" }} />
                    )}
                </View>

                <View
                    style={{ flexDirection: "row", marginTop: "20px", paddingHorizontal: "10px" }}
                >
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
                                {estimateProps.company.businessName}
                            </Text>
                        </View>
                        <View style={{ gap: "1px" }}>
                            {Object.entries(estimateProps.company).map(([key, value]) => {
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
                            {estimateProps.client.contactName}
                        </Text>
                        <View style={{ gap: "1px" }}>
                            {Object.entries(estimateProps.client).map(([key, value]) => (
                                <Text style={{ fontSize: "8.5px" }} key={key}>
                                    {value}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>

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
                    {estimateProps.items.map((item, index) => (
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
                            Este orçamento é válido por 30 dias a partir da data de emissão e deve
                            ser aceito formalmente para que os serviços possam ser realizados.
                            Quaisquer alterações solicitadas podem impactar os valores apresentados.
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
                            <Text style={{ flex: 1 }}>
                                Desconto ({estimateProps.discountPercentage ?? 0}%)
                            </Text>
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
                            {estimateProps.company.businessName} - CNPJ:{" "}
                            {estimateProps.company.cnpj}
                        </Text>
                    </View>
                    <FixrLogo style={{ width: "48px" }} />
                </View>
            </Page>
        </Document>
    );
};
