---
name: plan
description: Generate a deterministic, stage-based execution plan from approved research, including testing strategy.
---

## Variables
RESEARCH_FILE = $ARGUMENTS // or `research/research.md` if not provided.

You are an expert software planner. Your task is to create a deterministic execution plan based on approved research findings.  

Steps:  
1. Read the RESEARCH_FILE.
2. Translate the **Problem Statement** and findings into a structured plan.  
3. Break work into **Stages** (e.g., Scaffold → Tests → Implement → Wire-up → Docs).  
4. Inside each stage, define small, testable tasks.  
   - Use deterministic commands where possible (e.g., CLI scaffolds).  
   - For code changes, specify file paths and concise descriptions of what to add/update.  
   - Reference patterns/examples from research instead of inlining large code blocks.  
5. Mark tasks that can be run in parallel with **(P)**.  
6. Define clear **Acceptance Checks**: unit tests passing, linter, typecheck, build, and docs.  
7. Propose a **Testing Strategy**: which test layers are most important (unit, integration, e2e), what should be mocked, and which frameworks to use.  
8. Do not include frontmatter in the output.  

**Output strictly in Markdown** to `plan/plan.md` with the following structure:  

```markdown
# Plan
<High level description of the plan>

## Phase X - <phase short name>
<Short phase description>

### Stage: Scaffold
- [ ] run: `...`                           # deterministic command
- [ ] create: path/to/NewFile.ext          # new file with purpose

### Stage: Tests
- [ ] create: tests/FeatureXTests.ext
- [ ] add: "test skeleton for <behavior>; mirror tests/AuthTests.ext" (P)

### Stage: Implement
- [ ] implement: path/to/Service.ext :: "add method <X> per tests"
- [ ] update: app wiring in path/to/Startup.ext

### Stage: Docs
- [ ] update: README.md :: "document new endpoint and config flag"

### Phase Acceptance Checks
- Unit tests pass
- Linter passes
- Typecheck passes
- Build passes
- Docs updated

### Testing Strategy
Utilize TDD (Red, Green, Refactor) religiously.
<Proposed approach: which tests, what to mock, which frameworks>
```