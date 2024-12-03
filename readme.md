# API Documentation
## env guide

DATABASE_URL = "mysql://username:password@localhost:3306/invoices"

## API

### Invoices



| Method | Endpoint            | req.params | req.query   | req.body                                                                                                                                                            |
|--------|---------------------|------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | `/api/invoices`     | -          | - | -                                                                                                                                                                   |
| GET    | `/api/invoices/:id` | `id`       | -           | -                                                                                                                                                                   |
| POST   | `/api/invoices`     | -          | -           | `{ "documentNumber": "string", "customerName": "string", "issueDate": "date", "dueDate": "date", "taxAddress": "string", "shippingAddress": "string", "referenceDocumentNumber": "string", "currency": "string", "netPrice": number, "discount": number, "priceAfterDiscount": number, "vat": number, "grandTotalPrice": number, "remarks": "string", "notes": "string", "items": [ { "name": "string", "quantity": number, "price": number } ] }` |
| PUT    | `/api/invoices/:id` | `id`       | -           | `{ "documentNumber": "string", "customerName": "string", "issueDate": "date", "dueDate": "date", "taxAddress": "string", "shippingAddress": "string", "referenceDocumentNumber": "string", "currency": "string", "netPrice": number, "discount": number, "priceAfterDiscount": number, "vat": number, "grandTotalPrice": number, "remarks": "string", "notes": "string", "items": [ { "name": "string", "quantity": number, "price": number } ] }` |
| DELETE | `/api/invoices/:id` | `id`       | -           | -                                                                                                                                                                   |
