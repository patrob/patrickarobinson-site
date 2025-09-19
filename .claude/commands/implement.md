# Implement the Plan

You are tasked with executing technical implementation plans systematically, with focus on code quality, testing, and production readiness.

## Initial Response

When invoked, respond with:
```
Starting technical implementation. I'll execute the plan systematically with continuous validation.

Please provide:
1. Implementation plan file (or key objectives)
2. Current development setup status
3. Any immediate blockers or constraints
4. Preferred git workflow

I'll implement, test, and validate each phase before proceeding.
```

Then wait for context.

## Implementation Philosophy

**Code-First Development**:
- Write tests before implementation (TDD)
- Validate after every significant change
- Commit working states frequently
- Deploy to staging early and often

**Quality Gates**:
- All tests must pass before proceeding
- Code review standards enforced
- Performance benchmarks met
- Security scans clean

## Implementation Process

### Step 1: Development Environment Setup

```bash
# Verify development environment
1. Check git status and branch
2. Verify dependencies installed
3. Run existing test suite
4. Confirm development database running
5. Test development server starts

Environment Ready ✓
```

Create implementation tracking:
```markdown
Implementation Progress:
- [ ] Phase 1: Database & Models
- [ ] Phase 2: Business Logic
- [ ] Phase 3: API Layer
- [ ] Phase 4: Testing
- [ ] Phase 5: Deployment

Current: Phase 1 - Starting implementation
```

### Step 2: Git Workflow Management

```bash
# Create feature branch
git checkout -b feature/[ticket-number]-[description]

# Example naming
git checkout -b feature/ENG-1234-user-authentication
git checkout -b fix/critical-memory-leak
git checkout -b refactor/extract-user-service
```

Commit strategy:
```bash
# Atomic commits for each logical unit
git commit -m "feat: add user model with validation"
git commit -m "test: add user service unit tests"
git commit -m "fix: handle edge case in validation"
```

### Step 3: Phase-by-Phase Implementation

#### Phase Implementation Pattern

For each phase:

1. **Start Phase**:
   ```
   Starting Phase [X]: [Name]

   Tasks in this phase:
   - [ ] Task 1: [Description]
   - [ ] Task 2: [Description]
   - [ ] Task 3: [Description]

   Beginning with Task 1...
   ```

2. **Implement Each Task**:
   ```python
   # Task implementation approach
   1. Write failing test first (TDD)
   2. Implement minimal code to pass
   3. Refactor for quality
   4. Validate against acceptance criteria
   5. Commit working state
   ```

3. **Validate Task Completion**:
   ```bash
   # Run validation suite
   npm run test          # Unit tests
   npm run lint         # Code quality
   npm run typecheck    # Type safety
   npm run test:integration  # Integration tests
   ```

#### Example: Database Implementation

```sql
-- Phase 1.1: Create migration
-- migrations/001_create_users_table.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

```bash
# Apply migration
npm run migrate:up

# Verify schema
npm run db:verify
```

```typescript
// Phase 1.2: Implement model
// src/models/User.ts
export class User {
  constructor(
    public id: string,
    public email: string,
    private passwordHash: string,
    public createdAt: Date
  ) {}

  static async create(email: string, password: string): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    // Implementation...
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}
```

```typescript
// Phase 1.3: Write tests FIRST
// tests/models/User.test.ts
describe('User Model', () => {
  describe('create', () => {
    it('should create user with hashed password', async () => {
      const user = await User.create('test@example.com', 'password123');

      expect(user.email).toBe('test@example.com');
      expect(user.id).toBeDefined();
      expect(await user.validatePassword('password123')).toBe(true);
      expect(await user.validatePassword('wrong')).toBe(false);
    });

    it('should throw error for invalid email', async () => {
      await expect(User.create('invalid-email', 'password'))
        .rejects.toThrow('Invalid email format');
    });
  });
});
```

### Step 4: Continuous Validation

After each task:

```bash
# Automated validation pipeline
npm run validate  # Runs all checks

# If validation passes:
git add .
git commit -m "feat: implement user model with tests"

# If validation fails:
# Fix issues before proceeding
```

Progress update:
```
Task 1.1 Complete: ✅ Database migration
- Migration applied successfully
- Schema matches specification
- Indexes created for performance

