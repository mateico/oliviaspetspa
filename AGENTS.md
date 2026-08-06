<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## Active Plan: Polaroid Image Generator

**Status:** Approved, step-by-step implementation by user.

**Plan file:** `/home/mateor/.claude/plans/lovely-strolling-eich.md`

**Summary:** Building a polaroid-style image compositor for dog grooming photos. Admin uploads single or before/after photos → backend generates composited PNG with white frame, caption (shop name + dog name + optional tagline), and placeholder logo → admin previews and downloads. Both formats output 1080×1080 square for gallery display. Form also captures optional client email/WhatsApp for future sending (out of scope this pass).

**Work process:** User writes files step by step following the plan's "Files to create" and "Files to modify" sections. Use the plan as reference for pixel math, DB schema, and rendering approach rather than re-deriving. **Do not edit files directly — provide modifications as code/text for the user to type.**

**Key files involved:**
- New: `lib/polaroid/{fonts,layout,svg,logo,generator,types}.ts`, `app/api/polaroid/route.ts`
- Modify: `lib/db.ts`, `app/api/upload/route.ts`, `app/api/dogs/route.ts`, `PhotoUploadForm.tsx`, `DogList.tsx`
<!-- END:nextjs-agent-rules -->
