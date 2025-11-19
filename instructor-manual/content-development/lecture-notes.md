---
sidebar_position: 5
---

# Developing Lecture Notes with AI

## Learning Outcomes

By the end of this guide, you will be able to:

- Apply a staged, interactive approach to developing lecture notes
- Use AI to draft content within strict pedagogical constraints
- Critically review and "humanize" AI-generated explanations
- Maintain the specific formatting required for Courseasaurus schedule generation
- Balance AI efficiency with the maintenance of teaching expertise

## Why AI-Assisted Lecture Notes?

Developing high-quality lecture notes is traditionally time-consuming. AI assistance allows you to:

- **Iterate faster**: Quickly generate alternative explanations or examples.
- **Focus on pedagogy**: Spend less time typing and more time structuring the learning journey.
- **Bridge gaps**: Identify missing prerequisites or logical leaps in your outline.
- **Standardize structure**: Ensure all lectures follow a consistent time-managed format.

**Challenge**: AI tends to produce "textbook style" content—dry, dense, and comprehensive but lacking the narrative arc and interactive nature of a good lecture.

**Solution**: A **Scope-Review-Iterate** process where you define the structure, AI drafts sections, and you ruthlessly edit for voice and classroom dynamics.

## The Development Process

### Traditional Approach

1. Stare at blank page
2. Write outline from memory
3. Flesh out bullet points manually
4. Search for examples online
5. Estimate timing based on gut feeling

**Time**: High. **Problem**: Often leads to "content cramming" where timing is inaccurate.

### AI-Assisted Approach

1. **Collaborative Outlining**: Define learning outcomes; work with AI to structure the flow and timing.
2. **Iterative Drafting**: Expand one section at a time with specific constraints.
3. **Human Refinement**: Edit for voice, verify facts, and add personal anecdotes.
4. **Example Generation**: Use AI to brainstorm variations, then select the best.
5. **Review**: Verify alignment with course context.

**Key principle**: AI acts as a tireless teaching assistant who drafts content; you act as the lead instructor who decides what actually goes into the lesson.

## Working in a Course Repository

**Important**: This guide assumes you are using an AI coding agent (like Cursor) with access to your full repository.

**Key advantage**: The AI can read `course.config.json` and previous lectures.
- It knows what students learned last week.
- It knows the duration of your class slots.
- It can format headers exactly as the plugin requires.

**Example**:
> "Read @l1-intro.md. We are now writing Lecture 2. We should use the same style as the prior lecture. Based on the syllabus and this list of topics... , propose an outline..."

## Developing Lectures: The Staged Approach

### Anti-pattern: The "One-Shot" Request

**Bad Prompt**:
```
Examine our syllabus. Propose a 60-minute lecture on the topic of "How to use AI to write lecture notes". Use the same style as the prior lecture.
```

**Why this fails**:
Developing lectures is a complex task that requires a deep understanding of the material and the preparation that your students have. It is very unlikely that an AI will be able to do this well (particularly at the college level). This is not a trait that AI agents are good at. However, there are many ways to leverage the strengths of AI to help you develop lectures - the goal of this guide.

### Stage 1: Structural Design & Outlining

Start by defining the skeleton. The Courseasaurus plugin suggests a specific format for time tracking (and learning outcomes). Here are the rules:
- **Second-level headings** (`##`) define the topic.
- **Time estimates** in parentheses are required: `(15 minutes)`.

When beginning a new lecture, start a new document in the `lecture-notes/` directory. Add a few learning outcomes to it directly based on your understanding of the material and goals of the lecture.

You can use AI to help you tweak and review the learning outcomes:
**Prompt**:
> Review the learning outcomes for this lecture as specfified in @l1-intro.md
>
> Compare the learning outcomes for this lecture with the overall goals for the course and the pre-requisites for assignment @hw1-introduction.md.
> Provide a report on the effectiveness of the learning outcomes for this lecture given those goals.

