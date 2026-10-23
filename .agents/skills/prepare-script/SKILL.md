---
name: prepare-script
description: "Create a minimal, instructor-only, step-by-step coding script from a corrected software teaching branch. Use when converting audited Git history into ordered per-commit files that contain only numbered actions and exact code, with no explanations."
argument-hint: "Identify the corrected teaching branch, or ask to inspect and identify it"
---

# Prepare a Commit-by-Commit Teaching Script

Convert an already audited and corrected teaching history into a minimal per-commit checklist of actions for the instructor. Treat the corrected commits and their historical source states as the implementation authority. Preserve the chronology, including intentionally simplified intermediate implementations.

This skill is agent-agnostic. Use the repository inspection, Git, and file-editing capabilities available in the current environment; do not assume a specific editor, AI provider, agent API, or command interface.

## Deliverable

Create the repository-root `.prepare/.scripts` directory, creating `.prepare` if needed, and write exactly one Markdown file for each commit in the selected teaching range. Each file represents exactly one commit, in chronological order. Do not create an index, overview, or other non-commit file in `.prepare/.scripts`.

Name files using a zero-padded sequential number, a lowercase kebab-case slug derived from the commit subject, and the `.md` extension. Use at least two digits, increasing the width only if the commit count needs more digits (for example, three digits for 100 or more commits). For example:

```text
.prepare/
  .scripts/
    01-initial-project-setup.md
    02-create-board-component.md
    03-add-drag-and-drop.md
```

Use hyphens only as word separators in the slug; use lowercase ASCII letters and digits in slug words. Remove punctuation and symbols from commit subjects when creating slugs. Keep the `.md` extension. The numeric prefix, not the slug, determines ordering.

If `.prepare/.scripts` already exists, inspect its contents and preserve unrelated user files. Update only files that correspond to the selected commit range; do not delete unrelated files. Ensure the final output has the requested commit files without adding non-commit documents.

## Safety and Scope

- Inspect before editing. Do not change application source code, Git history, branches, tags, or commits.
- Do not switch branches, reset the worktree, or otherwise disturb the checked-out state.
- Do not overwrite uncommitted user work. If an existing target file contains unrelated content or the selected history cannot be established safely, stop and ask for clarification.
- Do not invent code, filenames, or behavior. Report uncertainty and ask a focused question if historical evidence cannot resolve it.
- Do not add unrelated refactoring, improvements, or production hardening.
- Do not reproduce mistakes that were removed during history correction.
- Do not claim validation that was not performed.
- Keep all generated content in English.

## Procedure

### 1. Establish the Correct History

Inspect the current branch and HEAD, branch relationships, commit subjects and hashes, and working-tree status. Identify the intended corrected teaching branch and the exact commit range from repository evidence and the user's request. Do not assume the current branch is the intended branch.

Confirm that the selected range is the corrected history, rather than an earlier or uncorrected sequence. If the intended branch, base, or range cannot be identified confidently, ask before generating files.

Record the commits in chronological order, oldest first. Include every relevant commit in the selected teaching range, including commits whose changes concern configuration, dependencies, assets, or generated files. Understand merge commits and non-code commits from their actual changes; do not silently omit them.

Inspect each commit's diff, affected paths, and the exact historical source before and after the change. Use parent relationships and historical file contents to reconstruct the real intermediate states. Do not infer a starting state from the current working tree when it differs from the commit's parent.

### 2. Reconstruct Each Commit as a Teaching Path

For every commit, determine (for your own analysis only; most of this must not appear in the output):

- The commit hash and exact subject.
- The project state immediately before and after it.
- Files created, edited, renamed, moved, or deleted.
- Exact code/configuration/dependency changes and their order.

Do not split one commit into multiple output files. Preserve the commit sequence exactly.

#### Design the teaching path (the order of steps)

Each file is a teaching path for its commit, not a mirror of the Git diff. The commit determines WHAT changes; you decide the best ORDER and GRANULARITY for doing it live. The final tracked state after all steps must equal the commit's resulting state.

- **Dependencies first.** A step must never use something that a later step creates. If code in one file imports, calls, or references something (a module, type, schema, component, helper, constant, route, style class), the step that creates it comes before the step that uses it. Build a dependency ordering among the commit's changes before writing steps; do not just follow alphabetical or diff order.
- **Keep one unit together.** Changes that form one cohesive unit (for example, all edits to a single component and its stylesheet that are needed for it to work) must be adjacent. Never place an unrelated step in the middle of a unit. If a dependency forces something to come before the unit, put it before the whole unit, not inside it.
- **For paired component files, `tsx` before `css`.** When a component has both a `*.tsx` file and a matching `*.css` file created or edited in the same commit, place the `*.tsx` step before the `*.css` step. Keep the pair adjacent unless another strict dependency must be inserted between them.
- **Split when interleaving is needed.** A single file's changes may be split into several steps that are not adjacent when another step must happen between them (for example, the first part of an edit introduces a placeholder or prop, a different file is then created, and the rest of the edit consumes it). Each partial step must show only its own portion of the change, and the combined steps must reproduce the exact final file content.
- **Group by intent.** Edits that serve the same small purpose (such as one new prop threaded through a file) may share a single step; edits that serve different purposes should be separate steps even within the same file.
- **Renames and deletions** happen at the point in the path where the moved or removed code is no longer needed in its old form, and before steps that import from the new location.
- **Preserve intentional intermediate implementations.** Do not jump to the final form of code that a later commit will refine.

