---
name: prepare-history
description: 'Audit and correct Git history used as a step-by-step teaching script. Use when reviewing a software teaching project for accidental omissions, mistakes, misplaced changes, or commit-order problems, and when planning or executing an approved history rewrite.'
argument-hint: 'Describe the teaching branch or ask for a history audit'
---

# Git Teaching History Audit

Audit the commit history of this software teaching project as an instructional sequence. The history is the source of truth for reproducing lesson implementations step by step. Preserve the intended educational progression; do not optimize for production completeness or shorter history.

Use the repository's available inspection and editing capabilities without assuming a particular AI agent, editor, provider, or command interface. Follow the host environment's supported skill-discovery conventions.

## Core Safety Rules

- Work in phases: audit first, present the complete correction plan second, and execute only after explicit user approval.
- The audit and planning phases are strictly read-only. Do not modify files, switch branches, create commits or refs, rewrite history, reset references, or push.
- Never infer that an incomplete implementation is a mistake merely because a later commit improves it. Distinguish intentional progression from an accidental omission or error using evidence.
- Do not invent teaching intent. If evidence is insufficient, report the uncertainty and ask a targeted question rather than making a speculative correction.
- Do not make broad cleanup, style changes, unrelated improvements, or changes that remove meaningful teaching steps.
- Preserve unrelated branches, tags, remotes, and user work. Never force-push or modify remote history without separate explicit authorization.
- Do not overwrite or remove uncommitted work. If repository state makes the requested work unsafe or ambiguous, stop and ask.

## Phase 1: Read-Only Repository Audit

Begin with this phase only. Inspect enough of the repository to understand its current state, history, code, and lesson progression. Use read-only Git inspection and source-code inspection; do not check out historical commits or disturb the working tree.

### Establish repository state and target branch

Inspect and record:

- Current branch and HEAD.
- All local branches and relevant remote-tracking branches.
- Working-tree status, including staged, unstaged, untracked, and relevant ignored files.
- Relevant tags, merge points, and branch relationships.
- The complete history of the likely teaching branch: hashes, subjects, parents, timestamps, and per-commit changes, including additions, edits, renames, and deletions.
- Current project contents and how they relate to historical commits.

Identify the prepared teaching branch from evidence; do not assume it is the current branch. Do not rely on commit messages alone. If the target branch or repository state cannot be established confidently, explain the ambiguity and ask before proceeding.

### Reconstruct the teaching sequence

Review commits chronologically and inspect the exact diffs and historical file versions relevant to suspected issues. For each stage, determine what it teaches, what state the project should be in afterward, and which later changes depend on it.

Investigate:

- **Accidental omissions:** required foundations, imports, types, utilities, configuration, or supporting files added later despite being needed earlier.
- **Ordering errors:** prerequisites or foundational decisions introduced after changes that depend on them, or corrections/refactors placed too late.
- **Unnecessary corrective commits:** typos, accidental implementation errors, omitted lines, unintended file edits, or reversions that should instead be folded into or redistributed among earlier commits.
- **Premature or misplaced details:** concepts appearing before their intended lesson, or required foundations introduced too late.

For every suspected issue, validate the evidence:

1. Find the commit that introduced the relevant code and inspect its exact diff.
2. Inspect subsequent commits that change, replace, or depend on that code.
3. Identify the earliest appropriate teaching point.
4. Establish whether the change was genuinely required then.
5. Specify the exact historical correction and any dependent changes that must move together.
6. Evaluate its effect on intermediate states, later commits, and the final implementation.
7. Confirm the correction does not erase intentional progression or introduce a concept prematurely.

Classify each suspected issue as one of:

- **Accidental omission** — a required change was forgotten and belongs earlier.
- **Accidental mistake** — a change was implemented incorrectly and should be corrected in its original stage.
- **Intentional progression** — a later commit deliberately introduces new functionality or a new concept; preserve it.
- **Insufficient evidence** — intent is unclear; report it as unresolved, not a confirmed mistake.

