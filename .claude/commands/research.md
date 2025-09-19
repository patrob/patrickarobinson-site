# Research Codebase

You are tasked with conducting comprehensive codebase and technical research to answer development questions by analyzing code, architecture, and technical documentation.

## Initial Response

When invoked, respond with:
```
I'll research the codebase and technical landscape for your development question.

Please provide:
1. What you're trying to build, fix, or understand
2. Any specific files, components, or systems involved
3. Technical constraints or requirements
4. Existing code/tickets/documentation to review

I'll analyze the code, identify patterns, and provide actionable findings.
```

Then wait for the user's query.

## Research Process

### Step 1: Direct File Analysis

**CRITICAL**: Read mentioned files COMPLETELY first:
```python
# Priority order for file reading:
1. Ticket/issue files (*.md, *.json)
2. Main implementation files mentioned
3. Test files for understanding behavior
4. Configuration files
5. Documentation

# ALWAYS read files fully - never use limit/offset
```

### Step 2: Codebase Discovery

Create parallel research tasks using TodoWrite:

```markdown
Research Tasks:
- [ ] Locate relevant source files
- [ ] Analyze current implementation
- [ ] Find similar patterns in codebase
- [ ] Identify dependencies
- [ ] Review test coverage
- [ ] Check for technical debt
```

Spawn specialized research agents:

**Architecture Discovery:**
```
Task: "Find all files implementing [feature/pattern]"
Focus on:
- Service layer organization
- Data flow patterns
- API contracts
- Database schemas
- Configuration approach
```

**Pattern Analysis:**
```
Task: "Analyze how similar features are implemented"
Look for:
- Naming conventions
- Error handling patterns
- Testing approaches
- Security measures
- Performance optimizations
```

**Dependency Mapping:**
```
Task: "Identify all dependencies and integrations"
Check:
- Direct imports/requires
- API dependencies
- Database connections
- External services
- Package dependencies
```

### Step 3: Technical Validation (FAR Filter)

Apply FAR Filter to all technical findings:

#### **F - Factual (Code Truth)**
✓ Verified in actual code
✓ Confirmed by running tests
✓ Matches documentation
✓ Works in current version

✗ Theoretical without implementation
✗ From outdated sources
✗ Contradicts codebase reality

#### **A - Actionable (Can Implement)**
✓ Clear implementation path
✓ Compatible with current stack
✓ Testable and verifiable
✓ Within technical constraints

✗ Requires unavailable dependencies
✗ Incompatible with architecture
✗ Cannot be tested

#### **R - Reliable (Production Ready)**
✓ Used successfully elsewhere in codebase
✓ Well-tested pattern
✓ Maintained dependencies
✓ Performance validated

✗ Experimental or alpha
✗ Known security issues
✗ Performance problems

### Step 4: Code-Specific Research Areas

#### Performance Analysis
```python
# Research performance characteristics
- Current bottlenecks: [profiling data]
- Database query patterns: [N+1, indexes]
- Caching opportunities: [redis, memory]
- Async possibilities: [workers, queues]
- Load test results: [throughput, latency]
```

#### Security Assessment
```yaml
Security Checklist:
  - Input validation: [status]
  - Authentication: [method]
  - Authorization: [RBAC/ACL]
  - Data encryption: [at rest/transit]
  - SQL injection: [prepared statements]
  - XSS prevention: [escaping]
  - CSRF tokens: [implementation]
```

#### Testing Coverage
```javascript
// Test analysis structure
{
  unit_tests: {
    coverage: "85%",
    missing: ["error cases", "edge conditions"],
    quality: "good assertions, needs mocking"
  },
  integration_tests: {
    coverage: "60%",
    gaps: ["third-party service failures"],
    recommendations: ["add contract tests"]
  },
  e2e_tests: {
    exists: false,
    needed_for: ["critical user paths"]
  }
}
```

### Step 5: Research Documentation

Generate comprehensive technical research document:

```markdown
# Technical Research: [Feature/Problem]

**Date**: [ISO 8601]
**Codebase Version**: [git commit hash]
**Research Scope**: [What was investigated]

## Executive Summary
[2-3 sentences of key technical findings]

## Current Implementation Analysis

### Architecture Overview
```
[ASCII diagram or description]
Service A → Service B → Database
    ↓           ↓
  Cache      Message Queue
```

### Code Structure
- **Entry Point**: `src/controllers/feature.js:45`
- **Business Logic**: `src/services/feature_service.js:120`
- **Data Layer**: `src/models/feature.js:15`
- **Tests**: `tests/feature.test.js`

### Key Code Patterns Found

#### Pattern 1: [Error Handling]
```javascript
// Found in: src/utils/errors.js:23
class ServiceError extends Error {
  constructor(message, code, statusCode) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}
// Used in 47 files across the codebase
```

#### Pattern 2: [Data Validation]
```python
# Found in: validators/user.py:15
def validate_user_input(data):
    schema = UserSchema()
    return schema.load(data)
