# @spreadsheet-moment/agent-core

**Core platform services** providing foundational capabilities for Spreadsheet Moment.

[![Tests](https://img.shields.io/badge/Tests-100%25-brightgreen.svg)](https://github.com/SuperInstance/spreadsheet-moment)
[![Coverage](https://img.shields.io/badge/Coverage-61%25-orange.svg)](https://github.com/SuperInstance/spreadsheet-moment)

## Overview

The `@spreadsheet-moment/agent-core` package provides essential platform services for Spreadsheet Moment:
- **StateManager** - Thread-safe state management for spreadsheet operations
- **TraceProtocol** - Execution tracing with loop detection
- **MetricsCollector** - Performance monitoring and metrics
- **HealthChecker** - System health monitoring
- **ClawClient** (Optional) - API client for claw backend integration

This package works standalone for spreadsheet operations. The ClawClient is only needed if you want to integrate with the optional claw agent backend.

## Features

### StateManager
Thread-safe agent state management with event-driven updates:

```typescript
import { StateManager } from '@spreadsheet-moment/agent-core';

const stateManager = new StateManager();

// Create agent state
stateManager.createAgent('claw_123', {
  state: ClawState.THINKING,
  confidence: 0.8,
  reasoning: [],
  memory: []
});

// Query state
const state = stateManager.getAgentState('claw_123');

// Subscribe to updates
stateManager.on('stateChange', (agentId, newState) => {
  console.log(`${agentId} is now ${newState.state}`);
});
```

### TraceProtocol
Execution tracing with recursive loop detection:

```typescript
import { TraceProtocol } from '@spreadsheet-moment/agent-core';

const traceProtocol = new TraceProtocol({
  maxTraceHistory: 1000,
  cleanupInterval: 3600000
});

// Register execution
const traceId = traceProtocol.registerExecution({
  clawId: 'claw_123',
  cellId: 'A1',
  sheetId: 'sheet_1',
  origin: 'user_trigger'
});

// Record step
traceProtocol.recordStep(traceId, {
  timestamp: Date.now(),
  action: 'reasoning',
  data: { step: 1 }
});

// Check for loops
const hasLoop = traceProtocol.detectLoop('claw_123');
```

### ClawClient (Optional)
HTTP/WebSocket client for optional claw backend integration:

> **Note:** ClawClient is only needed if you want to integrate with the claw agent backend. Spreadsheet Moment works fully without this component.

```typescript
import { ClawClient } from '@spreadsheet-moment/agent-core';

// Optional: Connect to claw backend for agent features
const client = new ClawClient({
  baseUrl: 'http://localhost:8080',
  wsUrl: 'ws://localhost:8080/ws',
  apiKey: 'your-api-key-here',
  enableWebSocket: true,
  maxRetries: 3,
  timeout: 30000
});

// Create agent (requires claw backend)
const response = await client.createClaw({
  config: clawConfig,
  context: { sheetId: 'sheet_1', userId: 'user_1' }
});

// Subscribe to real-time updates (requires claw backend + WebSocket)
client.on('reasoningStep', (step) => {
  console.log('Reasoning:', step.content);
});

client.on('stateChange', (state) => {
  console.log('State:', state.state);
});
```

### MetricsCollector
Performance monitoring and metrics collection:

```typescript
import { MetricsCollector } from '@spreadsheet-moment/agent-core';

const metrics = new MetricsCollector();

// Record metrics
metrics.incrementCounter('api_requests_total', {
  labels: { endpoint: '/api/claws', method: 'POST' }
});

metrics.recordHistogram('request_duration_ms', 125, {
  labels: { endpoint: '/api/claws' }
});

metrics.setGauge('active_connections', 42);

// Get metrics snapshot
const snapshot = metrics.getSnapshot();
```

### HealthChecker
System health monitoring:

```typescript
import { HealthChecker } from '@spreadsheet-moment/agent-core';

const healthChecker = new HealthChecker({
  checkInterval: 60000,
  timeout: 5000
});

// Register health check
healthChecker.registerCheck('api', async () => {
  const response = await fetch('/health');
  return response.ok;
});

// Get health status
const health = await healthChecker.getHealth();
console.log(health.status); // 'healthy' | 'degraded' | 'unhealthy'
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AGENT CORE LAYER                         │
├─────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ StateManager │  │ TraceProtocol│  │ MetricsCollector│     │
│  │              │  │              │  │              │      │
│  │ • Agent State│  │ • Execution  │  │ • Counters   │      │
│  │ • Events     │  │ • Loop Detect│  │ • Gauges     │      │
│  │ • Queries    │  │ • History    │  │ • Histograms │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  ClawClient  │  │ HealthChecker│                        │
│  │              │  │              │                        │
│  │ • HTTP API   │  │ • Health     │                        │
│  │ • WebSocket  │  │ • Monitoring │                        │
│  │ • Retry Logic│  │ • Alerts     │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                                   │
└─────────────────────────────────────────────────────────────┘
```

## Installation

```bash
pnpm add @spreadsheet-moment/agent-core
```

## Usage

### Basic Setup

```typescript
import {
  StateManager,
  TraceProtocol,
  MetricsCollector,
  HealthChecker
} from '@spreadsheet-moment/agent-core';

// Initialize core platform services (always needed)
const stateManager = new StateManager();
const traceProtocol = new TraceProtocol();
const metrics = new MetricsCollector();
const healthChecker = new HealthChecker();
```

### Optional: Claw Backend Integration

```typescript
import { ClawClient } from '@spreadsheet-moment/agent-core';

// Only needed if integrating with claw backend
const client = new ClawClient({
  baseUrl: process.env.CLAW_API_URL || 'http://localhost:8080',
  apiKey: process.env.CLAW_API_KEY
});
```

### Spreadsheet Operation Tracking

```typescript
// Track spreadsheet operations
const operationId = 'op_' + Date.now();

stateManager.createAgent(operationId, {
  state: 'calculating',
  confidence: 1.0,
  reasoning: [],
  memory: []
});

// Track execution trace
const traceId = traceProtocol.registerExecution({
  clawId: operationId,
  cellId: 'A1',
  sheetId: 'sheet_1',
  origin: 'user_formula'
});

traceProtocol.recordStep(traceId, {
  timestamp: Date.now(),
  action: 'formula_evaluation',
  data: { formula: '=SUM(B1:B10)' }
});

// Monitor state changes
stateManager.on('stateChange', (id, state) => {
  metrics.recordHistogram('operation_duration', state.duration);
});

// Clean up
stateManager.dispose();
traceProtocol.dispose();
```

### Optional: Agent Backend Integration

```typescript
// Only if using claw backend
const clawId = await client.createClaw({
  config: {
    id: 'claw_123',
    type: ClawType.SENSOR,
    model: {
      provider: ModelProvider.DEEPSEEK,
      model: 'deepseek-chat'
    },
    seed: {
      purpose: 'Monitor temperature',
      trigger: {
        type: TriggerType.CELL_CHANGE,
        cellId: 'A1'
      }
    }
  }
});

client.dispose(); // Clean up client when done
```

## API Reference

### StateManager

| Method | Description |
|--------|-------------|
| `createAgent(id, state)` | Create new agent state |
| `updateAgent(id, updates)` | Update agent state |
| `getAgentState(id)` | Get current agent state |
| `deleteAgent(id)` | Delete agent state |
| `listAgents()` | List all agents |
| `on(event, handler)` | Subscribe to events |

### TraceProtocol

| Method | Description |
|--------|-------------|
| `registerExecution(context)` | Register execution trace |
| `recordStep(traceId, step)` | Record execution step |
| `getTrace(traceId)` | Get execution trace |
| `detectLoop(clawId)` | Check for recursive loops |
| `cleanup()` | Clean old traces |

### ClawClient

| Method | Description |
|--------|-------------|
| `createClaw(request)` | Create new claw agent |
| `queryClaw(request)` | Query agent state |
| `triggerClaw(request)` | Trigger agent execution |
| `cancelClaw(request)` | Cancel agent execution |
| `approveClaw(request)` | Approve agent action |
| `deleteClaw(clawId)` | Delete agent |
| `on(event, handler)` | Subscribe to events |

## Events

### StateManager Events

- `stateChange` - Agent state changed
- `agentCreated` - New agent created
- `agentDeleted` - Agent deleted
- `memoryUpdate` - Agent memory updated

### ClawClient Events

- `connected` - WebSocket connected
- `disconnected` - WebSocket disconnected
- `reasoningStep` - Reasoning progress update
- `stateChange` - Agent state changed
- `approvalRequired` - Action needs approval
- `actionCompleted` - Action finished
- `clawError` - Error occurred

## Testing

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch
```

## Performance

- **State updates**: <1ms
- **Trace recording**: <0.5ms
- **API calls**: <100ms (p95)
- **WebSocket latency**: <50ms
- **Memory overhead**: ~10MB per 1000 agents

## License

Apache-2.0

## Links

- [GitHub](https://github.com/SuperInstance/spreadsheet-moment)
- [Documentation](https://docs.spreadsheet-moment.dev)
- [Claw Backend (Optional)](https://github.com/SuperInstance/claw)
