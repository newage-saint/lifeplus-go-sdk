# LifePlus API Documentation - Setup Guide

## 🎉 Quick Setup Checklist

### ✅ Pre-Deployment Checklist

- [x] Enhanced Swagger UI HTML created with custom branding
- [x] Custom CSS with professional styling and responsive design
- [x] Custom JavaScript with SDK examples and interactive features
- [x] OpenAPI spec copied to docs folder
- [x] GitHub Actions workflow updated for automatic deployment
- [x] Comprehensive README documentation created
- [x] All files validated and tested

## 🚀 Deployment Instructions

### 1. Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save the settings

### 2. Trigger Deployment

The documentation will be automatically deployed when you:

1. **Commit and push changes** to the `main` branch:
   ```bash
   git add LifePlusAPI/docs/
   git add .github/workflows/publish-sdks.yml
   git commit -m "Add comprehensive Swagger UI documentation site"
   git push origin main
   ```

2. The GitHub Actions workflow will:
   - Generate SDKs from the OpenAPI spec
   - Publish SDKs to individual repositories
   - Deploy documentation to GitHub Pages

3. Your documentation will be live at:
   - **URL**: `https://<username>.github.io/<repository-name>/`
   - **Example**: `https://newage-saint.github.io/LcstCore/`

### 3. Verify Deployment

After the GitHub Action completes:

1. Go to **Actions** tab in your repository
2. Check the latest "Publish SDKs" workflow run
3. Ensure all steps completed successfully
4. Visit your GitHub Pages URL
5. The documentation should load with:
   - Custom header with LifePlus branding
   - SDK quick links bar
   - Interactive Swagger UI
   - Custom footer with resources

## 📁 File Structure

```
LifePlusAPI/docs/
├── swagger-ui/
│   ├── index.html          # Main documentation page
│   ├── styles.css          # Custom styling
│   └── custom.js           # Interactive features
├── openapi.yaml            # API specification
├── README.md               # Documentation homepage
├── SETUP_GUIDE.md          # This file
├── API_V2_REFERENCE.md     # Complete API reference
├── PARTNER_INTEGRATION_GUIDE.md
└── LEGACY_TO_V2_COMPLETE_MAPPING.md
```

## 🎨 Features Implemented

### 1. Custom Header
- LifePlus branding with logo and colors
- Version badge (v2.0.0)
- Quick links to GitHub and documentation
- Sticky positioning for easy navigation

### 2. SDK Quick Links Bar
- Direct links to all three SDKs (Go, PHP, TypeScript)
- Environment selector (Production/Staging/Local)
- Sticky positioning below header
- Responsive design for mobile

### 3. Info Banner
- Visual overview of services:
  - Healthcare Services
  - E-Commerce
  - Partner Integration
- Hover animations
- Icon-based design

### 4. Interactive Swagger UI
- Full OpenAPI 3.0.3 specification
- Try-it-out functionality
- Authentication support
- Request/response examples
- Schema documentation
- Tag-based organization

### 5. SDK Examples Modal
- Multi-language code examples
- Tab-based interface (Go, PHP, TypeScript, cURL)
- Copy-to-clipboard functionality
- Syntax highlighting
- Direct links to SDK documentation

### 6. Enhanced Navigation
- Floating "Back to Top" button
- Smooth scrolling
- Filter/search functionality
- Quick navigation shortcuts

### 7. Custom Footer
- Resource links
- SDK documentation links
- Support contact information
- Legal links
- Responsive grid layout

### 8. Additional Features
- Performance monitoring (API call timing)
- Authentication helper (quick token setup)
- Notification system
- Local storage for environment preference
- Print-friendly styles
- Custom scrollbar styling

## 🔧 Customization Options

### Changing Colors/Branding

Edit `styles.css` and modify the CSS variables:

```css
:root {
  --primary-color: #00A67E;      /* Your primary brand color */
  --primary-dark: #008A68;        /* Darker shade */
  --primary-light: #E6F7F3;       /* Lighter shade */
  --secondary-color: #2C3E50;     /* Secondary color */
  /* ... more variables ... */
}
```

### Adding New SDK Examples

Edit `custom.js` and update the `generateSDKExamples` function to add support for new languages.

### Modifying Layout

Edit `index.html` to change the structure:
- Header content and links
- SDK links and icons
- Info banner items
- Footer sections

## 🧪 Local Testing

