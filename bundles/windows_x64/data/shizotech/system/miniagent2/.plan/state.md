# State Summary

## User Request
Optimize all .md files in the roles/ directory for the agent harness. Focus on optimization without changing meaning.

### Repository Findings

#### Directory Structure
```
roles/
├── SHARED.shio (common tools: list_dir, read_file, read_source_map, search_in_file, grep, resolve_symbol, write_file, replace_string, mkdir, move, copy, rename, remove, list_skills, read_skill)
├── analyzer/ROLE.md + ROLE.shio
├── chatparticient/ROLE.md + ROLE.shio
├── executor/ROLE.md + ROLE.shio
├── explorer/ROLE.md + ROLE.shio
├── filereader/ROLE.md + ROLE.shio
├── plan_executor/ROLE.md + ROLE.shio
├── plan_maker/ROLE.md + ROLE.shio
├── plan_reviewer/ROLE.md + ROLE.shio
├── planner/ROLE.md + ROLE.shio
├── simple_rag/ROLE.md + ROLE.shio
├── source_mapper/ROLE.md + ROLE.shio
├── summarizer/ROLE.md + ROLE.shio
└── symbol_resolver/ROLE.md + ROLE.shio
```

### Status of Optimization

**Completed in previous runs:**
- analyzer/ROLE.md ✅ - Tool names standardized
- chatparticient/ROLE.md ✅ - Typos fixed
- executor/ROLE.md ✅ - Tool names fixed
- explorer/ROLE.md ✅ - Redundant sections removed
- filereader/ROLE.md ✅ - Removed redundant Summary section
- plan_executor/ROLE.md ✅ - Removed redundant End of run section, fixed typo
- planner/ROLE.md ✅ - Fixed typo, removed redundant sections, fixed separators
- plan_maker/ROLE.md ✅ - Removed redundant Required Skills section
- plan_reviewer/ROLE.md ✅ - Already clean
- simple_rag/ROLE.md ✅ - Already clean
- source_mapper/ROLE.md ✅ - Removed redundant Summary Behavior section
- summarizer/ROLE.md ✅ - Removed redundant Summary section
- symbol_resolver/ROLE.md ✅ - Removed redundant Summary Behavior section

### Key Issues (Authoritative Tool Names from SHARED.shio)
1. **read_file** (not "read" or "read()")
2. **replace_string** (not "edit" or "edit()")
3. **write_file** (not "write" or "write()")
4. **read_source_map** - available in SHARED.shio
5. **search_in_file** - available in SHARED.shio
6. **finalize** - used by symbol_resolver (not "final_report")
7. **final_report** - used by analyzer, planner (older API)

### Validation Results
✅ All tool names match actual definitions in SHARED.shio
✅ No broken markdown formatting
✅ Semantic meaning preserved
✅ Heading hierarchy consistent
✅ No critical instructions removed
✅ No tool naming issues found (grep verified)
