# Plan out tasks

You are tasked with creating detailed technical implementation plans for software development, focusing on clean architecture, testability, and production readiness.

## Initial Response

When invoked with no parameters:
```
I'll create a detailed technical implementation plan for your development task.

Please provide:
1. The feature/fix/refactor you're planning
2. Technical requirements and constraints
3. Timeline and resource considerations
4. Links to research or ticket files

I'll design a phased approach with clear deliverables and test criteria.
```

If parameters provided (e.g., `/plan ticket.md`), immediately read files and begin analysis.

## Planning Process

### Step 1: Technical Context Gathering

1. **Read ALL mentioned files completely**:
   ```python
   # Read priority:
   1. tickets/issues/*.md
   2. research_docs/*.md
   3. existing_code.{js,py,go,rs}
   4. tests/specs/*.test.*
   5. api/schemas/*.yaml
   ```

2. **Analyze codebase reality**:
   ```
   Spawn parallel tasks to discover:
   - Current architecture patterns
   - Testing conventions
   - Deployment process
   - CI/CD pipeline
   - Database migrations approach
   - Error handling standards
   ```

3. **Validate technical assumptions**:
   ```
   After research, I understand:
   - Tech stack: [list technologies]
   - Architecture: [microservices/monolith/etc]
   - Testing: [unit/integration/e2e approach]
   - Deploy: [process and environments]

   Clarifications needed:
   - [Specific technical question]
   - [Architecture decision needed]
   ```

### Step 2: Architecture Design

Present technical options:

```markdown
## Architecture Options

### Option A: Service-Oriented
```
┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  API Gateway │
└─────────────┘     └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Service A   │  │  Service B   │  │  Service C   │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          ▼
                   ┌──────────────┐
                   │   Database   │
                   └──────────────┘
```
**Pros**: Scalable, isolated failures
**Cons**: Complex, network overhead
**Best for**: Large-scale systems

### Option B: Modular Monolith
```
┌─────────────────────────────────┐
│         Application             │
├─────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐      │
│  │Module A │  │Module B │      │
│  └─────────┘  └─────────┘      │
├─────────────────────────────────┤
│       Repository Layer          │
├─────────────────────────────────┤
│         Database                │
└─────────────────────────────────┘
```
**Pros**: Simple, fast, transactional
**Cons**: Scaling limitations
**Best for**: Most applications

Which approach aligns with your needs?
```

### Step 3: Detailed Technical Plan

Create comprehensive implementation plan:

```markdown
# Technical Implementation Plan: [Feature Name]

**Created**: [Date]
**Ticket**: [Reference]
**Approach**: [Selected architecture]

## Technical Overview
[Brief description of technical approach and key decisions]

## Success Criteria
- [ ] All tests passing (unit, integration, e2e)
- [ ] Performance: <100ms response time
- [ ] Security: OWASP top 10 addressed
- [ ] Code coverage: >80%
- [ ] Documentation updated

## Technical Stack
- **Language**: [e.g., TypeScript 4.9]
- **Framework**: [e.g., Express 4.18]
- **Database**: [e.g., PostgreSQL 14]
- **Cache**: [e.g., Redis 7.0]
- **Testing**: [e.g., Jest, Supertest]

## Phase 1: Database & Models

### 1.1 Database Schema
```sql
-- migrations/001_create_feature_tables.sql
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_features_status ON features(status);
CREATE INDEX idx_features_created ON features(created_at DESC);
```

### 1.2 Model Implementation
```typescript
// src/models/Feature.ts
export class Feature {
  constructor(
    public id: string,
    public name: string,
    public status: FeatureStatus,
    public metadata: Record<string, any>
  ) {}

  validate(): ValidationResult {
    // Implementation
  }

