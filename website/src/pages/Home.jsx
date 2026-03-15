import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Every Cell is an<br />
            <span className="gradient-text">Intelligent Agent</span>
          </h1>
          <p className="hero-subtitle">
            Transform your spreadsheets with AI-powered cells that reason, communicate, and connect to the real world.
          </p>
          <div className="hero-actions">
            <Link to="/download" className="btn btn-primary btn-large">
              Get Started Free
            </Link>
            <Link to="/docs" className="btn btn-secondary btn-large">
              Read the Docs
            </Link>
          </div>
          
          <div className="hero-demo">
            <div className="spreadsheet-preview">
              <div className="cell agent-cell">
                <div className="cell-icon">🤖</div>
                <div className="cell-content">
                  <div className="cell-formula">=AGENT("Monitor temperature")</div>
                  <div className="cell-status">Active</div>
                </div>
              </div>
              <div className="cell io-cell">
                <div className="cell-icon">🔌</div>
                <div className="cell-content">
                  <div className="cell-formula">=SERIAL_READ("COM3")</div>
                  <div className="cell-value">72.5°F</div>
                </div>
              </div>
              <div className="cell agent-cell">
                <div className="cell-icon">📊</div>
                <div className="cell-content">
                  <div className="cell-formula">=PREDICT(B2, "next_hour")</div>
                  <div className="cell-value">73.2°F</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="features-overview">
        <div className="container">
          <h2 className="section-title">Why Spreadsheet Moment?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Agent-Based Cells</h3>
              <p>Every cell contains an AI agent that can reason, learn, and make autonomous decisions.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔌</div>
              <h3>Universal I/O</h3>
              <p>Connect cells to Arduino, ESP32, HTTP APIs, databases, and more.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-Time</h3>
              <p>Microsecond latency responses for time-critical applications.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Multi-Frontend</h3>
              <p>Cocapn.ai for playful users, Capitaine.ai for professionals.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Cloudflare Workers</h3>
              <p>Deploy instantly, scale globally, pay only for what you use.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔓</div>
              <h3>Open Source</h3>
              <p>MIT license. Self-hostable. No vendor lock-in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases">
        <div className="container">
          <h2 className="section-title">Built for Everyone</h2>
          <div className="use-cases-grid">
            <div className="use-case">
              <h3>🏭 Smart Manufacturing</h3>
              <p>Monitor sensors, control equipment, detect anomalies, and optimize production in real-time.</p>
            </div>
            
            <div className="use-case">
              <h3>💹 Financial Trading</h3>
              <p>Connect to market data feeds, run predictive models, execute trades automatically.</p>
            </div>
            
            <div className="use-case">
              <h3>🏠 Home Automation</h3>
              <p>Control IoT devices, monitor energy usage, automate routines with intelligent agents.</p>
            </div>
            
            <div className="use-case">
              <h3>🔬 Research & Science</h3>
              <p>Collect experimental data, run analyses, visualize results in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Spreadsheets?</h2>
          <p>Join thousands of users already building intelligent spreadsheets.</p>
          <Link to="/download" className="btn btn-primary btn-large">
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
