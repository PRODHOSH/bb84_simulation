# 🔐 Authentication Setup Guide

## ✅ What I Fixed:

1. **Added proper Supabase auth configuration**
   - Auto token refresh
   - Session persistence
   - URL session detection

2. **Better error handling**
   - Clear error messages for wrong credentials
   - Email already registered detection
   - Automatic redirect on successful login

3. **Email confirmation flow**
   - Detects if email confirmation is required
   - Shows appropriate messages
   - Auto-login if confirmation is disabled

---

## 🚀 Quick Setup Steps

### **Step 1: Disable Email Confirmation (Recommended for Testing)**

1. Go to: https://supabase.com/dashboard/project/banyhroaktppyqtspznt
2. Click **Authentication** → **Providers** → **Email**
3. Find **"Confirm email"** toggle
4. **Turn it OFF** (disabled)
5. Click **Save**

✅ This allows users to sign up and log in immediately without email verification.

---

### **Step 2: Configure Google OAuth Redirect URIs**

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your **OAuth 2.0 Client ID**
3. Under **Authorized redirect URIs**, add **ALL of these**:
   ```
   https://banyhroaktppyqtspznt.supabase.co/auth/v1/callback
   http://localhost:8080
   http://localhost:3000
   ```
4. Under **Authorized JavaScript origins**, add:
   ```
   http://localhost:8080
   https://bb84-simulation.vercel.app
   ```
5. Click **Save**
6. **Wait 5-10 minutes** for Google to propagate the changes

✅ This allows Google OAuth to redirect back to your app on the correct port.

---

### **Step 3: Add Environment Variables to Vercel**

1. Go to: https://vercel.com/dashboard
2. Select your **bb84-simulation** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:
   ```
   VITE_SUPABASE_URL=https://banyhroaktppyqtspznt.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbnlocm9ha3RwcHlxdHNwem50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MjE2NjEsImV4cCI6MjA3ODQ5NzY2MX0.L_I7N-gUo6BSLvBEzJX-VGEYtsMmhTQImBrqdy7OYl8
   ```
5. Click **Save**
6. **Redeploy** your site

---

### **Step 4: Update Leaderboard Table (Run SQL in Supabase)**

1. Go to: https://supabase.com/dashboard/project/banyhroaktppyqtspznt/editor
2. Click **SQL Editor** → **New Query**
3. Paste this SQL:

```sql
-- Add user_id column if it doesn't exist
ALTER TABLE leaderboard 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can submit score" ON leaderboard;
DROP POLICY IF EXISTS "Anyone can view leaderboard" ON leaderboard;

-- Enable Row Level Security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert scores
CREATE POLICY "Authenticated users can submit score"
ON leaderboard FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow everyone to view the leaderboard
CREATE POLICY "Anyone can view leaderboard"
ON leaderboard FOR SELECT
TO public
USING (true);
```

4. Click **Run** (or Ctrl+Enter)

✅ This updates your database to work with authenticated users.

---

## 🎯 How Authentication Works Now:

### **Sign Up (Email/Password)**
1. User enters: email, password, username
2. If **email confirmation disabled**: User is logged in immediately → redirected to quiz
3. If **email confirmation enabled**: User gets email → clicks link → can login

### **Sign In (Email/Password)**
1. User enters: email, password
2. If credentials correct: Logged in → redirected to quiz
3. If wrong: Shows clear error message

### **Sign In (Google)**
1. User clicks "Continue with Google"
2. Selects Google account
3. Redirected back to app → logged in → redirected to quiz

### **Quiz Access**
- **Without login**: Redirected to `/auth` page
- **With login**: Can take quiz, scores saved with user_id

---

## ❌ No Need for Additional Tables!

You **DO NOT** need to create a new table for authentication. Supabase already provides:

- `auth.users` - Stores all user data (email, password, OAuth)
- User metadata (username stored in `user_metadata`)
- Your `leaderboard` table uses `user_id` to reference these users

---

## 🧪 Testing Steps:

1. **Start local dev server:**
   ```powershell
   npm run dev
   ```

2. **Test Email Signup:**
   - Go to http://localhost:8080/#/auth
   - Click "Sign Up"
   - Enter email, password, username
   - Should login immediately (if confirmation disabled)

3. **Test Email Login:**
   - Use same email/password
   - Should redirect to quiz

4. **Test Google OAuth:**
   - Click "Continue with Google"
   - Select account
   - Should redirect back and login

5. **Test Quiz Access:**
   - Try to visit `/quiz` without login
   - Should redirect to `/auth`
   - Login, then can access quiz

---

## 🐛 Common Issues & Solutions:

### **"Invalid login credentials"**
→ Wrong email/password. User needs to sign up first.

### **"Email confirmation required"**
→ Disable email confirmation in Supabase settings (Step 1 above).

### **Google OAuth stuck on account selection**
→ Add redirect URI to Google Cloud Console (Step 2 above).

### **"Missing environment variables"**
→ Check `.env.local` file exists in project root.

### **Email confirmation not sent**
→ Either disable confirmation OR configure SMTP in Supabase → Project Settings → Auth → SMTP Settings.

---

## 📊 What Data is Stored:

### **In `auth.users` table (automatic):**
- User ID (UUID)
- Email
- Encrypted password
- OAuth provider (if Google login)
- Username (in `raw_user_meta_data`)
- Created timestamp

### **In `leaderboard` table (your table):**
- Score
- Total questions
- Time taken
- User ID (links to auth.users)
- Username (for display)

---

## 🎉 You're All Set!

After completing Steps 1-4, your authentication should work perfectly on both:
- **Localhost**: http://localhost:8080
- **Production**: https://bb84-simulation.vercel.app

Questions? Check the Supabase docs: https://supabase.com/docs/guides/auth