Task 1.2 Complete: ✅ User model implementation
- Model class with validation
- Password hashing implemented
- Unit tests passing (8/8)

Phase 1 Status: 60% complete
Next: Repository layer implementation
```

### Step 5: Integration Points

When connecting components:

```typescript
// Example: Service + Repository integration
// tests/integration/UserService.test.ts
describe('User Service Integration', () => {
  beforeEach(async () => {
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(async () => {
    await db.migrate.rollback();
  });

  it('should create user end-to-end', async () => {
    const userService = new UserService(
      new UserRepository(db),
      new EmailService(mockEmailProvider)
    );

    const user = await userService.createUser({
      email: 'test@example.com',
      password: 'securePassword123'
    });

    // Verify database state
    const dbUser = await db('users').where({ id: user.id }).first();
    expect(dbUser).toBeDefined();
    expect(dbUser.email).toBe('test@example.com');
  });
});
```

### Step 6: API Implementation with Testing

```typescript
// Implement API endpoint
// src/controllers/UserController.ts
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/users')
  @ValidateBody(CreateUserSchema)
  async create(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(422).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
```

```typescript
// Test the API endpoint
// tests/api/users.test.ts
describe('POST /users', () => {
  it('should create user with valid data', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'newuser@example.com',
        password: 'securePassword123'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('newuser@example.com');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should return 422 for invalid email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'invalid-email',
        password: 'password123'
      });

    expect(response.status).toBe(422);
    expect(response.body.errors).toContain('Invalid email format');
  });
});
```

### Step 7: Issue Resolution

When implementation doesn't match plan:

```
Issue Detected:
Plan Expected: User.create() to return Promise<User>
Actual Reality: Database constraint error on email uniqueness

Analysis:
- Plan didn't account for duplicate email handling
- Need to add proper error handling
- Update tests to cover this scenario

Resolution:
1. Add custom error for duplicate email
2. Update service to handle gracefully
3. Add test for duplicate email scenario
4. Update API to return appropriate error code

Impact: Minor - adds 30 minutes to implementation
```

```typescript
// Updated implementation
export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`Email ${email} already exists`);
    this.name = 'DuplicateEmailError';
  }
}

// In UserService
async createUser(data: CreateUserDTO): Promise<User> {
  try {
    return await this.repository.create(data);
  } catch (error) {
    if (error.code === '23505') { // PostgreSQL unique violation
      throw new DuplicateEmailError(data.email);
    }
    throw error;
  }
}
```

### Step 8: Performance Validation

```typescript
// Performance test implementation
// tests/performance/user-creation.test.ts
describe('User Creation Performance', () => {
  it('should create 100 users under 1 second', async () => {
    const startTime = Date.now();

    const promises = Array.from({ length: 100 }, (_, i) =>
      userService.createUser({
        email: `user${i}@example.com`,
        password: 'password123'
      })
    );

    await Promise.all(promises);

    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(1000);
  });
});
```

```bash
# Run performance benchmarks
npm run test:performance

# Monitor resource usage
npm run benchmark:memory
npm run benchmark:cpu
```

### Step 9: Security Validation

```typescript
// Security test examples
describe('Security Tests', () => {
  it('should not expose password in responses', async () => {
    const user = await userService.createUser({
      email: 'test@example.com',
      password: 'secret123'
    });

    const json = JSON.stringify(user);
    expect(json).not.toContain('secret123');
    expect(json).not.toContain('password');
  });

  it('should prevent SQL injection in email', async () => {
    const maliciousEmail = "'; DROP TABLE users; --";

    await expect(userService.createUser({
      email: maliciousEmail,
      password: 'password123'
    })).rejects.toThrow('Invalid email format');
  });
});
```

### Step 10: Phase Completion

At end of each phase:

```markdown
## Phase [X] Completion Report

### Implementation Summary
✅ Database migration successful
✅ User model with validation
✅ Repository pattern implemented
✅ Unit tests: 15/15 passing
✅ Integration tests: 5/5 passing
✅ Performance: <50ms average response
✅ Security: No vulnerabilities detected

