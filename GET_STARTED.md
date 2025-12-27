# Get Started with LifePlus Go SDK

## Installation

```bash
go get github.com/LifeplusBangladesh/lifeplus-go-sdk
```

## Basic Usage

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
    ctx := context.Background()

    // Partner API (server-to-server)
    client.SetPartnerCredentials("partner_123", "lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    
    // Login
    session, err := client.Login("01712345678", "password")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Logged in as: %s\n", lifeplus.DerefString(session.Data.User.Name))
    
    // Search products
    req := client.Products().ListProducts(ctx)
    req = req.SearchKey("paracetamol")
    req = req.PerPage(10)
    
    products, _, err := req.Execute()
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Found %d products\n", len(products))
    for _, product := range products {
        name := lifeplus.DerefString(product.Name)
        price := lifeplus.Float32ToFloat64(product.Price)
        fmt.Printf("- %s: BDT %.2f\n", name, price)
    }
}
```

## Run the Demo

```bash
cd C:\_DEV\GO\LcstCore\lifeplus-go-sdk\examples
go run demo.go
```

## Documentation

- **README.md** - Complete documentation
- **QUICKSTART.md** - 5-minute quick start
- **docs/** - API reference

## Support

- **Mamun**: mamun@lifeplusbd.com / +880 1913705269
- **Sagor**: sagor@lifeplusbd.com / +880 1681408185
