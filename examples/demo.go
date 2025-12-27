package main

import (
	"context"
	"fmt"
	"log"

	lifeplus "github.com/LifeplusBangladesh/lifeplus-go-sdk"
)

func main() {
	fmt.Println("=== LifePlus Go SDK Demo ===\n")

	// Create client
	client := lifeplus.NewLifePlusClient("https://api.lifeplusbd.com/api/v2")
	ctx := context.Background()

	// Example 1: List Products
	fmt.Println("1. Listing products...")
	productsReq := client.Products().ListProducts(ctx)
	productsReq = productsReq.Page(1)
	productsReq = productsReq.PerPage(5)

	products, _, err := productsReq.Execute()
	if err != nil {
		log.Printf("Error listing products: %v\n", err)
	} else {
		fmt.Printf("✓ Found %d products:\n", len(products))
		for i, product := range products {
			name := lifeplus.DerefString(product.Name)
			price := lifeplus.Float32ToFloat64(product.Price)
			fmt.Printf("  %d. %s - BDT %.2f\n", i+1, name, price)
		}
	}
	fmt.Println()

	// Example 2: Search Products
	fmt.Println("2. Searching for products...")
	searchReq := client.Products().ListProducts(ctx)
	searchReq = searchReq.SearchKey("paracetamol")
	searchReq = searchReq.PerPage(3)

	searchResults, _, err := searchReq.Execute()
	if err != nil {
		log.Printf("Error searching: %v\n", err)
	} else {
		fmt.Printf("✓ Search found %d results:\n", len(searchResults))
		for i, product := range searchResults {
			name := lifeplus.DerefString(product.Name)
			price := lifeplus.Float32ToFloat64(product.Price)
			fmt.Printf("  %d. %s - BDT %.2f\n", i+1, name, price)
		}
	}
	fmt.Println()

	// Example 3: Get Categories
	fmt.Println("3. Getting categories...")
	catReq := client.Products().GetLifestyleCategories(ctx)
	categories, _, err := catReq.Execute()
	if err != nil {
		log.Printf("Error getting categories: %v\n", err)
	} else {
		fmt.Printf("✓ Found %d categories\n", len(categories))
		for i, cat := range categories {
			if i >= 5 {
				break
			}
			fmt.Printf("  %d. %s\n", i+1, lifeplus.DerefString(cat.Name))
		}
	}
	fmt.Println()

	// Example 4: List Doctors
	fmt.Println("4. Listing doctors...")
	doctorsReq := client.Doctors().ListDoctors(ctx)
	doctorsReq = doctorsReq.Page(1)
	doctorsReq = doctorsReq.PerPage(3)

	doctors, _, err := doctorsReq.Execute()
	if err != nil {
		log.Printf("Error listing doctors: %v\n", err)
	} else {
		fmt.Printf("✓ Found %d doctors:\n", len(doctors))
		for i, doctor := range doctors {
			name := lifeplus.DerefString(doctor.Name)
			specialty := lifeplus.DerefString(doctor.SpecialtyName)
			fee := lifeplus.Float32ToFloat64(doctor.ConsultationFee)
			fmt.Printf("  %d. Dr. %s - %s (BDT %.2f)\n", i+1, name, specialty, fee)
		}
	}
	fmt.Println()

	// Example 5: Get Specialties
	fmt.Println("5. Getting specialties...")
	specReq := client.Lookup().GetSpecialties(ctx)
	specialties, _, err := specReq.Execute()
	if err != nil {
		log.Printf("Error getting specialties: %v\n", err)
	} else {
		fmt.Printf("✓ Found %d specialties\n", len(specialties))
		for i, spec := range specialties {
			if i >= 5 {
				break
			}
			fmt.Printf("  %d. %s\n", i+1, lifeplus.DerefString(spec.Name))
		}
	}
	fmt.Println()

	fmt.Println("✓ Demo completed!")
	fmt.Println("\nNote: Login with real credentials to test authenticated endpoints.")
	fmt.Println("Contact: mamun@lifeplusbd.com / +880 1913705269")
}
