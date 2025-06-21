# Todo App with CI/CD Pipeline

A modern Todo application built with Next.js and TypeScript, featuring a complete CI/CD pipeline with automated testing and deployment.

## 🚀 Features

- ✅ Add, edit, and delete todos
- 🔄 Mark todos as complete/incomplete
- 🎯 Filter todos (All, Active, Completed)
- 💾 Local storage persistence
- 📱 Responsive design
- 🧪 Comprehensive test coverage
- 🔄 Automated CI/CD pipeline

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- GitHub account
- Vercel account (for deployment)

## 🏃‍♂️ Getting Started

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd todo-cicd-app
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Testing

### Run tests
\`\`\`bash
npm test
\`\`\`

### Run tests in watch mode
\`\`\`bash
npm run test:watch
\`\`\`

### Generate coverage report
\`\`\`bash
npm run test:coverage
\`\`\`

## 🚀 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Pipeline Stages:

1. **Continuous Integration (CI)**
   - Code checkout
   - Dependency installation
   - Linting
   - Unit testing with coverage
   - Build verification

2. **Continuous Deployment (CD)**
   - **Production**: Deploys to production on `main` branch
   - **Preview**: Creates preview deployments for PRs and `develop` branch

### Setting up CI/CD:

1. **Fork/Clone this repository**

2. **Set up Vercel project**
   \`\`\`bash
   npm install -g vercel
   vercel login
   vercel link
   \`\`\`

3. **Add GitHub Secrets**
   Go to your GitHub repository → Settings → Secrets and add:
   - `VERCEL_TOKEN`: Your Vercel access token
   - `VERCEL_ORG_ID`: From `.vercel/project.json`
   - `VERCEL_PROJECT_ID`: From `.vercel/project.json`

4. **Push to trigger pipeline**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

## 📊 Monitoring

- **GitHub Actions**: View pipeline status in the Actions tab
- **Vercel Dashboard**: Monitor deployments and performance
- **Test Coverage**: Automated coverage reports in CI

## 🌟 Best Practices Implemented

- **Version Control**: Git with feature branches
- **Automated Testing**: Unit tests with high coverage
- **Code Quality**: ESLint for consistent code style
- **Environment Separation**: Different deployments for dev/staging/prod
- **Artifact Management**: Build artifacts uploaded and reused
- **Security**: Secrets management for sensitive data

## 📚 Learning Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
