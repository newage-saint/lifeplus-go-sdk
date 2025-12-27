# LifePlus Healthcare Platform - Partner Integration & API v2 Migration Guide

> **UNIFIED DOCUMENTATION**: This guide covers Partner Integration, Legacy to v2 API Migration, and Architecture Patterns.
> Last Updated: December 25, 2025

---

## Table of Contents

1. [Partner API Key Authentication (NEW)](#partner-api-key-authentication)
2. [Legacy API to v2 Migration Map](#legacy-api-to-v2-migration-map)
3. [Architecture: Microservices, Services, Packages & Plugins](#architecture-patterns)
4. [Partner Integration Examples](#partner-integration-examples)
5. [Missing Endpoints Roadmap](#missing-endpoints-roadmap)
6. [Best Practices](#best-practices)

---

# LifePlus Healthcare Platform - Partner Integration Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Authentication](#authentication)
4. [SDK Installation](#sdk-installation)
5. [Common Integration Patterns](#common-integration-patterns)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)
8. [Support](#support)

---

## Introduction

Welcome to the LifePlus Healthcare Platform Partner Integration Guide. This comprehensive guide will help you integrate our healthcare services using our **production-ready SDKs** (not stubs).

### Platform Capabilities

| Service                   | Description                               |
| ------------------------- | ----------------------------------------- |
| **Telemedicine**    | Video consultations with licensed doctors |
| **Appointments**    | Book in-person doctor appointments        |
| **Diagnostics**     | Lab tests and diagnostic services         |
| **E-Pharmacy**      | Medicine ordering and delivery            |
| **Ambulance**       | Emergency ambulance booking               |
| **Home Care**       | Nursing and home care services            |
| **Insurance**       | Policy browsing and claims                |
| **Health Packages** | Subscription-based healthcare             |

---

## Getting Started

### Prerequisites

1. **Partner Account**: Contact mamun@lifeplusbd.com or sagor@lifeplusbd.com
2. **API Credentials**: Partner ID + API Key
3. **HTTPS endpoint** for webhooks

### Quick Start (5 Minutes)

**Go:**

```go
import lifeplus "github.com/LifeplusBangladesh/lifeplus-go-sdk"

config := lifeplus.NewConfiguration()
config.BasePath = "https://api.lifeplusbd.com
/api/v1"
client := lifeplus.NewAPIClient(config)
```

**PHP:**

```php
use LifePlus\SDK\LifePlusClient;

$client = new LifePlusClient([
    'base_url' => 'https://api.lifeplusbd.com/api/v1',
]);
```

**TypeScript:**

```typescript
import { LifePlusClient } from '@lifeplus/sdk';

const client = new LifePlusClient({
    baseUrl: 'https://api.lifeplusbd.com/api/v1',
});
```

---

## Authentication

### Login Flow

```go
// Login to get JWT token
session, _, err := client.AuthenticationApi.PostSessions(ctx, lifeplus.SessionRequest{
    Mobile:   "01712345678",
    Password: "SecurePass123",
})

token := session.Data.Token

// Use token for all subsequent requests
config.AddDefaultHeader("Authorization", "Bearer " + token)
```

---

## SDK Installation

### Go

```bash
go get github.com/lifeplus/lifeplus-go-sdk
```

### PHP Laravel

```bash
composer require lifeplus/php-sdk
```

### TypeScript

```bash
npm install @lifeplus/sdk
```

---

## Common Integration Patterns

### 1. E-Pharmacy (Medicine Ordering)

```go
// Search products
products, _, err := client.ProductsApi.GetProducts(ctx, &lifeplus.GetProductsOpts{
    Q: optional.NewString("paracetamol"),
})

// Add to cart
client.CartApi.PostCartItems(ctx, lifeplus.AddToCartRequest{
    ProductId: 12345,
    Quantity:  2,
})

// Place order
order, _, err := client.OrdersApi.PostOrders(ctx, lifeplus.CreateOrderRequest{
    OrderType:     "product",
    PaymentMethod: "online",
})
```

### 2. Doctor Appointments

```typescript
// Find doctors
const doctors = await client.doctors.list({ specialty: 'cardiology' });

// Check availability
const slots = await client.doctors.getSlots({
    doctorId: 123,
    date: '2024-01-20',
});

// Book appointment
const appointment = await client.appointments.create({
    doctorId: 123,
    patientId: 456,
    appointmentDate: '2024-01-20',
    timeSlot: '10:00 AM',
});
```

### 3. Telemedicine (Video Consultation)

```php
// Create video session
$session = $client->telemedicine()->createSession([
    'doctor_id' => 123,
    'patient_id' => 456,
]);

// Get Agora token
$token = $client->telemedicine()->getToken($session->data->id);

// Use token in frontend with Agora SDK
```

### 4. Diagnostic Tests

```go
// List tests
diagnostics, _, err := client.DiagnosticsApi.GetDiagnostics(ctx)

// Order tests
order, _, err := client.DiagnosticsApi.PostDiagnosticsOrders(ctx, lifeplus.DiagnosticOrderRequest{
    PatientId: 456,
    Tests:     []int32{123, 124, 125},
    SampleCollectionType: "home",
})
```

### 5. Ambulance Booking

```typescript
// Get price estimate
const price = await client.ambulance.getPrice({
    fromAreaId: 1,
    toAreaId: 2,
});

// Book ambulance
const booking = await client.ambulance.createOrder({
    fromAddress: '123 Main St',
    toAddress: '456 Hospital Rd',
    emergencyType: 'medical',
});
```

### 6. Health Package Subscription

```php
// List packages
$packages = $client->packages()->list();

// Subscribe
$subscription = $client->packages()->createOrder([
    'package_id' => 123,
    'patient_id' => 456,
    'payment_method' => 'online',
]);

// Check remaining benefits
$order = $client->packages()->getOrder($subscription->data->id);
echo "Remaining appointments: " . $order->data->appointment_remaining;
```

---

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "code": 422,
  "errors": {
    "email": ["The email field is required"]
  }
}
```

### Handling Errors

**Go:**

```go
product, resp, err := client.ProductsApi.GetProductsId(ctx, 12345)
if err != nil {
    if resp.StatusCode == 404 {
        log.Println("Product not found")
    } else if resp.StatusCode == 401 {
        // Refresh token
    }
}
```

**PHP:**

```php
try {
    $product = $client->products()->get(12345);
} catch (\LifePlus\SDK\Exception\NotFoundException $e) {
    echo "Product not found";
}
```

**TypeScript:**

```typescript
try {
    const product = await client.products.get(12345);
} catch (error) {
    if (error.status === 404) {
        console.log('Product not found');
    }
}
```

---

## Best Practices

### 1. Token Management

- Store JWT tokens securely
- Refresh tokens before expiry
- Never expose tokens in client-side code

### 2. Error Handling

- Always handle API errors gracefully
- Implement retry logic for transient failures
- Log errors for debugging

### 3. Rate Limiting

- Respect rate limits (120 req/min for authenticated)
- Implement exponential backoff
- Cache responses when appropriate

### 4. Security

- Always use HTTPS
- Validate webhook signatures
- Encrypt sensitive data at rest

### 5. Testing

- Use staging environment for testing
- Test error scenarios
- Implement integration tests

---

## Support

### Contact

- **Primary Contact**: Mamun - mamun@lifeplusbd.com / +880 1913705269
- **Secondary Contact**: Sagor - sagor@lifeplusbd.com / +880 1681408185
- **Documentation**: https://developer.lifeplusbd.com
- **Website**: https://lifeplusbd.com
- **Legacy Backend**: https://github.com/LifeplusBangladesh/life-plus-laravel

### Resources

- [OpenAPI Specification](../openapi.yaml)
- [Architecture Guide](../ARCHITECTURE_v3.md)
- [API Reference](https://api.lifeplus.bd/docs)

---

**Version**: 2.0.0 | **Last Updated**: 2024-12-25