### Option 1: Python HTTP Server
```bash
cd C:\_DEV\GO\LcstCore\LifePlusAPI\docs
python -m http.server 8080
# Visit: http://localhost:8080/swagger-ui/
```

### Option 2: Node.js HTTP Server
```bash
cd C:\_DEV\GO\LcstCore\LifePlusAPI\docs
npx http-server -p 8080
# Visit: http://localhost:8080/swagger-ui/
```

### Option 3: PHP Built-in Server
```bash
cd C:\_DEV\GO\LcstCore\LifePlusAPI\docs
php -S localhost:8080
# Visit: http://localhost:8080/swagger-ui/
```

### Option 4: Open Directly in Browser
Simply open `index.html` in your browser:
```bash
start C:\_DEV\GO\LcstCore\LifePlusAPI\docs\swagger-ui\index.html
```

**Note**: Some browsers may block loading the OpenAPI spec due to CORS. Use a local server for full functionality.

## 🔍 Validation Results

All files have been validated:

✅ **HTML**: Contains expected content and proper structure  
✅ **CSS**: Valid CSS with custom styles (10.27 KB)  
✅ **JavaScript**: Valid JS with initialization code (19.66 KB)  
✅ **OpenAPI Spec**: Valid OpenAPI 3.0.3 specification (26.79 KB)  

## 📊 GitHub Actions Workflow

The updated workflow (`.github/workflows/publish-sdks.yml`) includes:

1. **SDK Generation**: Generates Go, PHP, and TypeScript SDKs
2. **SDK Publishing**: Publishes to individual repositories
3. **Pages Deployment**: Deploys documentation to GitHub Pages

**Workflow Permissions**:
```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

**Deployment Steps**:
```yaml
- name: Setup Pages
  uses: actions/configure-pages@v4

- name: Upload API Documentation
  uses: actions/upload-pages-artifact@v3
  with:
    path: 'LifePlusAPI/docs'

- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

## 🐛 Troubleshooting

### Documentation Not Loading
- Check GitHub Pages settings are enabled
- Verify workflow completed successfully
- Check for any CORS errors in browser console
- Ensure `openapi.yaml` is in the correct location

### SDK Examples Not Working
- Clear browser cache
- Check browser console for JavaScript errors
- Verify custom.js is loading correctly

### Styling Issues
- Check that styles.css is loading
- Verify CSS variables are defined correctly
- Test in different browsers

### Authentication Issues
- Ensure correct token format (Bearer token)
- Check token is not expired
- Verify environment URL matches token scope

## 📞 Support

If you encounter any issues:

1. Check the [README.md](./README.md) for detailed documentation
2. Review browser console for errors
3. Contact support: mamun@lifeplusbd.com

## 🎯 Next Steps

After deployment:

1. ✅ **Verify**: Visit your GitHub Pages URL
2. ✅ **Test**: Try the "Try it out" feature on endpoints
3. ✅ **Share**: Share the documentation URL with your team
4. ✅ **Monitor**: Check GitHub Actions for future deployments
5. ✅ **Update**: Keep the OpenAPI spec up to date

## 📝 Maintenance

### Updating Documentation

When you update the API:

1. Update `LifePlusAPI/openapi.yaml`
2. Copy to docs folder:
   ```bash
   cp LifePlusAPI/openapi.yaml LifePlusAPI/docs/openapi.yaml
   ```
3. Commit and push:
   ```bash
   git add LifePlusAPI/openapi.yaml LifePlusAPI/docs/openapi.yaml
   git commit -m "Update API specification"
   git push origin main
   ```
4. GitHub Actions will automatically redeploy

### Updating Styles/Features

1. Edit files in `LifePlusAPI/docs/swagger-ui/`
2. Test locally
3. Commit and push changes
4. Automatic deployment via GitHub Actions

## 🎊 Success!

Your comprehensive Swagger UI documentation site is now ready for deployment!

**What You Get**:
- 🎨 Professional, branded documentation site
- 📱 Responsive design for all devices
- 🔌 Interactive API testing
- 📚 Multi-language SDK examples
- 🚀 Automatic deployment via GitHub Actions
- 🔍 Searchable and filterable endpoints
- 📖 Comprehensive documentation

**Live URL** (after deployment):
`https://newage-saint.github.io/LcstCore/swagger-ui/`

---

**Setup Date**: December 27, 2025  
**Documentation Version**: 2.0.0  
**Status**: Ready for Deployment ✅
