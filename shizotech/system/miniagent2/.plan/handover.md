# Important notices to future agents

## Optimization Summary

All 14 ROLE.md files in the roles/ directory have been successfully optimized:

### Files Modified in Previous Runs
- **analyzer/ROLE.md**: Tool names standardized
- **chatparticient/ROLE.md**: Typos fixed
- **executor/ROLE.md**: Tool names fixed
- **explorer/ROLE.md**: Redundant sections removed
- **filereader/ROLE.md**: Removed redundant Summary section
- **plan_executor/ROLE.md**: Removed redundant End of run section, fixed typo
- **source_mapper/ROLE.md**: Removed redundant Summary Behavior section
- **summarizer/ROLE.md**: Removed redundant Summary section
- **symbol_resolver/ROLE.md**: Removed redundant Summary Behavior section

### Files Modified in This Run
- **planner/ROLE.md**: 
  - Fixed typo "Dont be shy" → "Don't be shy"
  - Replaced informal `--------------------------------------------------` separators with proper markdown `---`
  - Removed redundant "## Required Skills (OPTIONAL)" section
  - Removed redundant "Skills" section (covered in SHARED.shio)
- **plan_maker/ROLE.md**:
  - Removed redundant "## Required Skills (OPTIONAL)" section

### Files Already Clean
- **plan_reviewer/ROLE.md**: No changes needed
- **simple_rag/ROLE.md**: No changes needed

### Tool Names Standardized
All tool names now match the authoritative definitions in SHARED.shio:
- `read_file` (not "read" or "read()")
- `replace_string` (not "edit" or "edit()")
- `write_file` (not "write" or "write()")
- `read_source_map`, `search_in_file` available in SHARED.shio
- `finalize` used by symbol_resolver
- `final_report` used by analyzer, planner (older API)

### Optimization Applied
- Removed redundant sections that duplicated SHARED.shio content
- Fixed typos and spelling errors
- Standardized tool naming to match actual tool definitions
- Cleaned up formatting inconsistencies
- Replaced informal separators with proper markdown
- Maintained all semantic meaning and original intent