  toJSON(): FeatureDTO {
    // Implementation
  }
}
```

### 1.3 Repository Layer
```typescript
// src/repositories/FeatureRepository.ts
export interface FeatureRepository {
  findById(id: string): Promise<Feature | null>;
  findAll(filters: FeatureFilters): Promise<Feature[]>;
  create(data: CreateFeatureDTO): Promise<Feature>;
  update(id: string, data: UpdateFeatureDTO): Promise<Feature>;
  delete(id: string): Promise<void>;
}
```

### Success Criteria - Phase 1
#### Automated Tests
```bash
# Run these commands to verify
make db-migrate          # ✓ Migrations apply cleanly
npm run test:models       # ✓ Model tests pass
npm run test:repository   # ✓ Repository tests pass
```

#### Manual Verification
- [ ] Database schema matches requirements
- [ ] Indexes improve query performance
- [ ] Models handle edge cases

---

## Phase 2: Business Logic & Services

### 2.1 Service Layer
```typescript
// src/services/FeatureService.ts
export class FeatureService {
  constructor(
    private repository: FeatureRepository,
    private cache: CacheService,
    private eventBus: EventBus
  ) {}

  async createFeature(data: CreateFeatureDTO): Promise<Feature> {
    // 1. Validate input
    const validation = this.validateFeatureData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors);
    }

    // 2. Business logic
    const feature = await this.repository.create(data);

    // 3. Side effects
    await this.cache.invalidate(`features:*`);
    await this.eventBus.publish('feature.created', feature);

    return feature;
  }
}
```

### 2.2 Error Handling
```typescript
// src/errors/index.ts
export class BusinessError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
  }
}

export class ValidationError extends BusinessError {
  constructor(public errors: ValidationError[]) {
    super('Validation failed', 'VALIDATION_ERROR', 422);
  }
}
```

### 2.3 Event System
```typescript
// src/events/FeatureEvents.ts
export const FeatureEvents = {
  CREATED: 'feature.created',
  UPDATED: 'feature.updated',
  DELETED: 'feature.deleted'
} as const;

// Event handlers for side effects
```

### Success Criteria - Phase 2
#### Automated Tests
```bash
npm run test:services     # ✓ Service logic tests pass
npm run test:integration  # ✓ Integration tests pass
npm run lint             # ✓ No linting errors
```

#### Manual Verification
- [ ] Business rules correctly enforced
- [ ] Error messages are helpful
- [ ] Events fired appropriately

---

## Phase 3: API Layer

### 3.1 REST Endpoints
```typescript
// src/controllers/FeatureController.ts
export class FeatureController {
  constructor(private service: FeatureService) {}

