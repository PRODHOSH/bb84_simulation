# Project Documents

## 📄 Add Your Files Here

### Files Needed:

1. **report.pdf** - Project report (upload here)
2. **presentation.pdf** - Project presentation slides (upload here)

### After Uploading:

1. Place PDF files in this folder
2. Update `src/pages/Documentation.tsx`:
   - Find the report/presentation download buttons
   - Remove `disabled` attribute
   - Update the `href` or `onClick` to point to:
     - `/docs/report.pdf`
     - `/docs/presentation.pdf`

### Example:
```tsx
// Change from:
<Button disabled>Download Report (Coming Soon)</Button>

// To:
<a href="/docs/report.pdf" download>
  <Button>Download Report</Button>
</a>
```
