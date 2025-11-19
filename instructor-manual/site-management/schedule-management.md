---
sidebar_position: 3
---

# Course Schedule Management

## Learning Outcomes

By the end of this guide, you will be able to:

- Edit course schedules in `course.config.json`
- Perform semantic date transformations with AI assistance
- Handle holidays and schedule conflicts
- Manage multi-section courses effectively

## Understanding Course Schedules

The `course.config.json` file is the single source of truth for your course schedule. The Courseasaurus plugin uses it to:

- Generate meeting dates based on patterns
- Map lectures to specific dates
- Track assignment due dates
- Handle holidays and breaks
- Create the schedule page visualization

**Key principle**: Edit the schedule once, and it updates everywhere automatically.

## The course.config.json Structure

### Basic Schedule Components

```json
{
  "courseCode": "CS 3100",
  "courseTitle": "Software Engineering",
  "semester": "Spring 2026",
  "startDate": "2026-01-12",
  "endDate": "2026-04-24",
  "timezone": "America/New_York",
  
  "sections": [...],     // Meeting patterns
  "holidays": [...],     // Days off
  "lectures": [...],     // Content mapping
  "assignments": [...]   // Due dates
}
```

### Sections and Meeting Patterns

Define when your course meets:

```json
{
  "sections": [
    {
      "id": "01",
      "name": "Section 01",
      "meetings": [
        {
          "type": "lecture",
          "days": ["Monday", "Wednesday", "Friday"],
          "startTime": "09:50",
          "endTime": "10:55",
          "location": "Churchill Hall 101"
        }
      ],
      "instructors": ["Dr. Jane Smith"]
    }
  ]
}
```

**Days format**: Full day names, capitalized: `"Monday"`, `"Tuesday"`, etc.

**Time format**: 24-hour format, `"HH:MM"`: `"09:50"`, `"14:30"`, `"23:59"`

### Holidays and Breaks

```json
{
  "holidays": [
    {
      "date": "2026-01-19",
      "name": "Martin Luther King Jr. Day",
      "type": "holiday"
    },
    {
      "date": "2026-03-09",
      "endDate": "2026-03-13",
      "name": "Spring Break",
      "type": "break"
    }
  ]
}
```

**Date format**: `"YYYY-MM-DD"`

**Holiday types**: `"holiday"`, `"break"`, `"exam-period"`, `"reading-day"`

### Lecture Mappings

Map lecture content to specific dates:

```json
{
  "lectures": [
    {
      "lectureId": "l1-intro",
      "dates": ["2026-01-12"],
      "topics": [
        "Course Introduction",
        "Syllabus Review"
      ]
    },
    {
      "lectureId": "l2-version-control",
      "dates": ["2026-01-14", "2026-01-17"],
      "topics": [
        "Git Fundamentals",
        "Collaborative Workflows"
      ]
    }
  ]
}
```

**lectureId**: Must match the filename (without `.md`)
- File: `lecture-notes/l1-intro.md`
- ID: `"l1-intro"`

### Assignments and Due Dates

```json
{
  "assignments": [
    {
      "id": "hw1",
      "title": "Homework 1: Environment Setup",
      "type": "homework",
      "assignedDate": "2026-01-12",
      "dueDate": "2026-01-19",
      "dueTime": "23:59",
      "points": 100,
      "url": "/assignments/hw1-setup"
    }
  ]
}
```

## Editing Schedules Manually

### Adding a Holiday

1. Open `course.config.json`
2. Add to `holidays` array:

```json
{
  "date": "2026-02-16",
  "name": "Presidents' Day",
  "type": "holiday"
}
```

3. Test: `npm start`
4. Verify: Schedule page shows the holiday, no classes scheduled

### Changing Meeting Times

Update the `meetings` array:

```json
{
  "meetings": [
    {
      "type": "lecture",
      "days": ["Monday", "Wednesday"],
      "startTime": "14:00",     // Changed from 09:50
      "endTime": "15:40",       // Changed from 10:55
      "location": "New Building 205"
    }
  ]
}
```

### Adding a New Lecture

1. Create lecture file: `lecture-notes/l15-security.md`
2. Add mapping in `course.config.json`:

```json
{
  "lectureId": "l15-security",
  "dates": ["2026-04-01"],
  "topics": ["Web Security", "Authentication"]
}
```

3. Verify the file exists and lectureId matches

## Semantic Date Transformations with AI

AI excels at understanding human-friendly date instructions and proposing precise updates to your schedule.

:::tip Let the AI Access Your Files
The AI automatically reads open files like course.config.json and gathers context from the repository. Simply open the file and describe the transformation—the AI will propose the exact changes needed.

:::

### Common Transformation Tasks

#### 1. Shifting All Dates

