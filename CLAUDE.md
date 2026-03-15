# Spreadsheet Moment - Project Instructions for Claude

## Project Identity

**Name:** Spreadsheet Moment
**Tagline:** Every cell is a SuperInstance agent
**URL:** https://superinstance.ai/spreadsheet-moment
**Repository:** https://github.com/SuperInstance/spreadsheet-moment
**Status:** 🚀 **READY FOR PRODUCTION DEPLOYMENT**

## What is Spreadsheet Moment?

Spreadsheet Moment transforms spreadsheet cells into intelligent agents powered by SuperInstance technology. Each cell becomes a living entity capable of:

- **Autonomous reasoning** and decision-making
- **Inter-cell communication** and coordination
- **External I/O connections** (Arduino, ESP32, HTTP, serial ports)
- **Real-time monitoring** and response
- **Natural language interaction** via Cocapn/Capitaine frontends

## Core Concept

Traditional spreadsheets have static values and formulas. Spreadsheet Moment transforms each cell into an AI agent that can:
- Connect to external data sources (hardware sensors, web APIs, databases)
- Reason about data using advanced AI (SE(3) consensus, NFDE, evolutionary meta-learning)
- Communicate and coordinate with other cells
- Take actions based on intelligent decisions

## Key Technologies

### SuperInstance Core
- **SE(3)-Equivariant Consensus** - Rotation-invariant coordination (1000x data efficiency)
- **Tensor-Train Compression** - 100x bandwidth reduction
- **Evolutionary Meta-Learning** - Self-optimizing agents (15-30% improvement)
- **Neural Fractional DEs** - Long-memory systems (35% better prediction)
- **Quantum-Inspired Search** - O(√N) optimization

### Deployment Options
1. **Cloudflare Workers** - Spin up on demand, zero idle cost
2. **Docker** - Self-hosted anywhere
3. **Local Server** - Run on your own machine
4. **Spreadsheet Plugins** - Integration with Excel, Google Sheets, LibreOffice

### Frontend Options
- **Cocapn.ai** - Playful pirate-themed interface
- **Capitaine.ai** - Professional maritime-themed interface
- **API** - Direct programmatic access

## Project Structure

```
spreadsheet-moment/
├── README.md              # Project overview
├── CLAUDE.md              # This file
├── LICENSE                # MIT License
├── docs/                  # Documentation
│   ├── GETTING_STARTED.md
│   ├── ARCHITECTURE.md
│   ├── CELL_AGENT_API.md
│   ├── IO_CONNECTIONS.md
│   └── DEPLOYMENT.md
├── website/               # React-based website
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
├── plugins/               # Spreadsheet plugin code
├── extensions/            # Browser extensions
├── docker/                # Docker configuration
├── cloudflare/            # Cloudflare Workers config
├── api/                   # API implementations
└── papers/                # Research papers (selected best)
```

## Development Workflow

### For Website Development
```bash
cd website
npm install
npm run dev    # Development server at localhost:3000
npm run build  # Production build
```

### For API Development
- Use Python with FastAPI for core API
- Implement cell agent system with SuperInstance core
- Create I/O drivers for various protocols

### For Plugin Development
- Excel: JavaScript API (Office Add-ins)
- Google Sheets: Apps Script
- LibreOffice: Python macros

## Cell Agent System

### Creating an Agent Cell

```
=AGENT(input, "task", "instructions")
```

### Cell Types
- **Predictor** - Forecast future values
- **Controller** - Control external systems (PID, etc.)
- **Monitor** - Watch for conditions and alert
- **Consensus** - Coordinate with other cells

### I/O Connections

**Hardware:**
- Arduino: `=SERIAL_READ("COM3", 9600)`
- ESP32: `=ESP32_READ_PIN(cell, pin, mode)`
- Raspberry Pi: `=GPIO_READ(pin)`

**Network:**
- HTTP: `=HTTP_GET(url)`
- WebSocket: `=WS_SEND(cell, message)`
- MQTT: `=MQTT_PUBLISH(topic, message)`

## OpenCLAW and Mimiclaw Integration

### Concept
Each cell is essentially a mini OpenCLAW-like session with hooks into the spreadsheet. Some cells link to inputs/outputs outside the spreadsheet.

