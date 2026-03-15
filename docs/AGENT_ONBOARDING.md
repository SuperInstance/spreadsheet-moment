# Spreadsheet Moment - Agent Onboarding Guide

## Welcome to Spreadsheet Moment!

This guide will help you get up to speed quickly with building intelligent spreadsheets.

## Quick Start (5 Minutes)

### Step 1: Choose Your Deployment

**Option A: Cloudflare Workers (Recommended)**
```bash
npm install -g wrangler
wrangler login
cd spreadsheet-moment/website
wrangler deploy
```

**Option B: Docker**
```bash
docker pull superinstance/spreadsheet-moment:latest
docker run -p 8080:8080 superinstance/spreadsheet-moment
```

**Option C: Local Python**
```bash
pip install spreadsheet-moment
spreadsheet-moment serve
```

### Step 2: Open Your Browser

Navigate to `http://localhost:8080` (or your deployed URL)

### Step 3: Create Your First Agent Cell

1. Click "New Spreadsheet"
2. Click any cell (e.g., A1)
3. Type: `=AGENT("Hello, world!")`
4. Press Enter
5. Your cell comes alive! 🎉

## Understanding Cell Agents

### What is a Cell Agent?

A cell agent is an AI-powered entity that lives in a spreadsheet cell. It can:
- **Reason** about data using advanced AI
- **Communicate** with other cells
- **Connect** to external systems
- **Learn** and adapt over time

### Basic Agent Syntax

```
=AGENT(input, "task", "instructions")
```

**Examples:**
```excel
=AGENT(42, "explain", "what does this number mean?")
=AGENT(A1, "predict", "next value in sequence")
=AGENT(A1:B10, "analyze", "find patterns")
```

## Cell Types Deep Dive

### 1. Predictor Cells

Forecast future values based on historical data.

```excel
Cell A1: =HTTP_GET("https://api.weather.com/temp")
Cell A2: =PREDICTOR(A1, {"lookback": 100, "horizon": 10})
```

**Parameters:**
- `lookback`: How many historical points to consider
- `horizon`: How many steps ahead to predict
- `model`: AI model to use (default: auto-select)

### 2. Controller Cells

Maintain a setpoint by adjusting outputs (like a thermostat).

```excel
Cell A1: =SERIAL_READ("COM3")  # Temperature sensor
Cell A2: =72  # Target temperature
Cell A3: =CONTROLLER(A2, A1, {"Kp": 2.0, "Ki": 0.1})
Cell A4: =SERIAL_WRITE("COM3", A3.output)  # Send to heater
```

**Parameters:**
- `Kp`: Proportional gain
- `Ki`: Integral gain
- `Kd`: Derivative gain (optional)

### 3. Monitor Cells

Watch for conditions and trigger actions.

```excel
Cell A1: =SERIAL_READ("COM3")
Cell A2: =MONITOR(A1, {
  "conditions": [
    {"operator": ">", "threshold": 100, "action": "alert"},
    {"operator": "<", "threshold": 0, "action": "shutdown"}
  ]
})
```

### 4. Consensus Cells

Coordinate multiple cells to reach agreement.

```excel
Cell A1: =SENSOR_READ("temp_1")
Cell A2: =SENSOR_READ("temp_2")
Cell A3: =SENSOR_READ("temp_3")
Cell A4: =CONSENSUS([A1, A2, A3], "se3_equivariant")
```

## I/O Connections

### Hardware Connections

**Arduino (Serial/USB):**
```excel
Cell A1: =SERIAL_OPEN("COM3", 9600)
Cell A2: =SERIAL_READ(A1, "format:json")
Cell A3: =SERIAL_WRITE(A1, {"led": "on"})
```

**ESP32 (WiFi):**
```excel
Cell A1: =ESP32_CONNECT("192.168.1.100")
Cell A2: =ESP32_READ_PIN(A1, 5, "input")
Cell A3: =ESP32_PWM(A1, 6, A2.value)
```

**Raspberry Pi (GPIO):**
```excel
Cell A1: =GPIO_SETUP(17, "input")
Cell A2: =GPIO_READ(17)
Cell A3: =GPIO_WRITE(18, A2.value)
```

### Network Connections

**HTTP/HTTPS:**
```excel
Cell A1: =HTTP_GET("https://api.example.com/data")
Cell A2: =HTTP_POST("https://api.example.com/log", {"data": A1})
Cell A3: =HTTP_STREAM("https://api.example.com/feed", "update_cell")
```

**WebSocket:**
```excel
Cell A1: =WS_CONNECT("wss://example.com/stream")
Cell A2: =WS_SEND(A1, {"action": "subscribe"})
Cell A3: =WS_ON_MESSAGE(A1, "process_message")
```

**MQTT:**
```excel
Cell A1: =MQTT_CONNECT("broker.example.com", 1883)
Cell A2: =MQTT_SUBSCRIBE(A1, "home/sensors/temp")
Cell A3: =MQTT_PUBLISH(A1, "home/command", {"action": "on"})
```

