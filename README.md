# Node, Deno and Bun

Aim of the project is to feel difference in developer
experience between backend JavaScript runtimes: [Node](https://nodejs.org/), [Deno](https://deno.com/) and [Bun](https://bun.sh/).

You don't need to have all this runtimes installed. Just docker and docker compose.

If you want to try:
1. Build images and run:
    ```shell
    make build
    make run
    ```
2. Look at logs:
    ```shell
    make logs
    ```
3. Make request (from another terminal):
    ```shell
    make start_jump
    ```
4. See output!

If you want to try each runtime separately, see docs:
- [Node](./node/README.md)
- [Deno](./deno/README.md)
- [Bun](./bun/README.md)