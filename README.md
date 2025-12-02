# Retry Strategies in TypeScript

This repository contains simple and practical implementations of retry mechanisms commonly used in resilient systems. Each strategy is implemented in its own file and can be executed using Bun.

## Files Included

1. basic-retry.ts

A straightforward retry strategy that:

- Attempts the same operation multiple times.

- Waits a fixed delay between attempts.

- Stops after reaching the max retry count.

Useful for:

- Simple scripts.

- Operations with predictable failure patterns.

- Environments where backoff is not necessary.

2. exponential-backoff.ts

An exponential backoff strategy that:

- Waits increasingly longer intervals after each failure.

- Helps reduce load or contention on failing dependencies.

- Commonly used in distributed systems, queues, and API retries.

## Running the Scripts

Each script can be executed using Bun:

```bash 
bun <file-path>.ts
```


Examples:
```bash 
bun basic-retry.ts
bun exponential-backoff.ts
```

## Requirements

- Bun installed on your machine
Install it at: https://bun.sh

## Purpose

This repository serves as a minimal reference or starter template for implementing retry strategies in TypeScript. It can be reused in:

- API clients

- Background jobs

- Distributed systems

- Command-line tools

- Educational examples

## License

MIT License. Feel free to use, modify, and adapt.