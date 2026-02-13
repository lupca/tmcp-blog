# Dockerfile for Astro SSR

# Base stage for building
FROM node:lts-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Runtime stage
FROM node:lts-alpine AS runtime
WORKDIR /app

# Copy built assets and production dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json .

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Start the server
CMD ["node", "./dist/server/entry.mjs"]