## Common Patterns

### Pattern 1: Read-Process-Write

```excel
Cell A1: =SERIAL_READ("COM3")           # Read sensor
Cell A2: =AGENT(A1, "smooth", "moving average")  # Process
Cell A3: =SERIAL_WRITE("COM4", A2.output)  # Write actuator
```

### Pattern 2: Monitor-Alert-Act

```excel
Cell A1: =HTTP_GET("https://api.status.com/health")
Cell A2: =MONITOR(A1.status, {"==": "down", "action": "alert_admin"})
Cell A3: =IF(A2.alert, SEND_EMAIL("admin@example.com"), "OK")
```

### Pattern 3: Predict-Decide-Execute

```excel
Cell A1: =HTTP_GET("https://api.market.com/BTC")
Cell A2: =PREDICTOR(A1.price, {"model": "lstm", "horizon": 5})
Cell A3: =IF(A2.confidence > 0.8, TRADE("BTC", "BUY", 0.1), "HOLD")
```

### Pattern 4: Aggregate-Analyze-Visualize

```excel
Cell A1: =HTTP_GET("https://api.data.com/stream")
Cell A2: =AGENT(A1, "aggregate", "hourly_stats")
Cell A3: =CHART(A2.history, "line")
```

## Frontend Options

### Cocapn.ai (Playful)

- Pirate-themed interface with lobster mascot 🦞
- Casual language ("Ahoy!", "Clawing into data!")
- Great for: Education, hobbyists, casual users

### Capitaine.ai (Professional)

- Maritime professional theme ⚓
- Formal language ("Aye captain", "All systems nominal")
- Great for: Business, industry, professional use

### API (Programmatic)

- Direct REST/WebSocket API access
- Full control for automation
- Great for: Integration, custom frontends, headless operation

## Tips and Tricks

### Performance Tips

1. **Use streaming** for continuous data instead of polling
2. **Batch operations** when updating many cells
3. **Cache I/O connections** - reuse instead of reopening
4. **Use TT compression** for large cell states
5. **Set appropriate timeouts** for I/O operations

### Debugging Tips

1. **Use `SHOW_THINKING()`** to see agent reasoning
2. **Enable `TRACE()`** for detailed execution logs
3. **Check `IO_HEALTH()`** for connection status
4. **Use `PROFILE()`** to identify bottlenecks
5. **Monitor cell memory** with `GET_STATE(cell, "memory")`

### Best Practices

1. **Always check I/O health** before operations
2. **Use error handling** with `TRY()`/`CATCH()`
3. **Close connections** when done
4. **Document your cells** with comments
5. **Test locally** before deploying to cloud

## Advanced Topics

### Multi-Modal Agents

```excel
Cell A1: =AGENT({
  "text": "Analyze this",
  "image": IMAGE_URL("https://example.com/photo.jpg"),
  "audio": AUDIO_URL("https://example.com/speech.mp3")
}, "multimodal", "analyze all inputs")
```

### Ensemble Agents

```excel
Cell A1: =ENSEMBLE([
  PREDICTOR(data, "model:lstm"),
  PREDICTOR(data, "model:arima"),
  PREDICTOR(data, "model:prophet")
], "voting")
```

### Hierarchical Agents

```excel
Cell A1: =HIERARCHY({
  "supervisor": AGENT(all_data, "coordinate"),
  "workers": [
    AGENT(data_a, "process_a"),
    AGENT(data_b, "process_b"),
    AGENT(data_c, "process_c")
  ]
})
```

## Troubleshooting

### Common Issues

**Issue:** Cell shows "Connecting..." forever
**Solution:** Check I/O health with `IO_HEALTH(cell)`

**Issue:** Agent not responding
**Solution:** Check agent logs with `SHOW_LOGS(cell)`

**Issue:** High memory usage
**Solution:** Use TT compression: `COMPRESS(cell, "tt")`

**Issue:** Slow updates
**Solution:** Switch to streaming I/O instead of polling

### Getting Help

- **Documentation:** https://docs.superinstance.ai
- **GitHub Issues:** https://github.com/SuperInstance/spreadsheet-moment/issues
- **Discord:** https://discord.gg/superinstance
- **Email:** support@superinstance.ai

## Next Steps

1. ✅ Complete your first agent cell
2. 📖 Read [Architecture Guide](ARCHITECTURE.md)
3. 🔌 Explore [I/O Connections](IO_CONNECTIONS.md)
4. 🤖 Learn [Cell Agent API](CELL_AGENT_API.md)
5. 🚀 Build your first intelligent spreadsheet!

## Welcome Aboard!

**From ancient cells to living spreadsheets — the next evolution of data.**

You're now part of the Spreadsheet Moment community. Happy spreadsheeting! 🚀
