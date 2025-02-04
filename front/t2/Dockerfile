FROM node:23-alpine

WORKDIR /app/front  

RUN apk add --no-cache curl

# Copy only package.json and package-lock.json first for caching benefits
COPY package.json package-lock.json .

COPY . .

RUN npm install

# Expose port 3000
EXPOSE 3000

# Build the application inside /app/front/t2
RUN npm run build 

# Start the production server from inside /app/front/t2
CMD ["npm", "start"]