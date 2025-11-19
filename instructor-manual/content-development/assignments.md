---
sidebar_position: 3
---

# Developing Assignments 

## Learning Outcomes

By the end of this guide, you will be able to:

- Apply backwards design pedagogy to assignment development
- Work iteratively with AI using an artifact-based approach
- Generate and evaluate alternative assignment concepts
- Build assignments incrementally (concepts → overview → detailed requirements → rubric)
- Decide when to manually edit vs. ask AI to refine content
- Transform AI-generated drafts into assignments that sound like you

## The Assignment Development Process

### Traditional Approach

1. Brainstorm assignment ideas
2. Draft requirements
3. Create rubric
4. Test-solve it yourself
5. Refine based on experience

**Time**: Several hours per assignment

### AI-Assisted Approach

1. Specify objectives and constraints to AI
2. AI generates draft
3. **You review critically** and refine
4. Test-solve yourself
5. Iterate on problematic areas

**Time**: Can be faster, but **review is critical**. We observe that we tend to spend the *same amount of time or more* on task in fact, but end up creating a much, much better assignment.

**Key principle**: AI drafts, you decide.

### Working in a Course Repository

**Important**: This guide assumes you're managing your course materials in a Git repository (this Courseasaurus setup) and using an AI coding agent like Cursor, GitHub Copilot, or VS Code with AI extensions.

**Key advantage**: The AI can read your course files directly. No need to copy/paste context into prompts!

**What this means**:
- AI always has current information from your actual course files
- Can reference specific lectures, labs, assignments by reading them
- Faster workflow with less manual context-providing
- No risk of context getting out of sync

**Example**:
> "Examine the learning objectives through week 7. Propose assessable activities for week 8 that apply those recent concepts."

The AI will read your actual schedule and lecture content, then generate an assignment concept perfectly aligned with your course.

## Using AI to Draft Assignments

### Backwards Design: From Learning Objectives to Artifacts

**Key principle**: Work iteratively, reviewing artifacts at each stage before requesting more detail.

