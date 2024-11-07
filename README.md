# API de Geração de Orçamento em PDF - Fixr

Este repositório contém uma API simples para gerar orçamentos em PDF para o sistema **Fixr**.

> [!NOTE]  
> Essa API possui apenas um endpoint e não representa a lógica utilizada em produção. Ela serve apenas como uma demonstração, permitindo a criação de um orçamento PDF a partir dos dados fornecidos no corpo da requisição.

## Endpoint

### `POST /pdf/estimate`

Este endpoint recebe os dados do orçamento no corpo da requisição e insere essas informações em um template pré-definido, gerando um PDF de orçamento.

### Parâmetros da Requisição

Para utilizar o endpoint, envie um `POST` com o corpo no formato JSON conforme o esquema a seguir:

```typescript
import { z } from "zod";

const entitySchema = z.object({
    contactName: z.string(),
    address: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
});

// Esquema para os itens do orçamento
const estimateItemSchema = z.object({
    name: z.string(),
    type: z.string(),
    value: z.number(),
    quantity: z.number(),
});

// Esquema para os dados do orçamento
export const estimatePropsSchema = z.object({
    number: z.number(),
    date: z.string(), // Exemplo: "YYYY-MM-DD"
    company: z.object({
        businessName: z.string(),
        contactName: z.string().optional(),
        website: z.string().url().optional(),
        address: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        cnpj: z.string(), // Insira validação de CNPJ se necessário
        img: z.string().optional(),
    }),
    client: entitySchema,
    items: z.array(estimateItemSchema),
    discountPercentage: z.number().optional(),
});
```

### Exemplo de Requisição

```json
POST /pdf/estimate
{
  "number": 1234,
  "date": "2024-11-06",
  "company": {
    "businessName": "Empresa Exemplo LTDA",
    "contactName": "João Silva",
    "website": "https://empresaexemplo.com",
    "address": "Rua Exemplo, 123",
    "email": "contato@empresaexemplo.com",
    "phone": "(11) 98765-4321",
    "cnpj": "12.345.678/0001-99",
    "img": "https://empresaexemplo.com/logo.png"
  },
  "client": {
    "contactName": "Maria Oliveira",
    "address": "Avenida Cliente, 456",
    "email": "maria@cliente.com",
    "phone": "(11) 99876-5432"
  },
  "items": [
    {
      "name": "Serviço A",
      "type": "Serviço",
      "value": 100.00,
      "quantity": 1
    },
    {
      "name": "Peça B",
      "type": "Produto",
      "value": 50.00,
      "quantity": 2
    }
  ],
  "discountPercentage": 10
}
```

### Parâmetros do Corpo da Requisição

-   `number` (número): Número do orçamento.
-   `date` (string): Data do orçamento (ex.: "YYYY-MM-DD").
-   `company` (objeto): Informações da empresa.
    -   `businessName` (string): Nome comercial da empresa.
    -   `contactName` (string, opcional): Nome do contato na empresa.
    -   `website` (URL, opcional): URL do site da empresa.
    -   `address` (string, opcional): Endereço da empresa.
    -   `email` (email, opcional): E-mail da empresa.
    -   `phone` (string, opcional): Telefone da empresa.
    -   `cnpj` (string): CNPJ da empresa.
    -   `img` (URL, opcional): Logo da empresa.
-   `client` (objeto): Informações do cliente.
    -   `contactName` (string): Nome do cliente.
    -   `address` (string, opcional): Endereço do cliente.
    -   `email` (email, opcional): E-mail do cliente.
    -   `phone` (string, opcional): Telefone do cliente.
-   `items` (array de objetos): Lista de itens incluídos no orçamento.
    -   `name` (string): Nome do item.
    -   `type` (string): Tipo do item (ex.: "Serviço" ou "Produto").
    -   `value` (número): Valor unitário do item.
    -   `quantity` (número): Quantidade do item.
-   `discountPercentage` (número, opcional): Porcentagem de desconto a ser aplicada no orçamento.

## Observação

Esta API foi projetada para fins de demonstração e não reflete a lógica completa de geração de orçamentos usada em produção no sistema.
