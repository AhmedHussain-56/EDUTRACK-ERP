#!/bin/bash

echo "🚀 Generating College ERP System project..."

# Create project directory structure
mkdir -p college-erp-system-export/{src/{components,contexts,types},public}
cd college-erp-system-export

# Copy all current files
cp -r ../src ./
cp ../package.json ./
cp ../index.html ./
cp ../vite.config.ts ./
cp ../tailwind.config.js ./
cp ../tsconfig.json ./
cp ../tsconfig.app.json ./
cp ../tsconfig.node.json ./
cp ../postcss.config.js ./
cp ../eslint.config.js ./

echo "✅ Project files copied to: college-erp-system-export/"
echo "📁 You can now zip this folder manually or use:"
echo "   tar -czf college-erp-system.tar.gz college-erp-system-export/"

# Create README
cat > README.md << 'EOF'
# College ERP System

A modern, responsive web application for college management.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Demo Credentials

- Admin: admin@college.edu / admin123
- Staff: staff@college.edu / staff123  
- Student: student@college.edu / student123

## Features

- Role-based dashboards
- Admissions management
- Fee collection & receipts
- Hostel allocation
- Exam records
- Real-time analytics
EOF

echo "📖 README.md created"
echo "🎉 Project export complete!"