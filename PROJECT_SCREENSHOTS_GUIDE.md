# Project Screenshots Implementation Guide

## 📸 How to Add Project Screenshots

Your portfolio now supports project images! Here's how to add them:

### Step 1: Prepare Your Screenshots

1. **Take Screenshots** of your projects
   - Full page screenshots
   - Key features/sections
   - Mobile and desktop views
   - Recommended size: 1920x1080px or 1200x800px

2. **Optimize Images**
   - Use https://tinypng.com/ or https://squoosh.app/
   - Target size: 200-500KB per image
   - Format: JPG or WebP
   - Quality: 80-85%

3. **Save to Project**
   - Create folder: `src/assets/images/projects/`
   - Name format: `project-name.jpg` or `project-name-1.jpg`, `project-name-2.jpg`

### Step 2: Update Project Data

Edit `src/pages/HomePage.jsx` and add `image` property to each project:

```javascript
const projectData = [
  {
    title: "Kondestock",
    description: "...",
    image: "/src/assets/images/projects/kondestock.jpg", // Add this
    images: [
      // Optional: Multiple images for gallery
      "/src/assets/images/projects/kondestock-1.jpg",
      "/src/assets/images/projects/kondestock-2.jpg",
    ],
    // ... rest of project data
  },
];
```

### Step 3: Update BentoProjectGrid Component

The component is already set up to display images. Just add the image rendering:

```jsx
// In BentoProjectGrid.jsx, add before the title:
{
  project.image && (
    <div className="mb-4 rounded-xl overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
}
```

### Step 4: Update ProjectModal for Gallery

Add image gallery to the modal for detailed view with multiple screenshots.

## 🎨 Screenshot Best Practices

### What to Capture

- ✅ Homepage/Dashboard
- ✅ Key features in action
- ✅ Mobile responsive view
- ✅ Admin panels (if applicable)
- ✅ Unique UI elements

### What to Avoid

- ❌ Blurry or low-quality images
- ❌ Screenshots with personal data
- ❌ Error pages or broken layouts
- ❌ Overly large file sizes

### Composition Tips

1. **Clean Background** - Remove browser UI if possible
2. **Good Lighting** - Use light theme for screenshots
3. **Highlight Features** - Show the most impressive parts
4. **Consistent Style** - Same browser, same zoom level
5. **Add Context** - Show real data (anonymized)

## 🖼️ Alternative: Use Placeholder Images

If you don't have screenshots yet, use these services:

1. **Placeholder Images**

   ```javascript
   image: "https://placehold.co/1200x800/6366f1/ffffff?text=Kondestock";
   ```

2. **Unsplash (Free Stock Photos)**

   ```javascript
   image: "https://source.unsplash.com/1200x800/?technology,dashboard";
   ```

3. **UI Mockups**
   - Use Figma/Adobe XD to create mockups
   - Export as images
   - Add to your project

## 📁 Recommended Folder Structure

```
src/assets/images/
├── projects/
│   ├── kondestock/
│   │   ├── hero.jpg
│   │   ├── dashboard.jpg
│   │   └── mobile.jpg
│   ├── abbabiyo/
│   │   ├── hero.jpg
│   │   └── features.jpg
│   └── grading-system/
│       └── hero.jpg
├── profile.jpg
└── hero-bg.png
```

## 🚀 Quick Implementation

Want to add images quickly? Here's a minimal example:

```javascript
// In HomePage.jsx
import kondestockImg from "../assets/images/projects/kondestock.jpg";

const projectData = [
  {
    title: "Kondestock",
    image: kondestockImg, // Add imported image
    // ... rest of data
  },
];
```

## 🎯 Next Steps

1. Take screenshots of your live projects
2. Optimize them using TinyPNG
3. Add to `src/assets/images/projects/`
4. Update project data with image paths
5. Test locally with `npm run dev`
6. Build and deploy!

Your portfolio will look even more impressive with real project screenshots! 🎨
