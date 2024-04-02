FROM node:21.7.1-alpine3.18 as builder
WORKDIR /app
COPY tsconfig.json package.json package-lock.json ./
COPY src src
RUN npm ci && npm run build

FROM node:21.7.1-alpine3.18
WORKDIR /app
COPY --from=builder /app/dst dst
COPY --from=builder /app/node_modules node_modules

CMD ["node", "/app/dst/main.js"]