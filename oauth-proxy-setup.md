# OAuth Proxy Setup for GitHub Pages + Decap CMS

## Quick Setup Guide

You need an OAuth proxy to authenticate with GitHub. Here are FREE options:

---

## ⭐ RECOMMENDED: Vercel (Easiest)

### 1. Deploy OAuth Proxy to Vercel (1-click)

Click this button to deploy:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvencax%2Fnetlify-cms-github-oauth-provider&env=OAUTH_CLIENT_ID,OAUTH_CLIENT_SECRET,GIT_HOSTNAME,ORIGIN&envDescription=GitHub%20OAuth%20credentials&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Fdevelopers)

Or manually:
1. Go to https://vercel.com (sign up with GitHub - FREE)
2. Click "Add New" → "Project"
3. Import this repo: `https://github.com/vencax/netlify-cms-github-oauth-provider`
4. Add environment variables (see step 3 below)
5. Deploy!

### 2. Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Name:** Engin CMS
   - **Homepage URL:** `https://dpredkel.github.io/engin/`
   - **Callback URL:** `https://YOUR-VERCEL-APP.vercel.app/callback`
4. Save and copy **Client ID** and **Client Secret**

### 3. Configure Vercel Environment Variables

In your Vercel project settings → Environment Variables:
- `OAUTH_CLIENT_ID` = (your GitHub Client ID)
- `OAUTH_CLIENT_SECRET` = (your GitHub Client Secret)
- `GIT_HOSTNAME` = `github.com`
- `ORIGIN` = `https://dpredkel.github.io`

### 4. Update admin/config.yml

Replace `YOUR-RAILWAY-APP.railway.app` with `YOUR-VERCEL-APP.vercel.app`

---

## Option 2: Railway (Also Easy)

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Use: `https://github.com/vencax/netlify-cms-github-oauth-provider`
4. Add same environment variables as above
5. Use the Railway URL in your config

---

## Option 3: Render (FREE Tier)

1. Go to https://render.com
2. New Web Service
3. Connect: `https://github.com/vencax/netlify-cms-github-oauth-provider`
4. Add environment variables
5. Deploy (free tier has slight delay on first load)

---

## Final Steps

1. After deploying OAuth proxy, update `admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: dpredkel/engin
     branch: main
     base_url: https://your-oauth-proxy-url.com
   ```

2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Switch to GitHub Pages with OAuth"
   git push origin main
   ```

3. Enable GitHub Pages:
   - Repo Settings → Pages
   - Source: main branch
   - Save

4. Access CMS:
   - Go to: `https://dpredkel.github.io/engin/admin/`
   - Click "Login with GitHub"
   - Authorize
   - Start editing!

---

## Benefits of This Setup

✅ Completely FREE (all services have free tiers)
✅ No deprecated services
✅ Direct GitHub authentication
✅ Users login with their GitHub accounts
✅ No manual user management needed
✅ Anyone with repo access can edit content

## Cost: $0/month forever! 🎉