**Scenario**: Snow day! Need to shift everything by one week.

**Prompt**:
> With `course.config.json` open, "Shift all dates in this file (startDate, endDate, lecture dates, assignment dates, holiday dates) forward by 7 days. Preserve the JSON structure and formatting."

**AI proposes:**
- Updates to all date fields in the JSON
- A diff showing the before/after for the entire file

**Review checklist**:
- ✅ All date fields updated correctly
- ✅ Date format preserved (YYYY-MM-DD)
- ✅ No dates fall on weekends (for weekday classes)
- ✅ JSON syntax valid
- ⚠️ **Verify dates manually—AI can make calculation errors!**

#### 2. Adjusting for Day-of-Week Changes

**Scenario**: Last year, the semester started Monday Jan 13. This year it starts Tuesday Jan 14. Update all dates.

**Prompt**:
> With `course.config.json` open, "This course schedule is from Spring 2025, starting Monday Jan 13. Update it for Spring 2026, which starts Tuesday Jan 14. Shift all dates in the file accordingly, accounting for the day-of-week shift."

**This is complex!** Review every date carefully in the proposed diff.

#### 3. Adding a New Holiday

**Prompt**:
> With `course.config.json` open, "Add Patriots' Day (April 20, 2026) as a holiday. Check the file and tell me which lectures or assignments are scheduled on that date so I can reassign them."

AI can identify conflicts in the diff but **you** decide how to resolve them.

### Safe AI Workflow for Date Changes

1. **Backup**: Copy `course.config.json` to `course.config.json.backup` (optional, as diffs allow easy rejection)
2. **Request transformation**: Describe the change to the AI
3. **Review diff**: Examine the proposed JSON updates carefully
4. **Manual date verification**: Spot-check 5-10 dates against a calendar
5. **Test build**: `npm start` and check schedule page
6. **Accept changes**: If satisfied, apply the proposals

:::danger Always Verify Dates
AI can make arithmetic errors with dates, especially:
- Leap years
- Month boundaries
- Day-of-week calculations
- Holiday conflicts

**Never trust AI date calculations without manual verification!**
:::

## Handling Complex Scenarios

### Multi-Section Courses

Different sections may meet at different times:

```json
{
  "sections": [
    {
      "id": "morning",
      "name": "Morning Section",
      "meetings": [
        {
          "days": ["Monday", "Wednesday", "Friday"],
          "startTime": "08:00",
          "endTime": "09:05"
        }
      ]
    },
    {
      "id": "afternoon",
      "name": "Afternoon Section",
      "meetings": [
        {
          "days": ["Tuesday", "Thursday"],
          "startTime": "15:30",
          "endTime": "17:10"
        }
      ]
    }
  ]
}
```

**Lecture mapping for multiple sections**:

```json
{
  "lectureId": "l1-intro",
  "dates": ["2026-01-13", "2026-01-14"],
  "notes": "Morning section: Jan 13, Afternoon section: Jan 14"
}
```

Or, assign to specific sections:

```json
{
  "lectureId": "l1-intro",
  "dates": ["2026-01-13"],
  "sections": ["morning"],  // Only morning section
  "notes": "Morning section only—afternoon has different schedule"
}
```

### Lab + Lecture Format

```json
{
  "meetings": [
    {
      "type": "lecture",
      "days": ["Monday", "Wednesday"],
      "startTime": "10:30",
      "endTime": "11:35",
      "location": "Lecture Hall"
    },
    {
      "type": "lab",
      "days": ["Friday"],
      "startTime": "10:30",
      "endTime": "12:10",
      "location": "Computer Lab"
    }
  ]
}
```

Labs and lectures both appear on schedule page but can be styled differently.

### Handling Schedule Conflicts

**Scenario**: Lecture 5 is scheduled on a newly-added holiday.

**Detection**:
- Build may fail if validation is enabled
- Schedule page shows conflict
- AI prompt: "Check if any lectures fall on holidays"

**Resolution**:
1. Remove date from lecture mapping
2. Assign to next available class day
3. Update syllabus if needed
4. Notify students of change

## Using AI for Schedule Operations

The AI coding assistant, guided by instructions in AGENTS.md, can handle basic maintenance tasks like schedule adjustments by proposing direct edits to course.config.json and showing diffs for your review.

### Good AI Prompts

**Checking for conflicts**:
> With `course.config.json` open, "Identify any lectures or assignments scheduled on holidays in this file and propose resolutions."

**Calculating time distribution**:
> With `course.config.json` open, "How many class meetings are scheduled between Jan 12 and Spring Break? How many after? Suggest adjustments if imbalanced."

**Suggesting dates**:
> "Given a MWF schedule starting Jan 12, what are the next 10 class meeting dates, excluding holidays on Jan 19 and Feb 16? Propose adding these to the config."

