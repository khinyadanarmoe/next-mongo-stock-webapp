#!/bin/bash
# Azure deployment script for Next.js app

echo "Building Next.js application for production..."

# Make sure we're in the right directory
cd /var/www/app/next-mongo-stock-webapp

# Ensure the .env file exists with correct settings
cat > .env << EOL
MONGODB_URI=mongodb+srv://company-app:company-app123@cluster0.xzkm7.mongodb.net/stock?retryWrites=true&w=majority
API_BASE=/api
NEXT_PUBLIC_API_URL=/stock/api
EOL

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [
    {
      name: "stock-app",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      env: {
        NODE_ENV: "production",
        MONGODB_URI: "mongodb+srv://company-app:company-app123@cluster0.xzkm7.mongodb.net/stock?retryWrites=true&w=majority",
        API_BASE: "/api",
        NEXT_PUBLIC_API_URL: "/stock/api"
      }
    }
  ]
};
EOL

# Start or restart the application with PM2
if pm2 list | grep -q "stock-app"; then
  echo "Restarting application..."
  pm2 restart stock-app
else
  echo "Starting application..."
  pm2 start ecosystem.config.js
fi

echo "Deployment completed!"