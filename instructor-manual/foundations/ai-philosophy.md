---
sidebar_position: 4
---

# AI-Assisted CourseOps: Philosophy & Principles

## Learning Outcomes

By the end of this guide, you will be able to:

- Articulate the principles of effective AI tool usage for course management
- Make informed ethical decisions about when and how to use AI for specific tasks
- Apply a framework of considerations to guide personal AI usage choices
- Recognize when AI scope is too broad and needs refinement
- Identify tasks suitable vs. unsuitable for AI assistance
- Develop strategies to avoid skill atrophy while using AI tools

## Core Philosophy: The Scope-Review-Iterate Approach

At the heart of effective AI-assisted course management is a simple principle:

:::tip The Golden Rule of AI Usage
**Only ask an AI to produce what you can effectively review for accuracy and productively steer to high quality.**
:::

This leads to a three-step iterative process:

### 1. Specify Clearly

Modern AI coding assistants are integrated directly into your code editor, which dramatically improves how you provide context. Unlike older chatbot interfaces, you no longer need to manually copy and paste code.

:::info Automatic Context is Key
**Your assistant automatically understands:**
-   **Open Files**: It can read the content of any file you have open in the editor.
-   **Project Structure**: It is aware of the entire folder and file layout of your course repository.
-   **Your Selection**: It knows what code you have highlighted.
-   **Project-Wide Search**: It can search your entire project to find relevant code, even in files you don't have open.
-   **Project-Level Rules**: Rules placed in AGENTS.md are parsed by the AI before answering you. This file can be customized to avoid needing to repetitively specify the same things over and over again (e.g. you do not need to say "course.config.json" defines the schedule for our course" - the AI already knows this from AGENTS.md)

This shift from manual copy-paste to automatic context awareness is critical. It allows you to make requests about your project without the tedious and error-prone process of feeding the AI snippets of your code. Your instructions become simpler, and the AI's responses are more accurate because it has the full picture. Moreover, you can easily edit the output of the AI as you go, and keep switching between manual edits and AI-generated edits as you go.
:::

This allows for powerful, high-level instructions. 

Humans must learn to clearly specify their needs to an LLM. This requires:

- **Concrete goals**: "Create a homework assignment on binary search trees" not "make an assignment"
- **Constraints**: Word count, difficulty level, prerequisite knowledge
- **Context**: What students have learned so far, what comes next
- **Success criteria**: How will you know if the output is good?

**Example of clear specification:**

> "Create a 5-question homework assignment on binary search trees for second-year CS students. Students have already learned about arrays and linked lists but not balanced trees. Questions should include: implementing basic operations (2 questions), analyzing time complexity (2 questions), and one application problem. Target difficulty: medium. Estimated time to complete: 3 hours."

Here is the specification that was used to seed this repository:

```
Courseasaurus is a modern CourseOps platform - it supports all of the curriculum development and dissemination (eg assignments, projects, lecture notes, slides) in a Docusaurus app (all markdown collections of docs). Atop the docusaurus core there is a Courseasaurus plugin (manages custom content generation - manages a course.config file that defines the metadata for the course like lecture schedule, assignment release and due dates, extracts learning objectives from course content. We also integrate RevealJS for rendering slides, in app! It has a reallly good instructor user manual formatted as its own document collection. The manual explains
- how to effectively use gitops practices for managing changes including PRs, and even setting up release triggers so that a private repo can release snapshots to a public repo
- How to effectively use AI assistants to manage the site: including things like adding new document collections, refactoring the order of content, copying section schedules while making a semantic transformation of the meeting dates of week, adjusting holidays, etc. 
- how to effectively use AI assistants to develop course content such as projects, expanding on lecture notes, or creating drafts of slides, adding animations etc. 
- How to use effectively AI as an operations planning can include simulations of changes to the schedule of lectures, deliverables etc and their impact on resource utilization and overall learning goals. We are offering these resources to instructors who have to manage large staffs, say 40 TAs, 5 co-instructors and 800 students! So we should also highlight use cases for developing operations plans (e.g. to help organize staff roles, defining responsibilities and deliverables based on course schedule and stakeholder goals).  Also describe how to at up a course discord server and set its roles (assume either a staff only discord or student & staff discord). 


You are an expert on educational pedagogy and software engineering. Structure the documentation with learning outcomes (just like we encourage the instructors to structure their content). Your philosophy on effective AI tool usage is: humans should learn how to clearly specify their needs to an LLM, and be sure only to ask for something that they themselves can both review for accuracy and productively steer to a high quality. Then they iterate on refining the scope of the request - if core aspects are not satisfactory, they reduce the scope of the request to find the right abstraction that they can communicate. They also need to be sure to directly practice their skills regularly to avoid skill atrophy (or: reflect on the necessity of those skills and what it would mean to be unable to say, regularly correspond with colleagues in writing after automating all of your email replies). 


Design the outline for these documentation pages, with and use a running example of CREATING THIS SITE as a very meta project. Place all documentation in the ”docs”  directory.
```

### 2. Review for Accuracy and Quality

You must be able to:

- **Verify correctness**: Are the facts accurate? Code working? Math correct?
- **Assess quality**: Is it clear? Appropriate difficulty? Well-structured?
- **Evaluate pedagogically**: Does it support learning objectives? Build on prior knowledge?
- **Identify gaps**: What's missing? What assumptions are wrong?

**If you cannot effectively review the output, the scope is too large or the topic is outside your expertise.**

### 3. Iterate to Find the Right Abstraction

When outputs are unsatisfactory:

- **Reduce scope**: Instead of "create a complete lecture," try "expand these bullet points into paragraphs". This repository provides suggestions of how to breakdown common teaching tasks into smaller, more manageable chunks.
- **Refine constraints**: Add more specific requirements
- **Change approach**: Maybe AI shouldn't do this task at all

**The right abstraction** is the level at which:
- You can clearly communicate requirements
- AI produces useful output
- You can effectively review and refine
- The process saves time without sacrificing quality

## Individual Ethical Decision-Making

:::warning Your Ethical Responsibility
**Each instructor and staff member must make their own ethical decision about whether and how to use AI for any given task.** There is no universal rule that applies to every situation, person, or context. Your institution may provide more detailed guidance.
:::

### Why Personal Ethics Matter

The decision to use AI is not merely technical—it's deeply ethical and personal. What's appropriate for one instructor may not be appropriate for another, even for the same task. Consider:

- **Your expertise level**: An expert in compiler design might appropriately use AI to draft explanations of parsing algorithms (which they can thoroughly review), while a novice teaching the same topic should not.
- **Your students' expectations**: Some educational contexts emphasize authentic human connection; others embrace technological assistance openly.
- **Your pedagogical goals**: Are you modeling a skill students should develop? Then showing AI-assisted work without disclosure may undermine that goal.
- **Your institution's values**: Different institutions have different cultures around technology, authenticity, and pedagogy.
- **Your personal integrity**: You must be able to look yourself in the mirror and feel good about your choices.

**You are the only person who can weigh these factors for your specific situation.**

### Reflection Questions for Specific Decisions

Before using AI for a task, ask yourself:

1. **The Disclosure Test**: "Would I feel comfortable fully disclosing my use of AI in this case to everyone affected?"

2. **The Expertise Test**: "Could I produce something similar without AI, even if it would take longer?"

3. **The Defense Test**: "Can I defend and explain every aspect of this AI-generated content?"

4. **The Substitution Test**: "Am I using AI to enhance my expertise, or to substitute for expertise I lack?"

5. **The Future Test**: "If I continue using AI this way, where will I be in 5 years? Is that acceptable?"

6. **The Fairness Test**: "If everyone in my position used AI this way, would the overall outcome be positive?"

7. **The Student Test**: "If students knew exactly how I used AI here, would they feel they're getting what they deserve?"

### No Judgment, Only Honesty

**This document does not prescribe what you should or shouldn't do.** The right choice depends on your context, values, and judgment.

What we do ask:
- **Be honest with yourself** about your motivations and the implications
- **Make conscious decisions** rather than drifting into problematic patterns
- **Regularly reassess** your practices as technology and norms evolve
- **Engage in dialogue** with colleagues about these difficult questions
- **Respect that others may draw lines differently** than you do

The goal is **thoughtful, intentional, ethical practice**—not rigid rules that can't account for context and nuance.

## The Skill Atrophy Problem

### What Happens When You Automate Too Much?

Consider this thought experiment:

> **Scenario**: You start using AI to write all your email responses. It's efficient! You review quickly and send. Over months, you review less carefully. After a year, you realize you can no longer write clear, professional emails without AI assistance. Your writing skills have atrophied.

**This is real.** Skills you don't practice regularly deteriorate.

### Skills at Risk in Course Management

When using AI for course development, these skills can atrophy:

1. **Explaining concepts** - If AI writes all your explanations, can you still explain without it?
2. **Creating examples** - Can you generate good examples spontaneously?
3. **Pedagogical design** - Do you still think deeply about learning progressions?
4. **Clear writing** - Can you write clear prose without AI assistance?
5. **Creative problem design** - Can you design interesting problems from scratch?
6. **Spontaneous teaching** - Can you teach effectively without prepared AI-generated notes?

### The Consequences

**For you:**
- Unable to teach without AI
- Can't adapt on the fly during lectures
- Lost creative satisfaction
- Dependent on tools that may change or disappear

**For students:**
- Less authentic connection with instructor
- Instructor can't answer deep questions
- Generic content that lacks personal insight
- Missing out on instructor's unique expertise

## Maintaining Human Expertise

### Critical Skills to Maintain

These skills should be practiced regularly **without** AI assistance:

#### 1. Explaining Concepts Without Notes

**Practice:** Once a week, explain a core concept aloud as if teaching, without any notes.

**Why:** This is the essence of teaching. You must be able to spontaneously explain and answer questions.

#### 2. Creating Original Examples

**Practice:** Before asking AI for examples, create 2-3 yourself. Then use AI for additional ones if needed.

**Why:** Good examples are the heart of understanding. You need this creative muscle.

#### 3. Writing Clearly and Concisely

**Practice:** Write short explanations, email responses, or assignment descriptions entirely yourself, at least weekly.

**Why:** Clear communication is fundamental to teaching. Don't lose this skill.

#### 4. Pedagogical Thinking

**Practice:** When designing content, spend time thinking about learning progressions before using AI.

**Why:** Understanding how students learn and building proper scaffolding requires human judgment.

#### 5. Spontaneous Adaptation

**Practice:** Occasionally teach without prepared notes, adapting to student questions in real-time.

**Why:** Best teaching moments often happen spontaneously, responding to student needs.

## AI as a Collaborative Tool

The goal is **not** to avoid AI. The goal is to use AI **effectively** while maintaining your expertise.

### The Right Mental Model

Think of AI as:
- ✅ A smart assistant who drafts for your review
- ✅ A brainstorming partner who suggests ideas
- ✅ An efficiency tool that handles tedious tasks
- ✅ A format converter that transforms your ideas
- ✅ A research assistant who finds information

Not as:
- ❌ A replacement for your expertise
- ❌ An authority on your course content
- ❌ A decision-maker for pedagogical choices
- ❌ A substitute for your creative thinking

### Building Understanding Through Iteration

Each iteration with AI should **increase** your understanding:

```
Round 1: AI generates content → You review and find issues
Round 2: AI refines → You understand the topic better through review
Round 3: AI adjusts → You could now explain this without AI
Round 4: You refine manually → You own the content
```

**If iteration is just accepting successive AI outputs without deepening your understanding, you're doing it wrong.**

## Guidelines for Different Tasks

### 🟢 Well-Suited for AI (with Review)

- Format transformations (bullets → paragraphs, notes → slides)
- Expanding brief notes you wrote into full explanations
- Generating additional examples after you've created the first few
- Finding typos and grammar issues
- Converting between formats (JSON, Markdown, etc.)
- Brainstorming assignment ideas
- Writing boilerplate code or configurations

### 🟡 Use AI Cautiously (Strong Expertise Required)

- Writing assignment problems (you create core ideas)
- Explaining complex technical concepts (verify carefully)
- Creating rubrics (you set criteria, AI formats)
- Designing course schedules (you make tradeoffs)
- Answering student questions (review before sending)

### 🔴 Avoid AI (Maintain Human Control)

- Making final pedagogical decisions
- Grading subjective work
- Providing personalized student feedback on learning
- Deciding course policies
- Handling academic integrity issues
- Sensitive student communication
- Core creative work that defines your teaching

## Meta-Example: Creating This Documentation

This instructor manual itself was created using these principles:

**What we did:**
1. **Conceptualized the project**: We defined the project scope and goals. We created a high-levle architecture, based on Docusaurus. We came to the Courseasaurus name ourselves.
2. **Collaborative structure**: Worked with AI to draft the high-level outcomes and goals of the documentation
3. **AI drafting**: Used AI to expand outlines into full prose
4. **Human review**: Carefully reviewed every section for accuracy and clarity. Made significant manual edits.
5. **Iterative refinement**: Refined unclear sections, added examples
6. **Human judgment**: Made all decisions about organization, emphasis, pedagogy

**What we maintained:**
- Could explain every concept without the docs
- Wrote key examples ourselves
- Made all structural decisions
- Could recreate this content without AI, albeit with a lot of time being needed
- Reviewed carefully for accuracy

**Skills practiced:**
- Technical writing
- Pedagogical structure
- Example creation
- Clear explanation

---

**Remember**: The measure of successful AI usage isn't how much it produces, but how much you understand. If you couldn't recreate similar work without AI, you haven't truly learned—you've just outsourced.

The goal is to be a **better instructor** with AI than without, while maintaining the expertise that makes you valuable in the first place.

