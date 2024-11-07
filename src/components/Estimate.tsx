import React, { CSSProperties } from "react";
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

export const EstimateFooter = ({ businessName, cnpj }: { businessName: string; cnpj: string }) => {
    const styles: { [key: string]: CSSProperties } = {
        footer: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 76px",
        },
        left: {
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            color: "#d4d4d4",
        },
        icon: { display: "inline-block", width: "64px" },
    };

    return (
        <>
            <footer style={styles.footer}>
                <div style={styles.left}>
                    {businessName} - CNPJ: {cnpj}
                </div>
                <FixrLogo fill='#d4d4d4' style={styles.icon} />
            </footer>
        </>
    );
};

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
        <>
            <script src='https://cdn.tailwindcss.com'></script>
            <div className='w-[210mm] h-[297mm] text-neutral-950'>
                <header className='w-full flex justify-between px-3'>
                    <div className='space-y-6'>
                        <h1 className='text-4xl font-semibold tracking-tight'>Orçamento</h1>
                        <table className='text-sm'>
                            <tr>
                                <td className='text-neutral-500 min-w-48'>Número do orçamento</td>
                                <td className='text-right'>
                                    {String(estimateProps.number).padStart(4, "0")}
                                </td>
                            </tr>
                            <tr>
                                <td className='text-neutral-500'>Data do orçamento</td>
                                <td className='text-right font-semibold'>{estimateProps.date}</td>
                            </tr>
                        </table>
                    </div>
                    <div className='max-w-44 max-h-28 flex justify-end'>
                        {estimateProps.company.img ? (
                            <img
                                src={estimateProps.company.img}
                                className='h-full object-contain'
                            ></img>
                        ) : (
                            <FixrLogo fill='#dedede' className='w-48' />
                        )}
                    </div>
                </header>
                <div className='w-full flex justify-between mt-8 px-3'>
                    <div>
                        <h2 className='text-base font-semibold tracking-tight'>Emissor</h2>
                        <h3 className='font-semibold text-xl tracking-tight'>
                            {estimateProps.company.businessName}
                        </h3>
                        <div className='mt-2'>
                            {Object.entries(estimateProps.company).map(([key, value]) => {
                                if (["img", "businessName"].includes(key)) return null;
                                return <p className='text-sm'>{value}</p>;
                            })}
                        </div>
                    </div>
                    <div className='text-right'>
                        <h2 className='text-base font-semibold tracking-tight'>Cliente</h2>
                        <h3 className='font-semibold text-xl tracking-tight'>
                            {estimateProps.client.contactName}
                        </h3>
                        <div className='mt-2'>
                            {Object.entries(estimateProps.client).map(([key, value]) => {
                                return <p className='text-sm'>{value}</p>;
                            })}
                        </div>
                    </div>
                </div>
                <main className='w-full mt-8'>
                    <table className='w-full'>
                        <thead>
                            <tr className='text-sm font-semibold tracking-tight uppercase text-neutral-500 border-b-[1px] border-neutral-200'>
                                <td className='py-4 px-3'>Item</td>
                                <td className='py-4 px-3'>Tipo</td>
                                <td className='py-4 px-3 text-right'>Valor</td>
                                <td className='py-4 px-3'>Quantidade</td>
                                <td className='py-4 px-3 text-right'>Total</td>
                            </tr>
                        </thead>

                        <tbody>
                            {estimateProps.items.map((item, index) => (
                                <tr key={index} className='odd:bg-none even:bg-neutral-50 text-sm'>
                                    <td className='py-3 px-3'>{item.name}</td>
                                    <td className='py-3 px-3'>{item.type}</td>
                                    <td className='py-3 px-3 text-right'>
                                        {formatBRL(item.value)}
                                    </td>
                                    <td className='py-3 px-3'>{item.quantity}</td>
                                    <td className='py-3 px-3 font-semibold text-right'>
                                        {formatBRL(item.value * item.quantity)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='w-full flex justify-between mt-10 gap-8 break-inside-avoid'>
                        <div className='text-base break-inside-avoid pl-3'>
                            <h4 className='font-semibold'>Notas</h4>
                            <p className='mt-2 tracking-tight text-sm text-neutral-500 text-justify max-w-[300px]'>
                                Este orçamento é válido por 30 dias a partir da data de emissão e
                                deve ser aceito formalmente para que os serviços possam ser
                                realizados. Quaisquer alterações solicitadas podem impactar os
                                valores apresentados.
                            </p>
                        </div>

                        <table className='text-base min-w-80 break-inside-avoid'>
                            <tr className='font-semibold'>
                                <td className='px-3'>Subtotal</td>
                                <td className='px-3 text-right'>{formatBRL(estimateTotal)}</td>
                            </tr>
                            <tr className='border-b-[1px] border-neutral-200'>
                                <td className='px-3 pb-4'>
                                    Desconto ({estimateProps.discountPercentage ?? 0}%)
                                </td>
                                <td className='px-3 text-right pb-4'>{formatBRL(discount)}</td>
                            </tr>
                            <tr className='font-semibold text-xl'>
                                <td className='px-3 py-3'>Valor à pagar</td>
                                <td className='px-3 py-3 text-right text-2xl'>
                                    {formatBRL(finalValue)}
                                </td>
                            </tr>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
};
