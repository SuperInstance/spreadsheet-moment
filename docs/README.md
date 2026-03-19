# Spreadsheet Moment Documentation

Welcome to the Spreadsheet Moment documentation. This guide will help you build modern spreadsheet applications with TypeScript and React.

## 🚀 Quick Links

- **[Getting Started](GETTING_STARTED.md)** — Setup and basic usage
- **[Architecture](ARCHITECTURE.md)** — System design and components
- **[API Reference](API_DOCUMENTATION.md)** — Complete API documentation
- **[Formulas](FORMULAS.md)** — Built-in and custom formulas
- **[Integration Guide](INTEGRATION_GUIDE.md)** — Connect with external systems

## 📚 Documentation Structure

### Core Guides

- **Getting Started** — Install Spreadsheet Moment and build your first app
- **Architecture** — Understand the platform design and components
- **API Reference** — Complete API documentation for all packages
- **Formulas** — Built-in formulas and creating custom functions
- **State Management** — Working with StateManager and TraceProtocol

### Advanced Topics

- **Deployment** — Deploy to production (Cloudflare Workers, Docker, cloud)
- **Performance** — Optimize for speed and efficiency
- **Testing** — Write tests for your spreadsheet applications
- **Customization** — Extend with plugins and custom components

### Optional Features

- **Agent Integration** — Connect to claw backend for advanced automation (optional)
- **GPU Acceleration** — Use cudaclaw-bridge for high-performance operations (optional)
- **AI Features** — Integrate AI providers for intelligent operations

## 🎯 Getting Started

### 1. Installation

```bash
pnpm install
pnpm build
```

### 2. Create Your First Spreadsheet

```typescript
import { StateManager } from '@spreadsheet-moment/agent-core';
import { UniversalWorkbook } from '@univer/core';

// Initialize state management
const stateManager = new StateManager();

// Create workbook
const workbook = new UniversalWorkbook({
  name: 'My Spreadsheet',
  sheets: [{ name: 'Sheet1' }]
});
```

### 3. Add Formulas

```typescript
// Standard formulas work out of the box
workbook.setCell('A1', '=SUM(B1:B10)');
workbook.setCell('A2', '=AVERAGE(C1:C10)');

// AI-powered formulas (optional - requires AI provider API key)
import { AI_COMPUTE } from '@spreadsheet-moment/agent-formulas';
workbook.setCell('A3', '=AI_COMPUTE("Calculate trend", B1:B10, "deepseek-chat")');
```

### 4. Build Your UI

```typescript
import { StatusIndicator, TraceViewer } from '@spreadsheet-moment/agent-ui';

function SpreadsheetApp() {
  return (
    <div>
      <UniversalWorkbook />
      <StatusIndicator state="calculating" />
      <TraceViewer steps={executionSteps} />
    </div>
  );
}
```

## 🌐 Live Resources

- **Website:** https://spreadsheet-moment.pages.dev
- **Custom Domain:** https://spreadsheet.superinstance.ai
- **GitHub:** https://github.com/SuperInstance/spreadsheet-moment
- **Issues:** https://github.com/SuperInstance/spreadsheet-moment/issues
- **Discussions:** https://github.com/SuperInstance/spreadsheet-moment/discussions

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📞 Getting Help

- **Documentation:** Start here!
- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** Questions and ideas
- **Email:** support@superinstance.ai

---

**Modern spreadsheet platform built with TypeScript, React, and Univer.**

*Built by SuperInstance — Open-source spreadsheet innovation.*