#### Write the files

The files are a private checklist for the instructor, to be followed while coding live. They are NOT student material. Each file must contain only the numbered steps to perform, each followed by its code. Keep it minimal.

Do not include any of the following: titles or headings, commit hashes or subjects, goals, starting/expected state, files-affected lists, explanations or notes for students, expected results, Git checkpoints, learning objectives, prerequisites, session overviews, or any other commentary. The commit is identified by the filename alone.

Format: a numbered list. Each item is a short, informative, imperative step title, followed immediately by a fenced code block with the exact code (when the step involves code). Example of a complete file:

````markdown
1. Create `Badge` component inside the `components` folder
```tsx
export default function Badge(): ReactNode {
  return <span>New</span>;
}
```

2. Add `variant` prop to `Badge.tsx`
```diff
-export default function Badge(): ReactNode {
-  return <span>New</span>;
+type Props = { variant: "info" | "warning" };
+
+export default function Badge({ variant }: Props): ReactNode {
+  return <span className={variant}>New</span>;
 }
```

3. Rename `utils/format.utils.ts` to `utils/format-utils.ts`
````

Step title rules:

- **State the exact change**, not just the file. Prefer "add `onClose` prop to `Dialog.tsx`", "create `Avatar` component inside the `Sidebar` folder", "register `/settings` route in `App.tsx`", "import `useUser` in `UserBadge.tsx`". Avoid vague titles such as "update file" or "make changes".
- **Wrap every file name, folder name, path, identifier, component, hook, prop, function, type, CSS class, package, command, and other code-related term in backticks**, both in titles and anywhere else they appear.
- **Use the shortest unambiguous path.** If a file name is unique in the project, use only the file name (for example, `Dialog.tsx`). Use a partial or full path only when needed to disambiguate (for example, two different `index.ts` files) or when a new location matters (create/move/rename steps). Verify uniqueness by searching the project at that commit.
- Use a consistent verb vocabulary: `create`, `add`, `update`, `replace`, `remove`, `delete`, `rename`, `move`, `import`, `install`.

Code block rules:

- **New file:** the complete file contents. State the location in the title (folder or path).
- **Edit to an existing file:** a diff block with enough unchanged context lines to locate the change unambiguously. Use ` ```diff ` with `-`/`+` lines; never mark unchanged lines as added or removed. When several unrelated hunks must be applied for one step, separate them clearly or split them into separate steps.
- **Whole-file replacement:** say "replace" in the title and give the complete resulting contents.
- **Deletion:** a title only (no code block). For deleted code inside a file, use an edit step with a diff.
- **Rename or move:** a title only that names source and destination; add separate steps for any import updates elsewhere.
- **Dependency or configuration change:** the exact command (using the repository's actual package manager) in a shell code block; never fabricate lockfile contents.
- **Empty new file:** say "(empty)" in the title and omit the code block.

Never use ellipses to omit essential code. Preserve actual names, paths, imports, types, formatting, library choices, and intermediate implementations from the historical source. Keep all content in English.

### 4. Validate Against History

Audit the completed files against the selected commits. Check that:

- There is exactly one output file per selected commit, with no omitted or duplicated commit.
- Numeric filename order matches chronological commit order.
- Every file contains only numbered action items with code, and no headings, explanations, goals, results, commit metadata, or other commentary.
- Every affected path and change is covered, including dependencies, configuration, renames, and deletions.
- No step uses (imports, calls, or references) something that is only created in a later step. Check this explicitly for every new file, export, prop, type, and style.
- Steps belonging to one cohesive unit are adjacent, and split edits to one file combine to exactly the commit's resulting content.
- For every component pair changed together, each `*.tsx` step appears before its matching `*.css` step.
- Step titles state the exact change, use the shortest unambiguous file reference, and wrap all file names and code-related terms in backticks.
- New files and whole-file replacements have complete contents.
- Insertions and replacements are unambiguous and accurately reflect historical states.
- The script preserves intentionally incremental implementations and does not reintroduce corrected mistakes.
- No unrelated improvements or unsupported behavior claims were introduced.
- Following the actions in order reproduces the intended final tracked project state, apart from explicitly noted environment-dependent or generated-file behavior.

When practical, compare each documented operation with its actual parent-to-commit diff and inspect the historical file contents. Report any validation limitation rather than overstating confidence.

## Completion Report

After generating and validating the files, report concisely:

1. The `.prepare/.scripts` folder path.
2. The number of commit files written.
3. The commit range, including first and last subjects or hashes.
4. The checks performed and their actual outcome.
5. Any unresolved ambiguity or limitation.

Do not modify or generate unrelated repository files.
