# Hardware Gallery Images

## 📸 Add Your Hardware Photos Here

### Required Images:

1. **setup.jpg** - Complete hardware setup
2. **laser.jpg** - Laser system
3. **filters.jpg** - Polarization filters
4. **detector.jpg** - Detection unit
5. **electronics.jpg** - Control electronics
6. **team.jpg** - Team working on hardware

### Image Requirements:

- **Format:** JPG or PNG
- **Resolution:** At least 1920x1080 (Full HD)
- **Orientation:** Landscape (horizontal) preferred
- **File Size:** Under 5MB each

### After Uploading:

1. Place images in this folder with exact names above
2. Update `src/pages/Documentation.tsx`:
   - Find the `hardwareImages` array
   - Change `placeholder: true` to `placeholder: false` for each image

### Example:
```tsx
{
  id: 1,
  title: 'Complete Setup',
  description: 'Full quantum key distribution hardware setup',
  url: '/images/hardware/setup.jpg',
  placeholder: false  // Change this from true to false
}
```

### Tips:

- Use good lighting for clear photos
- Clean up the workspace before photos
- Include captions/labels in photos if possible
- Take multiple angles and choose the best ones
