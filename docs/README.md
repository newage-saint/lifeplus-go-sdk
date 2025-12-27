# LifePlus Healthcare Platform API Documentation

**Live Documentation:** https://newage-saint.github.io/LcstCore/

Welcome to the comprehensive API documentation for the LifePlus Healthcare Platform. This documentation provides interactive access to all API endpoints, complete with examples, request/response schemas, and SDK integration guides.

## 🌟 Features

### Interactive Swagger UI
- **Full API Reference**: Browse and test all available endpoints
- **Real-time Testing**: Try out API calls directly from the browser
- **Environment Switching**: Easily switch between Production, Staging, and Local environments
- **Request/Response Examples**: See detailed examples for every endpoint
- **Schema Documentation**: Comprehensive data model documentation

### SDK Integration Examples
- **Multi-Language Support**: Code examples for Go, PHP, TypeScript, and cURL
- **Copy-to-Clipboard**: One-click code copying for quick integration
- **Best Practices**: Follow recommended patterns for each SDK

### Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Syntax Highlighting**: Easy-to-read code examples
- **Quick Navigation**: Floating navigation button and smooth scrolling
- **Performance Monitoring**: Built-in API call timing display

## 📚 Available SDKs

### Go SDK
- **Repository**: [github.com/newage-saint/lifeplus-go-sdk](https://github.com/newage-saint/lifeplus-go-sdk)
- **Installation**: `go get github.com/newage-saint/lifeplus-go-sdk`
- **Version**: v2.0.0

### PHP SDK
- **Repository**: [github.com/newage-saint/lifeplus-php-sdk](https://github.com/newage-saint/lifeplus-php-sdk)
- **Installation**: `composer require newage-saint/lifeplus-php-sdk`
- **Version**: v2.0.0

### TypeScript SDK
- **Repository**: [github.com/newage-saint/lifeplus-ts-sdk](https://github.com/newage-saint/lifeplus-ts-sdk)
- **Installation**: `npm install lifeplus-ts-sdk`
- **Version**: v2.0.0

## 🚀 Quick Start

### Using the Interactive Documentation

1. **Browse Endpoints**: Navigate through the API sections using the left sidebar
2. **Select Environment**: Choose your target environment from the dropdown (Production/Staging/Local)
3. **Authenticate**: Click the "Authorize" button and enter your Bearer token or API key
4. **Try It Out**: Click "Try it out" on any endpoint to test it live
5. **View SDK Examples**: Click the "📚 SDK Examples" button on any endpoint to see code samples

### Authentication

The API supports multiple authentication methods:

#### Bearer Token (User Authentication)
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Partner API Key (Server-to-Server)
```bash
Authorization: Bearer lpak_live_xxxxxxxxxxxxx
X-Partner-ID: your-partner-id
```

#### API Key Header (Alternative)
```bash
X-API-Key: lpk_live_xxxxxxxxxxxxx
```

## 🏥 API Services Overview

### Healthcare Services
- **Telemedicine**: Video consultations with licensed doctors
- **Appointments**: In-person doctor appointments at hospitals
- **Diagnostics**: Lab tests and diagnostic services
- **Home Sample Collection**: At-home diagnostic sample collection
- **Ambulance**: Emergency ambulance booking
- **Home Care**: Nursing and home care services

### E-Commerce
- **Pharmacy**: Medicine ordering and delivery
- **Products**: Health supplements and medical devices
- **Cart Management**: Multi-vendor shopping cart
- **Order Processing**: Complete order lifecycle management

### Partner Integration
- **API Key Management**: Create and manage API keys
- **Revenue Sharing**: Track commissions and settlements
- **Analytics**: Detailed performance metrics
- **Webhooks**: Real-time event notifications

### Insurance & Packages
- **Health Packages**: Subscription-based healthcare bundles
- **Health Cards**: Membership cards with benefits
- **Insurance Policies**: Policy browsing and purchase
- **Claims Management**: Insurance claim processing

## 🛠️ Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server for testing

### Running Locally

#### Option 1: Using Python
```bash
cd LifePlusAPI/docs
python -m http.server 8080
# Open http://localhost:8080/swagger-ui/
```

#### Option 2: Using Node.js
```bash
cd LifePlusAPI/docs
npx http-server -p 8080
# Open http://localhost:8080/swagger-ui/
```

#### Option 3: Using PHP
```bash
cd LifePlusAPI/docs
php -S localhost:8080
# Open http://localhost:8080/swagger-ui/
```

### Testing Against Different Environments

Use the environment selector in the header to switch between:
- **Production**: `https://api.lifeplusbd.com/api/v2`
- **Staging**: `https://api-staging.lifeplusbd.com/api/v2`
- **Local**: `http://localhost:8000/api/v2`

## 📖 Additional Documentation

### Complete API Reference
For detailed documentation including business logic, data flows, and integration patterns, see:
- [API V2 Complete Reference](./API_V2_REFERENCE.md)
- [Partner Integration Guide](./PARTNER_INTEGRATION_GUIDE.md)
- [Legacy to V2 Migration](./LEGACY_TO_V2_COMPLETE_MAPPING.md)

### OpenAPI Specification
- **File**: [openapi.yaml](./openapi.yaml)
- **Version**: 3.0.3
- **Format**: YAML

## 🔧 Customization

### Modifying the Documentation

The documentation site consists of three main files:

1. **index.html**: Main HTML structure and layout
2. **styles.css**: Custom styling and theming
3. **custom.js**: Interactive features and SDK examples

To customize:
```bash
cd LifePlusAPI/docs/swagger-ui/
# Edit files as needed
# Changes will be reflected immediately
```

### Adding New SDK Examples

To add examples for a new language, edit `custom.js` and update the `generateSDKExamples` function:

```javascript
// Add new language tab
<button class="sdk-tab" data-lang="python">Python</button>

// Add new example
<div class="sdk-example" data-lang="python">
  <button class="sdk-example-copy">📋 Copy</button>
  <pre><code>import lifeplus

client = lifeplus.Client(api_key="your-key")
response = client.products.list()
print(response)</code></pre>
</div>
```

## 🚢 Deployment

### Automatic Deployment (GitHub Actions)

The documentation is automatically deployed to GitHub Pages when SDKs are published. The workflow:

1. Generates SDKs from OpenAPI spec
2. Publishes SDKs to individual repositories
3. Deploys documentation to GitHub Pages

**Workflow File**: `.github/workflows/publish-sdks.yml`

### Manual Deployment

To manually deploy the documentation:

```bash
# Ensure OpenAPI spec is up to date
cp LifePlusAPI/openapi.yaml LifePlusAPI/docs/openapi.yaml

# Commit and push changes
git add LifePlusAPI/docs/
git commit -m "Update API documentation"
git push origin main

# GitHub Actions will automatically deploy
```

## 🔐 Security Considerations

### Authentication Best Practices

1. **Never expose API keys in client-side code**
2. **Use environment variables for sensitive data**
3. **Rotate API keys regularly**
4. **Use different keys for different environments**
5. **Monitor API key usage through the partner dashboard**

### CORS Configuration

The API supports CORS for browser-based applications. Ensure your domain is whitelisted by contacting support.

## 📊 Monitoring & Analytics

### Built-in Features

- **Request Duration Display**: See how long each API call takes
- **Console Logging**: Detailed request/response logging
- **Performance Metrics**: Track API response times

### Adding Custom Analytics

To integrate custom analytics (Google Analytics, Mixpanel, etc.), edit `custom.js`:

```javascript
function trackPageView() {
  // Add your analytics code here
  gtag('event', 'page_view', {
    page_path: window.location.pathname
  });
}
```

## 🐛 Troubleshooting

### Common Issues

#### Documentation Not Loading
- Check that `openapi.yaml` exists in the `docs` folder
- Verify the file path in `custom.js` matches your setup
- Check browser console for CORS errors

#### Authentication Failing
- Ensure token format is correct (Bearer token)
- Check token expiration
- Verify environment matches token scope

#### SDK Examples Not Showing
- Ensure JavaScript is enabled
- Clear browser cache
- Check browser console for errors

### Getting Help

- **Email**: mamun@lifeplusbd.com
- **Developer Portal**: https://developer.lifeplusbd.com
- **GitHub Issues**: Report issues in the respective SDK repositories

## 📝 Contributing

We welcome contributions to improve the documentation! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Documentation Standards

- Use clear, concise language
- Include code examples for all endpoints
- Test all examples before committing
- Follow the existing style and structure

## 📜 License

This API documentation is proprietary to LifePlus Healthcare Platform.

- **Terms of Service**: https://lifeplusbd.com/terms
- **Privacy Policy**: https://lifeplusbd.com/privacy

## 🆕 Changelog

### Version 2.0.0 (Current)
- Complete API redesign with RESTful principles
- Multi-language SDK support (Go, PHP, TypeScript)
- Interactive Swagger UI documentation
- Enhanced partner integration features
- Comprehensive error handling
- Real-time webhook support

### Version 1.x (Legacy)
- Initial API implementation
- See [Legacy Documentation](./legacy/) for details

## 🎯 Roadmap

### Upcoming Features
- GraphQL API support
- WebSocket real-time updates
- Additional SDK languages (Python, Java, Ruby)
- Enhanced analytics dashboard
- Mobile SDK (iOS, Android)

## 📞 Contact & Support

### Technical Support
- **Email**: mamun@lifeplusbd.com
- **Phone**: +880-XXX-XXXXXX (Business hours: 9 AM - 6 PM GMT+6)

### Sales & Partnerships
- **Website**: https://lifeplusbd.com
- **Developer Portal**: https://developer.lifeplusbd.com

### Social Media
- **GitHub**: https://github.com/newage-saint
- **LinkedIn**: [LifePlus Healthcare](https://linkedin.com/company/lifeplus)

---

**Last Updated**: December 27, 2025  
**Documentation Version**: 2.0.0  
**API Version**: v2.0.0

Made with ❤️ by the LifePlus Engineering Team
