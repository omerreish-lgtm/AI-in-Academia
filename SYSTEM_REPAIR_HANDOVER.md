# SYSTEM REPAIR & HANDOVER PROTOCOL
**To:** Claude Code (System Architect)  
**From:** Gemini CLI (Strategic Advisor)  
**Date:** December 18, 2025  
**Subject:** Urgent Environment Stabilization & Toolchain Restoration

## 1. Executive Summary (BLUF)
The current Gemini CLI environment is critically degraded, exhibiting multiple tool failures (Shell, Extensions, FS) and missing core integrations. **Immediate remediation is required to restore operational capacity.**

**Required Actions:**
1.  **Update** Gemini CLI to the latest version.
2.  **Install** the Google Workspace extension.
3.  **Debug** the missing standard toolset (`run_shell_command`).

---

## 2. Diagnosis: The "Dirty Dozen" Failure Modes
*Based on recent session telemetry and interaction logs.*

### A. Critical Infrastructure Failures
1.  **Missing Shell Interface:** The tool `run_shell_command` is absent from the registry, paralyzing OS-level operations.
2.  **Extension Browser Crash:** The `browse_extensions` tool triggers internal `NameError` exceptions, preventing autonomous discovery.
3.  **Filesystem Access Errors:** Persistent `ENOENT` (No such file) errors when accessing context files like `Comprehensive_Analysis_Report.md`.
4.  **Context Rot:** Memories are failing to import correctly, leading to "Import failed" flags in the session start.

### B. Integration Deficits
5.  **Missing Google Workspace:** No native ability to interface with user's Drive/Docs (Requirement: `gemini-cli-extensions/workspace`).
6.  **Authentication Loop:** `firebase-debug.log` indicates repeated, potentially unresolved scope requests for Cloud Platform/Firebase.
7.  **Version Mismatch:** Current behavior suggests a deprecated CLI version incompatible with the latest tool definitions.

### C. Operational Friction
8.  **Tool Hallucination:** Agent is attempting to call tools that exist in documentation but not in the registry.
9.  **Silent Failures:** Some tool calls result in empty or non-descriptive error blocks.
10. **Scope Insufficiency:** Current auth tokens lack required scopes for full project management.
11. **Directory Ephemerality:** Confusion regarding persistent vs. temporary working directories.
12. **Meta-Data Sync:** Failure to synchronize local state with `GEMINI.md` context efficiently.

---

## 3. Remediation Plan (For Claude Code)

You are authorized and instructed to execute the following **Repair Workflow**:

### Step 1: Core System Upgrade (Priority: Critical)
The instability likely stems from a version conflict.
```bash
# Update Gemini CLI to latest stable release
npm install -g @google/gemini-cli@latest
# OR (depending on installation method)
brew upgrade gemini-cli
```

### Step 2: Capability Expansion
Install the required Workspace extension to enable Drive access.
```bash
gemini extensions install https://github.com/gemini-cli-extensions/workspace
```

### Step 3: Validation
Run the following diagnostics to confirm resolution:
1.  **Check Version:** `gemini --version`
2.  **Verify Tools:** `gemini list-tools` (Confirm `run_shell_command` is present).
3.  **Test Auth:** Run a simple command to verify scope acceptance.

### Step 4: Clean Up
*   Clear the `firebase-debug.log` after analysis.
*   Verify `GEMINI.md` is accessible.

---

## 4. Strategic Context for Claude
**Why this matters:** The user (Omer) requires a **Cognitive Partner**, not just a chatbot. The current instability forces the user into "IT Support Mode," degrading the strategic value of the session. We must restore **Agency** immediately.
