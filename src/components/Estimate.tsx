import React from "react";
import { Document, Page, Font } from "@react-pdf/renderer";
import { Header } from "./estimate/Header";
import { Entities } from "./estimate/Entities";
import { ItemsTable } from "./estimate/ItemsTable";
import { Totals } from "./estimate/Totals";
import { Footer } from "./estimate/Footer";

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
            src: "./src/components/estimate/fonts/Inter-Regular.ttf",
            fontWeight: 400,
        },
        {
            src: "./src/components/estimate/fonts/Inter-SemiBold.ttf",
            fontWeight: 600,
        },
    ],
});

export const EstimatePdf = ({ estimateProps }: { estimateProps: EstimateProps }) => {
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
                <Header
                    companyImg={estimateProps.company.img}
                    estDate={estimateProps.date}
                    estNumber={estimateProps.number}
                />
                <Entities client={estimateProps.client} company={estimateProps.company} />
                <ItemsTable items={estimateProps.items} />
                <Totals
                    items={estimateProps.items}
                    discountPercentage={estimateProps.discountPercentage}
                />
                <Footer company={estimateProps.company} />
            </Page>
        </Document>
    );
};