  @Post('/features')
  @ValidateBody(CreateFeatureSchema)
  async create(req: Request, res: Response) {
    try {
      const feature = await this.service.createFeature(req.body);
      res.status(201).json(feature);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  @Get('/features/:id')
  @RateLimit(100)
  async getById(req: Request, res: Response) {
    // Implementation
  }
}
```

### 3.2 Input Validation
```typescript
// src/validation/schemas.ts
export const CreateFeatureSchema = z.object({
  name: z.string().min(1).max(255),
  metadata: z.record(z.any()).optional()
});
```

### 3.3 API Documentation
```yaml
# api/openapi.yaml
paths:
  /features:
    post:
      summary: Create a new feature
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateFeature'
      responses:
        201:
          description: Feature created successfully
```

### Success Criteria - Phase 3
#### Automated Tests
```bash
npm run test:api         # ✓ API tests pass
npm run test:e2e         # ✓ End-to-end tests pass
npm run api:validate     # ✓ OpenAPI spec valid
```

#### Manual Verification
- [ ] API responds correctly to valid requests
- [ ] Proper error codes for invalid requests
- [ ] Rate limiting works

---

## Phase 4: Testing & Quality

### 4.1 Unit Tests
```typescript
// tests/unit/FeatureService.test.ts
describe('FeatureService', () => {
  let service: FeatureService;
  let mockRepo: jest.Mocked<FeatureRepository>;

  beforeEach(() => {
    mockRepo = createMockRepository();
    service = new FeatureService(mockRepo);
  });

  describe('createFeature', () => {
    it('should create feature with valid data', async () => {
      // Test implementation
    });

    it('should throw ValidationError for invalid data', async () => {
      // Test implementation
    });
  });
});
```

### 4.2 Integration Tests
```typescript
// tests/integration/features.test.ts
describe('Features API Integration', () => {
  it('should create and retrieve feature', async () => {
    const response = await request(app)
      .post('/features')
      .send({ name: 'Test Feature' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
```

### 4.3 Performance Tests
```javascript
// tests/performance/load.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 100,
  duration: '30s',
};

export default function() {
  let response = http.post('http://localhost:3000/features');
  check(response, {
    'status is 201': (r) => r.status === 201,
    'response time < 100ms': (r) => r.timings.duration < 100,
  });
}
```

---

## Phase 5: Deployment & Monitoring

### 5.1 Deployment Configuration
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm test
      - run: npm run build
  deploy:
    needs: test
    steps:
      - run: npm run deploy:production
```

### 5.2 Monitoring Setup
```typescript
// src/monitoring/metrics.ts
export const metrics = {
  featureCreated: new Counter({
    name: 'features_created_total',
    help: 'Total number of features created'
  }),
  apiLatency: new Histogram({
    name: 'api_request_duration_seconds',
    help: 'API request latency'
  })
};
```

### 5.3 Health Checks
```typescript
// src/health/checks.ts
export const healthChecks = {
  database: async () => {
    return db.query('SELECT 1');
  },
  redis: async () => {
    return redis.ping();
  }
};
```

---

## Risk Mitigation

| Risk | Mitigation | Contingency |
|------|------------|-------------|
| Database migration fails | Test in staging first | Rollback script ready |
| Performance degradation | Load test before deploy | Feature flag for disable |
| Breaking API changes | Version the API | Support old version temporarily |
| Security vulnerability | Security scan in CI | Incident response plan |

## Rollback Plan
```bash
# If deployment fails
git revert HEAD
npm run deploy:rollback
npm run db:rollback
```

## Documentation Updates
- [ ] API documentation
- [ ] README updates
- [ ] Architecture diagrams
- [ ] Runbook for operations

## Definition of Done
- [ ] Code review approved
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Performance benchmarks met
- [ ] Security scan passed
- [ ] Deployed to production
- [ ] Monitoring configured
```

### Step 4: Interactive Refinement

```
Plan created with 5 phases:

Phase 1: Database & Models (1 day)
Phase 2: Business Logic (2 days)
Phase 3: API Layer (1 day)
Phase 4: Testing (1 day)
Phase 5: Deployment (0.5 day)

Total: 5.5 days

Key decisions made:
- Repository pattern for data access
- Service layer for business logic
- REST API with OpenAPI docs
- 80% test coverage target

Questions:
1. Is the timeline realistic?
2. Any missing requirements?
3. Preferred testing approach?

Ready to refine or proceed to implementation?
```

## Code-Specific Planning Patterns

### API Development
- Endpoint design with versioning
- Request/response schemas
- Authentication strategy
- Rate limiting approach
- Error response format

### Frontend Components
- Component hierarchy
- State management design
- API integration layer
- Testing approach (unit/integration/e2e)
- Bundle optimization strategy

### Database Changes
- Migration strategy
- Backup plan
- Index optimization
- Query performance targets
- Data consistency approach

### Microservice
- Service boundaries
- Communication protocol
- Data consistency
- Service discovery
- Circuit breaker pattern

## Planning Best Practices

1. **Start with the Database**: Schema drives everything
2. **Design for Testing**: Make code testable from the start
3. **Plan for Failure**: Include error handling and rollback
4. **Consider Operations**: Monitoring, logging, debugging
5. **Version Everything**: APIs, schemas, configs
6. **Document Decisions**: Why, not just what
7. **Security by Design**: Build it in, don't bolt it on

## Transition to Implementation

```
Technical plan complete and validated.

Summary:
- [X] phases defined
- [Y] test scenarios planned
- [Z] risks identified
- Estimated effort: [days/hours]

First steps:
1. Set up development environment
2. Create feature branch
3. Run existing tests
4. Begin Phase 1

Ready to start implementation?
Use /implement to begin execution.
```