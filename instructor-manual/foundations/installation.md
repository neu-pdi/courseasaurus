---
sidebar_position: 2
---

# Installation and Initial Setup

## Learning Outcomes

By the end of this guide, you will be able to:

- Install required tools (Node.js via nvm, Git, VS Code)
- Initialize a new Courseasaurus site
- Configure basic course information
- Run the local development server and view your site

## Prerequisites

Before you begin, you'll need to install three essential tools. We provide links to official guides—follow them for your specific operating system.

### 1. Node.js (via nvm)

We **strongly recommend** using [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to install Node.js. This allows you to easily switch between Node versions and avoid permission issues.

**Installation:**
- **macOS/Linux**: Follow the [nvm installation guide](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Windows**: Use [nvm-windows](https://github.com/coreybutler/nvm-windows)

Once nvm is installed, install Node.js 22 or higher:

```bash
nvm install 22
nvm use 22
node --version  # Should show v22.x.x or higher
```

### 2. Git

Git is essential for version control and collaboration.

**Installation:**
- **macOS**: Git comes pre-installed, or use `brew install git`
- **Windows**: Download from [git-scm.com](https://git-scm.com/download/win)
- **Linux**: Use your package manager (e.g., `sudo apt-get install git`)

Verify installation:

```bash
git --version
```

**First-time Git setup:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Code Editor

We recommend [Visual Studio Code](https://code.visualstudio.com/) or [Cursor](https://www.cursor.com/), but any text editor will work (you are losing out to not use one with an AI assistant though...). 

**Recommended VS Code Extensions:**
- Markdown All in One
- Markdown Preview Enhanced
- GitLens
- ESLint
- Prettier

## Creating a New Courseasaurus Site

The easiest way to get started is to fork the [neu-pdi/courseasaurus](https://github.com/neu-pdi/courseasaurus) repository on GitHub

:::tip Using AI for Setup
You can ask an AI assistant to help you understand the template structure or generate initial configurations. Just make sure to review any generated code carefully!

Example prompt: "Explain the directory structure of this Docusaurus project and what each folder is used for."
:::

## Understanding the Project Structure

Once you have a Courseasaurus site, you'll see this structure:

```
my-course/
├── docs/                      # Documentation (this manual, for example)
├── lecture-notes/            # Course lecture notes
├── labs/                     # Lab assignments
├── assignments/              # Homework and projects
├── lecture-slides/           # RevealJS presentation slides
├── src/
│   ├── components/          # Custom React components
│   ├── css/                # Custom styles
│   └── pages/              # Custom pages (home, syllabus, etc.)
├── static/
│   └── img/                # Images and static assets
├── plugins/
│   └── courseasaurus/      # The Courseasaurus plugin
├── course.config.json       # Course configuration (IMPORTANT!)
├── docusaurus.config.ts    # Docusaurus configuration
├── sidebars.ts             # Sidebar definitions
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

You can customize the structure of your site to your liking.

### Key Directories

- **`docs/`** - General documentation collections
- **`lecture-notes/`** - Markdown files for each lecture
- **`labs/`** - Lab assignment descriptions
- **`assignments/`** - Homework and project descriptions
- **`lecture-slides/`** - RevealJS slides in markdown format
- **`course.config.json`** - The heart of Courseasaurus—defines schedule, assignments, etc.

## Configuring Your Course

The most important file is `course.config.json`. This is where you define all the metadata about your course.

### Meta-Example: Actual course.config.json

Here's a simplified version of the `course.config.json` used for this documentation site:

```json
{
  "courseCode": "CS 1000",
  "courseTitle": "Courseasaurus Demo Course",
  "semester": "Spring 2026",
  "academicYear": "2025-2026",
  "startDate": "2026-01-06",
  "endDate": "2026-04-20",
  "timezone": "America/New_York",
  "sections": [
    {
      "id": "01",
      "name": "Section 01",
      "meetings": [
        {
          "type": "lecture",
          "days": ["Monday", "Wednesday", "Thursday"],
          "startTime": "10:30",
          "endTime": "11:35",
          "location": "TBD"
        },
        {
          "type": "lab",
          "days": ["Tuesday"],
          "startTime": "14:00",
          "endTime": "15:40",
          "location": "Ryder Hall 431"
        }
      ],
      "instructors": ["Dr. Jane Smith"]
    }
  ],
  "holidays": [
    {
      "date": "2026-01-19",
      "name": "Martin Luther King Jr. Day",
      "type": "holiday"
    },
    {
      "date": "2026-03-02",
      "endDate": "2026-03-06",
      "name": "Spring Break",
      "type": "break"
    }
  ],
  "lectures": [
    {
      "lectureId": "l1-intro",
      "dates": ["2026-01-06"],
      "topics": [
        "Course Introduction and Overview",
        "Syllabus Review"
      ]
    }
  ],
  "assignments": [
    {
      "id": "hw1",
      "title": "Homework 1: Introduction",
      "type": "homework",
      "assignedDate": "2026-01-06",
      "dueDate": "2026-01-13",
      "dueTime": "23:59",
      "points": 100,
      "url": "/assignments/hw1-introduction"
    }
  ]
}
```

### Customizing for Your Course

Edit the `course.config.json` file with your course details:

1. **Basic Information**: Update `courseCode`, `courseTitle`, `semester`
2. **Dates**: Set `startDate` and `endDate` for your semester
3. **Sections**: Define your meeting patterns (days, times, locations)
4. **Holidays**: Add your institution's holidays and breaks
5. **Lectures**: Map lecture files to specific dates
6. **Assignments**: Define assignment release and due dates

:::warning Review Dates Carefully
When using AI to help generate or modify `course.config.json`, **always manually verify all dates**. AI can make mistakes with date calculations, especially around holidays and weekends.
:::

## Running Your Site Locally

Once configured, start the development server:

```bash
npm start
```

This will:
1. Build your site
2. Start a local web server
3. Open your browser to `http://localhost:3000`

The site will automatically reload when you edit files!

### Common Startup Issues

**Port already in use:**
```bash
# Kill the process on port 3000
npx kill-port 3000
# Or use a different port
npm start -- --port 3001
```

**Build errors:**
- Check that all lecture files referenced in `course.config.json` exist
- Verify JSON syntax in `course.config.json` (no trailing commas!)
- Look for broken links in markdown files

## Testing Your Configuration

After the site loads, check:

1. **Schedule Page** (`/schedule`) - Does it show your course meetings?
2. **Lecture Notes** - Do your lecture note files appear in the sidebar?
3. **Assignments** - Are assignments listed with correct due dates?

## Using AI for Initial Configuration

AI can be helpful for generating initial configurations:

**Good prompt example:**
> "Given this course that meets Monday/Wednesday/Friday from 9:00-10:05 AM, starting January 15, 2026 and ending April 30, 2026, with Spring Break March 15-19, generate a course.config.json skeleton."

**What to review:**
- ✅ Date formats (YYYY-MM-DD)
- ✅ Time formats (24-hour, HH:MM)
- ✅ Day spellings (capitalized, full names)
- ✅ All holidays fall on class days
- ✅ Semester dates are realistic

:::tip Start Simple
Don't try to configure everything at once. Get the basic schedule working first, then add lectures, then assignments. This makes troubleshooting easier.
:::

## Next Steps

Now that you have a running Courseasaurus site, you should:

1. **Learn Git workflows** - Read [GitOps Workflow](./gitops-workflow.md) to understand version control
2. **Create your first content** - Add a lecture note or lab to see how markdown files work

---

**Pro Tip**: Keep your initial setup simple. Add complexity incrementally as you become comfortable with the platform. Many instructors start with just lecture notes and add other features (slides, labs, assignments) semester by semester.

