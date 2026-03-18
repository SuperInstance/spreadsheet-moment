# Claw Integration Guide - Spreadsheet Moment

**Repository:** spreadsheet-moment
**Version:** 0.1.0
**Last Updated:** 2026-03-17
**Status:** Production Ready (Core), In Progress (Advanced Features)

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [HTTP API Integration](#http-api-integration)
5. [WebSocket Integration](#websocket-integration)
6. [State Synchronization](#state-synchronization)
7. [UI Components](#ui-components)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Overview

Spreadsheet Moment integrates with the **Claw cellular agent engine** to provide autonomous, intelligent agents within spreadsheet cells. This integration enables:

- **Cellular Agents**: Each spreadsheet cell can host an independent Claw agent
- **Real-time Communication**: WebSocket connection for live agent updates
- **State Synchronization**: Bidirectional sync between spreadsheet and agents
- **Human-in-the-Loop**: Approval workflows for agent actions
- **Equipment System**: Dynamic module loading for agent capabilities

### Key Features

| Feature | Status | Description |
|---------|--------|-------------|
| **HTTP API Client** | ✅ Complete | Production-ready REST API integration |
| **WebSocket Client** | ✅ Complete | Real-time agent updates with authentication |
| **State Management** | ✅ Complete | Origin-centric design with trace protocol |
| **UI Components** | ✅ Complete | React components for agent management |
| **Monitoring** | ✅ Complete | Metrics collection and health checking |
| **State Sync** | 🔄 In Progress | Bidirectional synchronization protocol |
| **Equipment UI** | 🔄 In Progress | Equipment selection interface |

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPREADSHEET MOMENT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │   Univer     │      │  Agent Core  │      │   Agent UI   │  │
│  │  (Spreadsheet│◄────►│  (Logic)     │◄────►│  (React)     │  │
│  │   Engine)    │      │              │      │              │  │
│  └──────────────┘      └──────┬───────┘      └──────────────┘  │
│                                │                                 │
│                                │ HTTP + WebSocket               │
│                                ▼                                 │
│                        ┌───────────────┐                        │
│                        │  Claw Engine  │                        │
│                        │  (External)   │                        │
│                        └───────────────┘                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
packages/
├── agent-core/           # Core logic and API client
│   ├── api/
│   │   ├── ClawClient.ts         # HTTP + WebSocket client
│   │   ├── types.ts              # TypeScript interfaces
│   │   └── __tests__/            # API tests
│   ├── monitoring/
│   │   ├── MetricsCollector.ts   # Metrics collection
│   │   └── HealthChecker.ts      # Health monitoring
│   └── StateManager.ts           # State management
│
├── agent-ui/             # React components
│   ├── components/
│   │   ├── ClawManagement/       # Management panel
│   │   ├── ClawCell/             # Cell-specific UI
│   │   ├── ReasoningPanel.tsx    # Reasoning display
│   │   └── HITLButtons.tsx       # Approval buttons
│   ├── hooks/
│   │   └── useClawRealtime.ts    # Real-time hook
│   └── providers/
│       └── ClawClientProvider.ts # Context provider
│
├── agent-ai/             # AI/ML integration
│   └── workers/                  # Worker threads for AI
│
└── agent-formulas/       # Spreadsheet formulas
    └── functions/               # CLAW_* formula functions
```

---

## Quick Start

### 1. Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

### 2. Basic Claw Client Setup

```typescript
import { ClawClient } from '@spreadsheet-moment/agent-core';

// Create client with authentication
const client = new ClawClient({
  baseUrl: 'https://api.claw.example.com',
  wsUrl: 'wss://api.claw.example.com/ws',
  apiKey: 'your-api-key-min-20-chars',
  timeout: 30000,
  maxRetries: 3,
  enableWebSocket: true
});

// Connect to real-time updates
client.on('connected', () => {
  console.log('WebSocket connected');
});

client.on('stateChange', (state) => {
  console.log('Agent state changed:', state);
});

// Create a Claw agent
const claw = await client.createClaw({
  clawId: 'claw_1',
  config: {
    id: 'claw_1',
    type: 'SENSOR',
    position: [0, 0],
    model: {
      provider: 'DEEPSEEK',
      model: 'deepseek-chat',
      apiKey: 'model-api-key'
    },
    seed: {
      purpose: 'Monitor temperature sensors',
      trigger: {
        type: 'CELL_CHANGE',
        cellId: 'A1'
      },
      learningStrategy: {
        type: 'REINFORCEMENT'
      }
    },
    equipment: ['MEMORY', 'REASONING'],
    relationships: [],
    state: 'DORMANT',
    confidence: 0.5
  }
});

// Query agent state
const state = await client.queryClaw({ clawId: 'claw_1' });

// Trigger agent
const result = await client.triggerClaw({
  clawId: 'claw_1',
  triggerData: { value: 25 }
});

// Cleanup
client.dispose();
```

### 3. React Integration

```typescript
import React from 'react';
import { ClawClientProvider, useClawRealtime } from '@spreadsheet-moment/agent-ui';

// App-level setup
function App() {
  const clientConfig = {
    baseUrl: 'https://api.claw.example.com',
    wsUrl: 'wss://api.claw.example.com/ws',
    apiKey: 'your-api-key-min-20-chars'
  };

  return (
    <ClawClientProvider config={clientConfig}>
      <SpreadsheetApp />
    </ClawClientProvider>
  );
}

// Component using real-time Claw data
function AgentStatus({ clawId }: { clawId: string }) {
  const { state, error, isLoading } = useClawRealtime(clawId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Agent: {state.clawState}</h3>
      <ul>
        {state.reasoningSteps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## HTTP API Integration

### ClawClient API

The `ClawClient` class provides a production-ready HTTP client with retry logic, error handling, and request validation.

#### Configuration Options

```typescript
interface ClawClientConfig {
  baseUrl: string;              // Required: Claw API base URL
  wsUrl?: string;               // Optional: WebSocket URL
  apiKey?: string;              // Optional: API key (min 20 chars)
  timeout?: number;             // Optional: Request timeout (default: 30000ms)
  maxRetries?: number;          // Optional: Max retry attempts (default: 3)
  initialRetryDelay?: number;   // Optional: Initial retry delay (default: 1000ms)
  maxRetryDelay?: number;       // Optional: Max retry delay (default: 30000ms)
  retryBackoffMultiplier?: number; // Optional: Backoff multiplier (default: 2)
  enableValidation?: boolean;   // Optional: Enable schema validation (default: true)
  enableWebSocket?: boolean;    // Optional: Enable WebSocket (default: true)
  healthCheckInterval?: number; // Optional: Health check interval (default: 60000ms)
  debug?: boolean;              // Optional: Debug logging (default: false)
}
```

#### Core Methods

##### createClaw

Create a new Claw agent:

```typescript
const response = await client.createClaw({
  clawId: 'claw_1',
  config: {
    id: 'claw_1',
    type: ClawType.SENSOR,
    position: [0, 0],
    model: {
      provider: ModelProvider.DEEPSEEK,
      model: 'deepseek-chat',
      apiKey: 'model-api-key'
    },
    seed: {
      purpose: 'Monitor data',
      trigger: {
        type: TriggerType.CELL_CHANGE,
        cellId: 'A1'
      },
      learningStrategy: LearningStrategy.REINFORCEMENT
    },
    equipment: [EquipmentSlot.MEMORY, EquipmentSlot.REASONING],
    relationships: [],
    state: ClawState.DORMANT,
    confidence: 0.5
  }
});
```

##### queryClaw

Query agent state:

```typescript
const state = await client.queryClaw({
  clawId: 'claw_1'
});

// Returns:
// {
//   clawId: string;
//   state: ClawState;
//   reasoning: string[];
//   memory: string[];
//   lastAction?: {
//     type: string;
//     description: string;
//     timestamp: number;
//   };
//   error?: string;
// }
```

##### triggerClaw

Trigger agent execution:

```typescript
const result = await client.triggerClaw({
  clawId: 'claw_1',
  triggerData: {
    value: 42,
    context: 'Manual trigger'
  }
});

// Returns:
// {
//   clawId: string;
//   success: boolean;
//   newState: ClawState;
//   reasoning: string[];
//   action?: ClawAction;
//   executionTime: number;
// }
```

##### approveClaw

Approve or reject agent action:

```typescript
const result = await client.approveClaw({
  clawId: 'claw_1',
  approved: true,
  comments: 'Looks good, proceed'
});

// Returns:
// {
//   clawId: string;
//   approved: boolean;
//   newState: ClawState;
//   actionExecuted: boolean;
// }
```

##### cancelClaw

Cancel running agent:

```typescript
await client.cancelClaw({
  clawId: 'claw_1',
  reason: 'User cancelled'
});
```

##### deleteClaw

Delete agent:

```typescript
await client.deleteClaw('claw_1');
```

##### getClawHistory

Get agent execution history:

```typescript
const history = await client.getClawHistory('claw_1', 100);

// Returns: ClawStateInfo[]
```

### Error Handling

All API methods can throw `ClawAPIError`:

```typescript
import { ClawAPIError, ClawErrorCode } from '@spreadsheet-moment/agent-core';

try {
  await client.createClaw(request);
} catch (error) {
  if (error instanceof ClawAPIError) {
    switch (error.code) {
      case ClawErrorCode.UNAUTHORIZED:
        console.error('Invalid API key');
        break;
      case ClawErrorCode.VALIDATION_ERROR:
        console.error('Invalid request:', error.details);
        break;
      case ClawErrorCode.RATE_LIMITED:
        console.error('Rate limited, retry later');
        break;
      default:
        console.error('API error:', error.message);
    }
  }
}
```

---

## WebSocket Integration

### WebSocket Events

The ClawClient emits WebSocket events for real-time updates:

```typescript
// Connection events
client.on('connected', () => {
  console.log('WebSocket connected');
});

client.on('disconnected', () => {
  console.log('WebSocket disconnected');
});

client.on('reconnectFailed', () => {
  console.log('Max reconnection attempts reached');
});

// Agent events
client.on('reasoningStep', (step) => {
  console.log('Reasoning step:', step);
  // { stepNumber, content, timestamp, confidence }
});

client.on('stateChange', (state) => {
  console.log('State changed:', state);
  // { clawId, oldState, newState, timestamp }
});

client.on('approvalRequired', (action) => {
  console.log('Approval required:', action);
  // { clawId, action, reasoning, confidence }
});

client.on('actionExecuted', (result) => {
  console.log('Action executed:', result);
  // { clawId, action, success, error }
});

// Error events
client.on('error', (error) => {
  console.error('WebSocket error:', error);
});

client.on('validationError', (error) => {
  console.error('Validation error:', error);
});
```

### WebSocket Authentication

WebSocket connections use Bearer token authentication:

```typescript
// Token is automatically appended to WebSocket URL
const client = new ClawClient({
  baseUrl: 'https://api.claw.example.com',
  wsUrl: 'wss://api.claw.example.com/ws',
  apiKey: 'your-api-key-min-20-chars'
});

// WebSocket connects to:
// wss://api.claw.example.com/ws?token=your-api-key-min-20-chars
```

### Reconnection Logic

Automatic reconnection with exponential backoff:

```typescript
// Reconnection configuration
const client = new ClawClient({
  baseUrl: 'https://api.claw.example.com',
  wsUrl: 'wss://api.claw.example.com/ws',
  apiKey: 'your-api-key',
  wsReconnectInterval: 5000,      // Initial delay: 5s
  maxWsReconnectDelay: 60000,     // Max delay: 60s
  maxWsReconnectAttempts: 10      // Max attempts: 10
});

// Reconnection delays (with jitter):
// Attempt 1: ~5s
// Attempt 2: ~10s
// Attempt 3: ~20s
// Attempt 4: ~40s
// Attempt 5+: ~60s (max)
```

### React Hook for Real-time Updates

```typescript
import { useClawRealtime } from '@spreadsheet-moment/agent-ui';

function AgentComponent({ clawId }: { clawId: string }) {
  const {
    state,
    reasoning,
    error,
    isLoading,
    isConnected
  } = useClawRealtime(clawId, {
    subscribe: true,
    onUpdate: (newState) => {
      console.log('State updated:', newState);
    }
  });

  if (!isConnected) {
    return <div>Connecting...</div>;
  }

  if (isLoading) {
    return <div>Loading agent state...</div>;
  }

  return (
    <div>
      <h3>Agent: {state.clawState}</h3>
      <div>
        {reasoning.map((step, i) => (
          <div key={i}>{step}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## State Synchronization

### Origin-Centric Design

Spreadsheet Moment uses **Origin-Centric Design** for state management:

- Every operation tracks its provenance (origin)
- Source-based logic (not reference-based)
- Trace protocol prevents recursive loops
- Asymmetric understanding is a feature, not a bug

### State Manager

The `StateManager` class handles agent state transitions:

```typescript
import { StateManager, AgentCellState } from '@spreadsheet-moment/agent-core';

const manager = new StateManager();

// Check if transition is valid
const canTransition = manager.canTransition(
  AgentCellState.DORMANT,
  AgentCellState.THINKING
); // true

// Execute state transition
const newState = manager.transition(
  'claw_1',
  AgentCellState.DORMANT,
  AgentCellState.THINKING,
  { origin: 'user_trigger', timestamp: Date.now() }
);

// Listen to state changes
manager.on('stateChange', (event) => {
  console.log('State changed:', event);
  // { clawId, oldState, newState, origin, timestamp }
});
```

### Valid State Transitions

```
DORMANT ──────► THINKING ──────► NEEDS_REVIEW ──────► POSTED
  │               │                   │                  │
  │               │                   ▼                  │
  │               │              POSTED ◄──────────────┘
  │               │                   │
  ▼               ▼                   ▼
ARCHIVED ◄──── ERROR ◄───────────────┘
  │               │
  └───────────────┘
```

### Trace Protocol

Prevent recursive loops with trace tracking:

```typescript
import { TraceProtocol } from '@spreadsheet-moment/agent-core';

const trace = TraceProtocol.generate('origin_cell_A1');

// Check for recursive loop
const hasLoop = TraceProtocol.checkCollision(trace, 'origin_cell_A2');
// Returns true if A2 is already in A1's trace path

// Get trace path
const path = TraceProtocol.getTracePath(trace);
// Returns: ['origin_cell_A1', 'origin_cell_B2', 'origin_cell_C3']
```

---

## UI Components

### ClawManagementPanel

Comprehensive UI for managing Claw agents:

```typescript
import { ClawManagementPanel } from '@spreadsheet-moment/agent-ui';

function App() {
  const [agents, setAgents] = useState([]);

  return (
    <ClawManagementPanel
      agents={agents}
      selectedId={selectedAgent}
      onSelect={(id) => setSelectedAgent(id)}
      onCreate={(config) => handleCreate(config)}
      onEdit={(id, config) => handleEdit(id, config)}
      onDelete={(id) => handleDelete(id)}
      onTrigger={(id) => handleTrigger(id)}
      showFilters={true}
      className="claw-panel"
    />
  );
}
```

### ClawCellConfig

Configuration UI for creating/editing Claw cells:

```typescript
import { ClawCellConfig } from '@spreadsheet-moment/agent-ui';

<ClawCellConfig
  initialValue={clawConfig}
  onSubmit={(config) => handleSave(config)}
  onCancel={() => handleCancel()}
  availableModels={[
    { provider: 'DEEPSEEK', model: 'deepseek-chat' },
    { provider: 'OPENAI', model: 'gpt-4' }
  ]}
  availableEquipment={[
    { slot: 'MEMORY', name: 'Memory', description: 'Persistent storage' },
    { slot: 'REASONING', name: 'Reasoning', description: 'Decision engine' }
  ]}
/>
```

### ReasoningPanel

Display agent reasoning steps:

```typescript
import { ReasoningPanel } from '@spreadsheet-moment/agent-ui';

<ReasoningPanel
  reasoningSteps={[
    { stepNumber: 1, content: 'Analyzing data...', confidence: 0.8 },
    { stepNumber: 2, content: 'Detected anomaly', confidence: 0.9 }
  ]}
  isLoading={isThinking}
  maxHeight={400}
/>
```

### HITLButtons

Human-in-the-loop approval buttons:

```typescript
import { HITLButtons } from '@spreadsheet-moment/agent-ui';

<HITLButtons
  clawId="claw_1"
  action={pendingAction}
  onApprove={(id, comments) => handleApprove(id, comments)}
  onReject={(id, comments) => handleReject(id, comments)}
  showComments={true}
  position="bottom"
/>
```

---

## Testing

### Unit Tests

```typescript
import { ClawClient } from '@spreadsheet-moment/agent-core';

describe('ClawClient', () => {
  let client: ClawClient;

  beforeEach(() => {
    client = new ClawClient({
      baseUrl: 'https://api.test.com',
      apiKey: 'test-api-key-12345678'
    });
  });

  afterEach(() => {
    client.dispose();
  });

  it('should create claw successfully', async () => {
    const result = await client.createClaw({
      clawId: 'test_claw',
      config: { /* ... */ }
    });

    expect(result.clawId).toBe('test_claw');
    expect(result.status).toBe('created');
  });

  it('should handle validation errors', async () => {
    await expect(
      client.createClaw({ clawId: '', config: {} })
    ).rejects.toThrow(ClawAPIError);
  });
});
```

### Integration Tests

```typescript
describe('Claw Integration', () => {
  it('should perform full claw lifecycle', async () => {
    // Create
    const created = await client.createClaw(request);
    expect(created.clawId).toBeDefined();

    // Query
    const queried = await client.queryClaw({ clawId: created.clawId });
    expect(queried.state).toBe('DORMANT');

    // Trigger
    const triggered = await client.triggerClaw({ clawId: created.clawId });
    expect(triggered.success).toBe(true);

    // Cleanup
    await client.deleteClaw(created.clawId);
  });
});
```

### WebSocket Tests

```typescript
describe('WebSocket Integration', () => {
  it('should receive real-time updates', (done) => {
    client.on('stateChange', (state) => {
      expect(state.clawId).toBe('test_claw');
      expect(state.newState).toBe('THINKING');
      done();
    });

    // Trigger agent to generate WebSocket event
    client.triggerClaw({ clawId: 'test_claw' });
  });
});
```

---

## Troubleshooting

### Common Issues

#### 1. API Key Validation Error

**Error:** `API key must be at least 20 characters long`

**Solution:**
```typescript
// Ensure API key is 20+ characters
const client = new ClawClient({
  apiKey: 'short-key' // ❌ Too short
});

// Use proper API key
const client = new ClawClient({
  apiKey: 'your-api-key-min-20-chars' // ✅ Correct
});
```

#### 2. WebSocket Connection Failed

**Error:** `WebSocket connection failed`

**Solutions:**
- Check WebSocket URL format
- Verify network connectivity
- Check API key authentication
- Ensure WebSocket endpoint is accessible

```typescript
// Debug WebSocket connection
const client = new ClawClient({
  baseUrl: 'https://api.claw.example.com',
  wsUrl: 'wss://api.claw.example.com/ws', // Verify this URL
  apiKey: 'your-api-key',
  debug: true // Enable debug logging
});

client.on('error', (error) => {
  console.error('WebSocket error:', error);
});
```

#### 3. Rate Limiting

**Error:** `Rate limited, retry after X seconds`

**Solution:**
```typescript
// Client automatically retries with exponential backoff
// Adjust retry configuration if needed

const client = new ClawClient({
  baseUrl: 'https://api.claw.example.com',
  maxRetries: 5, // Increase retries
  initialRetryDelay: 2000, // Increase initial delay
  maxRetryDelay: 60000 // Max delay
});
```

#### 4. State Transition Invalid

**Error:** `Invalid state transition from X to Y`

**Solution:**
```typescript
// Check valid transitions
const manager = new StateManager();

const canTransition = manager.canTransition(
  currentState,
  desiredState
);

if (!canTransition) {
  console.log('Invalid transition');
  // Handle appropriately
}
```

---

## Best Practices

### 1. Resource Management

Always dispose clients when done:

```typescript
// Good
function useClawClient() {
  const client = useMemo(() => new ClawClient(config), []);

  useEffect(() => {
    return () => {
      client.dispose(); // Cleanup
    };
  }, [client]);

  return client;
}

// Bad
function useClawClient() {
  return new ClawClient(config); // Memory leak!
}
```

### 2. Error Handling

Always handle errors appropriately:

```typescript
try {
  const result = await client.createClaw(request);
  // Handle success
} catch (error) {
  if (error instanceof ClawAPIError) {
    switch (error.code) {
      case ClawErrorCode.UNAUTHORIZED:
        // Handle auth error
        break;
      case ClawErrorCode.VALIDATION_ERROR:
        // Handle validation error
        break;
      default:
        // Handle other errors
    }
  }
}
```

### 3. State Management

Use StateManager for state transitions:

```typescript
// Good
const newState = manager.transition(
  clawId,
  oldState,
  newState,
  { origin: 'user_action', timestamp: Date.now() }
);

// Bad
claw.state = newState; // Bypasses validation
```

### 4. WebSocket Monitoring

Monitor WebSocket connection state:

```typescript
const [isConnected, setIsConnected] = useState(false);

client.on('connected', () => setIsConnected(true));
client.on('disconnected', () => setIsConnected(false));

// Show connection status to users
<div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
  {isConnected ? 'Connected' : 'Disconnected'}
</div>
```

### 5. API Key Security

Never expose API keys in client-side code:

```typescript
// Bad - API key in client code
const client = new ClawClient({
  apiKey: 'sk-1234567890abcdef' // Exposed!
});

// Good - API key from server
const client = new ClawClient({
  apiKey: await fetchApiKeyFromServer() // Secure
});
```

---

## Performance Considerations

### 1. Connection Pooling

Reuse clients across components:

```typescript
// Good - Single client instance
const client = new ClawClient(config);
export const useClawClient = () => client;

// Bad - Multiple client instances
const client1 = new ClawClient(config);
const client2 = new ClawClient(config);
```

### 2. Request Batching

Batch requests when possible:

```typescript
// Bad - Multiple sequential requests
for (const clawId of clawIds) {
  await client.queryClaw({ clawId });
}

// Good - Batch request (if API supports it)
const states = await client.queryClaws({ clawIds });
```

### 3. WebSocket vs Polling

Prefer WebSocket over polling:

```typescript
// Bad - Polling
setInterval(() => {
  client.queryClaw({ clawId });
}, 1000);

// Good - WebSocket
client.on('stateChange', (state) => {
  // Real-time updates
});
```

---

## Next Steps

### For Developers

1. **Explore the Examples**: Check out the examples directory
2. **Read the API Documentation**: Full API reference available
3. **Build UI Components**: Create custom components using our library
4. **Contribute**: We welcome contributions!

### For Integration

1. **Set Up Claw Engine**: Deploy the Claw backend service
2. **Configure Authentication**: Set up API key generation
3. **Test Integration**: Run integration tests
4. **Deploy**: Deploy to production with monitoring

---

## Additional Resources

- **GitHub Repository**: https://github.com/SuperInstance/spreadsheet-moment
- **Claw Engine**: https://github.com/SuperInstance/claw
- **Documentation**: https://docs.spreadsheet-moment.superinstance.ai
- **Community**: Join our Discord server

---

**Last Updated:** 2026-03-17
**Version:** 0.1.0
**License:** Apache-2.0
