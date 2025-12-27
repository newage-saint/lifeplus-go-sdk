// LifePlus API Documentation - Custom JavaScript

(function() {
  'use strict';

  // Configuration
  const DEFAULT_SERVER = 'https://api.lifeplusbd.com/api/v2';
  
  // Initialize Swagger UI
  function initializeSwaggerUI() {
    const envSelect = document.getElementById('env-select');
    const selectedServer = localStorage.getItem('lifeplus-api-server') || DEFAULT_SERVER;
    
    // Set selected environment
    if (envSelect) {
      envSelect.value = selectedServer;
    }

    // Initialize Swagger UI
    window.ui = SwaggerUIBundle({
      url: './openapi.yaml',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: 'StandaloneLayout',
      validatorUrl: null,
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
      syntaxHighlight: {
        activate: true,
        theme: 'agate'
      },
      defaultModelsExpandDepth: 3,
      defaultModelExpandDepth: 3,
      docExpansion: 'list',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      onComplete: function() {
        onSwaggerUIComplete(selectedServer);
      }
    });
  }

  // Called when Swagger UI is fully loaded
  function onSwaggerUIComplete(serverUrl) {
    console.log('LifePlus API Documentation loaded successfully');
    
    // Update server URL
    updateServerUrl(serverUrl);
    
    // Add custom enhancements
    addCodeExamples();
    addQuickNavigation();
    addAuthenticationHelper();
    addPerformanceMonitoring();
    
    // Track page view
    trackPageView();
  }

  // Update the server URL in Swagger UI
  function updateServerUrl(url) {
    if (window.ui && window.ui.specActions) {
      window.ui.specActions.updateUrl(url);
      
      // Also update the servers in the spec
      const state = window.ui.getState();
      if (state && state.spec && state.spec.json && state.spec.json.servers) {
        const servers = state.spec.json.servers;
        const serverIndex = servers.findIndex(s => s.url === url);
        if (serverIndex >= 0) {
          window.ui.specActions.setServer(url);
        }
      }
    }
  }

  // Environment selector handler
  function setupEnvironmentSelector() {
    const envSelect = document.getElementById('env-select');
    if (envSelect) {
      envSelect.addEventListener('change', function(e) {
        const selectedUrl = e.target.value;
        localStorage.setItem('lifeplus-api-server', selectedUrl);
        updateServerUrl(selectedUrl);
        showNotification(`Environment switched to: ${getEnvironmentName(selectedUrl)}`, 'success');
      });
    }
  }

  // Get environment name from URL
  function getEnvironmentName(url) {
    if (url.includes('localhost')) return 'Local Development';
    if (url.includes('staging')) return 'Staging';
    return 'Production';
  }

  // Add code examples for different SDKs
  function addCodeExamples() {
    // Wait for operations to be rendered
    setTimeout(() => {
      const operations = document.querySelectorAll('.opblock');
      operations.forEach(operation => {
        addSDKExamplesToOperation(operation);
      });
    }, 1000);
  }

  // Add SDK examples to a specific operation
  function addSDKExamplesToOperation(operation) {
    const pathElement = operation.querySelector('.opblock-summary-path');
    const methodElement = operation.querySelector('.opblock-summary-method');
    
    if (!pathElement || !methodElement) return;
    
    const path = pathElement.textContent.trim();
    const method = methodElement.textContent.trim().toUpperCase();
    
    // Add SDK example button
    const summarySection = operation.querySelector('.opblock-summary');
    if (summarySection && !summarySection.querySelector('.sdk-examples-btn')) {
      const button = document.createElement('button');
      button.className = 'sdk-examples-btn';
      button.innerHTML = '📚 SDK Examples';
      button.style.cssText = `
        margin-left: 12px;
        padding: 6px 12px;
        background: var(--primary-color, #00A67E);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      `;
      
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        showSDKExamplesModal(path, method);
      });
      
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(0,166,126,0.3)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
      
      summarySection.appendChild(button);
    }
  }

  // Show SDK examples modal
  function showSDKExamplesModal(path, method) {
    const examples = generateSDKExamples(path, method);
    
    const modal = document.createElement('div');
    modal.className = 'sdk-modal';
    modal.innerHTML = `
      <div class="sdk-modal-overlay"></div>
      <div class="sdk-modal-content">
        <div class="sdk-modal-header">
          <h3>SDK Examples: ${method} ${path}</h3>
          <button class="sdk-modal-close">&times;</button>
        </div>
        <div class="sdk-modal-body">
          <div class="sdk-tabs">
            <button class="sdk-tab active" data-lang="go">Go</button>
            <button class="sdk-tab" data-lang="php">PHP</button>
            <button class="sdk-tab" data-lang="typescript">TypeScript</button>
            <button class="sdk-tab" data-lang="curl">cURL</button>
          </div>
          <div class="sdk-examples">
            ${examples}
          </div>
        </div>
        <div class="sdk-modal-footer">
          <a href="https://github.com/newage-saint/lifeplus-go-sdk" target="_blank" class="sdk-link-btn go">Go SDK Docs</a>
          <a href="https://github.com/newage-saint/lifeplus-php-sdk" target="_blank" class="sdk-link-btn php">PHP SDK Docs</a>
          <a href="https://github.com/newage-saint/lifeplus-ts-sdk" target="_blank" class="sdk-link-btn typescript">TypeScript SDK Docs</a>
        </div>
      </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
      .sdk-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .sdk-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
      }
      .sdk-modal-content {
        position: relative;
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 900px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      .sdk-modal-header {
        padding: 24px;
        border-bottom: 2px solid #E0E0E0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .sdk-modal-header h3 {
        margin: 0;
        font-size: 20px;
        color: #2C3E50;
      }
      .sdk-modal-close {
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: #6C757D;
        line-height: 1;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 0.3s ease;
      }
      .sdk-modal-close:hover {
        background: #F8F9FA;
        color: #DC3545;
      }
      .sdk-modal-body {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .sdk-tabs {
        display: flex;
        gap: 8px;
        padding: 16px 24px;
        border-bottom: 2px solid #E0E0E0;
        background: #F8F9FA;
      }
      .sdk-tab {
        padding: 8px 16px;
        border: none;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        color: #6C757D;
        transition: all 0.3s ease;
      }
      .sdk-tab:hover {
        color: #00A67E;
        background: #E6F7F3;
      }
      .sdk-tab.active {
        background: #00A67E;
        color: white;
      }
      .sdk-examples {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
      }
      .sdk-example {
        display: none;
      }
      .sdk-example.active {
        display: block;
      }
      .sdk-example pre {
        background: #2C3E50;
        color: #F8F9FA;
        padding: 20px;
        border-radius: 12px;
        overflow-x: auto;
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
      }
      .sdk-example-copy {
        float: right;
        margin-bottom: 12px;
        padding: 6px 12px;
        background: #00A67E;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .sdk-example-copy:hover {
        background: #008A68;
        transform: translateY(-2px);
      }
      .sdk-modal-footer {
        padding: 16px 24px;
        border-top: 2px solid #E0E0E0;
        display: flex;
        gap: 12px;
        justify-content: center;
        background: #F8F9FA;
      }
      .sdk-link-btn {
        padding: 8px 16px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        color: white;
        transition: all 0.3s ease;
      }
      .sdk-link-btn.go {
        background: #00ADD8;
      }
      .sdk-link-btn.php {
        background: #8892BF;
      }
      .sdk-link-btn.typescript {
        background: #3178C6;
      }
      .sdk-link-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
    `;
    modal.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Setup event handlers
    const closeBtn = modal.querySelector('.sdk-modal-close');
    const overlay = modal.querySelector('.sdk-modal-overlay');
    const tabs = modal.querySelectorAll('.sdk-tab');
    const examples = modal.querySelectorAll('.sdk-example');
    
    function closeModal() {
      modal.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const lang = tab.dataset.lang;
        tabs.forEach(t => t.classList.remove('active'));
        examples.forEach(e => e.classList.remove('active'));
        tab.classList.add('active');
        modal.querySelector(`.sdk-example[data-lang="${lang}"]`).classList.add('active');
      });
    });
    
    // Copy buttons
    modal.querySelectorAll('.sdk-example-copy').forEach(btn => {
      btn.addEventListener('click', function() {
        const code = this.nextElementSibling.textContent;
        navigator.clipboard.writeText(code).then(() => {
          this.textContent = '✓ Copied!';
          setTimeout(() => {
            this.textContent = '📋 Copy';
          }, 2000);
        });
      });
    });
  }

  // Generate SDK examples for different languages
  function generateSDKExamples(path, method) {
    const cleanPath = path.replace(/\{/g, '').replace(/\}/g, '');
    const pathParts = cleanPath.split('/').filter(p => p);
    const resourceName = pathParts[0] || 'resource';
    const functionName = method.toLowerCase() + resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
    
    return `
      <div class="sdk-example active" data-lang="go">
        <button class="sdk-example-copy">📋 Copy</button>
        <pre><code>package main

import (
    "context"
    "fmt"
    "log"
    
    lifeplus "github.com/newage-saint/lifeplus-go-sdk"
)

func main() {
    // Initialize client
    client := lifeplus.NewClientWrapper(
        "https://api.lifeplusbd.com/api/v2",
        "your-api-key-or-bearer-token",
    )
    
    ctx := context.Background()
    
    // Make API request
    resp, httpResp, err := client.${resourceName}.${functionName}(ctx)
    if err != nil {
        log.Fatalf("Error: %v", err)
    }
    
    fmt.Printf("Response: %+v\\n", resp)
}</code></pre>
      </div>
      
      <div class="sdk-example" data-lang="php">
        <button class="sdk-example-copy">📋 Copy</button>
        <pre><code><?php
require_once(__DIR__ . '/vendor/autoload.php');

use LifePlus\\LifePlusClient;

// Initialize client
$client = new LifePlusClient([
    'apiKey' => 'your-api-key-or-bearer-token',
    'baseUrl' => 'https://api.lifeplusbd.com/api/v2'
]);

try {
    // Make API request
    $response = $client->${resourceName}->${functionName}();
    print_r($response);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}</code></pre>
      </div>
      
      <div class="sdk-example" data-lang="typescript">
        <button class="sdk-example-copy">📋 Copy</button>
        <pre><code>import { LifePlusClient, Configuration } from 'lifeplus-ts-sdk';

// Initialize client
const config = new Configuration({
  basePath: 'https://api.lifeplusbd.com/api/v2',
  accessToken: 'your-api-key-or-bearer-token'
});

const client = new LifePlusClient(config);

// Make API request
client.${resourceName}.${functionName}()
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });</code></pre>
      </div>
      
      <div class="sdk-example" data-lang="curl">
        <button class="sdk-example-copy">📋 Copy</button>
        <pre><code>curl -X ${method} "https://api.lifeplusbd.com/api/v2${path}" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json"</code></pre>
      </div>
    `;
  }

  // Add quick navigation
  function addQuickNavigation() {
    // Create floating navigation button
    const navButton = document.createElement('button');
    navButton.className = 'quick-nav-button';
    navButton.innerHTML = '📑';
    navButton.title = 'Quick Navigation';
    navButton.style.cssText = `
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--primary-color, #00A67E);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,166,126,0.4);
      z-index: 1000;
      transition: all 0.3s ease;
    `;
    
    navButton.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 6px 20px rgba(0,166,126,0.5)';
    });
    
    navButton.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 12px rgba(0,166,126,0.4)';
    });
    
    navButton.addEventListener('click', scrollToTop);
    
    document.body.appendChild(navButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        navButton.style.display = 'block';
      } else {
        navButton.style.display = 'none';
      }
    });
    
    navButton.style.display = 'none';
  }

  // Scroll to top smoothly
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Add authentication helper
  function addAuthenticationHelper() {
    // Add auth button to header
    setTimeout(() => {
      const authSection = document.querySelector('.swagger-ui .auth-wrapper');
      if (authSection) {
        const helperButton = document.createElement('button');
        helperButton.textContent = '🔑 Quick Auth Setup';
        helperButton.style.cssText = `
          margin-left: 12px;
          padding: 8px 16px;
          background: var(--primary-color, #00A67E);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        `;
        helperButton.addEventListener('click', showAuthHelper);
        authSection.appendChild(helperButton);
      }
    }, 1500);
  }

  // Show authentication helper
  function showAuthHelper() {
    const token = prompt('Enter your Bearer token or API key:');
    if (token) {
      // Set authorization in Swagger UI
      window.ui.preauthorizeApiKey('bearerAuth', token);
      showNotification('Authentication token set successfully!', 'success');
    }
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 24px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#28A745' : type === 'error' ? '#DC3545' : '#3498DB'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Add performance monitoring
  function addPerformanceMonitoring() {
    // Intercept fetch to monitor API calls
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const startTime = performance.now();
      return originalFetch.apply(this, args).then(response => {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        console.log(`API Call: ${args[0]} - ${duration}ms`);
        return response;
      });
    };
  }

  // Track page view (placeholder for analytics)
  function trackPageView() {
    console.log('LifePlus API Documentation - Page View Tracked');
    // Add your analytics tracking code here (Google Analytics, etc.)
  }

  // Add custom styles for animations
  const animationStyles = document.createElement('style');
  animationStyles.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(animationStyles);

  // Initialize everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeSwaggerUI();
      setupEnvironmentSelector();
    });
  } else {
    initializeSwaggerUI();
    setupEnvironmentSelector();
  }
})();

