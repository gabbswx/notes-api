# Dockerfile (arc-api)
FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]
