# My Portfolio 🎨

A professional portfolio website built with HTML, CSS, and JavaScript featuring a modern black and purple theme.

## Features ✨

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Black & Purple Theme**: Modern, professional color scheme with smooth gradients
- **Smooth Animations**: Scroll animations and interactive elements
- **Multiple Sections**:
  - Hero section with call-to-action
  - About me section
  - Education background
  - Skills showcase (categorized: Frontend, Backend, Tools)
  - Project portfolio with descriptions
  - Contact form
  - Social media links

## File Structure 📁

```
My Portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styling and responsive design
├── script.js       # JavaScript for interactivity
├── README.md       # This file
└── assets/         # (Optional) For images and other media
```

## Getting Started 🚀

### Quick Start
1. Open `index.html` in your web browser
2. That's it! The portfolio is ready to use

### Adding Your Profile Picture
1. **Prepare your image**: Choose a square image (300x300px recommended) or any image format (JPG, PNG, WebP)
2. **Place in assets folder**: Copy your image file to the `assets` folder
3. **Rename to profile.jpg**: Rename your image to `profile.jpg` (or update the filename in index.html if you prefer a different name)
4. **It's done!**: Your profile picture will automatically appear in:
   - The hero section (large circular image on the right)
   - The about section (medium circular image on the left, visible on medium+ screens)

### Adding Your Logo 🎯
1. **Prepare your logo**: Create or get your logo image (transparent PNG recommended, any size)
2. **Place in assets folder**: Save it as `logo.png` in the `assets` folder
3. **It's done!**: Your logo will appear in the top-left navbar next to "My Portfolio" text

**Logo Tips:**
- Best size: 40-50px height (will auto-scale)
- Best format: PNG with transparent background
- For different logo name: Update `assets/logo.png` in index.html navbar

### Development
To make changes:
1. Edit `index.html` to change content
2. Modify `styles.css` for styling changes
3. Update `script.js` for JavaScript functionality

## Customization Guide 🎯

### 1. **Update Personal Information**
Edit `index.html` and change:
- **Name**: Look for "Your Name" in the hero section - DONE! Already shows "Ayush Ghosh"
- **Title**: Change "Full Stack Developer..." 
- **About Text**: Update the About Me section
- **Contact Info**: Add your actual contact links in the footer

### 2. **Add Your Profile Picture** 🖼️
- **Step 1**: Prepare your profile image (square is best, any size)
- **Step 2**: Save it as `profile.jpg` in the `assets` folder (already created for you!)
- **Step 3**: Refresh your browser - it will automatically show in:
  - Hero section (right side) - Large circular profile picture
  - About section (left side) - Medium circular profile picture

**Note**: Your profile picture will appear in TWO places:
1. **Hero Section**: Large 350x350px circle on desktop (250px on mobile)
2. **About Section**: Medium 280x280px circle on desktop (stacks on mobile)

To use a different image name, update these lines in `index.html`:
```html
<img src="assets/profile.jpg" alt="Your Name" class="profile-img">
<img src="assets/profile.jpg" alt="Your Name" class="about-profile-img">
```

Change `profile.jpg` to your image filename (e.g., `assets/my-photo.png`).

### 2. **Change Color Theme**
Edit `styles.css` CSS Variables section:
```css
:root {
    --primary-color: #1a0033;      /* Dark Purple/Black */
    --secondary-color: #4a148c;    /* Deep Purple */
    --accent-color: #9c27b0;       /* Bright Purple */
    --light-accent: #ce93d8;       /* Light Purple */
    --background: #0f0015;         /* Very Dark Background */
    --surface: #1a001a;            /* Dark Surface */
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #4a148c;
}
```

### 3. **Update Skills**
In `index.html`, find the Skills section and edit skill tags:
```html
<span class="skill-tag">Your Skill</span>
```

### 4. **Add Projects**
Duplicate a project card and update:
- Project title
- Description
- Technologies used
- Project link

### 5. **Add Profile Images**
1. Create an `assets` folder
2. Add your images there
3. Replace `.placeholder` divs with `<img>` tags

### 6. **Set Up Contact Form**
For fully functional contact forms, you'll need:
- Backend service (Node.js, Python, etc.)
- Email service (SendGrid, Gmail API, etc.)
- Or use services like Formspree, EmailJS

### 7. **Add Social Links**
Edit footer social links with your actual URLs:
```html
<a href="https://github.com/yourprofile">GitHub</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
```

## Features Explained 💡

### Navigation Bar
- Sticky navigation that stays visible while scrolling
- Active link highlighting
- Smooth scrolling to sections

### Hero Section
- Eye-catching gradient background
- Animated content with parallax effect
- Call-to-action button

### Skill Tags
- Hover effects on skill tags
- Click to copy skill name to clipboard
- Color-coded by category

### Project Cards
- Hover animation (lift effect)
- Technology tags
- Links to project details

### Contact Form
- Form validation
- Email format checking
- Success message confirmation

### Scroll Animation
- Elements fade in as they enter viewport
- Smooth transitions throughout

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Responsive Design 📱

- **Desktop**: Full layout with all features
- **Tablet**: Optimized grid layout (768px and below)
- **Mobile**: Single column layout (480px and below)

## Performance Tips ⚡

1. Optimize images in the assets folder
2. Use modern image formats (WebP)
3. Minimize CSS/JS for production
4. Enable gzip compression on server

## Deployment 🚀

### Recommended Setup
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

### Why this setup?
- The portfolio frontend is static HTML/CSS/JS and deploys cleanly on Vercel
- The contact form backend is an Express server and is easier to host on Render
- MongoDB Atlas keeps the database reachable from production

### Deployment files included
- `vercel.json`
- `render.yaml`
- `backend/.env.example`
- `DEPLOYMENT.md`

### Important
Before deploying the frontend, update the production backend URL in `api-service.js`:

```javascript
const PROD_API_BASE_URL = 'https://your-backend-name.onrender.com/api';
```

Replace it with your actual deployed Render backend URL, then redeploy the frontend.

## Customization Ideas 💭

- Add a blog section
- Include testimonials section
- Add a timeline for experience
- Create a achievements/awards section
- Add dark/light mode toggle
- Include a live chat feature
- Add a newsletter signup

## JavaScript Features 🔧

- **Smooth Navigation**: All links scroll smoothly
- **Active Link Highlighting**: Shows which section you're viewing
- **Form Validation**: Checks email format and required fields
- **Intersection Observer**: Triggers animations on scroll
- **Parallax Effect**: Hero section moves as you scroll
- **Clipboard Copy**: Copy skills with one click

## Tips for Best Results 📋

1. **Keep it Professional**: Use real information and high-quality images
2. **Regular Updates**: Keep projects and skills current
3. **Test Responsively**: Check on actual devices
4. **SEO Optimization**: Add meta tags and descriptions
5. **Fast Loading**: Optimize images and minimize code
6. **Mobile First**: Code with mobile users in mind

## Troubleshooting 🔧

**Links not working?**
- Check that section IDs in HTML match href values

**Form not submitting?**
- Add backend functionality for email sending
- Test validation logic

**Images not showing?**
- Verify image paths are correct
- Check file permissions

**Styling looks off?**
- Clear browser cache (Ctrl+Shift+R)
- Check CSS is properly linked

## Getting Help 📞

- Check browser console for errors (F12)
- Verify all file paths are correct
- Test in different browsers
- Ensure JavaScript is enabled

## License 📄

Feel free to use this portfolio template for personal or commercial use. Customize it to make it your own!

---

**Happy Portfolio Building! 🎉**

Remember to update all placeholder text with your actual information before sharing!
