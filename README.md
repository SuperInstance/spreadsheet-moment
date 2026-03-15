# SpreadsheetMoment

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-LIVE-green.svg)](https://spreadsheet-moment.pages.dev)

**Transform spreadsheet cells into intelligent agents.**

Traditional spreadsheets have static values. SpreadsheetMoment transforms every cell into an intelligent agent that can connect to hardware, APIs, and other cells to build complex autonomous systems.

---

## Quick Start

```bash
git clone https://github.com/SuperInstance/spreadsheet-moment.git
cd spreadsheet-moment/website
npm install
npm run dev
```

Visit http://localhost:3000

**Live Demo:** https://spreadsheet-moment.pages.dev

---

## Example

```typescript
import { SuperInstance } from '@spreadsheet-moment/core';

const cell = SuperInstance.create({
  type: 'sensor',
  connections: ['arduino://A0', 'https://api.weather.com']
});

cell.on('update', (data) => console.log(data));
```

---

## What You Can Build

**Smart Manufacturing** — Sensors → Analysis → Motor control
**Financial Trading** — Market data → Strategy → Execution
**Home Automation** — Weather → Thermostat → Optimization

---

## Documentation

- [Getting Started](https://spreadsheet-moment.pages.dev/docs.html)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API_DOCUMENTATION.md)
- [Deployment](docs/deployment/)

---

## Research

Built on peer-reviewed research from the SuperInstance project:

| Paper | Venue | Contribution |
|-------|-------|--------------|
| P01-P10 | Foundations | Core architecture |
| P11-P20 | NeurIPS 2024 | SE(3) consensus |
| P21-P30 | ICML 2024 | Meta-learning |
| P51-P60 | - | Hardware integration |
| P61-P65 | - | Ancient cell applications |

**[Complete Research →](https://github.com/SuperInstance/SuperInstance-papers)**

---

## License

MIT — see [LICENSE](LICENSE)

---

**Website:** https://spreadsheet-moment.pages.dev
**GitHub:** https://github.com/SuperInstance/spreadsheet-moment
**Research:** https://github.com/SuperInstance/SuperInstance-papers
