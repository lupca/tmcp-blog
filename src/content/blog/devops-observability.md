---
title: 'Modern Observability Stack: From Logs to Traces'
description: 'Building a comprehensive observability pipeline that connects logs, metrics, and traces to give you full visibility into your distributed systems.'
pubDate: 'Jan 28 2026'
heroImage: '../../assets/hero-observability.png'
tags: ['Observability', 'DevOps', 'Infrastructure']
---

"It works on my machine" is a running joke in software engineering. But in the world of distributed systems, even "it works in staging" does not guarantee production behavior. Microservices communicate over networks, databases have contention patterns that only emerge under load, and race conditions hide in the gaps between services.

Observability is how we bridge this gap — not just monitoring the system, but understanding it.

## The Three Pillars, Connected

Observability rests on three pillars, but their real power comes from connecting them:

- **Logs** — Discrete events with context (what happened)
- **Metrics** — Aggregated numerical measurements over time (how much)
- **Traces** — End-to-end request flows across services (where)

Most teams start by collecting each pillar independently. Logs go to one system, metrics to another, traces to a third. The breakthrough comes when you connect them: a spike in an error metric should link to the specific traces that failed, and each trace should link to the relevant log entries.

## Structured Logging Done Right

The first mistake teams make is treating logs as free-form text. `console.log("Something went wrong")` tells you nothing useful in production.

Structured logging means every log entry is a JSON object with consistent fields:

```json
{
  "timestamp": "2026-01-28T10:30:00Z",
  "level": "error",
  "service": "payment-service",
  "trace_id": "abc123def456",
  "message": "Payment processing failed",
  "error": "timeout after 5000ms",
  "customer_id": "cust_789",
  "amount_cents": 4999
}
```

Key principles:
- Always include a `trace_id` to correlate with distributed traces
- Use consistent field names across all services
- Log at the right level — errors for failures, info for business events, debug for development
- Never log sensitive data (passwords, tokens, PII)

## Distributed Tracing in Practice

When a user request touches five different services, a single trace shows you exactly where time is spent and where failures occur. We use OpenTelemetry as the instrumentation standard — it is vendor-neutral and supported by every major observability platform.

A typical trace for an API request looks like:

```
[API Gateway] 250ms
  └─ [Auth Service] 15ms
  └─ [Business Logic] 180ms
       └─ [Database Query] 45ms
       └─ [Cache Lookup] 3ms
       └─ [External API] 120ms
  └─ [Response Serialization] 5ms
```

From this trace, you can immediately see that the external API call dominates the response time. Without tracing, you might spend hours guessing.

## Metrics That Matter

Not all metrics are created equal. We follow the RED method for service-level metrics:

- **Rate** — Requests per second
- **Errors** — Failed requests per second
- **Duration** — Response time distribution (p50, p95, p99)

And the USE method for infrastructure metrics:

- **Utilization** — How busy is the resource?
- **Saturation** — How much work is queued?
- **Errors** — How many errors occurred?

The key is to set up meaningful alerts, not noisy ones. Alerting on every 500 error leads to alert fatigue. Instead, alert on sustained error rate increases or significant latency degradation.

## Building the Pipeline

Our observability pipeline flows through four stages:

1. **Instrumentation** — Application code emits logs, metrics, and traces using OpenTelemetry SDKs
2. **Collection** — An agent running alongside each service collects and batches telemetry data
3. **Processing** — A central pipeline enriches, filters, and routes data to appropriate backends
4. **Visualization** — Dashboards and query interfaces for analysis and alerting

The processing stage is where the magic happens. We enrich traces with deployment metadata (version, environment), filter out health check noise, and compute derived metrics like error budgets.

## SLOs and Error Budgets

Service Level Objectives (SLOs) transform observability from reactive monitoring into proactive quality management. Instead of asking "Is the system up?", we ask "Is the system meeting its quality targets?"

For example:
- 99.9% of API requests complete within 500ms
- 99.95% of payment transactions succeed
- 99.99% uptime for the authentication service

The error budget is the inverse: if your SLO is 99.9% availability, you have a 0.1% error budget per month — roughly 43 minutes of downtime. When the error budget is healthy, teams can move fast and ship features. When it is burning down, teams slow down and focus on reliability.

## The Observability Mindset

Tools and pipelines are necessary, but observability is ultimately a mindset:

- **Instrument everything from day one** — retroactively adding observability is painful
- **Make dashboards actionable** — every panel should answer a specific question
- **Practice incident response** — run game days to exercise your observability tools under pressure
- **Share context broadly** — everyone on the team should be able to investigate production issues

The goal is not to prevent all failures — that is impossible in distributed systems. The goal is to detect failures quickly, understand them deeply, and resolve them confidently. Good observability turns a 3-hour mystery into a 10-minute fix.
