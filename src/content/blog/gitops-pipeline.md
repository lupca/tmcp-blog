---
title: 'GitOps in Practice: Automating Your Deployment Pipeline'
description: 'How we implemented GitOps to achieve fully automated, auditable, and reproducible deployments across our entire infrastructure.'
pubDate: 'Feb 05 2026'
heroImage: '../../assets/hero-gitops.png'
tags: ['DevOps', 'GitOps', 'CI/CD']
---

Deployments used to be stressful. Someone would SSH into a server, run a script, and pray. If something went wrong, the rollback was "try to remember what the config looked like before." GitOps changed everything for us — not just as a deployment strategy, but as a philosophy for managing infrastructure.

## What GitOps Actually Means

GitOps is simple in principle: Git is the single source of truth for your infrastructure. Every change — whether it is a new service deployment, a configuration update, or an infrastructure modification — starts as a commit to a Git repository.

The three pillars we follow:

1. **Declarative configuration** — Define what your infrastructure should look like, not how to get there
2. **Version-controlled** — Every change is a commit with an author, timestamp, and message
3. **Automated reconciliation** — A controller continuously ensures the actual state matches the desired state

## Our GitOps Stack

Our stack is straightforward:

- **Git repositories** — Separate repos for application code and infrastructure manifests
- **CI pipeline** — Builds, tests, and pushes container images on every merge to main
- **GitOps controller** — Watches the infrastructure repo and applies changes to the cluster
- **Container registry** — Stores versioned container images

The flow works like this:

```
Developer pushes code → CI builds image → CI updates manifest → Controller deploys
```

The critical design decision here is separating application code from deployment manifests. This gives us independent version histories and the ability to deploy infrastructure changes without rebuilding applications.

## Repository Structure

We organize our GitOps repository by environment and service:

```
gitops/
├── base/              # Shared configurations
│   ├── blog.yaml
│   ├── dashboard.yaml
│   └── agent.yaml
├── overlays/
│   ├── staging/       # Staging-specific overrides
│   └── production/    # Production-specific overrides
└── scripts/           # Automation helpers
```

Base manifests contain the common configuration, while overlays handle environment-specific differences like replica counts, resource limits, and environment variables. This reduces duplication and makes it easy to promote changes from staging to production.

## Automated Rollbacks

One of the biggest wins of GitOps is rollbacks. Since every deployment is a Git commit, rolling back is literally `git revert`:

```bash
git revert HEAD
git push origin main
```

The controller detects the change and automatically rolls back the deployment. No SSH, no manual intervention, no guesswork. The entire history is auditable — you can see exactly who deployed what, when, and why.

## Handling Secrets

Secrets are the one thing you should never put in Git as plaintext. We use sealed secrets — encrypted at rest, decrypted only inside the cluster. The workflow:

1. Developer creates a secret locally
2. Secret is encrypted using the cluster's public key
3. Encrypted secret is committed to Git
4. Controller decrypts and applies inside the cluster

This keeps the GitOps workflow intact while maintaining security. The encrypted secrets can be reviewed in PRs — you can see that a secret changed, even if you cannot see the value.

## Monitoring the Pipeline

A GitOps pipeline is only as good as its observability. We monitor:

- **Sync status** — Is the actual state matching the desired state?
- **Deployment frequency** — How often are we deploying?
- **Lead time** — How long from commit to production?
- **Failure rate** — What percentage of deployments fail?

These are the DORA metrics that measure engineering team performance. GitOps makes them trivially easy to collect since every deployment is a trackable event.

## The Cultural Shift

The biggest impact of GitOps was not technical — it was cultural. When every change is a pull request:

- **Junior engineers deploy with confidence** — The process is the same whether you are changing a typo or scaling a database
- **Code review extends to infrastructure** — Changes are reviewed before they are applied
- **Incident response improves** — "What changed?" becomes a simple `git log` query
- **Compliance is built in** — You have a complete audit trail by default

GitOps is not a tool you install. It is a practice you adopt. Start with one service, prove the value, and expand from there. Your future self — the one who gets paged at 3 AM — will thank you.
