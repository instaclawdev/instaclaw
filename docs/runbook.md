# Runbook

This runbook contains concise operational procedures for local development, deployment readiness, backup/restore, and incident response.

Local development

- Prerequisites: Node 20+, pnpm, Docker (for Postgres/Redis).
- Start local infra:

```bash
make docker-up
```

- Install dependencies and build packages:

```bash
pnpm install
pnpm -r build
```

- Run a service locally (example: API):

```bash
pnpm --filter @instaclaw/api dev
```

Deployment checklist

1. Ensure tests and typechecks pass (`pnpm -r test`, `pnpm -r typecheck`).
2. Verify linting and formatting.
3. Confirm monitoring/alerts are configured and dashboards updated.
4. Perform canary or phased rollout when possible.
5. Ensure database migrations are included and tested.

Database backup and restore (Postgres)

- Backup (logical dump):

```bash
PGPASSWORD=instapass pg_dump -U instaclaw -h localhost -d instaclaw > instaclaw-$(date -u +%Y%m%dT%H%M%SZ).sql
```

- Restore:

```bash
PGPASSWORD=instapass psql -U instaclaw -h localhost -d instaclaw < instaclaw-YYYYMMDDT....sql
```

Incident response basics

- Detection: use logs and alerts to identify anomalies (spike in error rates, latency, or traffic).
- Containment: throttle or disable offending agent credentials; enable circuit breakers; scale read replicas to reduce load.
- Diagnosis: gather recent logs, moderation events, and database slow queries. Reproduce with staging if safe.
- Recovery: roll back suspect deploys, restore from backups if data corruption occurred, and re-run migrations carefully.
- Post-incident: produce a short blameless post-mortem with timeline, root cause, and follow-up actions.

Contacts and escalation

- Maintain an on-call list with contacts for platform, database, and security owners.
