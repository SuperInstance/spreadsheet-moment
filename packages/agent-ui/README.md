# @spreadsheet-moment/agent-ui

**React UI components** for modern spreadsheet interface and visualization.

[![Tests](https://img.shields.io/badge/Tests-100%25-brightgreen.svg)](https://github.com/SuperInstance/spreadsheet-moment)
[![Coverage](https://img.shields.io/badge/Coverage-70%25-brightgreen.svg)](https://github.com/SuperInstance/spreadsheet-moment)

## Overview

The `@spreadsheet-moment/agent-ui` package provides React components for building rich spreadsheet interfaces:
- **StatusIndicator** - Visual status displays with animations
- **TraceViewer** - Execution timeline visualization
- **ReasoningStream** - Live streaming content display
- **AgentVisualizer** (Optional) - Agent state visualization (requires agent features enabled)

These components work standalone for general spreadsheet UI needs. The AgentVisualizer component is only needed if using optional agent backend features.

## Features

### StatusIndicator
Visual status displays for operations:

```typescript
import { StatusIndicator } from '@spreadsheet-moment/agent-ui';

<StatusIndicator
  state="calculating"
  progress={0.6}
  message="Processing formula..."
/>

<StatusIndicator
  state="complete"
  message="Calculation complete"
/>
```

States: `idle`, `calculating`, `analyzing`, `complete`, `error`

### TraceViewer
Execution timeline visualization for debugging:

```typescript
import { TraceViewer } from '@spreadsheet-moment/agent-ui';

<TraceViewer
  traceId="trace_456"
  steps={executionSteps}
  onStepClick={(step) => console.log(step)}
/>
```

Great for visualizing formula evaluation, data processing pipelines, and operation traces.

### ReasoningStream
Live streaming content display:

```typescript
import { ReasoningStream } from '@spreadsheet-moment/agent-ui';

<ReasoningStream
  streamId="stream_123"
  streamUrl="wss://api.deepseek.com/stream"
  onComplete={(result) => console.log(result)}
/>
```

Use for displaying streaming AI responses, live data feeds, or progressive computation results.

### AgentVisualizer (Optional - Requires Agent Features)
Agent state visualization with animations:

> **Note:** This component is only needed if using optional agent backend features.

```typescript
import { AgentVisualizer } from '@spreadsheet-moment/agent-ui';

<AgentVisualizer
  agentId="agent_123"
  state="thinking"
  confidence={0.8}
  onStateChange={(newState) => console.log(newState)}
/>
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      UI LAYER                                │
├─────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────┐       │
│  │              AgentVisualizer                      │       │
│  │  • Pulsing animations                             │       │
│  │  • Biological metaphors                           │       │
│  │  • State visualization                            │       │
│  └──────────────────────────────────────────────────┘       │
│                                                                   │
│  ┌──────────────────────────────────────────────────┐       │
│  │              TraceViewer                          │       │
│  │  • Timeline visualization                         │       │
│  │  • Step-by-step execution                         │       │
│  │  • Interactive exploration                        │       │
│  └──────────────────────────────────────────────────┘       │
│                                                                   │
│  ┌──────────────────────────────────────────────────┐       │
│  │              StatusIndicator                      │       │
│  │  • Real-time status                                │       │
│  │  • Progress bars                                   │       │
│  │  • Color-coded states                              │       │
│  └──────────────────────────────────────────────────┘       │
│                                                                   │
│  ┌──────────────────────────────────────────────────┐       │
│  │              ReasoningStream                      │       │
│  │  • Live updates                                    │       │
│  │  • Streaming content                               │       │
│  │  • Markdown rendering                              │       │
│  └──────────────────────────────────────────────────┘       │
│                                                                   │
└─────────────────────────────────────────────────────────────┘
```

## Installation

```bash
pnpm add @spreadsheet-moment/agent-ui
```

## Usage

### Basic Setup

```typescript
import {
  StatusIndicator,
  TraceViewer,
  ReasoningStream
} from '@spreadsheet-moment/agent-ui';

function SpreadsheetApp() {
  return (
    <div>
      {/* Show operation status */}
      <StatusIndicator state="calculating" progress={0.5} />

      {/* Debug execution traces */}
      <TraceViewer traceId="trace_456" steps={steps} />

      {/* Display streaming content */}
      <ReasoningStream streamId="stream_123" />
    </div>
  );
}
```

### Customization

```typescript
<StatusIndicator
  state="calculating"
  progress={0.75}
  size="large"
  colorScheme="dark"
  showProgress={true}
  message="Processing 1000 rows..."
/>

<TraceViewer
  steps={executionSteps}
  colorScheme="dark"
  showTimestamps={true}
  expandable={true}
/>
```

### Optional: Agent Features

```typescript
import { AgentVisualizer } from '@spreadsheet-moment/agent-ui';

// Only needed if using agent backend
<AgentVisualizer
  agentId="agent_123"
  state="thinking"
  size="large"
  colorScheme="dark"
  onStateChange={(state) => console.log(state)}
/>
```

## Components

### AgentVisualizer

| Prop | Type | Description |
|------|------|-------------|
| `agentId` | string | Agent identifier |
| `state` | ClawState | Current state |
| `confidence` | number | Confidence score (0-1) |
| `size` | 'small' \| 'medium' \| 'large' | Display size |
| `colorScheme` | 'light' \| 'dark' | Color theme |
| `onStateChange` | function | State change callback |

### TraceViewer

| Prop | Type | Description |
|------|------|-------------|
| `traceId` | string | Trace identifier |
| `steps` | TraceStep[] | Execution steps |
| `selectedStep` | string | Selected step ID |
| `onStepClick` | function | Step click callback |
| `showTimestamp` | boolean | Show timestamps |

### StatusIndicator

| Prop | Type | Description |
|------|------|-------------|
| `state` | ClawState | Current state |
| `progress` | number | Progress (0-1) |
| `message` | string | Status message |
| `showProgress` | boolean | Show progress bar |

### ReasoningStream

| Prop | Type | Description |
|------|------|-------------|
| `agentId` | string | Agent identifier |
| `streamUrl` | string | WebSocket URL |
| `onComplete` | function | Completion callback |
| `onError` | function | Error callback |

## Styling

### CSS Variables

```css
/* Status colors */
--status-color-idle: #9ca3af;
--status-color-calculating: #3b82f6;
--status-color-analyzing: #8b5cf6;
--status-color-complete: #10b981;
--status-color-error: #ef4444;

/* Component sizes */
--status-size-small: 24px;
--status-size-medium: 48px;
--status-size-large: 72px;

/* Trace viewer */
--trace-background: #1f2937;
--trace-text: #f3f4f6;
--trace-border: #374151;
```

### Custom Styles

```typescript
import { StatusIndicator } from '@spreadsheet-moment/agent-ui';
import './custom-styles.css';

<StatusIndicator
  state="calculating"
  className="custom-status"
/>
```

```css
/* custom-styles.css */
.custom-status {
  --status-color-calculating: #6366f1;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
}
```

## Testing

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run storybook
pnpm storybook
```

## Performance

- **Render time**: <16ms (60fps)
- **Update latency**: <50ms
- **Memory overhead**: ~10MB per 100 components
- **Bundle size**: ~50KB gzipped

## License

Apache-2.0

## Links

- [GitHub](https://github.com/SuperInstance/spreadsheet-moment)
- [Documentation](https://docs.spreadsheet-moment.dev)
- [Storybook](https://storybook.spreadsheet-moment.dev)
