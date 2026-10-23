---
name: prepare-description
description: "Write and refine Persian YouTube descriptions for React course sessions in the established channel style. Use when creating a video description from the current branch, implementation, or session changes, or when updating a previous session description."
argument-hint: "Session number or branch to describe"
---

# Prepare Description

Create a ready-to-paste Persian YouTube description for a session in the React course. Learn from the accepted descriptions in `.prepare/.descriptions` and avoid repeating their questions, hooks, or topic bullets when a more specific angle is available.

## Workflow

1. Read every existing `.txt` description in `.prepare/.descriptions` before drafting. Treat them as an evolving style and repetition guide; use only finalized descriptions, not drafts.
2. Identify the session number from the user's request or the current branch/commit history. If it is unclear or conflicts with existing filenames, ask the user rather than guessing.
3. Inspect the current branch's changes and relevant source files to determine what was actually implemented. Describe the tutorial content, not incidental maintenance fixes. Do not claim features that the branch does not demonstrate.
4. Draft in the established format below. Keep the title short, interesting, and focused on the session's main goal. Match the conversational tone and phrasing of prior session questions. The fire list should name new concepts students will learn, not components or other implementation artifacts merely added to the project. Compare the draft with prior descriptions and replace generic or repeated questions/topics with distinct ones where appropriate.
5. Return the final description in the chat and save that same finalized text as `.prepare/.descriptions/session-<number>.txt`. Do not overwrite an existing session description without the user's request.
6. If the user corrects the style, apply the correction to the saved description and update these instructions when the preference should carry forward to future sessions. Never treat an unaccepted draft as an example.

## Required format

Use these sections in order, with a blank line between each:

1. One short, interesting Persian video title focused on the session's main goal, in the exact pattern: `<موضوع فارسی> - دوره‌ی آموزش رایگان React - قسمت <شماره>`. Keep the suffix and punctuation exactly consistent with previous sessions.
2. Usually three or four short, conversational Persian questions in the style of previous sessions. End each with one of the exact question emojis used in the examples: 🤔، 🤷‍♂️، 🤯، 😳. Select the emojis that fit; do not add other question emojis.
3. A Persian lead-in sentence such as «تو این قسمت جواب تمام این سوالات رو میدیم و ...» ending with a period, not a colon. Put a blank line after it.
4. A compact list of relevant, newly learned concepts. Each item starts with 🔥 and its topic name is in English. List concepts, techniques, or ideas students learn—not components, pages, or other artifacts added during implementation. Put each item on its own line, without extra bullets or punctuation. Put a blank line after the list.
5. An optional short closing paragraph in Persian describing another valuable lesson outcome that needs more explanation than a fire-list item allows. Include it only when it adds a distinct, useful learning point; otherwise omit it.

Keep the tone informal, engaging, and close to the saved examples. Preserve Persian typography and use «می‌...» consistently where appropriate. Keep the line breaks visible in the final output. The fire list names concepts covered in the session; the prose before and after it stays in Persian.

## Using prior descriptions

- Read prior files to preserve the channel's voice and section layout, not to copy their content.
- Avoid reusing a previous session's questions, opening phrases, or fire-list topics unless the concept is genuinely central again. Prefer the new session's concrete learning outcomes.
- When a topic must recur, frame it around what is new in this session rather than presenting it as a new concept.
- Keep the title concise and goal-oriented; match the established title pattern exactly.
- Match the previous sessions' informal, conversational question style.
- Make fire-list items learning concepts, not a checklist of components or implementation deliverables.
- Use the final paragraph only for a distinct valuable learning outcome that needs explanation beyond the fire list; omit it when there is no such point.
- Save only the final version after user feedback. A later correction is durable style guidance: update the workflow or format above as needed, as well as the affected session file.
