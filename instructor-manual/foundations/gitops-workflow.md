---
sidebar_position: 3
---

# Version Control and Collaboration

## Learning Outcomes

By the end of this guide, you will be able to:

- Understand basic Git concepts (commits, branches, pull requests)
- Use Git for course content version control
- Implement branching strategies for course development
- Set up CI/CD for automated builds and deployments
- Configure private-to-public repository mirroring for student access

## Git Basics

### What is Version Control?

Version control is a system that tracks changes to files over time. Think of it as an infinite "undo" button plus a time machine for your course materials. Instead of:

```
assignment1_final.docx
assignment1_final_v2.docx
assignment1_final_REALLY_FINAL.docx
assignment1_final_reviewed_by_coauthor.docx
```

You have:
```
assignment1.md  (with complete history of every change)
```

Git is the most popular version control system, and it powers platforms like GitHub, GitLab, and Bitbucket.

### Why Git for Course Materials?

- **Track every change**: Who changed what, when, and why
- **Collaborate effectively**: Multiple instructors can work simultaneously
- **Experiment safely**: Try new ideas without breaking the working version
- **Backup automatically**: Your work is always backed up remotely
- **Transparency**: Students can see content evolve (if you choose)
- **Reusability**: Clone last semester's course and adapt it

### Understanding the Staging Area

Git has a three-stage process:

1. **Working Directory**: Files you're actively editing
2. **Staging Area**: Changes marked "ready to save"
3. **Repository**: Permanently saved snapshots (commits)

```
Edit file → Stage changes → Commit → Push to remote
  (git add)     (git commit)  (git push)
```

### Basic Git Commands

Open a terminal in your course directory:

```bash
# See what files have changed
git status

# Stage changes for commit
git add course.config.json            # Stage one file
git add lecture-notes/l1-intro.md    # Stage another
git add .                            # Stage all changes (use carefully!)

# Commit staged changes with a message
git commit -m "Add lecture 1 notes and update schedule"

# Push commits to GitHub (or GitLab, etc.)
git push

# Pull latest changes from remote
git pull
```

### Writing Good Commit Messages

Good commit messages explain **what changed and why**:

✅ **Good examples:**
- `Add lecture 3 notes on data structures`
- `Fix typo in homework 2 requirements`
- `Update schedule to account for snow day`
- `Add RevealJS slides for sorting algorithms lecture`

❌ **Poor examples:**
- `.`
- `:facepalm:`
- `updates`
- `stuff`
- `fixed it`
- `changes from yesterday`

**Convention**: Start with a verb in present tense (Add, Fix, Update, Remove)

:::tip Using AI for Commit Messages
AI can help generate commit messages based on your changes:

```bash
git diff  # Show your changes
```

Copy the diff and ask: "Write a clear git commit message for these changes."

**But review it!** Make sure it accurately describes what you did and why.
:::

## Branching Workflows

### What are Branches?

A branch is a parallel version of your repository. The main branch (usually called `main` or `master`) represents the "official" version. Feature branches let you work on changes without affecting the main version.

Think of it like working on a draft document while the published version stays available.

### Why Use Branches?

- **Isolation**: Develop new content without breaking the working site
- **Experimentation**: Try ideas and delete the branch if they don't work out
- **Collaboration**: Multiple people work on different features simultaneously
- **Review**: Changes can be reviewed before merging into main

### Creating and Using Branches

```bash
# Create a new branch and switch to it
git checkout -b add-lecture-5-notes

# Or, with newer Git versions:
git switch -c add-lecture-5-notes

# See all branches
git branch

# Make changes, commit as usual
git add lecture-notes/l5-testing.md
git commit -m "Add lecture 5 notes on testing strategies"

# Push branch to remote
git push -u origin add-lecture-5-notes

# Switch back to main branch
git checkout main

# Delete a branch (locally) after merging
git branch -d add-lecture-5-notes
```

### Branch Naming Conventions

Use descriptive, hyphenated names:

- `add-week3-lectures`
- `fix-assignment2-rubric`
- `update-spring-2026-dates`
- `revise-syllabus-grading-policy`

### When to Branch vs. Commit Directly

**Branch for:**
- New major content (entire lecture, new assignment)
- Experimental changes
- Changes requiring review
- Work-in-progress that isn't ready for students

**Commit directly to main for:**
- Small typo fixes
- Quick date adjustments
- Emergency fixes that need immediate deployment

