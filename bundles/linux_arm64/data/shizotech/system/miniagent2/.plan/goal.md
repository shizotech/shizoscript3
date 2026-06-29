# Task: Optimize All ROLE.md Files in roles/ Directory

## Goal
Optimize all `.md` files in the `roles/` directory for clarity, consistency, and correctness without changing their semantic meaning.

## Working Directories
`roles/`

## Context
The repository contains 14 agent role definitions in `roles/*/ROLE.md`. These files serve as system prompts for different agents in a multi-agent harness. They have accumulated inconsistencies in tool naming, spelling, grammar, formatting, and verbosity.

Available tools defined in `roles/SHARED.shio` and `roles/*/{ROLE}.shio`:
- `list_dir(path, recursive)`
- `read_file(path, include_line_numbers, start_line, end_line)`
- `read_source_map(path)`
- `search_in_file(path, look_for, return_format, include_line_numbers)`
- `grep(query, recursive, path, extensions)`
- `resolve_symbol(symbols, source_file)`
- `list_skills()`
- `read_skill(name)`
- `write_file(path, operation, intention, content)`
- `replace_string(path, target_text, replacement_text, replace_all, intention)`
- `mkdir(path)`
- `move(src_path, dst_path)`
- `copy(src_path, dst_path)`
- `rename(src_path, dst_path)`
- `remove(path, intention)`
- `list_dir` (older version in planner)
- `read(path)` (older version in planner)
- `final_report(report_manifest)`

## Environment
- 14 agent roles: analyzer, chatparticient, executor, explorer, filereader, pipeline (does not exist), plan_executor, plan_maker, plan_reviewer, planner, simple_rag, source_mapper, summarizer, symbol_resolver
- SHARED.shio provides common tools
- Each ROLE.shio may override/add tools

## Execution Outline

### Phase 1: Optimization

For each ROLE.md file, apply these edits:

#### 1. analyzer/ROLE.md
- Fix numbering (phases are already sequential)
- Standardize tool names: `read()` → `read_file()`, `final_report()` stays
- Add `read_source_map()` and `search_in_file()` as recommended tools
- Remove redundant "FINAL REPORT STRUCTURE" section (already covered in phase 4)
- Fix formatting consistency

#### 2. chatparticient/ROLE.md
- Fix typo: "wether" → "whether" (line 175)
- Fix typo: "hierachy" → "hierarchy" (line 351-353)
- Fix typo: "send" → "sent" (line 297)
- Fix formatting: remove excessive blank lines
- Standardize bullet styles

#### 3. executor/ROLE.md
- Fix numbering: step 4 appears twice (lines 82-84 and 86-88)
- Fix step numbering to be sequential 1-8
- Standardize tool names: `read` → `read_file()`, `edit()` → `replace_string()`, `write()` → `write_file()`
- Fix formatting: remove excessive blank lines

#### 4. explorer/ROLE.md
- Fix numbering in Exploration Strategy (1-4 instead of 1-3 with duplicate "2")
- Standardize tool names: `read` → `read_file()`, `list_dir` → `list_dir()`
- Remove redundant "Behavioral Summary" and "Final Enforcement Rule" (already covered)

#### 5. filereader/ROLE.md
- Fix typo: "retrival" → "retrieval"
- Remove duplicate section headers
- Tighten redundant instructions

#### 6. plan_executor/ROLE.md
- Fix typo: "troughfuly" → "thoroughly" (line 305)
- Fix typo: "Do" → "do" (line 309 - inconsistent capitalization)
- Remove redundant "End of run" section (already covered in Execution Lifecycle)
- Standardize tool naming

#### 7. plan_maker/ROLE.md
- Add missing semicolon in "Do not make sure to"
- Remove redundant "Skills" section (already in SHARED.shio)
- Tighten redundant instructions in Manifest Emission section
- Fix inconsistent formatting

#### 8. plan_reviewer/ROLE.md
- Fix typo: "Do not use" (line 154-156) - already correct
- Tighten redundant instructions in "When To Use" sections
- Remove duplicate "Scope Discipline" content

#### 9. planner/ROLE.md
- Add missing semicolon in "Do not make sure to"
- Remove redundant "Skills" section (already in SHARED.shio)
- Tighten redundant instructions
- Standardize formatting

#### 10. simple_rag/ROLE.md
- Fix formatting: add proper markdown structure
- Standardize tool naming
- Remove redundant instructions

#### 11. source_mapper/ROLE.md
- Fix typo: "wether" → "whether" (not present, but check)
- Remove redundant sections
- Tighten verbose explanations
- Standardize formatting

#### 12. summarizer/ROLE.md
- Remove redundant "Summary" section at end
- Tighten verbose instructions
- Standardize formatting

#### 13. symbol_resolver/ROLE.md
- Remove redundant "Summary Behavior" section (already covered)
- Tighten verbose explanations
- Standardize tool naming

### Phase 2: Validation

After all edits, verify:
- All files still maintain their original semantic meaning
- Tool names match the actual tool definitions in SHARED.shio
- No broken markdown formatting
- Consistent heading hierarchy across all files
- All typos and grammar errors are fixed

## Constraints
- Do NOT change the semantic meaning of any role
- Do NOT add new functionality or tools not already defined
- Do NOT remove critical instructions or constraints
- Maintain the original structure and intent
- Fix only: typos, grammar, formatting inconsistencies, tool naming, redundant content

## Expected Outcome
All 14 ROLE.md files are optimized with:
- Correct spelling and grammar
- Consistent tool naming matching actual tool definitions
- Clean, readable formatting
- No redundant or repetitive content
- Maintained semantic meaning and intent