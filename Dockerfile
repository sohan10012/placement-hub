# STEP 1 — Build React frontend
FROM node:18 AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# STEP 2 — Build backend
FROM node:18 AS backend
WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend ./backend

# Copy frontend build into backend/dist
COPY --from=frontend-builder /app/dist ./backend/dist

# Expose backend port
EXPOSE 5000

# Run server
CMD ["node", "backend/server.js"]
