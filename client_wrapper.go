package lifeplusapi

import (
	"context"
	"fmt"
)

// LifePlusClient is a high-level wrapper for easy partner integration
type LifePlusClient struct {
	apiClient *APIClient
	config    *Configuration
	ctx       context.Context
	token     string
}

// NewLifePlusClient creates a new LifePlus client for partners
func NewLifePlusClient(baseURL string) *LifePlusClient {
	config := NewConfiguration()
	config.Servers = ServerConfigurations{
		{
			URL:         baseURL,
			Description: "Custom",
		},
	}
	config.Host = ""
	config.Scheme = ""
	
	return &LifePlusClient{
		apiClient: NewAPIClient(config),
		config:    config,
		ctx:       context.Background(),
	}
}

// NewLifePlusClientWithConfig creates a client with custom configuration
func NewLifePlusClientWithConfig(config *Configuration) *LifePlusClient {
	return &LifePlusClient{
		apiClient: NewAPIClient(config),
		config:    config,
		ctx:       context.Background(),
	}
}

// SetAccessToken sets the JWT bearer token for authenticated requests
func (c *LifePlusClient) SetAccessToken(token string) {
	c.token = token
	c.ctx = context.WithValue(context.Background(), ContextAccessToken, token)
}

// SetPartnerCredentials sets Partner API authentication headers.
// This is for server-to-server partner integrations.
func (c *LifePlusClient) SetPartnerCredentials(partnerId, apiKey string) {
	c.config.AddDefaultHeader("X-Partner-ID", partnerId)
	c.config.AddDefaultHeader("X-API-Key", apiKey)
}

// GetAccessToken returns the current access token
func (c *LifePlusClient) GetAccessToken() string {
	return c.token
}

// WithContext returns a new client with the specified context
func (c *LifePlusClient) WithContext(ctx context.Context) *LifePlusClient {
	newClient := *c
	newClient.ctx = ctx
	return &newClient
}

// Login authenticates and automatically sets the token
func (c *LifePlusClient) Login(mobile, password string) (*Session, error) {
	req := c.apiClient.AuthAPI.CreateSession(c.ctx)
	req = req.Credentials(Credentials{
		Mobile:   mobile,
		Password: password,
	})
	
	resp, httpResp, err := req.Execute()
	if err != nil {
		return nil, fmt.Errorf("login failed: %w", err)
	}
	defer httpResp.Body.Close()
	
	if resp != nil && resp.Token != "" {
		c.SetAccessToken(resp.Token)
	}
	
	return resp, nil
}

// Register creates a new user account and automatically sets the token
func (c *LifePlusClient) Register(user UserRegistration) (*Session, error) {
	req := c.apiClient.AuthAPI.RegisterUser(c.ctx)
	req = req.UserRegistration(user)
	
	resp, httpResp, err := req.Execute()
	if err != nil {
		return nil, fmt.Errorf("registration failed: %w", err)
	}
	defer httpResp.Body.Close()
	
	if resp != nil && resp.Token != "" {
		c.SetAccessToken(resp.Token)
	}
	
	return resp, nil
}

// GetProfile retrieves the authenticated user's profile
func (c *LifePlusClient) GetProfile() (*User, error) {
	req := c.apiClient.AuthAPI.GetProfile(c.ctx)
	resp, httpResp, err := req.Execute()
	if err != nil {
		return nil, fmt.Errorf("failed to get profile: %w", err)
	}
	defer httpResp.Body.Close()
	
	return resp, nil
}

// Logout invalidates the current session
func (c *LifePlusClient) Logout() error {
	req := c.apiClient.AuthAPI.DeleteSession(c.ctx)
	httpResp, err := req.Execute()
	if err != nil {
		return fmt.Errorf("logout failed: %w", err)
	}
	defer httpResp.Body.Close()
	
	c.token = ""
	c.ctx = context.Background()
	
	return nil
}

// GetAPIClient returns the underlying API client for advanced usage
func (c *LifePlusClient) GetAPIClient() *APIClient {
	return c.apiClient
}

// Auth returns the Auth API for authentication operations
func (c *LifePlusClient) Auth() AuthAPI {
	return c.apiClient.AuthAPI
}

// Products returns the Products API for pharmacy/e-commerce operations
func (c *LifePlusClient) Products() ProductsAPI {
	return c.apiClient.ProductsAPI
}

// Orders returns the Orders API for order management
func (c *LifePlusClient) Orders() OrdersAPI {
	return c.apiClient.OrdersAPI
}

// Cart returns the Cart API for shopping cart operations
func (c *LifePlusClient) Cart() CartAPI {
	return c.apiClient.CartAPI
}

// Doctors returns the Doctors API for doctor search and slots
func (c *LifePlusClient) Doctors() DoctorsAPI {
	return c.apiClient.DoctorsAPI
}

// Appointments returns the Appointments API for booking appointments
func (c *LifePlusClient) Appointments() AppointmentsAPI {
	return c.apiClient.AppointmentsAPI
}

// Telemedicine returns the Telemedicine API for video consultations
func (c *LifePlusClient) Telemedicine() TelemedicineAPI {
	return c.apiClient.TelemedicineAPI
}

// Packages returns the Packages API for health packages
func (c *LifePlusClient) Packages() PackagesAPI {
	return c.apiClient.PackagesAPI
}

// Ambulance returns the Ambulance API for ambulance services
func (c *LifePlusClient) Ambulance() AmbulanceAPI {
	return c.apiClient.AmbulanceAPI
}

// HomeCare returns the Home Care API for home care services
func (c *LifePlusClient) HomeCare() HomeCareAPI {
	return c.apiClient.HomeCareAPI
}

// HomeSample returns the Home Sample API for home sample collection
func (c *LifePlusClient) HomeSample() HomeSampleAPI {
	return c.apiClient.HomeSampleAPI
}

// Addresses returns the Addresses API for address management
func (c *LifePlusClient) Addresses() AddressesAPI {
	return c.apiClient.AddressesAPI
}

// Partners returns the Partners API for partner information
func (c *LifePlusClient) Partners() PartnersAPI {
	return c.apiClient.PartnersAPI
}

// Hospitals returns the Hospitals API for hospital information
func (c *LifePlusClient) Hospitals() HospitalsAPI {
	return c.apiClient.HospitalsAPI
}

// Lookup returns the Lookup API for reference data
func (c *LifePlusClient) Lookup() LookupAPI {
	return c.apiClient.LookupAPI
}

// Wellbeing returns the Wellbeing API for wellbeing services
func (c *LifePlusClient) Wellbeing() WellbeingAPI {
	return c.apiClient.WellbeingAPI
}

// Ping checks if the API is accessible
func (c *LifePlusClient) Ping() error {
	req := c.apiClient.LookupAPI.GetCountries(c.ctx)
	_, httpResp, err := req.Execute()
	if err != nil {
		return fmt.Errorf("failed to ping API: %w", err)
	}
	defer httpResp.Body.Close()
	
	return nil
}
