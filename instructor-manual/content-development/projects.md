---
sidebar_position: 2
---

# Developing Large Course Projects with AI

## Learning Outcomes

By the end of this guide, you will be able to:

- Design semester-long projects with learning-aligned milestones
- Apply backwards design pedagogy to project development
- Work iteratively with AI using an artifact-based approach
- Build project files incrementally (concept → overview → milestones → rubrics)
- Ground project rubrics in lecture content for predictability
- Decide when to manually edit vs. ask AI to refine content
- Maintain pedagogical control while leveraging AI efficiency

## Why Semester-Long Projects?

Large course projects provide unique pedagogical benefits:

- **Integration**: Students apply multiple concepts together rather than in isolation
- **Authenticity**: Mimics real-world development where skills build progressively
- **Motivation**: Watching a substantial project grow provides satisfaction
- **Portfolio value**: Students have meaningful work to showcase
- **Depth**: Allows exploration beyond surface-level understanding

**Challenge**: Keeping students on track and preventing end-of-semester panic.

**Solution**: Structured intermediate deliverables aligned to learning objectives, developed with AI assistance.

## The Project Development Process

### Traditional Approach

1. Brainstorm project idea
2. Create full project spec
3. Assign to students
4. Hope they pace themselves
5. Grade final submissions

**Time**: Many hours. **Problem**: Students procrastinate, no checkpoints, overwhelming to grade.

### AI-Assisted Approach

1. Collaboratively generate project concepts aligned with course objectives
2. Collaboratively identify natural milestone breakpoints
3. You review and refine each milestone incrementally
4. Collaboratively generate lecture-grounded rubrics
5. Collaboratively generate support materials
6. Test-solve yourself

**Time**: Can be faster, but **review is critical**. You spend time on pedagogical decisions, AI handles drafting.

**Key principle**: AI drafts structure and content, you provide pedagogy and refinement.

### Working in a Course Repository

**Important**: This guide assumes you're managing your course materials in a Git repository (this Courseasaurus setup) and using an AI coding agent like Cursor, GitHub Copilot, or VS Code with AI extensions.

**Key advantage**: The AI can read your course files directly. No need to copy/paste context into prompts!

**What this means**:
- AI reads `course.config.json` to understand your schedule
- AI reads lecture notes to understand what students learn when
- AI aligns milestones with actual course progression
- No risk of context getting out of sync

**Example**:
> "Examine course structure. Generate 3-4 semester-long project concepts that integrate these learning objectives throughout the term."

The AI will analyze your actual schedule and learning objectives, then propose projects deliverables perfectly aligned with your course.

## Using AI to Design Projects: Backwards Design

Apply the same staged, artifact-based approach as individual assignments, but at project scale.

