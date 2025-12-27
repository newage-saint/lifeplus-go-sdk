# LifePlus Go SDK - Quick Start Guide

Get started with the LifePlus Healthcare Platform API in 5 minutes.

## Step 1: Install

```bash
go get github.com/LifeplusBangladesh/lifeplus-go-sdk
```

## Step 2: Initialize Client

```go
package main

import (
    lifeplus "github.com/LifeplusBangladesh/lifeplus-go-sdk"
)

func main() {
    // Production
    client := lifeplus.NewLifePlusClient("https://api.lifeplusbd.com/api/v2")
    
    // Staging
    // client := lifeplus.NewLifePlusClient("https://api-staging.lifeplusbd.com/api/v2")
    
    // Development
    // client := lifeplus.NewLifePlusClient("http://localhost:8000/api/v2")
}
```

## Step 3: Authenticate

```go
// Login
session, err := client.Login("01712345678", "password123")
if err != nil {
    log.Fatal(err)
}

// Partner API (server-to-server)
// Use this when integrating as a B2B partner with X-API-Key + X-Partner-ID
client.SetPartnerCredentials("partner_123", "lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

// Token is automatically set, ready to make authenticated requests!
fmt.Printf("Logged in as: %s\n", *session.Data.User.Name)
```

## Step 4: Make API Calls

### Search Products
```go
ctx := context.Background()

req := client.Products().ListProducts(ctx)
req = req.Search("paracetamol")
req = req.Page(1)
req = req.PerPage(10)

products, _, err := req.Execute()
if err != nil {
    log.Fatal(err)
}

for _, p := range products {
    fmt.Printf("%s - BDT %.2f\n", *p.Name, *p.Price)
}
```

### Add to Cart
```go
req := client.Cart().AddToCart(ctx)
req = req.AddToCartRequest(lifeplus.AddToCartRequest{
    ProductId: products[0].Id,
    Quantity:  lifeplus.PtrInt32(2),
})

cart, _, err := req.Execute()
fmt.Printf("Cart total: BDT %.2f\n", *cart.Total)
```

### Place Order
```go
req := client.Orders().PlaceProductOrder(ctx)
req = req.PlaceProductOrderRequest(lifeplus.PlaceProductOrderRequest{
    AddressId:     lifeplus.PtrInt32(1),
    PaymentMethod: lifeplus.PtrString("cash"),
    UseCart:       lifeplus.PtrBool(true),
})

order, _, err := req.Execute()
fmt.Printf("Order #%d placed successfully!\n", *order.Id)
```

## Common Patterns

### Using Helpers
```go
// Create pointers easily
quantity := lifeplus.PtrInt32(5)
name := lifeplus.PtrString("John Doe")
inStock := lifeplus.PtrBool(true)

// Safely dereference
value := lifeplus.DerefString(name)        // "" if nil
count := lifeplus.DerefInt32(quantity)     // 0 if nil
flag := lifeplus.DerefBool(inStock)        // false if nil
```

### Error Handling
```go
result, httpResp, err := req.Execute()
if err != nil {
    if httpResp != nil {
        fmt.Printf("HTTP %d: %v\n", httpResp.StatusCode, err)
    } else {
        fmt.Printf("Request failed: %v\n", err)
    }
    return
}
```

### Context with Timeout
```go
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()

req := client.Products().ListProducts(ctx)
products, _, err := req.Execute()
```

## Complete Example

```go
package main

import (
    "context"
    "fmt"
    "log"
    
    lifeplus "github.com/LifeplusBangladesh/lifeplus-go-sdk"
)

func main() {
    // 1. Create client
    client := lifeplus.NewLifePlusClient("https://api.lifeplusbd.com/api/v2")
    
    // 2. Login
    session, err := client.Login("01712345678", "password123")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Logged in as: %s\n", *session.Data.User.Name)
    
    // 3. Search products
    ctx := context.Background()
    req := client.Products().ListProducts(ctx)
    req = req.Search("paracetamol").InStock(true).PerPage(5)
    
    products, _, err := req.Execute()
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("\nFound %d products:\n", len(products))
    for i, p := range products {
        fmt.Printf("%d. %s - BDT %.2f\n", 
            i+1, 
            lifeplus.DerefString(p.Name), 
            lifeplus.DerefFloat64(p.Price))
    }
    
    // 4. Add to cart
    if len(products) > 0 {
        addReq := client.Cart().AddToCart(ctx)
        addReq = addReq.AddToCartRequest(lifeplus.AddToCartRequest{
            ProductId: products[0].Id,
            Quantity:  lifeplus.PtrInt32(2),
        })
        
        cart, _, err := addReq.Execute()
        if err != nil {
            log.Fatal(err)
        }
        
        fmt.Printf("\n✓ Added to cart! Total: BDT %.2f\n", 
            lifeplus.DerefFloat64(cart.Total))
    }
    
    // 5. Logout
    if err := client.Logout(); err != nil {
        log.Fatal(err)
    }
    fmt.Println("✓ Logged out successfully")
}
```

## Next Steps

- 📖 Read the [Full Documentation](README.md)
- 💻 Check out [Examples](examples/)
- 🏥 Explore [Partner Integration Guide](https://developer.lifeplusbd.com/partners)
- 📞 Contact Support: mamun@lifeplusbd.com / +880 1913705269

## Support

Need help? Contact us:
- **Email**: mamun@lifeplusbd.com
- **Phone**: +880 1913705269 (Mamun) / +880 1681408185 (Sagor)
- **Docs**: https://developer.lifeplusbd.com
