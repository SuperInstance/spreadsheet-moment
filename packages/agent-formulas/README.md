# @spreadsheet-moment/agent-formulas

**Custom spreadsheet formula functions** for intelligent operations.

[![Tests](https://img.shields.io/badge/Tests-100%25-brightgreen.svg)](https://github.com/SuperInstance/spreadsheet-moment)
[![Coverage](https://img.shields.io/badge/Coverage-80%25-brightgreen.svg)](https://github.com/SuperInstance/spreadsheet-moment)

## Overview

The `@spreadsheet-moment/agent-formulas` package provides custom formula functions for Spreadsheet Moment:
- AI-powered computation functions
- Intelligent data analysis
- Natural language processing
- Pattern detection formulas

These formulas work standalone using the AI routing layer (agent-ai package). They can optionally connect to a claw backend for advanced agent features, but this is not required for basic functionality.

## Features

### AI_COMPUTE
AI-powered computation using natural language:

```
=AI_COMPUTE("task description", data_range, "model")
```

```excel
=AI_COMPUTE("Calculate trend", A1:A10, "deepseek-chat")
=AI_COMPUTE("Detect anomalies", B1:B100, "deepseek-chat")
=AI_COMPUTE("Summarize data", C1:C50, "deepseek-chat")
```

Works directly with AI providers - no backend required.

### AI_ANALYZE
Intelligent data analysis:

```
=AI_ANALYZE(data_range, "analysis type")
```

```excel
=AI_ANALYZE(A1:D10, "correlation")
=AI_ANALYZE(B1:B100, "outliers")
=AI_ANALYZE(C1:E50, "clusters")
```

### AI_PATTERN
Pattern detection and matching:

```
=AI_PATTERN(data_range, "pattern description")
```

```excel
=AI_PATTERN(A1:A100, "weekly seasonality")
=AI_PATTERN(B1:B50, "trending upward")
```

### AGENT_NEW (Optional - Requires Claw Backend)
Create autonomous agent in cell:

> **Note:** This function requires a claw backend to be running. For most use cases, use AI_COMPUTE instead.

```
=AGENT_NEW("agent_name", "model", "purpose")
```

```excel
=AGENT_NEW(
  "temperature_monitor",
  "deepseek-chat",
  "Monitor temperature sensors and detect anomalies"
)
```

### AGENT_QUERY (Optional - Requires Claw Backend)
Query agent state and results:

```
=AGENT_QUERY(cell_reference)
```

### AGENT_CANCEL (Optional - Requires Claw Backend)
Cancel running agent:

```
=AGENT_CANCEL(cell_reference)
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   FORMULA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────┐       │
│  │           Formula Engine Integration              │       │
│  │  • Univer formula registration                    │       │
│  │  • Parameter parsing                              │       │
│  │  • Result formatting                              │       │
│  └────────────┬─────────────────────────────────────┘       │
│               │                                               │
│      ┌────────┴────────┐                                    │
│      │                 │                                     │
│  ┌───▼────────┐  ┌────▼──────────┐  ┌─────────────┐      │
│  │  CLAW_NEW  │  │  CLAW_QUERY   │  │ CLAW_CANCEL  │      │
│  │            │  │              │  │             │      │
│  │ • Create   │  │ • Query      │  │ • Cancel    │      │
│  │ • Config   │  │ • State      │  │ • Cleanup   │      │
│  │ • Validate │  │ • Results    │  │ • Status    │      │
│  └────────────┘  └───────────────┘  └─────────────┘      │
│                                                                   │
└─────────────────────────────────────────────────────────────┘
```

## Installation

```bash
pnpm add @spreadsheet-moment/agent-formulas
```

## Usage

### Basic AI Formulas

```excel
A1: =AI_COMPUTE("Calculate moving average", B1:B10, "deepseek-chat")
A2: =AI_ANALYZE(C1:C50, "trend")
A3: =AI_PATTERN(D1:D100, "seasonality")
```

### Advanced AI Features

```excel
# Natural language data transformation
=AI_COMPUTE("Convert to percentages and round to 2 decimals", A1:A10)

# Multi-column analysis
=AI_ANALYZE(A1:D100, "correlation matrix")

# Complex pattern matching
=AI_PATTERN(B1:B365, "detect weekly patterns and predict next week")
```

### Optional: Agent Backend Features

> **Requires claw backend running**

```excel
A1: =AGENT_NEW("monitor", "deepseek-chat", "Monitor data")
A2: =AGENT_QUERY(A1)
A3: =AGENT_CANCEL(A1)
```

## Formula Reference

### AI_COMPUTE

**Syntax:**
```
=AI_COMPUTE(task, data, [model], [options])
```

**Parameters:**
- `task` (string): Natural language description of computation
- `data` (range): Data to process
- `model` (string, optional): AI model to use (default: "deepseek-chat")
- `options` (object, optional): Configuration options

**Returns:** Computed result

**Examples:**
```excel
=AI_COMPUTE("Calculate average", A1:A10)
=AI_COMPUTE("Find outliers", B1:B100, "deepseek-chat")
=AI_COMPUTE("Predict next value", C1:C50, "deepseek-chat", {"confidence": 0.9})
```

### AI_ANALYZE

**Syntax:**
```
=AI_ANALYZE(data, analysis_type, [options])
```

**Parameters:**
- `data` (range): Data to analyze
- `analysis_type` (string): Type of analysis ("trend", "correlation", "outliers", "clusters")
- `options` (object, optional): Analysis options

**Returns:** Analysis results

**Examples:**
```excel
=AI_ANALYZE(A1:A100, "trend")
=AI_ANALYZE(B1:D50, "correlation")
=AI_ANALYZE(C1:C200, "outliers", {"threshold": 0.95})
```

### AI_PATTERN

**Syntax:**
```
=AI_PATTERN(data, pattern, [options])
```

**Parameters:**
- `data` (range): Data to search
- `pattern` (string): Pattern description
- `options` (object, optional): Pattern matching options

**Returns:** Pattern detection results

**Examples:**
```excel
=AI_PATTERN(A1:A365, "weekly seasonality")
=AI_PATTERN(B1:B100, "upward trend")
=AI_PATTERN(C1:C50, "cycles", {"min_length": 5})
```

### AGENT_NEW (Optional - Requires Claw Backend)

**Syntax:**
```
=AGENT_NEW(name, model, purpose, [options])
```

**Parameters:**
- `name` (string): Agent name
- `model` (string): Model identifier
- `purpose` (string): Agent purpose
- `options` (object, optional): Configuration options

**Returns:** Agent ID

**Requires:** Claw backend running

**Example:**
```excel
=AGENT_NEW(
  "data_analyzer",
  "deepseek-chat",
  "Analyze sales data",
  {
    "trigger": {"type": "periodic", "interval": 60000},
    "equipment": ["MEMORY", "REASONING"]
  }
)
```

### CLAW_QUERY

**Syntax:**
```
=CLAW_QUERY(cell_reference, [options])
```

**Parameters:**
- `cell_reference` (reference): Cell containing agent
- `options` (object, optional): Query options

**Returns:** Agent state object

**Example:**
```excel
=CLAW_QUERY(A1, {"includeReasoning": true})
```

**Response Format:**
```json
{
  "clawId": "claw_123",
  "state": "thinking",
  "confidence": 0.8,
  "reasoning": [
    {"step": 1, "content": "Analyzing data..."}
  ],
  "memory": [],
  "lastUpdated": 1648000000000
}
```

### CLAW_CANCEL

**Syntax:**
```
=CLAW_CANCEL(cell_reference, [reason])
```

**Parameters:**
- `cell_reference` (reference): Cell containing agent
- `reason` (string, optional): Cancellation reason

**Returns:** Cancellation status

**Example:**
```excel
=CLAW_CANCEL(A1, "No longer needed")
```

## Options

### CLAW_NEW Options

```typescript
interface ClawNewOptions {
  trigger?: {
    type: 'cell_change' | 'periodic' | 'manual';
    cellId?: string;
    interval?: number;
  };
  equipment?: Array<'MEMORY' | 'REASONING' | 'CONSENSUS'>;
  maxReasoningSteps?: number;
  timeout?: number;
  confidence?: number;
}
```

### CLAW_QUERY Options

```typescript
interface ClawQueryOptions {
  includeReasoning?: boolean;
  includeMemory?: boolean;
  includeRelationships?: boolean;
  format?: 'json' | 'summary' | 'detailed';
}
```

## Integration

### Univer Integration

```typescript
import { registerAgentFunctions } from '@spreadsheet-moment/agent-formulas';
import { Workbook } from '@univerjs/core';

const workbook = new Workbook();
registerAgentFunctions(workbook);
```

### Custom Functions

```typescript
import { ClawFunctionRegistry } from '@spreadsheet-moment/agent-formulas';

ClawFunctionRegistry.register('CLAW_CUSTOM', (params) => {
  // Custom function logic
  return result;
});
```

## Testing

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run integration tests
pnpm test:integration
```

## Performance

- **Formula execution**: <10ms
- **Agent creation**: <100ms
- **State query**: <50ms
- **Memory overhead**: ~1MB per formula

## License

Apache-2.0

## Architecture

The formula functions work in layers:

```
┌─────────────────────────────────────────┐
│        Spreadsheet Formulas              │
│  AI_COMPUTE, AI_ANALYZE, AI_PATTERN     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│          AI Model Router                 │
│  (from @spreadsheet-moment/agent-ai)    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│          AI Providers                    │
│  DeepSeek, Cloudflare Workers AI, etc.  │
└─────────────────────────────────────────┘
```

No backend required - formulas connect directly to AI provider APIs.

## Links

- [GitHub](https://github.com/SuperInstance/spreadsheet-moment)
- [Documentation](https://docs.spreadsheet-moment.dev)
- [Univer](https://univer.work)
- [DeepSeek API](https://platform.deepseek.com)