This follows **backwards design** pedagogy:
1. Define learning objectives (what students should learn across semesters)
2. Design assessment (how you'll know they learned it at each stage)
3. Create scaffolding (how they'll build skills incrementally)

**Critical insight**: Don't ask AI to generate everything at once. Build incrementally, reviewing each artifact before proceeding.

### Anti-pattern: asking for the whole project at once

Here is an example of a bad prompt:
```
You’re an expert in experiential learning. Help me identify an experiential project with a project description with student real-world deliverables that I can use for my C3100: Program Design and Implementation II 
 
Review my syllabus and ask me 3 questions (one question at a time) to get the best results of a project that will align with the course topic, my approach to education, and the course outcomes.
```

This is a bad prompt because it does not give the educator meaningful control over the project. A modern LLM will output a complete specification for a project, which likely will not meet your high level of quality expectations, and will not set you up for success to productively improve the project spec.


### Stage 1: Generate Project Concepts

Start by exploring different project types that could integrate your semester's learning objectives.

**Prompt**:
> Examine course structure. Generate 3-4 semester-long project concepts that integrate these learning objectives throughout the term. Keep the concepts brief: just 2-3 paragraphs maximum describing the project, how it integrates the learning objectives, and the final deliverable.

**What you get**: Multiple project ideas to choose from (e.g., personal portfolio site, data visualization dashboard, game with AI, web application with backend).

**Your job**: Select the most pedagogically sound concept. Consider:
- Student engagement (is it interesting?)
- Real-world relevance (useful beyond class?)
- Portfolio value (will students want to showcase it?)
- Skill integration (does it reinforce multiple concepts?)
- Feasibility (can students realistically complete it?)

**Saving artifacts**: Don't create files yet. Keep alternatives in chat or notes. This is exploration.

**Why this stage matters**: Choosing the right project concept is crucial. Better to explore alternatives now than commit to a mediocre idea that won't sustain student motivation for 10+ weeks. 

#### Refining Project Concepts

**Scenario**: None of the concepts feel right.

**Follow-up**:
> "These projects are too web-focused. Generate 3-4 more concepts involving data science, machine learning, or systems programming."

**Scenario**: Two concepts look promising.

**Follow-up**:
> "I like concepts 1 (portfolio site) and 3 (data dashboard). For each, describe how it would integrate concepts from weeks 1-5, 6-10, and 11-14 of the course."

### Stage 2: Identify Natural Milestones and Create Project Overview

Once you've chosen a project concept, ask AI to identify logical breaking points aligned with your course schedule.

**Prompt**:
> I've chosen the [selected concept] project. 
>
> Examine course structure. Identify 4-5 natural milestone points where students could submit incremental deliverables. For each milestone:
> - Suggested due week (must be AFTER required skills are taught)
> - What skills from lectures are now available
> - High-level deliverable description (one sentence)
> - Why this is a natural breaking point pedagogically
> - Estimated time commitment (3-6 hours)
>
> Don't write detailed requirements yet - just identify the milestones. Save output to @assignments/project-overview.md.

**What you get**: Timeline with milestone checkpoints aligned to learning progression.

**Your job**: Verify timing makes sense. Critical questions:
- Are milestones too close together? Too far apart?
- Do they conflict with exams or other major deadlines?
- Is there buffer time for students who struggle?
- Does each milestone build meaningfully on the previous?

**This is your editing checkpoint!** Review the generated file and manually edit:
- Adjust your tone and voice
- Add motivational language
- Clarify any ambiguities
- Add your specific expectations
- Edit any other content as needed

Save and commit: `git add assignments/project-overview.md && git commit -m "Add project overview with milestone timeline"`

**Why this stage matters**: Getting the timeline right is critical. If milestones are poorly spaced or badly aligned with lectures, the entire project suffers.

#### Refining Milestone Timeline

**Scenario**: Milestone 3 conflicts with midterm week.

**Follow-up**:
> "Milestone 3 is due Week 9, but we have a midterm that week. Move it to Week 10 and adjust subsequent milestones accordingly."

**Scenario**: Too many milestones.

**Follow-up**:
> "5 milestones feels like too many checkpoints. Combine milestones 2 and 3 into a single larger milestone due Week 7."

### Stage 3: Expand Each Milestone (One File at a Time)

Now detail each milestone individually. **Key insight**: Work on one milestone at a time, not all at once. You could also try to do it all at once, but a general best practice when you are new to applying an AI model to a task is to break it down into smaller chunks so that you have a smaller review surface. If you realize that you need to change how you specify your request, it will be much more efficient to do that iteration on a smaller chunk. With experience, you will fall into a rhythm.

**Prompt for Milestone 1**:
> @assignments/project-overview.md has our project overview. Create a detailed requirements file at @assignments/project-milestone-1.md for Milestone 1 only, must only require skills taught by Week 3.
>
> Include:
> - Skills students have learned by Week 3 (reference specific lectures)
> - Specific deliverables (files, documentation, features)
> - What "done" looks like (acceptance criteria)
> - Estimated time commitment (3-5 hours)
> - Why this milestone matters pedagogically
>

**What you get**: Complete milestone file with detailed requirements.

**Your job**: Review for:
- Achievability (can students do this with current knowledge?)
- Appropriate scope (not too ambitious, not too trivial)
- Meaningful work (not just busywork)
- Clear acceptance criteria (students know when they're done)

**Editing checkpoint - refine now!** Manually edit the generated file:

```markdown
❌ AI wrote: "Create appropriate documentation"
✅ You edit:  "Create README.md with: project title, description (2-3 sentences), 
              feature list (at least 5 features), and tech stack. Use markdown 
              formatting from Lecture 2."

❌ AI wrote: "Set up repository structure"
✅ You edit:  "Create GitHub repo named [username]-portfolio. Include:
              - .gitignore for Node.js (copy from lecture examples)
              - README.md (see above)
              - src/ directory for future code
              - docs/ directory for markdown content
              At least 3 meaningful commits with descriptive messages."
```

Save and commit: `git commit -am "Add Milestone 1 detailed requirements"`

**Repeat for remaining milestones**: Only after Milestone 1 is solid, create `project-milestone-2.md`, then `project-milestone-3.md`, etc.

**Project file structure**:
```
assignments/
  project-overview.md       # Timeline and big picture
  project-milestone-1.md    # Detailed M1 requirements
  project-milestone-2.md    # Detailed M2 requirements
  project-milestone-3.md    # Detailed M3 requirements
  ...
```

**Why separate files per milestone**:
- Students focus on current milestone without distraction
- Easier to update individual milestones
- Can release milestones progressively (only publish when ready)
- Clear navigation in sidebar
- Each file is independently manageable

#### Refining Milestone Requirements through Prompting

In addition to manually editing the milestone requirements, you can also use AI to refine them through prompting. You must make the judgement call on whether to use AI to refine the requirements or to manually edit the requirements based on the context.

**Scenario**: Milestone 2 requirements are too vague.

**Follow-up**:
> "@project-milestone-2.md says 'add custom styling'. Be specific: list exactly what styling elements students must customize (colors, fonts, layout, etc.) and provide clear acceptance criteria."

**Scenario**: After writing Milestone 3, you realize it conflicts with Milestone 2.

**Follow-up**:
> "Milestone 3 requires students to refactor the HTML structure from Milestone 2, but Milestone 2's rubric awards points for specific HTML elements. Revise Milestone 2 to make the HTML structure more flexible, or adjust Milestone 3 to work with the existing structure."

### Stage 4: Create Rubrics Grounded in Lectures

After all milestone requirements are defined, ask AI to build assessment rubrics **grounded in lecture content**.

**Prompt with lecture grounding**:
> We are working on @assignments/project-milestone-3.md. Create a grading rubric (20 points, since there are 5 milestones totaling 100 points) that:
>
> - Assesses technical correctness
> - Focuses on application of concepts from lectures 7-9 (the NEW material since Milestone 2)
> - Uses code/documentation standards from @lecture-notes/l2-best-practices.md
> - References specific lectures for each criterion
>

**Why reference lectures explicitly**:
- Rubric uses same terminology students learned
- Criteria grounded in what was actually taught
- Students can review specific lectures to prepare
- Makes grading feel predictable, not arbitrary
- TAs grade consistently using shared vocabulary

**Your job**: Verify:
- Every requirement has corresponding rubric item
- Criteria are observable and measurable
- Point allocation matches learning objective importance
- Lecture references are accurate
- TAs could grade consistently using this

**Editing checkpoint**: Manually adjust:
- Point values (if priorities shifted)
- Specific examples (add your course-specific scenarios)
- Partial credit breakdowns (based on your grading philosophy)
- Everything and anything else as needed

Save and commit: `git commit -am "Add Milestone 3 rubric grounded in lectures 7-9"`

**Repeat for each milestone**: Generate lecture-grounded rubrics for all milestones.

### Stage 5: Generate Support Materials with AI

For each milestone, ask AI to generate support materials.

**Prompt**:
> We are working on @assignments/project-milestone-2.md. Generate support materials for this milestone:
>
> - "Getting Started" section - concrete first steps students should take
> - "Common Pitfalls" section - typical errors and how to avoid them
> - "Resources" section - links to docs, tutorials, examples from our course materials
>
> Write these sections to append to the milestone file. Save output to @assignments/project-milestone-2-support.md.

**What you get**: Support material sections AI generates.

**Your job**: Decide what to include. Some support you might want to create yourself or with more specific AI guidance.

**Editing checkpoint**: Manually refine support materials:
- Add your specific warnings based on past student struggles
- Reference specific office hours availability
- Add personal encouragement and motivation
- Adjust resource links to your preferred tutorials

Ask AI to append to the file:
> "Add these support materials to assignments/project-milestone-2.md"

Save and commit: `git commit -am "Add support materials to Milestone 2"`

**Repeat for each milestone**.

#### Additional Support Materials AI Can Generate

**FAQ Generation**:
> "Based on assignments/project-milestone-2.md, generate 10 frequently asked questions students might have. Include questions about requirements, technical challenges, and submission. Provide clear answers."

**Troubleshooting Guide**:
> "Read assignments/project-milestone-2.md. List 10 common errors students might encounter when implementing React components with state. For each error, provide: typical error message, likely cause, and how to fix it."

**Example Implementation** (without giving away solution):
> "Read assignments/project-milestone-2.md. Create a simplified example of the filterable component requirement using a different domain (recipe filtering instead of project filtering). Keep it simple enough to demonstrate the concept without solving their project."

**Rubric Explanation for Students**:
> "Read the Milestone 2 rubric. Write a student-facing explanation of how to earn full credit. For each criterion, explain what 'good' looks like with concrete examples."

## Reviewing Project Structure

Before releasing the project to students, review the complete structure.

**Critical questions**:

### 1. Timing Alignment
- Is each milestone achievable with skills taught by that point?
- Are due dates realistic given other coursework?
- Is there buffer time for students who struggle?
- Do milestones conflict with exams or breaks?

**Use AI to check**:
> "Review the project overview and milestones as I have defined them. Verify that each milestone only requires skills taught before its due date. Flag any gaps where milestones need concepts not yet taught. Report on alignment of heavy work periods with exams, breaks and holidays."

### 2. Incremental Value
- Does each milestone add meaningful functionality?
- Can students see their project growing?
- Are there "dead" milestones that feel like busywork?

**Ask yourself**: Would you be proud to complete this milestone? Or does it feel like checking boxes?

### 3. Feedback Opportunities
- Can you provide meaningful feedback at each stage?
- Is each milestone substantial enough to assess?
- Can students incorporate feedback into next milestone?

**Verify**: Does Milestone 2 give students a chance to improve on Milestone 1 feedback?

### 4. Scope Management
- Is total workload reasonable (given the course structure an weekly workload)?
- Are individual milestones sized appropriately?
- Is there flexibility for faster/slower students?

**Use AI to estimate**:
> "Read all project milestone requirements. Estimate time commitment for an average student in [your course level]. Break down by milestone and total."

### 5. Skill Progression
- Does difficulty ramp appropriately?
- Are students practicing new skills in each milestone?
- Does final milestone integrate everything learned?

**Test yourself**: Try to complete Milestone 1 in the time allocated. If you struggle, students will definitely struggle.

## Common Pitfalls in Project Design (and How AI Helps)

### 1. Front-Loaded Difficulty

**Problem**: First milestone is too ambitious.

**Solution**: Ask AI to verify scope.
> "Read project-milestone-1.md and lectures 1-3. Is this milestone achievable for students who just learned these concepts? What might be too difficult?"

**Principle**: Milestone 1 should feel achievable for all students. Build confidence early.

### 2. Disconnected Milestones

**Problem**: Milestones don't build on each other; students start over each time.

**Solution**: Ask AI to verify connections.
> "Read all project milestone files. Verify that each milestone builds on the previous one's deliverables. Flag any milestones that seem to start from scratch."

**Principle**: Each milestone should extend previous work, not replace it.

### 3. Skills Gap

**Problem**: Milestone requires skills not yet taught.

**Solution**: Ask AI to check alignment.
> "Read project-milestone-4.md and course.config.json. Verify that all required skills are taught in lectures before Week 12 (due date). List any skills needed but not yet taught."

**Principle**: Map every requirement to specific prior lecture/lab.

### 4. No Feedback Loop

**Problem**: Students get grades but no actionable feedback to improve next milestone.

**Solution**: Grade milestones quickly (within 1 week). Use AI to generate feedback templates.
> "Read the Milestone 2 rubric. Create 5 common feedback templates I can use when grading, focusing on how students can improve for Milestone 3."

**Principle**: Feedback should inform future work, not just justify past grades.

### 5. Unrealistic Time Estimates

**Problem**: "This should only take 3 hours" (actually takes students 10 hours).

**Solution**: Test-solve yourself. Time it. Add 50-100% buffer. Ask AI to verify.
> "Read project-milestone-3.md requirements. Break down time estimates by task. Flag any tasks that might take longer than estimated for students new to React."

**Principle**: If you can't complete it in the time allocated, students definitely can't.

### 6. Vague Requirements

**Problem**: Students don't know what "done" looks like.

**Solution**: Ask AI to check for specificity.
> "Read project-milestone-2.md requirements. Identify any vague or ambiguous requirements. For each, suggest specific, measurable alternatives."

**Principle**: Requirements should be unambiguous. Students should know exactly when they're done.

## Adapting Projects Mid-Semester with AI

**Mid-semester check**: Are students on track?

**If milestones taking longer than expected**:

Ask AI to help adjust:
> "Read all project milestones. Students are struggling with Milestone 2 - it's taking 8 hours instead of 5. Suggest ways to reduce scope of Milestones 3-5 to keep total time under 30 hours while preserving learning objectives."

**Adjustment strategies AI can help with**:
- Reduce scope of remaining milestones
- Combine two smaller milestones into one
- Make some requirements optional
- Extend deadlines (and adjust subsequent milestones)

**If milestones too easy**:

> "Students are completing milestones quickly. Read all project milestones and suggest extension options for Milestones 3-5 that would challenge advanced students without changing core requirements."

**Adjustment strategies**:
- Add extension options to later milestones
- Increase polish expectations
- Add a presentation/demo component
- Create "bonus" final milestone for portfolio enhancement

**Key principle**: Be responsive. Rigid adherence to original plan can tank student success. AI helps you adapt quickly while maintaining pedagogical soundness.