:::tip Start with Simple Workflow
When learning, it's okay to commit directly to main for a while. As you get comfortable, adopt branching for larger changes.
:::

## Pull Requests (PRs)

### What is a Pull Request?

A Pull Request (PR) is a way to propose changes from one branch to another. It's called different things on different platforms:
- **GitHub**: Pull Request (PR)
- **GitLab**: Merge Request (MR)
- **Bitbucket**: Pull Request (PR)

Think of it as saying: "I've made changes on my branch. Please review them and consider merging them into main."

### Why Use Pull Requests?

- **Peer review**: Co-instructors can review content before publication
- **Discussion**: Comment on specific lines, ask questions
- **Quality control**: Catch errors before students see them
- **Documentation**: PRs create a record of what changed and why
- **Learning**: See how others approach course design

### Creating a Pull Request

**On GitHub:**

1. Push your branch to GitHub
2. Visit your repository on GitHub.com
3. You'll see a banner "Compare & pull request" - click it
4. Add a title and description:
   - **Title**: `Add lecture 5 notes on testing strategies`
   - **Description**: Explain what the changes include, why you made them, what reviewers should focus on
5. Click "Create pull request"

**Example PR description:**
```markdown
## Changes
- Added lecture 5 notes covering unit testing, integration testing, and TDD
- Created example code demonstrating JUnit basics
- Updated schedule to map lecture 5 to Feb 10

## Review Focus
- Please check if the testing examples are clear for beginners
- Verify that the learning objectives align with our course goals

## Notes
This builds on lecture 4's content on debugging.
```

### Reviewing Pull Requests

When reviewing a co-instructor's PR:

1. Read the description to understand the intent
2. Review the "Files changed" tab
3. Leave comments on specific lines:
   - Ask clarifying questions
   - Suggest improvements
   - Praise good work!
4. Use "Request changes," "Approve," or "Comment"
5. The author can respond to feedback and push updates

### Merging Pull Requests

Once approved, the PR author (or a maintainer) clicks "Merge pull request."

**Merge strategies:**
- **Merge commit**: Preserves complete history (recommended for course content)
- **Squash and merge**: Combines all commits into one (cleaner history)
- **Rebase and merge**: Linear history (advanced)

After merging, delete the branch to keep things tidy.

### Handling Merge Conflicts

Sometimes Git can't automatically merge because the same lines were changed in both branches.

**When this happens:**
1. Git marks the conflicting sections in files:
```
<<<<<<< HEAD
Current content in main branch
=======
Your changes from feature branch
>>>>>>> add-lecture-5-notes
```

2. Edit the file to resolve conflicts (keep one version or combine them)
3. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Stage the resolved file: `git add filename`
5. Commit: `git commit -m "Resolve merge conflict in lecture notes"`

:::tip AI Help with Git Concepts
Don't hesitate to ask AI to explain Git concepts or commands:

- "Explain what a merge conflict is and how to resolve it"
- "What's the difference between git merge and git rebase?"
- "How do I undo my last commit?"

Just make sure you understand the explanation before running suggested commands!
:::

## CI/CD Setup

### What is CI/CD?

**Continuous Integration (CI)**: Automatically build and test your site whenever you push changes

**Continuous Deployment (CD)**: Automatically deploy your site to the web when changes are merged to main

### Why CI/CD for Course Materials?

- **Catch errors early**: Build failures show up immediately
- **Automated deployment**: Changes go live without manual steps
- **Consistency**: Same build process every time
- **Preview builds**: See what your PR will look like before merging

### GitHub Actions for Courseasaurus

GitHub Actions is a CI/CD platform built into GitHub. Here's a basic workflow:

**Meta-Example: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # Deploy when pushing to main
  pull_request:
    branches:
      - main  # Build PRs to check for errors

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

This workflow:
1. ✅ Runs on every push to main and every PR
2. ✅ Installs dependencies
3. ✅ Builds the site (catches build errors)
4. ✅ Deploys to GitHub Pages (only for main branch)

### Setting Up GitHub Pages Deployment

1. In your repo: Settings → Pages
2. Source: "GitHub Actions"
3. Add the workflow file above to `.github/workflows/deploy.yml`
4. Push to main—your site will deploy!

**Your site URL**: `https://username.github.io/repo-name/`

### Build Validation

The CI pipeline will fail if:
- JSON syntax errors in `course.config.json`
- Missing lecture files referenced in config
- Broken links in markdown
- TypeScript/JavaScript errors

