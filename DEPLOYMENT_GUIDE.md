# 🚀 Deployment Guide

This guide will help you deploy your portfolio website to various platforms.

## Table of Contents
1. [GitHub Pages](#github-pages)
2. [Netlify](#netlify)
3. [Vercel](#vercel)
4. [Traditional Hosting](#traditional-hosting)
5. [Docker Deployment](#docker-deployment)

---

## GitHub Pages

### Free & Easy Deployment

### Steps:

1. **Create a GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Name it: `yourusername.github.io`
   - Example: `teja-rayudu.github.io`

2. **Initialize Git (if not already done)**
   ```bash
   cd /path/to/Portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```

3. **Add Remote & Push**
   ```bash
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git branch -M main
   git push -u origin main
   ```

4. **Access Your Portfolio**
   - Website: `https://yourusername.github.io`
   - Done! 🎉

### Custom Domain (Optional)
1. Go to repository Settings → Pages
2. Under "Custom domain", enter: `yourdomain.com`
3. Update DNS records with your domain provider
4. Enable HTTPS

---

## Netlify

### Easiest Deployment with CI/CD

### Steps:

1. **Push to GitHub**
   - Ensure your code is on GitHub

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Authorize GitHub
   - Select your portfolio repository

3. **Configure Build Settings**
   - Build command: (leave blank for static site)
   - Publish directory: `.` or root

4. **Deploy**
   - Click "Deploy site"
   - Netlify generates a URL

5. **Custom Domain**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Update DNS records

### Features:
- Free SSL/HTTPS
- Automatic deployments on push
- Serverless functions support
- Great performance

---

## Vercel

### Fast & Modern Deployment

### Steps:

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure**
   - Framework: Other (static)
   - Root Directory: `.` or `Portfolio`
   - Leave other settings as default

3. **Deploy**
   - Click "Deploy"
   - Automatic deployment on every push

4. **Custom Domain**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS setup instructions

### Features:
- Auto-scaling
- Edge network
- Zero-config deployment
- Free tier very generous

---

## Traditional Hosting

### Using cPanel, Bluehost, GoDaddy, etc.

### Steps:

1. **Prepare Files**
   - Ensure all files are in correct structure
   - Test locally first

2. **FTP Upload**
   - Connect via FTP (FileZilla, WinSCP)
   - Upload to `public_html/` directory
   - Or specific domain folder

3. **File Structure**
   ```
   public_html/
   ├── index.html
   ├── styles.css
   ├── script.js
   └── ...
   ```

4. **Access & Verify**
   - Visit your domain
   - Verify all files load correctly
   - Test responsiveness on mobile

5. **HTTPS Setup**
   - Use cPanel SSL/TLS
   - Or get free certificate from Let's Encrypt

---

## Docker Deployment

### Using Docker Container

### Steps:

1. **Create Dockerfile**
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build Image**
   ```bash
   docker build -t my-portfolio .
   ```

3. **Run Container**
   ```bash
   docker run -p 80:80 my-portfolio
   ```

4. **Access**
   - Open `http://localhost`

5. **Deploy to Cloud**
   - Push to Docker Hub
   - Deploy on AWS, Azure, Google Cloud, etc.

---

## Pre-Deployment Checklist

- [ ] All links are working
- [ ] Images load properly
- [ ] Mobile responsive on all sizes
- [ ] Form submission works
- [ ] Social links point to correct profiles
- [ ] No console errors
- [ ] Page loads in < 3 seconds
- [ ] Lighthouse score checked
- [ ] SEO meta tags updated
- [ ] HTTPS/SSL certificate ready

---

## Performance Optimization

### Before Deployment

1. **Minify CSS & JS** (Optional)
   - Use online tools or build tools
   - Reduces file size

2. **Image Optimization**
   - Use WebP format
   - Compress images
   - Lazy load if using images

3. **CDN Setup**
   - Serve CSS/JS from CDN
   - Faster global delivery

4. **Caching Headers**
   - Set proper cache headers
   - Most hosting does this automatically

### Test Performance
```bash
# Using Lighthouse
# In Chrome DevTools: Lighthouse → Generate report

# Using PageSpeed Insights
# https://pagespeed.web.dev
```

---

## Troubleshooting

### Website Not Loading
- [ ] Check if files uploaded correctly
- [ ] Verify index.html exists
- [ ] Check file permissions (644 for files, 755 for dirs)
- [ ] Look at server error logs

### CSS/JS Not Loading
- [ ] Check file paths (use relative paths)
- [ ] Verify MIME types set correctly
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Check console for 404 errors

### Form Not Working
- [ ] Verify form action/method
- [ ] Check backend/email service
- [ ] Test with browser dev tools

### Slow Loading
- [ ] Use CDN for assets
- [ ] Enable gzip compression
- [ ] Minimize HTTP requests
- [ ] Consider caching plugins

---

## DNS Configuration

### For Custom Domain

1. **A Record**
   - Point to: Platform's IP/domain
   - Example for GitHub Pages: Points to GitHub's servers

2. **CNAME Record** (if needed)
   - Subdomain www → main domain
   - Depends on platform

3. **Propagation**
   - Can take 24-48 hours
   - Check status: `nslookup yourdomain.com`

---

## SSL Certificate

### Free Options
- **GitHub Pages**: Automatic
- **Netlify**: Automatic
- **Vercel**: Automatic
- **Let's Encrypt**: Free for traditional hosting
- **Cloudflare**: Free tier available

### Setup (Let's Encrypt)
```bash
# Using Certbot
sudo certbot certonly --webroot -w /path/to/public_html -d yourdomain.com
```

---

## Analytics Setup

### Add Google Analytics

```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your Google Analytics ID.

---

## Maintenance After Deployment

- [ ] Monitor uptime
- [ ] Check analytics weekly
- [ ] Update content regularly
- [ ] Fix broken links promptly
- [ ] Backup regularly
- [ ] Update dependencies if using frameworks
- [ ] Monitor security alerts

---

## Useful Links

- [GitHub Pages Documentation](https://pages.github.com)
- [Netlify Deployment](https://netlify.com/docs/deploying)
- [Vercel Deployment](https://vercel.com/docs)
- [Let's Encrypt](https://letsencrypt.org)
- [Google Domains](https://domains.google)

---

## Need Help?

- Check platform-specific documentation
- Look at deployment logs for errors
- Test locally before deploying
- Use staging environment first
- Ask in relevant communities (Reddit, Stack Overflow, Discord)

---

**Happy Deploying!** 🚀

Your portfolio will be live soon! Share it with your network and start getting opportunities.
