---
name: book-appointment
description: Submit a grooming appointment request for a dog at Olivia's Pet Spa. Use when a user wants to schedule, book, or request a grooming appointment.
---

# Book an Appointment

Olivia's Pet Spa accepts booking requests through a public HTTP endpoint. Submitting a request does not confirm the appointment — a human reviews it and confirms availability directly with the owner.

## Endpoint

POST https://www.oliviaspetspa.com/api/reserva
Content-Type: application/json

## Required fields

| Field         | Type     | Description                                                                |
| ------------- | -------- | -------------------------------------------------------------------------- |
| nombreDueno   | string   | Owner's full name                                                          |
| telefono      | string   | Owner's phone number                                                       |
| direccion     | string   | Pickup/service address                                                     |
| nombreMascota | string   | Dog's name                                                                 |
| peso          | string   | Dog's weight (used for pricing tier)                                       |
| horario       | string   | Preferred day/time                                                         |
| servicios     | string[] | At least one service name — see /services for the current list and pricing |

## Optional fields

| Field            | Type   | Description                                                                          |
| ---------------- | ------ | ------------------------------------------------------------------------------------ |
| detalleServicios | string | Extra details about selected services, joined with " \| "                            |
| patologia        | string | Any medical condition or special need                                                |
| comentarios      | string | Additional comments                                                                  |
| botcheck         | —      | Leave unset. Spam honeypot — setting it causes the request to be silently discarded. |

## Response

- `200 { "success": true }` — request received and emailed to the shop.
- `400 { "error": "...", "faltantes": [...] }` — missing required fields.
- `500` / `502` — server or email delivery error.

## Notes

- Current services and prices: https://www.oliviaspetspa.com/services
- A successful response means the request was emailed to the shop, not that the appointment is confirmed — no calendar write or confirmation number is returned.