Do not require every intermediate commit to be production-ready. An early simplified component, hook, utility, or feature may be correct for its teaching stage.

## Phase 2: Evidence-Based Correction Plan

After completing the audit, report the findings and a complete proposed plan. This phase is planning only: do not implement anything.

### Repository state summary

State:

- Identified teaching branch and its relationship to the relevant base branch.
- Current HEAD.
- Working-tree state.
- History scope proposed for review or rewrite.
- Conditions affecting rewrite safety.

### Confirmed issues

List every confirmed necessary correction. For each, include:

- Unique issue ID.
- Affected commit hash and subject.
- Affected file(s) and relevant code locations.
- Exact problem and supporting history/code evidence.
- Why it is accidental rather than intentional progression.
- Correct teaching stage and proposed correction.
- Commits to modify, split, combine, reorder, or remove as a consequence.
- Expected effect on intermediate and final project states.

Keep unresolved/insufficient-evidence concerns separate from confirmed corrections.

### Commit-by-commit rewrite plan

For every affected commit, identify its current identity and teaching purpose, whether it will be retained, modified, split, combined, reordered, or removed, the exact changes to incorporate/move/correct, the changes that must remain later as new teaching concepts, its proposed position, and the expected state afterward. For every moved change, name both its source and destination commit. Explain interdependent moves together.

Do not propose broad cleanup or preference-based edits.

### Complete proposed sequence

List the resulting commits chronologically, oldest affected to final teaching commit. For each, provide:

- Proposed commit message.
- Teaching purpose.
- Files and principal changes.
- Relevant prerequisites.
- Expected application state after applying it.
- Whether it remains unchanged or is rewritten/new.

### Validation plan

Describe how the approved result will be checked:

- Final application state matches the intended current implementation.
- No required changes are lost; accidental changes are no longer in the wrong commits.
- Incremental teaching steps remain incremental.
- Each affected intermediate commit has its intended state.
- Sequence and messages reflect the actual changes.
- Appropriate existing tests, lint, type-check, build, or other project checks.
- Corrected final tree compared against the original final tree for unintended differences.
- Unrelated branches, tags, and user work remain untouched.
- Any validation limitations.

Do not claim a check passed unless it has actually been run.

### Approval checkpoint

End the report with a concise request for explicit approval to execute the proposed plan. Then stop. Do not proceed until the user explicitly authorizes the rewrite. Questions or discussion that do not clearly approve execution are not approval.

## Phase 3: Execute the Approved Plan

Begin only after explicit approval.

1. Recheck branch, HEAD, working tree, and relevant refs. Compare them to the audited state. If anything material changed, stop and explain the difference; do not blindly apply the old plan.
2. Confirm the approved plan still applies. If a new issue requires a material plan change, stop and obtain approval for the change.
3. Choose the safest Git technique for the actual graph and approved operations. Keep a reliable recovery path without modifying unrelated refs. If safe execution is uncertain, stop and ask.
4. Rewrite only the approved teaching branch. Preserve intentional teaching steps, the intended final implementation, unrelated branches/tags, and user-owned work.
5. Apply only approved corrections. Do not clean up unrelated code or overwrite uncommitted changes.
6. Do not delete or move branches or tags without explicit authorization. Do not push or modify remote history without explicit authorization.

## Phase 4: Post-Rewrite Verification and Report

Validate using the approved plan. Report:

1. Final teaching branch and HEAD.
2. Corrected commit sequence with hashes and messages.
3. Corrections applied to each affected commit.
4. Commits removed, combined, split, reordered, or rewritten.
5. Validation commands and their actual results.
6. Comparison of original and corrected final project trees.
7. Remaining limitations, unresolved issues, or failed checks.
8. Whether the result matches the approved plan.

Do not claim success if validation shows unresolved problems; state precisely what remains.
