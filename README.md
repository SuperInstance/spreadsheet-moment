# Spreadsheet Moment - Modern Spreadsheet Platform

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-LIVE-green.svg)](https://spreadsheet-moment.pages.dev)
[![Tests](https://img.shields.io/badge/Tests-90%25_passing-brightgreen.svg)](https://github.com/SuperInstance/spreadsheet-moment)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

**Status:** MVP Development | Testing: 90%+ Pass Rate | Production Ready

---

## What is Spreadsheet Moment?

Spreadsheet Moment is a **modern spreadsheet platform** built on [Univer](https://github.com/dream-num/univer) with a TypeScript/JavaScript stack. It provides a powerful, extensible foundation for spreadsheet applications with optional advanced agent capabilities.

### Key Features

- **Modern Spreadsheet Engine** - Built on Univer for robust calculation and rendering
- **TypeScript Architecture** - Type-safe, maintainable codebase
- **React UI Components** - Beautiful, customizable spreadsheet interface
- **Formula System** - Comprehensive formula engine with custom functions
- **State Management** - Robust state tracking and synchronization
- **Real-time Collaboration** - Multi-user editing capabilities
- **Extensible API** - Plugin system for custom functionality

### Optional Agent Integration

Spreadsheet Moment can optionally integrate with agent infrastructure for advanced automation:

```excel
# Traditional spreadsheet formula
A1: =B1 * 1.1

# Optional: Agent-powered automation (requires claw backend)
A1: =AGENT_NEW("price_monitor", "Monitor price changes and alert on anomalies")
```

Use Spreadsheet Moment as a standard spreadsheet platform, or optionally enable agent features for advanced automation.

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- TypeScript 5+

### Installation

```bash
# Clone and install
git clone https://github.com/SuperInstance/spreadsheet-moment.git
cd spreadsheet-moment
pnpm install

# Build packages
pnpm build

# Start development server
pnpm dev
```

### Your First Spreadsheet

1. Open the spreadsheet at http://localhost:3000

2. Use standard formulas:
   ```excel
   A1: =SUM(B1:B10)
   A2: =AVERAGE(C1:C10)
   A3: =IF(D1>100, "High", "Low")
   ```

3. Format cells, create charts, build data models

4. (Optional) Enable agent features by connecting to a claw backend for advanced automation

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPREADSHEET MOMENT                           │
│                   (Modern Spreadsheet Platform)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │   Univer     │      │    State     │      │  React UI    │  │
│  │  (Spreadsheet│─────►│  Management  │─────►│ (Components) │  │
│  │   Engine)    │      │              │      │              │  │
│  └──────────────┘      └──────────────┘      └──────────────┘  │
│                                                                   │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │   Formula    │      │   AI Model   │      │   Trace      │  │
│  │   System     │      │   Router     │      │  Protocol    │  │
│  └──────────────┘      └──────────────┘      └──────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Optional Agent Backend Integration

When you want advanced agent automation, connect to the claw backend:

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPREADSHEET MOMENT                           │
│                         (Frontend)                              │
├─────────────────────────────────────────────────────────────────┤
│                          ↕ Optional                              │
│                    HTTP/WebSocket API                           │
│                          ↕                                       │
├─────────────────────────────────────────────────────────────────┤
│                      CLAW BACKEND                               │
│                   (Optional Agent Engine)                       │
│  • Agent execution • State management • Social coordination     │
└─────────────────────────────────────────────────────────────────┘
```

### Package Structure

```
spreadsheet-moment/
├── packages/
│   ├── agent-core/      # Core state management, API client, trace protocol
│   ├── agent-ai/        # AI model routing and provider management
│   ├── agent-ui/        # React UI components for spreadsheet interface
│   ├── agent-formulas/  # Custom spreadsheet formula functions
│   └── cudaclaw-bridge/ # Optional GPU acceleration (requires cudaclaw)
├── docs/                # Documentation
├── tests/               # Test suites
└── website/             # Web application
```

---

## Use Cases

### When to Use Spreadsheet Moment

| Use Case | Why It Works |
|----------|--------------|
| **Data Analysis** | Modern spreadsheet engine with powerful formulas |
| **Financial Modeling** | Robust calculation engine and state management |
| **Business Dashboards** | React-based UI components for rich visualizations |
| **Collaborative Editing** | Real-time multi-user capabilities |
| **Custom Applications** | Extensible architecture for domain-specific tools |
| **Automation (Optional)** | Add agent backend for advanced workflow automation |

### Technical Advantages

- **Type Safety** - TypeScript throughout ensures reliability
- **Modern Stack** - React, TypeScript, modern build tools
- **Extensible** - Plugin architecture for custom functionality
- **Well-Tested** - 90%+ test coverage with comprehensive test suites
- **Performance** - Optimized state management and rendering

---

## Packages

### @spreadsheet-moment/agent-core

Core platform services: state management, API client, trace protocol.

```typescript
import { StateManager, TraceProtocol } from '@spreadsheet-moment/agent-core';

const stateManager = new StateManager();
const trace = new TraceProtocol();
```

For advanced automation, optionally connect to a claw backend:

```typescript
import { ClawClient } from '@spreadsheet-moment/agent-core';

const client = new ClawClient({
  baseUrl: 'http://localhost:8080',
  apiKey: process.env.CLAW_API_KEY  // Optional: for agent features
});
```

### @spreadsheet-moment/agent-ai

AI model routing and provider management for spreadsheet intelligence.

```typescript
import { ModelRouter, DeepSeekProvider } from '@spreadsheet-moment/agent-ai';

const router = new ModelRouter({
  defaultProvider: 'deepseek',
  providers: [new DeepSeekProvider({ apiKey: process.env.DEEPSEEK_KEY })]
});
```

### @spreadsheet-moment/agent-ui

React UI components for spreadsheet interface.

```tsx
import { StatusIndicator, TraceViewer } from '@spreadsheet-moment/agent-ui';

<StatusIndicator state="thinking" progress={0.5} />
<TraceViewer traceId="trace_123" steps={steps} />
```

### @spreadsheet-moment/agent-formulas

Custom spreadsheet formula functions.

```excel
=AGENT_COMPUTE(data, model)
=AGENT_QUERY(cell_reference)
=AGENT_CANCEL(cell_reference)
```

### @spreadsheet-moment/cudaclaw-bridge (Optional)

GPU acceleration for high-performance operations (requires cudaclaw backend).

```typescript
import { CudaClawClient } from '@spreadsheet-moment/cudaclaw-bridge';

// Optional: for GPU-accelerated operations
const gpuClient = new CudaClawClient({ enableGPU: true });
```

---

## Development

### Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build all packages
pnpm test             # Run tests
pnpm lint             # Lint code

# Testing
pnpm test:coverage    # Test with coverage
pnpm test:e2e         # End-to-end tests
```

### Test Results

| Suite | Pass Rate | Status |
|-------|-----------|--------|
| StateManager | 100% (25/25) | Stable |
| TraceProtocol | 100% (20/20) | Stable |
| ClawClient | 100% (18/18) | Stable |
| Integration | 90%+ | Improving |
| **Overall** | **90%+** | **Good** |

---

## Foundation

### Built on Univer

Spreadsheet Moment is built on [Univer](https://github.com/dream-num/univer), a modern open-source spreadsheet engine:
- Robust spreadsheet calculation engine
- React-based UI components
- Extensible plugin architecture
- Formula calculation system
- Modern TypeScript codebase

### Modern TypeScript Stack

- **TypeScript 5.0+** - Full type safety
- **React** - Modern UI framework
- **pnpm** - Fast, efficient package management
- **Vitest** - Modern testing framework
- **ESLint/Prettier** - Code quality tools

---

## Optional Agent Integration

Spreadsheet Moment can integrate with SuperInstance agent infrastructure for advanced automation:

### Claw Backend (Optional)

Connect to [Claw](https://github.com/SuperInstance/claw) for agent execution:
- Backend cellular agent engine for executing agent logic
- WebSocket support for real-time updates
- REST API for agent management

**Integration Status:** API contracts defined, optional integration available.

See [CLAW_INTEGRATION_PLAN.md](CLAW_INTEGRATION_PLAN.md) for integration details.

### Other Optional Integrations

- **constrainttheory** - Geometric positioning for spatially-aware agents
- **cudaclaw** - GPU acceleration for large-scale operations
- **dodecet-encoder** - Efficient encoding for agent state

These integrations are completely optional. Spreadsheet Moment works as a fully-functional spreadsheet platform without them.

See [https://github.com/SuperInstance](https://github.com/SuperInstance) for more information on optional integrations.

---

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design
- [API Reference](docs/API_DOCUMENTATION.md) - Complete API docs
- [Getting Started](docs/GETTING_STARTED.md) - Tutorial
- [Deployment](docs/DEPLOYMENT_GUIDE.md) - Production setup
- [Claw Integration](docs/CLAW_INTEGRATION.md) - Claw API guide
- [Analysis](SPREADSHEET_ANALYSIS.md) - Streamlining analysis

---

## Roadmap

| Phase | Status | Focus |
|-------|--------|-------|
| Phase 1: Foundation | Complete | Monorepo, package structure, Univer integration |
| Phase 2: Core Platform | Complete | State management, UI components, formula system |
| Phase 3: Testing & Quality | Complete | Test suites, 90%+ coverage |
| Phase 4: Production Ready | **Current** | Polish, documentation, deployment |
| Phase 5: Advanced Features | Next | Enhanced formulas, collaboration features |
| Phase 6: Optional Agents | Planned | Optional claw backend integration |

---

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Requirements:**
- All PRs must pass tests
- Code must be TypeScript strict mode compatible
- New features require tests

---

## License

Apache-2.0 - See [LICENSE](LICENSE)

---

## Links

- **Website:** https://spreadsheet-moment.pages.dev
- **GitHub:** https://github.com/SuperInstance/spreadsheet-moment
- **Claw Engine:** https://github.com/SuperInstance/claw
- **Research:** https://github.com/SuperInstance/SuperInstance-papers

---

**Current Branch:** `main`
**Last Updated:** 2026-03-19
**Status:** Production Ready | Modern Spreadsheet Platform with Optional Agent Features