**Proportional adjustment**:
> "This 15-week spring schedule needs to fit into a 13-week fall schedule. Suggest which lectures to combine or remove, and propose the updated JSON structure."

### What AI Can't Do Well

- **Pedagogical decisions**: Which lectures to combine or skip
- **Policy decisions**: Assignment due date policies
- **Student impact**: Understanding how changes affect learning
- **Institution-specific**: Your university's exact holiday calendar
- **Date verification**: Can make arithmetic errors

**Always apply human judgment** to AI suggestions and review the proposed diffs carefully.

## Meta-Example: Adjusting This Site's Schedule

### Original (Spring 2026):
```json
{
  "startDate": "2026-01-06",
  "endDate": "2026-04-20",
  "holidays": [
    {"date": "2026-01-19", "name": "MLK Day", "type": "holiday"},
    {"date": "2026-03-02", "endDate": "2026-03-06", "name": "Spring Break", "type": "break"}
  ]
}
```

### Adjusted (Fall 2026):
```json
{
  "startDate": "2026-09-08",
  "endDate": "2026-12-18",
  "holidays": [
    {"date": "2026-10-12", "name": "Indigenous Peoples' Day", "type": "holiday"},
    {"date": "2026-11-26", "endDate": "2026-11-27", "name": "Thanksgiving", "type": "break"}
  ]
}
```

**AI prompt used**:
> "Update this Spring 2026 schedule to Fall 2026. Fall semester starts September 8, 2026 and ends December 18, 2026. Update all lecture and assignment dates proportionally, keeping the same weekly progression. Replace spring holidays with fall holidays: Indigenous Peoples' Day (Oct 12) and Thanksgiving (Nov 26-27). Show the diff of changes."

**Review process**: The diff highlighted all date shifts and holiday replacements. Manual verification confirmed dates fell on correct weekdays and aligned with university calendar. Changes were accepted after confirming no conflicts.

## Validation and Testing

### Build-Time Validation

Courseasaurus validates:
- ✅ Date formats (YYYY-MM-DD)
- ✅ Time formats (HH:MM)
- ✅ Referenced lecture files exist
- ✅ No duplicate IDs
- ✅ Dates within semester range

**If build fails:**
1. Read error message carefully
2. Check the line/field mentioned
3. Verify date/time formats
4. Ensure lecture files exist

### Manual Testing Checklist

After schedule changes:

- ✅ Schedule page renders correctly
- ✅ All class meetings appear
- ✅ Holidays are marked
- ✅ Lecture mappings show correct dates
- ✅ Assignment due dates are reasonable
- ✅ No meetings on holidays
- ✅ Correct number of class days

### Reviewing Changes

Examine the AI's proposed diff for course.config.json:
```bash
# If needed, view the file after acceptance
cat course.config.json
```

Ensure all updates align with your intentions before finalizing.

## Common Pitfalls

### 1. Date Format Errors

```json
// ❌ Wrong formats
"startDate": "01-12-2026"     // Month-day-year
"dueTime": "11:59 PM"         // 12-hour format
"date": "2026-1-5"            // No leading zeros

// ✅ Correct formats
"startDate": "2026-01-12"     // Year-month-day
"dueTime": "23:59"            // 24-hour format
"date": "2026-01-05"          // Leading zeros
```

### 2. Mismatched Lecture IDs

```json
// File: lecture-notes/l1-introduction.md
// ❌ Wrong ID
{"lectureId": "l1-intro", ...}

// ✅ Correct ID
{"lectureId": "l1-introduction", ...}
```

### 3. Forgetting to Update Assignments

When shifting lecture dates, remember to shift assignment dates too!

### 4. Weekend Dates

For weekday classes, dates should not fall on weekends:

```json
// ❌ Saturday lecture
{"lectureId": "l5", "dates": ["2026-01-17"]}  // Jan 17 is Saturday!

// ✅ Weekday lecture
{"lectureId": "l5", "dates": ["2026-01-19"]}  // Monday
```

## Next Steps

Now that you can manage schedules:

1. **Practice**: Make a minor schedule adjustment using the AI
2. **Learn objectives**: Read [Learning Objectives Management](./learning-objectives.md)
3. **Content development**: Explore [AI-Assisted Content Development](../content-development/assignments-projects.md)

---

**Pro Tip**: Maintain a separate "schedule notes" document where you track the reasoning behind schedule decisions. This helps when adapting for future semesters and when coordinating with co-instructors.

**Meta: AI Usage in Schedule Management**

This guide demonstrates responsible AI use:
- AI assisted with date calculation examples
- All dates manually verified against calendars
- Prompts designed for clarity and specificity
- Human judgment applied to all pedagogical implications