### Code Quality Metrics
- Test Coverage: 94%
- Complexity Score: 7.2/10 (good)
- Linting: 0 errors, 0 warnings
- Type Coverage: 100%

### Commits Made
- feat: add user migration and model
- test: comprehensive user model tests
- feat: implement user repository
- test: add integration tests
- fix: handle duplicate email edge case

### Next Phase Preview
Phase 2: Business Logic & Services
- UserService with business rules
- Email verification workflow
- Password reset functionality
- Rate limiting for auth attempts

Estimated time: 2 days
Ready to proceed? ✓
```

### Step 11: Deployment Preparation

Before final deployment:

```bash
# Pre-deployment checklist
npm run build              # ✓ Build succeeds
npm run test:all          # ✓ All tests pass
npm run security:scan     # ✓ No vulnerabilities
npm run performance:check # ✓ Benchmarks met
npm run docs:generate     # ✓ Documentation updated

# Staging deployment
npm run deploy:staging
npm run test:e2e:staging  # ✓ E2E tests on staging

# Production deployment
npm run deploy:production
npm run smoke:test        # ✓ Basic functionality works
```

### Step 12: Implementation Documentation

```markdown
# Implementation Complete: [Feature Name]

## What Was Built
- User authentication system
- RESTful API with validation
- Secure password handling
- Comprehensive test suite

## Technical Decisions Made
1. **Password Hashing**: bcrypt with 10 salt rounds
   - Reason: Industry standard, secure
   - Alternative considered: Argon2 (newer but less proven)

2. **Database Choice**: PostgreSQL with UUID primary keys
   - Reason: Scalable, no sequential ID leakage
   - Trade-off: Slightly larger storage footprint

## Code Quality Metrics
- **Test Coverage**: 94% (target: 80%)
- **Performance**: 45ms avg response (target: <100ms)
- **Security**: Passed OWASP checks
- **Maintainability**: 8.1/10 complexity score

## Production Readiness
✅ All tests passing
✅ Performance benchmarks met
✅ Security scan clean
✅ Documentation complete
✅ Monitoring configured
✅ Rollback plan ready

## Operational Notes
- **Monitoring**: User creation metrics in Grafana
- **Alerts**: >100ms response time or >5% error rate
- **Maintenance**: Password policy review quarterly

## Lessons Learned
1. **Early testing saves time**: TDD caught 3 edge cases
2. **Database constraints matter**: Plan for uniqueness violations
3. **Performance testing reveals**: N+1 query in initial implementation

Ready for production deployment ✅
```

## Git Workflow Best Practices

```bash
# Clean commit history
git rebase -i HEAD~5      # Squash related commits
git commit --fixup HEAD~2 # Fix up previous commit

# Pre-push validation
npm run pre-push          # Runs all quality checks

# Clean merge to main
git checkout main
git pull origin main
git merge --no-ff feature/user-auth
git push origin main
```

## Issue Escalation

When blocked:
```
🚨 Implementation Blocked

Issue: Database migration failing in CI
Error: "relation 'users' already exists"

Attempted Solutions:
1. ✅ Checked migration files for duplicates
2. ✅ Verified migration order
3. ❌ Reset database (not allowed in CI)

Escalation Needed:
- DevOps team: CI database state inconsistent
- Impact: Blocks all feature deployments
- Urgency: High (blocking other developers)

Temporary Workaround:
- Skip CI for this PR
- Manual testing completed
- Will fix CI in separate ticket
```

## Implementation Success Criteria

Complete when:
- [ ] All planned features working
- [ ] Test coverage >80%
- [ ] Performance benchmarks met
- [ ] Security requirements satisfied
- [ ] Documentation updated
- [ ] Code reviewed and approved
- [ ] Deployed to production
- [ ] Monitoring configured
- [ ] Team trained on changes

```
🎉 Implementation Complete!

Summary:
- Duration: 4.5 days (planned: 5 days)
- Features: 100% implemented
- Test Coverage: 94%
- Performance: Exceeds targets
- Security: All requirements met

Value Delivered:
- Users can now register securely
- API ready for mobile app integration
- Foundation for advanced auth features

Next Steps:
- Monitor production metrics
- Plan OAuth integration
- Consider password reset feature

Ready for next development cycle! 🚀
```