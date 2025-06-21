# Complete CI/CD Guide for Beginners

## What is CI/CD?

**Continuous Integration (CI)** and **Continuous Deployment (CD)** are practices that help teams deliver code changes more frequently and reliably.

- **CI**: Automatically test and validate code changes
- **CD**: Automatically deploy validated changes to production

## Step-by-Step Setup Guide

### Step 1: Version Control Setup

1. **Initialize Git repository**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   \`\`\`

2. **Create GitHub repository**
   - Go to GitHub.com
   - Click "New repository"
   - Push your local code:
   \`\`\`bash
   git remote add origin <your-repo-url>
   git push -u origin main
   \`\`\`

### Step 2: CI Pipeline Setup

Our CI pipeline runs on every push and pull request:

\`\`\`yaml
# .github/workflows/ci-cd.yml
test:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Build
      run: npm run build
\`\`\`

**What happens:**
1. Code is checked out from repository
2. Node.js environment is set up
3. Dependencies are installed
4. Tests are run
5. Application is built

### Step 3: Automated Testing

We use Jest and React Testing Library:

\`\`\`javascript
// Example test
test('adds a new todo', async () => {
  render(<TodoApp />)
  
  const input = screen.getByTestId('todo-input')
  const addButton = screen.getByTestId('add-button')
  
  fireEvent.change(input, { target: { value: 'Test todo' } })
  fireEvent.click(addButton)
  
  await waitFor(() => {
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })
})
\`\`\`

**Testing Best Practices:**
- Test user interactions, not implementation details
- Use data-testid for reliable element selection
- Test both happy path and edge cases
- Aim for high test coverage (80%+)

### Step 4: Deployment Setup

We deploy to Vercel using GitHub Actions:

1. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   vercel login
   \`\`\`

2. **Link project**
   \`\`\`bash
   vercel link
   \`\`\`

3. **Add secrets to GitHub**
   - Go to repository Settings → Secrets
   - Add: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

4. **Deployment happens automatically**
   - Main branch → Production
   - Pull requests → Preview deployments

### Step 5: Monitoring

**GitHub Actions Dashboard:**
- View pipeline status
- See build logs
- Monitor deployment history

**Vercel Dashboard:**
- Monitor application performance
- View deployment logs
- Set up custom domains

## Common CI/CD Patterns

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development

### Environment Strategy
- **Development**: Local development
- **Staging**: Testing environment (preview deployments)
- **Production**: Live application

### Pipeline Stages
1. **Build**: Compile and package code
2. **Test**: Run automated tests
3. **Security**: Scan for vulnerabilities
4. **Deploy**: Release to environments
5. **Monitor**: Track performance and errors

## Troubleshooting Common Issues

### Tests Failing
\`\`\`bash
# Run tests locally first
npm test

# Check test coverage
npm run test:coverage

# Debug specific test
npm test -- --verbose TodoApp
\`\`\`

### Build Failures
\`\`\`bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run type-check

# Verify dependencies
npm ci
\`\`\`

### Deployment Issues
\`\`\`bash
# Check Vercel logs
vercel logs

# Test deployment locally
vercel dev

# Verify environment variables
vercel env ls
\`\`\`

## Next Steps

1. **Add more tests**: Increase coverage to 90%+
2. **Add code quality tools**: Prettier, Husky, lint-staged
3. **Implement feature flags**: Control feature rollouts
4. **Add monitoring**: Error tracking, performance monitoring
5. **Database integration**: Add persistent storage
6. **Security scanning**: Add vulnerability checks

## Key Takeaways

- **Start simple**: Basic CI/CD is better than none
- **Test everything**: Automated tests catch bugs early
- **Deploy often**: Small, frequent deployments reduce risk
- **Monitor actively**: Know when things break
- **Iterate**: Continuously improve your pipeline

This setup gives you a production-ready CI/CD pipeline that scales with your project!