**Your Job (Editing Checkpoint)**:
- **Check timing**: Are the estimates realistic? (AI is often optimistic).
- **Check flow**: Does the narrative arc make sense?
- **Adjust**: Manually edit the headers and times before moving on.

### Stage 2: Iterative Expansion (Scope-Review-Iterate)

Expand one header at a time. Do **not** ask for the whole file.

**Prompt**:
> We are working on the section `## The Staging Area (15 minutes)`.
>
> Draft the lecture notes for this section.
> - Use the analogy of a "shopping cart" before checking out.
> - Include 2 discussion questions to ask the class.
> - Use the same style as the prior lecture.

**Editing Checkpoint - Refine Now!**

```markdown
❌ AI wrote: "The staging area is an intermediate storage area where changes are formatted and reviewed before completing the commit." (Too dry)

✅ You edit: "Think of the staging area like a **shopping cart**. You pick files off the shelf (working dir), put them in the cart (staging), but you haven't paid yet (commit). You can still take things out of the cart if you change your mind."
```

**Why this matters**: This "humanization" step is where you inject your teaching persona. If you skip this, your lectures will sound robotic. You are also likely to end up eventually losing any skill that you have developed in writing lecture notes. Your students will likely be able to tell what you have done here. "Professor uses AI to write lecture notes" is not a good look. "Professor uses AI to write better lecture notes than ever offered before" is a better one.

### Stage 3: Examples and Analogies

AI excels at generating variety and volume. Your role shifts from "writer" to "curator"—evaluating options and selecting the ones that best fit your students' mental models.

#### Pattern 1: The Curator (Brainstorm → Select → Refine)

Instead of struggling to find one perfect analogy, ask for a divergent set.

**Prompt**:
> "I need to explain [Concept] in this lecture. Generate 3 distinct analogies:
> 1. One from everyday life
> 2. One related to [Previous Topic]
> 3. One visual/spatial analogy
>
> Keep them brief."

**Your Job**: Pick the analogy that is least likely to introduce misconceptions, then tweak it to be aligned with your teaching style and pedagogical goals.

#### Pattern 2: The Ladder of Complexity (Scaffolding)

Best for building exercise sets or walked-through examples. You define the "Happy Path" (simple case), and ask AI to build the ladder of increasing difficulty.

**Prompt**:
> "Here is a basic example of [a SQL JOIN]. Generate 3 variations that progressively increase in difficulty:
> 1. **Level 1**: Basic syntax variation.
> 2. **Level 2**: Adds a constraint or filter.
> 3. **Level 3**: An edge case or common 'trick' question."

**Your Job**: Verify that the "Level 3" example is fair and solvable with current knowledge. As always, tweak the examples to be aligned with your teaching style and pedagogical goals.

#### Real world example, this section:
Gemini 3 pro first generated some "2+AI rule" suggestion for what to present here (human should always generate 2 examples themselves first before asking AI to generate more). This does not directly align with our philosophy of how to productively use AI to help you develop lectures.

**Prompt**:
> @lecture-notes.md (118-130) The 2+AI rule is bizzare and I don't know where it came from. Propose a few other ideas of what we say here under "Examples and Analogies" that leverage the strengths of AI while also providing many opportunities for humans to engage
...
> Great! I love Curator + Ladder of Complexity - can you outline this?
...
### Stage 4: Final Review

Once the draft is complete, review the entire document.

## Other ways to use AI to help you develop lectures

### Include other artifacts as context where relevant
If you are adapting a lecture from a previous semester, you can include the lecture notes from the previous semester as context. This will help you ensure that you are not repeating yourself and that you are covering all of the necessary material. You can even include useful prompts like "Use the same style as the prior lecture," "Use the same examples as the prior lecture," or "Let's take it back to first principles: extract the learning outcomes from the prior lecture and keep the rest of the material in mind, but let me try to start from a clean slate for some of this."

### Avoid The Expert Blind Spot
**Problem**: AI (and experts) often skip foundational steps.
**Fix**: Ask AI: "What prerequisites does a student need to understand this specific explanation? Are we missing any?"
