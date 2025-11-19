---
sidebar_position: 1
---

# Welcome to Courseasaurus

## Learning Outcomes

By the end of this guide, you will be able to:

- Understand what Courseasaurus is and its core capabilities
- Identify when to use Courseasaurus for course management
- Navigate the instructor manual effectively to find the guidance you need

## What is Courseasaurus?

Courseasaurus is a modern **CourseOps platform** that streamlines the entire lifecycle of curriculum development and dissemination. It combines three powerful technologies:

1. **Docusaurus** - A modern static site generator that manages all your course content as markdown files
2. **Courseasaurus Plugin** - Custom content generation that manages course metadata, schedules, assignments, and learning objectives
3. **RevealJS Integration** - In-app rendering of beautiful presentation slides, also written in markdown

Think of it as "infrastructure as code" for your course—everything from lecture notes to assignment schedules lives in version-controlled markdown files that can be collaboratively edited, reviewed, and deployed.

## What Problems Does Courseasaurus Solve?

### Traditional Course Management Challenges

- **Scattered Content**: Lecture notes in Google Docs, slides in PowerPoint, schedule in Excel, assignments in Canvas
- **Version Control Chaos**: "final_v2_REALLY_FINAL.docx" naming conventions
- **Collaboration Friction**: Email attachments, lost feedback, unclear ownership
- **Schedule Updates**: Manually updating dozens of places when one lecture shifts
- **Learning Objectives Tracking**: No systematic way to ensure content aligns with goals

### The Courseasaurus Approach

Courseasaurus centralizes everything into a single, version-controlled repository where:

- All content is in markdown (portable, readable, git-friendly)
- Schedules are defined once and automatically propagate throughout the site
- Changes are tracked, reviewed via pull requests, and deployed automatically
- Learning objectives are extracted from frontmatter and can be aggregated
- Slides are created from the same markdown as lecture notes
- The entire site can be cloned, adapted, and reused semester after semester

## Key Features

### 📝 Markdown-Based Content

All course materials—lecture notes, labs, assignments, slides—are written in markdown. This means:
- Human-readable source files
- Easy version control with Git
- Portable across platforms
- Focus on content, not formatting

### 📅 Automated Schedule Management

Define your course schedule once in `course.config.json`:
- Meeting patterns (e.g., "Monday/Wednesday 10:30-11:35")
- Holidays and breaks
- Lecture-to-date mappings
- Assignment due dates

The plugin automatically generates a complete course schedule, handling:
- Holiday conflicts
- Multi-section courses
- Date calculations
- Schedule visualization

### 🎓 Learning Objectives Tracking

Define learning objectives in document frontmatter:

```yaml
---
learning_objectives:
  - Understand Git branching strategies
  - Create effective pull requests
---
```

The plugin can extract and aggregate these across your entire course.

### 🎬 RevealJS Slides (In-App!)

Create presentation slides in markdown using RevealJS:
- Animations and transitions
- Code highlighting
- Speaker notes
- All rendered directly in the browser—no separate PowerPoint files

### 🔄 GitOps Workflow

Leverage Git best practices:
- Branch-based development
- Pull request reviews
- Automated CI/CD
- Private/public repository patterns for managing solutions

## Who Should Use Courseasaurus?

Courseasaurus is ideal for instructors who:

- Are capable of installing NodeJS and running commands in a terminal
- Want to embrace modern software engineering practices for course management
- Collaborate with co-instructors and TAs
- Teach the same course multiple semesters and want easy adaptation
- Manage large courses (100+ students) with extensive content
- Value version control and transparency in curriculum development

## Navigating This Manual

This instructor manual is organized into four focused sections:

### 1. 🏗️ Foundations & Setup (You are here!)

Learn the basics:
- **Overview** (this page) - Understanding Courseasaurus
- **Installation** - Setting up your development environment
- **GitOps Workflow** - Version control and collaboration fundamentals
- **AI Philosophy** - Principles for effective AI-assisted course management

### 2. 🔧 AI-Assisted Site Management

Master the technical operations:
- Managing document collections (adding new content types)
- Refactoring and reorganizing content
- Schedule management and transformations
- Learning objectives extraction and alignment

### 3. ✍️ AI-Assisted Content Development

Create high-quality course materials:
- Developing assignments and projects
- Expanding lecture notes
- Creating presentation slides
- Maintaining teaching skills while using AI

### 4. 📊 AI-Assisted Operations Planning

Plan and manage large-scale courses:
- Schedule impact analysis
- Staff planning and management (40+ TAs)
- Resource utilization analysis
- Comprehensive operations planning
- Discord server setup and management

## The Meta-Example

Throughout this manual, we use **creating this very site** as a running example. When you see "Meta-example" sections, they'll show actual code, configurations, and decisions from building the Courseasaurus documentation site you're reading right now. This provides concrete, real-world illustrations of the concepts being taught.

For instance, the `course.config.json` you'll see in the next section is the actual configuration file used to generate the schedule for this documentation project.

## Next Steps

Ready to get started? Head to [Installation](./installation.md) to set up your development environment and create your first Courseasaurus site.

---

**Remember**: Courseasaurus is a tool to enhance your teaching, not replace your expertise. The goal is to automate the tedious parts of course management so you can focus on what matters most—helping students learn.