This approach follows **backwards design** pedagogy:
1. Define learning objectives (what students should learn)
2. Design assessment (how you'll know they learned it)
3. Create activities (how they'll learn it)

**Critical insight**: Don't ask AI to generate everything at once. Build incrementally, reviewing each artifact before proceeding. You might even iterate between creating learning objectives and assignments.

### Stage 1: Generate Alternative Concepts

Start by exploring multiple project ideas that could assess your learning objectives.

**Prompt**:
> We are building an assignment to complement @l5-inheritance.md 
>
> Generate 5 different programming assignment concepts that would assess these objectives:
> 1. Design class hierarchies using inheritance
> 2. Implement polymorphic behavior
> 3. Apply encapsulation principles
>
> For each concept, provide:
> - One-sentence description
> - Why it would effectively assess these objectives
> - Estimated difficulty level
>
> Constraints: 5-7 hours, appropriate for second-year CS students who completed Lab 3 in this course.

**What you get**: 5 different assignment ideas (e.g., library system, game characters, document editors, shape hierarchies, employee management).

**Your job**: Review alternatives. Pick the most pedagogically sound and engaging concept. Or ask for 5 more if none appeal. Or, come up with your own concept.

**Saving artifacts**: Don't create assignment file yet. Keep alternatives in the chat or take quick notes. This is exploration, not documentation.

**Why this stage matters**: Choosing the right concept is crucial. Better to explore alternatives now than commit to a mediocre idea.

### Stage 2: Expand the Chosen Concept and Create Assignment File

Once you've selected a concept, expand it into a high-level overview.

**Prompt**:
> I like the [chosen concept] idea. Expand it into a high-level assignment overview in assignments/hw3-oo-design.md.
>
> Include:
> - Assignment overview (2-3 paragraphs)
> - Learning goals (student-facing)
> - Major tasks (high-level, 3-4 bullet points)
> - What students will submit
>
> Don't write detailed requirements yet - just the big picture.

**What you get**: ~1 page overview you can review quickly.

**Your job**: Verify the scope is right, the concept is clear, and it aligns with learning objectives. Refine if needed.

**This is your editing checkpoint!** Once content is in a file, you have options:

1. **Manually edit** in your text editor - Fix wording, adjust tone, add examples
2. **Refine with AI chat** - Ask AI to revise specific sections
3. **Combination** - AI refines structure, you polish language

**When you should always manually edit**:
- Quick fixes (typos, formatting, small wording changes)
- Adding your personal voice and style
- Incorporating specific examples from your teaching experience
- Adjusting tone to match your course culture
- Making the assignment sound like YOU wrote it

**Potential ideas for when to ask AI to refine**:
- Structural changes (reorganize sections, change task order)
- Expanding explanations that are unclear
- Generating additional examples or test cases
- Rewriting sections that miss the mark
- Large-scale rewording

**Why this stage matters**: Easier to change direction now than after detailed requirements exist.

Save and commit to Git: `git add assignments/hw3-oo-design.md && git commit -m "Add HW3 overview"`

### Stage 3: Build Requirements Incrementally (One Task at a Time)

Now drill into specifics, but **one task at a time**. You could also try to do it all at once, but a general best practice when you are new to applying an AI model to a task is to break it down into smaller chunks so that you have a smaller review surface. If you realize that you need to change how you specify your request, it will be much more efficient to do that iteration on a smaller chunk. With experience, you will fall into a rhythm.

**Prompt for Task 1**:
> @hw3-oo-design.md has our assignment overview. Write detailed requirements for Task 1 only (the basic class hierarchy setup).
>
> Include:
> - Specific classes students must create
> - Required methods with signatures
> - Inheritance relationships
> - What should be abstract vs concrete
> - Clear acceptance criteria

**What you get**: Detailed, specific requirements for one task.

**Your job**: Review for clarity, technical correctness, appropriate difficulty. Can you solve this? Is it unambiguous?

**Saving artifacts**: Add Task 1 to your assignment file:

**Editing checkpoint - refine Task 1 now!** Before moving to Task 2, polish Task 1:

**Quick manual edits you might make**:
```markdown
❌ AI wrote: "Students must implement appropriate error handling"
✅ You edit:  "Handle invalid input (negative health, null names) by throwing 
              IllegalArgumentException with descriptive messages"

❌ AI wrote: "Create a method to calculate damage"
✅ You edit:  "Create calculateDamage(int baseDamage) method. For Warriors, 
              multiply by 1.2 (strength bonus); for Mages, multiply by 0.8"

❌ AI wrote: "Test your code thoroughly"  
✅ You edit:  "Test edge cases: 0 health, MAX_INT damage, empty character names.
              I'll test these in grading, so make sure they work!"
```

**Why manual editing is powerful here**:
- You know the gotchas students encounter
- You can add YOUR specific requirements and style
- Quick to fix small ambiguities
- Makes requirements sound like your voice

Save and commit: `git commit -am "Add Task 1 requirements"`

**Repeat for remaining tasks**: Only after Task 1 is solid, request Task 2, add it to the file, commit. Then Task 3, etc. Use your judgement on what to combine.

**Why incrementally build the file**: 
- Each commit is a checkpoint you can revert to
- Easy to see what changed in each stage
- Can share work-in-progress with TAs for feedback
- AI can read the file in its current state for next task

**Why this stage matters**: Reviewing one detailed task is manageable. Reviewing 4 detailed tasks at once leads to missed issues.

### Stage 4: Create Assessment Rubric Grounded in Lectures

After requirements are finalized, build the rubric. **Key insight**: Ground rubric criteria in what students actually learned from lectures.

**Prompt that references lectures**:
> @hw3-oo-design.md has our assignment requirements. Create a grading rubric (100 points total) that assesses the learning objectives from those lectures: @l5-inheritance.md, @l6-polymorphism.md, @l7-encapsulation.md. Use a similar rubric structure to @hw2-unit-testing.md, but focusing on the new learning objectives from lectures 5-7.
>
> Provide specific, observable criteria for full credit, partial credit, and no credit. Make sure to reference the specific concepts from the lectures.

**Why reference lectures explicitly**:
- Rubric uses same terminology students learned
- Criteria are grounded in what was actually taught
- Students can review lectures to understand expectations
- Makes grading feel predictable, not arbitrary
- Clear alignment between teaching and assessment

**What you get**: Rubric with criteria like "Polymorphism (10 pts): Uses method overriding as demonstrated in Lecture 6, Section 2..."

**Your job**: Verify every requirement has corresponding rubric item. Check that criteria are measurable and match lecture content. Test-grade your own solution.

Save and commit: `git commit -am "Add grading rubric"`

### Stage 5: Add Supplementary Materials

Only after the core assignment is solid, add extras.

**Prompt for starter code**:
> Read the assignment requirements. Create a description of starter code to provide students. Include file structure, method stubs, and starter comments. Don't write the actual code yet - just describe what should be provided. Consider whether an AI model can effectively solve the assignment on its own. If so, consider how you expect to restrict students from using AI to solve the assignment, or how to evaluate how effectively they used AI to solve the assignment (if this is a desirable learning experience).

**Prompt for examples**:
> Read the assignment requirements. Create 2-3 concrete examples that illustrate the expected functionality without giving away the solution.

Save and commit: `git commit -am "Add submission requirements and examples"`

### Complete Example: Incremental Development

**Stage 1 - Generate alternatives**:
```
AI suggests: library system, game characters, document editors, 
shape hierarchies, employee management
```
→ You choose: game characters (most engaging)

**Stage 2 - Expand concept**:
```
AI writes: "Students will design a video game character system 
with a base Character class and specialized subclasses for Warriors, 
Mages, and Rogues. Each character type has unique abilities..."
```
→ You review: Good, but add requirement for inventory system

**Stage 3 - Detail Task 1**:
```
AI writes: "Task 1: Create the base Character class with:
- private fields: name (String), health (int), level (int)
- public methods: getName(), getHealth(), takeDamage(int amount)
- abstract method: useSpecialAbility()
Students must implement proper encapsulation..."
```
→ You review: Clear and specific. Approve. Move to Task 2.

**Stage 4 - Build rubric**:
```
AI writes: "Design Quality (30 points):
- Inheritance hierarchy (10 pts): Base class properly abstract...
- Polymorphism (10 pts): useSpecialAbility() overridden in each subclass...
- Encapsulation (10 pts): All fields private, accessed via methods..."
```
→ You review: Measurable criteria. Can grade consistently. Approve.

### Why This Approach Works

✅ **Reviewable chunks**: Each artifact is small enough to review thoroughly
✅ **Pedagogical control**: You approve the concept before investing in details
✅ **Quality over speed**: Taking time at each stage prevents costly revisions
✅ **Incremental refinement**: Each stage builds on solid foundation
✅ **Repository context**: AI always reads your latest course files for accuracy

### Summary: The Artifact-Based Workflow

```
Start with Learning Objectives (from your lectures)
  ↓
Stage 1: Generate 5 alternative concepts → Review → Pick best
         [Keep in chat, no file yet]
  ↓
Stage 2: Expand chosen concept into overview → Review → Approve
         [CREATE assignment file, add overview, git commit]
  ↓
Stage 3: Detail Task 1 → Review → Approve → ADD to file → git commit
         Detail Task 2 → Review → Approve → ADD to file → git commit
         Detail Task 3 → Review → Approve → ADD to file → git commit
  ↓
Stage 4: Generate rubric → Review → Verify alignment
         [ADD rubric to file, git commit]
  ↓
Stage 5: Generate support materials → Review → Approve
         [ADD support to file, git commit]
  ↓
Final: Test-solve the complete assignment yourself
```

**At each stage**:
- Review the artifact critically
- Refine if needed
- Add to file and commit when satisfied
- Clear Git history shows your development process
- Can revert to any previous checkpoint if needed

**For semester projects**: Same process, but create separate files:
- `project-overview.md` - Timeline and big picture
- `project-milestone-1.md` - Detailed first deliverable
- `project-milestone-2.md` - Detailed second deliverable
- etc.

**Key insight**: You're in control. AI generates options and drafts. You make all pedagogical decisions. Git tracks everything.

## Manual Editing: Making AI Output Your Own

**Critical principle**: Every time AI writes content to a file, that's a checkpoint for YOU to edit manually.

### Why Manual Editing Matters

AI generates solid drafts, but **you** make them excellent:

- **Your voice**: Assignments should sound like you, not a generic AI
- **Your experience**: You know what confuses students; AI doesn't
- **Your standards**: You know the level of detail and rigor you expect
- **Your context**: You know your specific tools, environment, constraints
- **Your personality**: Your humor, examples, and style engage students

**Don't just accept AI output wholesale.** Make it yours.

### When to Manually Edit vs. Ask AI to Refine

Use this decision tree:

#### Choose Manual Editing When:

✅ **Small, local changes**
- Fixing typos or grammar
- Adjusting one sentence or paragraph
- Changing a number or constraint
- Reformatting for consistency
- Adding a brief clarification

✅ **Adding personal touches**
- Inserting your specific examples
- Adding humor or personality
- Referencing course-specific context ("like we discussed in class...")
- Including your teaching philosophy

✅ **Fine-tuning language**
- Adjusting tone (more formal/casual)
- Simplifying complex sentences
- Making instructions more direct
- Changing passive to active voice

✅ **You know exactly what you want**
- Clear vision of the fix
- Faster to type than explain to AI
- Simple substitution or addition

#### Ask AI to Refine When:

🤖 **Structural changes**
- Reorganizing sections
- Reordering tasks or requirements
- Changing overall approach
- Splitting one task into two

🤖 **Expanding content**
- "Elaborate on the error handling requirements"
- "Add two more examples for polymorphism"
- "Generate test cases for edge cases"
- "Expand the getting started section"

🤖 **Large rewrites**
- "This section is too technical; simplify for beginners"
- "Rewrite this task to focus on composition instead of inheritance"
- "Make this rubric more objective and measurable"

🤖 **Pattern generation**
- "Generate 5 more similar examples"
- "Create matching test cases for all methods"
- "Write similar requirements for the remaining subclasses"

🤖 **Not sure how to fix it**
- Something feels off but you can't articulate the fix
- Need to explore different approaches
- Want to see alternatives before deciding

### Example Manual Editing Workflow

**Scenario**: AI generated Task 1 requirements. Here's how you might refine:

1. **Review AI output in file**
```markdown
### Task 1: Create Base Character Class

Create an abstract Character class. It should have fields for name, 
health, and level. Include appropriate getters and a method to handle 
taking damage. Implement a special ability system.
```

2. **Identify issues**:
   - Too vague ("appropriate getters")
   - Missing specifics (what does "taking damage" mean?)
   - "Special ability system" undefined

3. **Decide: manual or AI?**
   - Specifics about getters → **Manual** (I know exactly what I want)
   - Damage mechanic → **Manual** (I have the formula in mind)
   - Special ability system → **Ask AI** (want to see options)

4. **Make manual edits**:
```markdown
### Task 1: Create Base Character Class

Create an abstract `Character` class with:

**Fields** (all private):
- `String name` - Character's name (cannot be null or empty)
- `int health` - Current health points (0-100)
- `int level` - Character level (1-20)

**Methods**:
- `public String getName()` - Returns character name
- `public int getHealth()` - Returns current health
- `public void takeDamage(int amount)` - Reduces health by amount.
  Health cannot go below 0. If damage would reduce health below 0,
  set health to 0 instead.
- `public abstract String useSpecialAbility()` - Returns description
  of ability used (implemented by subclasses)

**Constructor**:
- `public Character(String name, int level)` - Creates character with
  given name and level. Initial health is 100. Throw 
  IllegalArgumentException if name is null/empty or level not in 1-20.
```

5. **Ask AI to elaborate on special ability**:
> "Read the Task 1 requirements I wrote. For the `useSpecialAbility()` 
> method, describe what each character type (Warrior, Mage, Rogue) should 
> return and what effect it should have on game state."

6. **Manually integrate AI's response**:
   - Take AI's good ideas
   - Edit for consistency with your style
   - Commit when satisfied

### Manual Editing Best Practices

#### 1. Edit in Small Batches

**Don't**: Make 50 changes, then commit
**Do**: Edit one section, commit. Edit next section, commit.

Why: If you break something, easy to identify where.

#### 2. Keep Your Voice Consistent

**Before editing**:
```markdown
Students are required to implement error handling mechanisms for 
invalid input conditions including but not limited to null references.
```

**After your edit**:
```markdown
Handle bad input! If someone passes null for a name or a negative 
health value, throw IllegalArgumentException with a clear error message.
```

#### 3. Add Concrete Examples

AI often stays abstract. You add specifics:

**AI draft**:
```markdown
Test edge cases thoroughly.
```

**Your edit**:
```markdown
Test edge cases I will definitely test:
- Character with 5 health takes 10 damage (should have 0 health, not -5)
- Creating character with empty string name (should throw exception)
- Level 20 Warrior vs Level 1 Mage (Warrior should win)
```

#### 4. Clarify Ambiguities

If you wondered about something, students will too:

**AI draft**:
```markdown
Characters should have appropriate stats for their level.
```

**Your edit**:
```markdown
All characters start with 100 health regardless of level. Level only 
affects special ability damage (explained in Task 2).
```

#### 5. Add YOUR Examples and Context

**AI draft**:
```markdown
For example, a warrior might have high strength.
```

**Your edit**:
```markdown
Think of Aragorn from Lord of the Rings: warriors are tanks with high 
health who can take lots of hits. We discussed this in lecture when 
comparing design tradeoffs.
```

### When NOT to Manually Edit

**Avoid manual editing if**:

❌ You're making the same change in 10 places → Ask AI to do it consistently
❌ You're unsure if your change is correct → Ask AI for alternatives first
❌ You're restructuring large sections → Let AI do the heavy lifting
❌ You need to expand content significantly → AI can draft, you polish
❌ You're tired/rushing → Manual editing when not focused introduces errors

### Combining Manual and AI Editing

**Best workflow**: Alternate between AI generation and manual refinement.

**Example**:
1. AI generates Task 1 → **You manually edit** → Commit
2. AI generates Task 2 → **You manually edit** → Commit  
3. You notice Task 2 conflicts with Task 1 → **Ask AI** to revise Task 2 → **You manually polish** → Commit
4. AI generates rubric → **You manually adjust point values** → Commit
5. Rubric seems misaligned → **Ask AI** to fix alignment → **You manually tune wording** → Commit

**Pattern**: AI handles structure and bulk content. You handle specifics, voice, and polish.

## Reviewing AI-Generated Assignments

### Critical Review Checklist

#### 1. Learning Objectives Alignment

- ✅ Does each task clearly address a stated objective?
- ✅ Can you assess whether students achieved the objective?
- ❌ Are there tasks that don't serve the objectives?

**Example issue**:
```
❌ "Add colorful output to your program"
   → Doesn't address design, polymorphism, or encapsulation

✅ "Implement a Display interface that allows different output formats"
   → Addresses polymorphism and encapsulation
```

#### 2. Clarity and Specificity

- ✅ Are requirements unambiguous?
- ✅ Do students know exactly what to submit?
- ❌ Are there vague terms like "appropriate," "reasonable," "good"?

**Example refinement**:
```
❌ "Design an appropriate class hierarchy"
   → What makes it "appropriate"?

✅ "Design a class hierarchy with:
    - Abstract base class Animal
    - At least 3 concrete subclasses
    - At least 2 overridden methods
    - At least 1 interface implementation"
   → Clear, measurable criteria
```

#### 3. Scope and Difficulty

- ✅ Can students realistically complete this in the allocated time?
- ✅ Is the difficulty appropriate for their experience level?
- ❌ Are you asking them to use concepts they haven't learned?

**Red flags**:
- Too many disparate concepts in one assignment
- Requires external libraries or tools not taught
- Expectations mismatched with class time spent on topic

#### 4. Feasibility

**Test-solve it yourself!**

- Can you complete it in the time allocated?
- Are the requirements actually achievable?
- Are there hidden complexities?
- Do you understand the problem well enough to help students?

**If you can't solve it easily, students will struggle.**

#### 5. Pedagogical Value

- ✅ Will completing this assignment deepen understanding?
- ✅ Is it engaging/interesting?
- ❌ Is it busy work that doesn't teach?

**Example**:
```
❌ "Implement 10 different sorting algorithms"
   → Tedious, doesn't deepen understanding after 2-3

✅ "Implement bubble sort and quicksort. Compare their performance
    on different input types (sorted, reverse, random). Analyze results."
   → Practice + analysis + critical thinking
```

## Iterating and Refining at Each Stage

### Stage-Specific Refinement Strategies

Because you're working incrementally, refinements are focused and manageable.

#### Refining Alternatives (Stage 1)

**Scenario**: None of the 5 concepts appeal to you.

**Follow-up**:
> "These concepts are too focused on business applications. Generate 5 more concepts that involve games, creative arts, or scientific simulations."

**Scenario**: Two concepts look promising.

**Follow-up**:
> "I like concepts 2 (game characters) and 4 (shape hierarchies). For each, describe one concrete example of how students would demonstrate polymorphism."

#### Refining Overview (Stage 2)

**Scenario**: Scope is too large.

**Follow-up**:
> "This overview is too ambitious for 5-7 hours. Remove the inventory system and focus only on the character hierarchy and ability system."

**Scenario**: Concept is unclear.

**Follow-up**:
> "The 'special ability system' is vague. Give concrete examples of what Warriors, Mages, and Rogues would do differently when using their special abilities."

#### Refining Requirements (Stage 3)

**Scenario**: Task 1 requirements are vague.

**Follow-up**:
> "Task 1 says 'implement appropriate methods.' Be specific: list exactly which methods must be implemented, their signatures, return types, and expected behavior."

**Scenario**: Task 1 is too difficult.

**Follow-up**:
> "Task 1 is too complex for students who just learned inheritance. Simplify: remove the equipment modifier system and just focus on basic character attributes and one special ability."

**Scenario**: After reviewing Task 2, you realize it conflicts with Task 1.

**Follow-up**:
> "Task 2 requires modifying the Character base class, but Task 1 said to make it final. Revise Task 1 to allow for extension in Task 2."

#### Refining Rubric (Stage 4)

**Scenario**: Rubric criteria are subjective.

**Follow-up**:
> "The rubric says 'good design' but doesn't define it. For the design quality section, provide specific, observable criteria like 'abstract methods declared in base class' or 'no duplicate code across subclasses.'"

**Scenario**: Point allocation doesn't match learning objectives.

**Follow-up**:
> "This assignment's primary goal is polymorphism, but the rubric only allocates 10 points to it. Reweight to: Polymorphism (40 pts), Inheritance (25 pts), Encapsulation (20 pts), Style (15 pts)."

### Why Stage-Based Refinement Works Better

**Traditional approach** (generate everything at once):
- Problem in requirements affects rubric
- Need to regenerate multiple sections
- Hard to track what changed
- Overwhelming to review all changes

**Stage-based approach**:
- Problem caught at its source
- Only regenerate the affected stage
- Clear what changed (just Task 2, just rubric, etc.)
- Manageable review scope

**Example of cascading fixes avoided**:

❌ **All at once**: Generate everything → Notice Task 3 conflicts with rubric → Ask AI to fix both → Task 2 also changes unexpectedly → Now reviewing 3 sections of changes

✅ **Stage by stage**: Review Task 3 → Catch conflict before rubric exists → Fix Task 3 → Generate rubric aligned with corrected Task 3 → No cascading changes

## Creating Effective Rubrics

### AI-Assisted Rubric Development: Grounded in Lectures

**Key principle**: Rubrics should directly reference lecture content so students see clear connection between what they learned and how they're assessed.

**Best practice prompt**:
> Read assignments/hw3-oo-design.md to understand the assignment requirements.
>
> Read lecture-notes/l5-inheritance.md, lecture-notes/l6-polymorphism.md, and lecture-notes/l7-encapsulation.md to understand what we taught.
>
> Create a grading rubric (100 points total) using these categories:
> - Correctness (40 pts)
> - Design Quality (30 pts) - assess the specific OO principles from lectures 5-7
> - Code Style (15 pts) - use the style guidelines from lecture-notes/l2-java-style.md
> - Testing (15 pts)
>
> For each criterion, explicitly reference which lecture covered it. Use the same terminology and examples from lectures. Students should be able to map each rubric item back to what they learned.
>
> Provide specific, observable criteria for full credit, partial credit, and no credit.

**What this achieves**:
- Students can prepare by reviewing relevant lectures
- Grading criteria match taught concepts (no surprises)
- TAs grade consistently using shared vocabulary
- Students see direct teaching-to-assessment alignment

### Example: Lecture-Grounded vs. Generic Rubrics

**Generic rubric (not recommended)**:
```markdown
Design Quality (30 points):
- Good use of object-oriented principles (30 pts)
- Acceptable OO design (20 pts)
- Poor design choices (10 pts)
```
**Problems**: "Good"? "Acceptable"? Students don't know what you're looking for.

**Lecture-grounded rubric (recommended)**:
```markdown
Design Quality (30 points):

**Inheritance (10 pts)** - As taught in Lecture 5:
- [10 pts] Abstract Character base class with protected/private fields
- [7 pts] Base class exists but fields are public (violates encapsulation)
- [4 pts] No abstract base class; duplicate code across subclasses
- [0 pts] Does not use inheritance

**Polymorphism (10 pts)** - As demonstrated in Lecture 6, Section 3:
- [10 pts] useSpecialAbility() overridden in each subclass with different behavior
- [7 pts] Method overridden but behavior identical (not truly polymorphic)
- [4 pts] Method not properly overridden (uses type checking instead)
- [0 pts] No polymorphic behavior

**Encapsulation (10 pts)** - Following principles from Lecture 7:
- [10 pts] All fields private with appropriate getters/setters
- [7 pts] Most fields private but some inappropriate direct access
- [4 pts] Fields are public; no encapsulation
- [0 pts] No attempt at encapsulation
```

**Why this is better**:
- Students know exactly what "good inheritance" means (matches Lecture 5)
- Can review specific lecture sections to understand criteria
- TAs grade consistently (shared definition from lectures)
- Predictable: assessment matches teaching

### Reviewing AI-Generated Rubrics

**Check for**:

1. **Alignment with lectures**:
   - Does each criterion reference what was taught?
   - Does terminology match what students learned?
   - Can students map rubric items to specific lectures?
   - Are examples from lectures referenced?

2. **Alignment with assignment objectives**:
   - Do point allocations reflect objective importance?
   - Is every objective assessed?

3. **Clarity**:
   - Can TAs apply this consistently?
   - Are criteria observable/measurable?
   - No subjective terms like "good" or "elegant" without definition

4. **Fairness**:
   - Can students understand expectations?
   - Are deductions proportional to errors?
   - Is full credit achievable?

**Example refinement**:

```
❌ "Good design: 30 points"
   → What makes design "good"? Students don't know.

✅ "Design Quality (30 points) - Assessed per Lectures 5-7:
    - [10 pts] Inheritance hierarchy (Lecture 5): Abstract base class, 
              appropriate subclasses as shown in Character example
    - [10 pts] Polymorphism (Lecture 6): Method overriding with different 
              behavior, like the Animal examples we practiced
    - [10 pts] Encapsulation (Lecture 7): Private fields with getters/setters,
              following the BankAccount pattern from class
    - Deduct 3 pts per principle violated, minimum 0"
```

### The Power of Lecture-Grounded Rubrics

**Key insight**: When rubrics explicitly reference lectures, everyone benefits.

**For students**:
- Know exactly what to study (review Lectures 5-7 for design quality)
- Understand expectations (use techniques from Lecture 6)
- Feel assessment is fair (you're tested on what was taught)
- Can prepare strategically (practice examples from lecture)

**For TAs**:
- Grade consistently (shared definition from lectures)
- Answer student questions confidently ("Remember Lecture 5...")
- Less subjective judgment needed
- Clear justification for point deductions

**For you (instructor)**:
- Ensure constructive alignment (teach → assess → teach)
- Identify gaps (if rubric can't reference lectures, maybe you didn't teach it?)
- Trust TAs will grade consistently
- Justify grades to students ("Per the Lecture 6 definition...")

**Anti-pattern to avoid**:
```markdown
❌ Design Quality (30 pts): Good OO design
```
Students think: "What does 'good' mean? Did I do it? How do I prepare?"

**Best practice**:
```markdown
✅ Design Quality (30 pts):
   - Inheritance (Lecture 5): Abstract base class as in Character example
   - Polymorphism (Lecture 6): Method overriding as demonstrated with Animals
   - Encapsulation (Lecture 7): Private fields + getters as in BankAccount
```
Students think: "I need to review lectures 5-7. I know what to study."

### Rubric Testing

Before releasing:

1. **Grade your own solution** using the rubric - Does every criterion match what you taught?
2. **Verify lecture references** - Can you point to specific lecture content for each criterion?
3. **Grade a deliberately flawed solution** (can AI generate one?)
4. **Have a TA grade test cases** - do they interpret consistently using lecture definitions?

## Next Steps

Now that you can develop individual assignments with AI:

1. **Practice**: Create one assignment using the staged approach
2. **Test-solve**: Actually complete it yourself and time it
3. **Review**: Have a TA or colleague review your assignment
4. **Refine**: Incorporate feedback and iterate
5. **For semester projects**: See the separate guide on developing large course projects

---

**Remember**:

- **Start with learning objectives** - What should students learn?
- **Work in stages** - Generate alternatives, pick one, expand incrementally
- **Review each artifact** - Don't accept AI output without critical evaluation
- **Ground rubrics in lectures** - Ask AI to reference specific lecture content
- **Edit manually at checkpoints** - Make AI output sound like YOU
- **Combine AI + manual editing** - AI drafts structure, you add voice and specifics
- **Maintain control** - AI generates options, you make pedagogical decisions
- **Leverage your repository** - AI reads your course files for accurate context
- **Test-solve everything** - If you can't do it, neither can your students

The best assignments come from **backwards design pedagogy** + **your expertise** + **AI's efficiency** + **your manual refinement** + **lecture-grounded assessment**. 

**Workflow**: AI generates → You review → You manually edit → AI refines → You polish → Commit. Every file save is an opportunity to make it yours.

**For rubrics**: Always ask AI to read lecture notes and reference specific concepts. Rubrics should use the same terminology and examples students learned in class. This makes assessment predictable and fair.