**This is good!** It prevents broken content from reaching students.

:::warning Review GitHub Actions Security
When using AI to generate GitHub Actions workflows:
- ✅ Review permissions requested
- ✅ Understand what each step does
- ✅ Check that secrets are properly protected
- ✅ Ensure workflows don't expose sensitive data

Never blindly run workflow files without understanding them!
:::

## Private/Public Repository Pattern

### The Challenge

You want to:
- Keep assignment solutions private (staff-only access)
- Share course materials publicly with students
- Maintain both versions without duplicate work

### The Solution: Mirroring with Filtering

Maintain two repositories:
1. **Private repo**: Complete course materials including solutions
2. **Public repo**: Filtered version for students (auto-updated)

### Setting Up Automatic Mirroring

**Step 1: Create both repositories**
- `course-private` (private, all content)
- `course-public` (public, student-facing)

**Step 2: Add a release workflow**

In the **private repo**, create `.github/workflows/release-public.yml`:

```yaml
name: Release to Public Repo

on:
  workflow_dispatch:  # Manual trigger
  push:
    tags:
      - 'release-*'  # Or auto-release on tags

jobs:
  mirror:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout private repo
        uses: actions/checkout@v3

      - name: Remove sensitive content
        run: |
          # Remove solution files
          rm -rf assignments/solutions/
          rm -rf labs/solutions/
          # Remove staff-only docs
          rm -rf docs/staff-only/

      - name: Push to public repo
        uses: cpina/github-action-push-to-another-repository@main
        env:
          API_TOKEN_GITHUB: ${{ secrets.PUBLIC_REPO_TOKEN }}
        with:
          source-directory: '.'
          destination-github-username: 'your-org'
          destination-repository-name: 'course-public'
          target-branch: 'main'
```

**Step 3: Set up the secret**

1. Create a Personal Access Token (PAT) on GitHub
2. Add it to private repo: Settings → Secrets → `PUBLIC_REPO_TOKEN`

**Step 4: Trigger releases**

```bash
# Tag a release in private repo
git tag release-week3
git push origin release-week3

# The workflow automatically mirrors to public repo
```

### Alternative: Separate Branches

Instead of separate repos, use branches:
- `main` - complete with solutions
- `student` - filtered for student access
- Manually merge main → student, removing solutions

### Filtering Sensitive Content

**Option 1: Directory structure**
```
assignments/
  hw1-description.md          # Public
  hw1-solution.md            # Private
  hw2-description.md          # Public
  hw2-solution.md            # Private
```

Filter script removes all `*-solution.md` files.

**Option 2: Separate directories**
```
assignments/           # Public
solutions/            # Private (removed during release)
```

**Option 3: Separate repositories from the start**

Some instructors prefer to never mix solutions and public content.

:::tip Start Simple
For your first semester, you might not need private/public separation. You can add it later when you have solutions to protect.
:::

## Best Practices Summary

1. **Commit often** - Small, focused commits are easier to understand and revert
2. **Write clear commit messages** - Future you will thank present you
3. **Use branches for significant work** - Keep main stable
4. **Review before merging** - Use pull requests even if you're working alone
5. **Let CI catch errors** - Don't bypass build failures
6. **Back up regularly** - Push to remote frequently
7. **Document workflows** - Add a CONTRIBUTING.md for co-instructors

## Using AI to Learn Git

AI assistants can be excellent Git tutors:

**Good questions to ask:**
- "Explain what `git rebase` does and when to use it"
- "I pushed sensitive data by accident. How do I remove it from history?"
- "What's the best branching strategy for a course with 5 co-instructors?"

**Be cautious with:**
- Automated commit message generation (review for accuracy)
- Complex git commands that rewrite history (understand before running)
- Workflow files (security implications)

**Remember**: The goal is to **learn** Git through AI assistance, not to blindly run commands you don't understand.

## Next Steps

Now that you understand Git workflows:

1. **Practice**: Create a branch, make changes, open a PR, merge it
2. **Set up CI/CD**: Add GitHub Actions to automate deployment
3. **Learn AI Philosophy**: Read [AI-Assisted CourseOps Principles](./ai-philosophy.md)

---

**Remember**: Git is a professional tool used by millions of developers. The skills you learn managing your course content transfer directly to software development practices. You're not just managing a course—you're learning modern development workflows!