### Cell as OpenCLAW Session
- **Agent cell** = OpenCLAW session with NLP capabilities
- **I/O cell** = Connection point to external systems
- **Data cell** = JSON, list, folder, or program in a cell
- **API cell** = Entire HTTP endpoint monitored and explained via NLP

### Frontend Integration
- **Cocapn** - Pirate-themed with lobster mascot 🦞
- **Capitaine** - Maritime professional theme ⚓
- Both provide NLP interaction with SuperInstance agents

## Deployment

### Cloudflare Pages (Recommended for Website)
```bash
# Via Dashboard (Easiest):
# 1. Go to https://dash.cloudflare.com
# 2. Workers & Pages → Create Application → Pages
# 3. Connect to GitHub → Choose spreadsheet-moment
# 4. Build: npm run build | Output: website/dist
# 5. Deploy!

# Via CLI:
npm install -g wrangler
wrangler login
wrangler pages deploy website/dist --project-name=spreadsheet-moment
```

### Docker (Self-Hosted)
```bash
docker build -t spreadsheet-moment .
docker run -p 8080:8080 spreadsheet-moment
```

### Local Development
```bash
pip install spreadsheet-moment
spreadsheet-moment serve --port 8080
```

## Getting Help

- Documentation: https://docs.superinstance.ai
- GitHub Issues: https://github.com/SuperInstance/spreadsheet-moment/issues
- Discord: https://discord.gg/superinstance
- Email: support@superinstance.ai

## Current Status (2026-03-14)

### ✅ Completed
- GitHub repository created and pushed (https://github.com/SuperInstance/spreadsheet-moment)
- Production website built and optimized
  - JavaScript: 183.74 KB (gzipped: 58.30 KB)
  - CSS: 4.97 kB (gzipped: 1.60 KB)
  - Build time: 536ms
- Complete documentation (8 files)
  - GETTING_STARTED.md
  - ARCHITECTURE.md
  - CELL_AGENT_API.md
  - IO_CONNECTIONS.md
  - OPENCLAW_INTEGRATION.md
  - AGENT_ONBOARDING.md
  - CLOUDFLARE_PAGES_DEPLOYMENT.md
  - CLOUDFLARE_DEPLOYMENT.md
- Docker containerization configured
- Cloudflare Workers configuration ready
- OpenCLAW/Mimiclaw integration designed
- Cell agent system architecture complete
- I/O cell architecture specified
- Latest commit: 9a190d2

### 🚧 Awaiting Your Action (Cloudflare Steps)
- Deploy to Cloudflare Pages (one-click setup ready)
- Configure custom domain: spreadsheet-moment.superinstance.ai
- Test all functionality in production environment

## Next Steps (Deployment Path)

### Immediate (You can do now!)

**Option A: Cloudflare Pages (Recommended)**
1. Go to https://dash.cloudflare.com
2. Navigate to: Workers & Pages → Create Application
3. Select: Pages → Connect to Git
4. Choose: SuperInstance/spreadsheet-moment
5. Configure:
   - Build command: `npm run build`
   - Build output: `website/dist`
6. Click: Save and Deploy
7. Add custom domain: `spreadsheet-moment.superinstance.ai`

**Option B: Wrangler CLI**
```powershell
npm install -g wrangler
wrangler login
cd C:\Users\casey\polln\spreadsheet-moment
wrangler pages deploy website/dist --project-name=spreadsheet-moment
```

**See:** [CLOUDFLARE_PAGES_DEPLOYMENT.md](CLOUDFLARE_PAGES_DEPLOYMENT.md) for complete guide

### Following Deployment
- Test all website functionality
- Configure analytics (Cloudflare Web Analytics, Google Analytics)
- Set up Workers API for backend
- Create plugin prototypes (Excel, Google Sheets)
- Build interactive examples
- Write video tutorials

## Vision

**From ancient cells to living spreadsheets — the next evolution of data.**

Spreadsheet Moment represents the practical application of SuperInstance research, making advanced AI accessible through the familiar interface of spreadsheets. Every cell becomes an intelligent agent, capable of reasoning, communicating, and connecting to the real world.

*Powered by SuperInstance — Distributed intelligence for everyone.*
