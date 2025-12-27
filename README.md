# LifePlus Healthcare Platform - Go SDK

[![Go Reference](https://pkg.go.dev/badge/github.com/LifeplusBangladesh/lifeplus-go-sdk.svg)](https://pkg.go.dev/github.com/LifeplusBangladesh/lifeplus-go-sdk)
[![Go Report Card](https://goreportcard.com/badge/github.com/LifeplusBangladesh/lifeplus-go-sdk)](https://goreportcard.com/report/github.com/LifeplusBangladesh/lifeplus-go-sdk)

Official Go SDK for integrating with the LifePlus Healthcare Platform API. Built for partners and third-party developers.

## Features

✅ **Complete API Coverage** - All endpoints supported  
✅ **Type-Safe** - Full type definitions for all requests/responses  
✅ **Easy Authentication** - JWT token management built-in  
✅ **Context Support** - Proper context handling for timeouts/cancellation  
✅ **Error Handling** - Comprehensive error types and messages  
✅ **Production Ready** - Battle-tested in production environments  

## Installation

```bash
go get github.com/LifeplusBangladesh/lifeplus-go-sdk
```

## Quick Start

```go
package main

import (
    "context"
    "fmt"
    "log"

    lifeplus "github.com/LifeplusBangladesh/lifeplus-go-sdk"
)

func main() {
    // Create client
    client := lifeplus.NewLifePlusClient("https://api.lifeplusbd.com/api/v2")

    // Login
    session, err := client.Login("01712345678", "password")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Logged in as: %s\n", *session.Data.User.Name)

    // Search products
    ctx := context.Background()
    req := client.Products().ListProducts(ctx)
    req = req.Search("paracetamol")
    
    products, _, err := req.Execute()
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Found %d products\n", len(products))
}
```

## API Services

The SDK provides access to all LifePlus API services:

### Authentication
```go
// Login
session, err := client.Login("01712345678", "password")

// Partner API (server-to-server)
// Use this when integrating as a B2B partner with X-API-Key + X-Partner-ID
client.SetPartnerCredentials("partner_123", "lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

// Register
user := lifeplus.UserRegister{
    Name:     lifeplus.PtrString("John Doe"),
    Mobile:   lifeplus.PtrString("01712345678"),
    Email:    lifeplus.PtrString("john@example.com"),
    Password: lifeplus.PtrString("password123"),
}
session, err := client.Register(user)

// Get Profile
profile, err := client.GetProfile()

// Logout
err := client.Logout()
```

### E-Pharmacy (Products)
```go
// List products with filters
req := client.Products().ListProducts(ctx)
req = req.Search("paracetamol")
req = req.InStock(true)
req = req.Page(1)
req = req.PerPage(20)
products, _, err := req.Execute()

// Get product details
req := client.Products().GetProductDetails(ctx, productID)
product, _, err := req.Execute()

// Get categories
req := client.Products().GetLifestyleCategories(ctx)
categories, _, err := req.Execute()
```

### Shopping Cart
```go
// Add to cart
req := client.Cart().AddToCart(ctx)
req = req.AddToCartRequest(lifeplus.AddToCartRequest{
    ProductId: lifeplus.PtrInt32(123),
    Quantity:  lifeplus.PtrInt32(2),
})
cart, _, err := req.Execute()

// Get cart
req := client.Cart().GetCart(ctx)
cart, _, err := req.Execute()

// Update quantity
req := client.Cart().UpdateCartItem(ctx, itemID)
req = req.CartItemUpdate(lifeplus.CartItemUpdate{
    Quantity: lifeplus.PtrInt32(3),
})
cart, _, err := req.Execute()

// Remove from cart
req := client.Cart().RemoveFromCart(ctx, itemID)
cart, _, err := req.Execute()

// Clear cart
req := client.Cart().ClearCart(ctx)
_, err := req.Execute()
```

### Orders
```go
// Place product order
req := client.Orders().PlaceProductOrder(ctx)
req = req.PlaceProductOrderRequest(lifeplus.PlaceProductOrderRequest{
    AddressId:     lifeplus.PtrInt32(1),
    PaymentMethod: lifeplus.PtrString("cash"),
    UseCart:       lifeplus.PtrBool(true),
})
order, _, err := req.Execute()

// List orders
req := client.Orders().ListOrders(ctx)
req = req.Status("pending")
req = req.OrderType("product")
ordersResp, _, err := req.Execute()

// Get order details
req := client.Orders().GetOrder(ctx, orderID)
order, _, err := req.Execute()

// Update order status
req := client.Orders().UpdateOrderStatus(ctx, orderID)
req = req.UpdateOrderStatusRequest(lifeplus.UpdateOrderStatusRequest{
    Status: lifeplus.PtrString("cancelled"),
    Notes:  lifeplus.PtrString("Changed my mind"),
})
order, _, err := req.Execute()
```

### Doctors
```go
// Search doctors
req := client.Doctors().ListDoctors(ctx)
req = req.Specialty("Cardiology")
req = req.Page(1)
doctors, _, err := req.Execute()

// Get doctor details
req := client.Doctors().GetDoctorBySlug(ctx, "dr-john-doe")
doctor, _, err := req.Execute()

// Get available slots
req := client.Doctors().GetDoctorSlots(ctx)
req = req.DoctorSlotRequest(lifeplus.DoctorSlotRequest{
    DoctorId: lifeplus.PtrInt32(123),
    Date:     lifeplus.PtrString("2024-12-26"),
})
slots, _, err := req.Execute()
```

### Appointments
```go
// Book appointment
req := client.Appointments().BookAppointment(ctx)
req = req.AppointmentRequest(lifeplus.AppointmentRequest{
    DoctorId:        lifeplus.PtrInt32(123),
    AppointmentDate: lifeplus.PtrString("2024-12-26"),
    TimeSlot:        lifeplus.PtrString("10:00-10:30"),
})
appointment, _, err := req.Execute()

// Get appointments
req := client.Appointments().GetAppointments(ctx)
appointments, _, err := req.Execute()
```

### Telemedicine
```go
// Request video call
req := client.Telemedicine().RequestVideoCall(ctx)
req = req.DoctorId(123)
videoCall, _, err := req.Execute()

// Get video call history
req := client.Telemedicine().GetVideoCallHistory(ctx)
history, _, err := req.Execute()
```

### Health Packages
```go
// List packages
req := client.Packages().ListPackages(ctx)
packages, _, err := req.Execute()

// Book package
req := client.Packages().BookPackage(ctx)
req = req.BookPackageRequest(lifeplus.BookPackageRequest{
    PackageId: lifeplus.PtrInt32(1),
})
booking, _, err := req.Execute()
```

### Ambulance
```go
// Get ambulance areas
req := client.Ambulance().GetAmbulanceAreas(ctx)
areas, _, err := req.Execute()

// Get price
req := client.Ambulance().GetAmbulancePrice(ctx)
req = req.FromArea("Gulshan")
req = req.ToArea("Banani")
price, _, err := req.Execute()

// Place order
req := client.Ambulance().PlaceAmbulanceOrder(ctx)
req = req.PlaceAmbulanceOrderRequest(lifeplus.PlaceAmbulanceOrderRequest{
    FromArea: lifeplus.PtrString("Gulshan"),
    ToArea:   lifeplus.PtrString("Banani"),
    Type:     lifeplus.PtrString("AC"),
})
order, _, err := req.Execute()
```

### Addresses
```go
// Create address
req := client.Addresses().CreateAddress(ctx)
req = req.Address(lifeplus.Address{
    Label:   lifeplus.PtrString("Home"),
    Address: lifeplus.PtrString("123 Main St"),
    Area:    lifeplus.PtrString("Gulshan"),
    City:    lifeplus.PtrString("Dhaka"),
    Phone:   lifeplus.PtrString("01712345678"),
})
address, _, err := req.Execute()

// List addresses
req := client.Addresses().ListAddresses(ctx)
addresses, _, err := req.Execute()

// Update address
req := client.Addresses().UpdateAddress(ctx, addressID)
req = req.Address(updatedAddress)
address, _, err := req.Execute()

// Delete address
req := client.Addresses().DeleteAddress(ctx, addressID)
_, err := req.Execute()
```

### Lookup Data
```go
// Get countries
req := client.Lookup().GetCountries(ctx)
countries, _, err := req.Execute()

// Get specialties
req := client.Lookup().GetSpecialties(ctx)
specialties, _, err := req.Execute()

// Get manufacturers
req := client.Lookup().GetManufacturers(ctx)
manufacturers, _, err := req.Execute()
```

## Helper Functions

The SDK includes utility functions for working with pointer fields:

```go
// Create pointers
stringPtr := lifeplus.PtrString("value")
intPtr := lifeplus.PtrInt32(123)
boolPtr := lifeplus.PtrBool(true)
floatPtr := lifeplus.PtrFloat64(99.99)

// Dereference with defaults
str := lifeplus.DerefString(stringPtr)      // Returns "" if nil
num := lifeplus.DerefInt32(intPtr)          // Returns 0 if nil
flag := lifeplus.DerefBool(boolPtr)         // Returns false if nil
price := lifeplus.DerefFloat64(floatPtr)    // Returns 0.0 if nil
```

## Configuration

### Custom Configuration
```go
config := lifeplus.NewConfiguration()
config.Servers[0].URL = "https://api.lifeplusbd.com/api/v2"
config.Debug = true

client := lifeplus.NewLifePlusClientWithConfig(config)
```

### Context & Timeouts
```go
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()

client = client.WithContext(ctx)
```

### Manual Token Management
```go
// Set token manually
client.SetAccessToken("your-jwt-token")

// Get current token
token := client.GetAccessToken()
```

## Examples

See the [examples](examples/) directory for complete working examples:

- [`basic_usage.go`](examples/basic_usage.go) - Basic SDK usage
- [`e_pharmacy.go`](examples/e_pharmacy.go) - Complete e-pharmacy flow
- [`telemedicine.go`](examples/telemedicine.go) - Video consultation flow

Run examples:
```bash
cd examples
go run basic_usage.go
```

## Error Handling

```go
products, httpResp, err := req.Execute()
if err != nil {
    // Check HTTP status
    if httpResp != nil {
        fmt.Printf("HTTP Status: %d\n", httpResp.StatusCode)
    }
    
    // Handle error
    log.Fatalf("API Error: %v", err)
}
```

## Environment URLs

| Environment | URL |
|-------------|-----|
| **Production** | `https://api.lifeplusbd.com/api/v2` |
| **Staging** | `https://api-staging.lifeplusbd.com/api/v2` |
| **Development** | `http://localhost:8000/api/v2` |

## Support

- **Primary Contact**: Mamun - mamun@lifeplusbd.com / +880 1913705269
- **Secondary Contact**: Sagor - sagor@lifeplusbd.com / +880 1681408185
- **Documentation**: https://developer.lifeplusbd.com
- **API Reference**: https://api.lifeplusbd.com/docs
- **Issues**: https://github.com/LifeplusBangladesh/lifeplus-go-sdk/issues

## Documentation

- [API Documentation](https://developer.lifeplusbd.com/api)
- [Partner Integration Guide](https://developer.lifeplusbd.com/partners)
- [Architecture Guide](https://developer.lifeplusbd.com/architecture)

## License

Proprietary - LifePlus Bangladesh Ltd.

## Version

**SDK Version**: 3.1.0  
**API Version**: 3.1.0  
**Last Updated**: 2024-12-25