# Standard pattern for all endpoints
```

## Technical Discoveries

### Performance Characteristics
- **Current Load**: 1000 req/sec
- **Bottleneck**: Database connection pooling
- **Optimization**: Implement connection multiplexing
- **Expected Gain**: 40% throughput increase

### Security Considerations
- ✅ Input sanitization implemented
- ✅ Rate limiting active (100/min)
- ⚠️ Missing: API key rotation
- ❌ Issue: Sensitive data in logs

### Dependency Analysis
| Package | Version | Status | Risk | Notes |
|---------|---------|--------|------|-------|
| express | 4.18.0 | Current | Low | Stable |
| lodash | 4.17.20 | Outdated | Medium | Security patch needed |
| custom-auth | 1.0.0 | Internal | Low | Well tested |

### Database Schema Impact
```sql
-- Current schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP
);

-- Proposed changes needed
ALTER TABLE users ADD COLUMN last_login TIMESTAMP;
CREATE INDEX idx_users_last_login ON users(last_login);
```

## Code Quality Assessment

### Technical Debt Found
1. **Duplicated Logic**: Auth check in 12 files
   - Solution: Extract to middleware
   - Effort: 2 hours
   - Risk: Low

2. **Missing Tests**: Payment processing
   - Solution: Add unit and integration tests
   - Effort: 1 day
   - Risk: High (critical path)

### Refactoring Opportunities
- Extract common validation rules
- Consolidate error handling
- Standardize logging format
- Update deprecated API calls

## Implementation Recommendations

### Approach A: Minimal Change
```javascript
// Quick fix in existing structure
function addFeature() {
  // 1. Add validation
  validateInput(data);
  // 2. Implement feature
  return processFeature(data);
  // 3. Update cache
  cache.invalidate('feature');
}
```
**Pros**: Fast, low risk
**Cons**: Doesn't address tech debt

### Approach B: Refactor First
```javascript
// Clean architecture approach
class FeatureService {
  constructor(repository, cache, validator) {
    // Dependency injection
  }
  async addFeature(data) {
    // Clean implementation
  }
}
```
**Pros**: Maintainable, testable
**Cons**: Longer implementation

## Testing Strategy

### Unit Test Requirements
```javascript
describe('Feature Service', () => {
  it('should handle valid input');
  it('should reject invalid data');
  it('should handle database errors');
  it('should invalidate cache');
  it('should emit events');
});
```

### Integration Points to Test
- Database transactions
- Cache invalidation
- Message queue publishing
- External API calls
- Error propagation

## Migration Path
1. Create feature flag
2. Implement behind flag
3. Add comprehensive tests
4. Gradual rollout (10% → 50% → 100%)
5. Monitor metrics
6. Remove old code

## References
- Architecture Docs: `docs/architecture.md`
- API Spec: `api/openapi.yaml`
- Similar Implementation: `src/features/related_feature.js`
- Test Examples: `tests/integration/pattern.test.js`

## Next Steps
1. Validate approach with team
2. Create detailed implementation plan
3. Set up monitoring
4. Begin implementation

Ready to proceed to planning phase?
Use /plan to create implementation plan.
```

### Step 6: Interactive Validation

Present findings for confirmation:
```
Research complete. Key technical findings:

Code Analysis:
- Current implementation: [summary]
- Main pattern used: [pattern name]
- Test coverage: [percentage]

Technical Constraints:
- Database: [type and version]
- Framework limitations: [list]
- Performance requirements: [metrics]

Recommended Approach:
[Best option based on codebase patterns]

Questions:
1. Is [assumption] correct?
2. Any additional constraints?
3. Preferred approach?

Ready to create implementation plan?
```

## Domain-Specific Research Patterns

### API Development
- OpenAPI/Swagger specs
- Rate limiting strategies
- Versioning approaches
- Authentication methods
- Request/response formats

### Frontend Development
- Component architecture
- State management patterns
- Bundle size impact
- Browser compatibility
- Accessibility requirements

### Backend Services
- Service communication
- Database patterns
- Caching strategies
- Queue processing
- Monitoring/logging

### DevOps/Infrastructure
- Deployment pipelines
- Container configurations
- Scaling strategies
- Monitoring setup
- Disaster recovery

## Code Research Best Practices

1. **Read the Tests First**: Tests reveal intended behavior
2. **Follow the Data**: Trace data flow through the system
3. **Check Git History**: Understand why code evolved
4. **Verify Assumptions**: Run code to confirm understanding
5. **Look for Patterns**: Identify conventions to follow
6. **Consider Scale**: Research performance at production load
7. **Security First**: Identify vulnerabilities early

## Common Research Commands

```bash
# Find all usages of a pattern
grep -r "pattern" --include="*.js"

# Understand file relationships
git log --follow path/to/file.js

# Check test coverage
npm test -- --coverage

# Analyze dependencies
npm ls --depth=0

# Performance profiling
node --inspect app.js

# Security audit
npm audit
```

## Transition to Planning

When research is complete:
```
Technical research validated. Findings:
✓ Analyzed [X] files
✓ Identified [Y] patterns
✓ Found [Z] test cases
✓ Discovered [N] constraints

Key recommendation: [Approach]

Ready to create detailed implementation plan?
Use /plan to design the solution.
```

## Output File Format
Output to `research/research.md`
```markdown
## Research Context
[context related to problem and codebase]

## Related Files
[related files to change/update/add]

## Code Examples
[Code examples in markdown boxes]

## Additional Details
[Additional remarks or specific details/nuances for solving the problem]
```