# AI Career Coach - Setup Instructions

## 🚀 Getting Started

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. In the project root directory, you'll find a `.env.local` file
2. Open `.env.local` in any text editor
3. Replace `your_actual_gemini_api_key_here` with your real API key:

```bash
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

⚠️ **Important**: Make sure there are no spaces around the `=` sign and no quotes around the key.

### 3. Start the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The application will start on `http://localhost:8080`

## 🔧 Troubleshooting

### "API key is not valid" Error

If you're getting an API key error, check:

1. ✅ **API key is correctly added** to `.env.local`
2. ✅ **No extra spaces** around the `=` sign in `.env.local`
3. ✅ **No quotes** around the API key value
4. ✅ **Restart the development server** after adding the API key
5. ✅ **API key is active** - test it at [Google AI Studio](https://aistudio.google.com/)

### Example of correct `.env.local` format:
```bash
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Example of incorrect formats:
```bash
# ❌ Wrong - has quotes
VITE_GEMINI_API_KEY="your_actual_gemini_api_key_here"

# ❌ Wrong - has spaces
VITE_GEMINI_API_KEY = your_actual_gemini_api_key_here

# ❌ Wrong - placeholder not replaced
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Still having issues?

1. Check the browser console (F12 → Console tab) for error messages
2. Make sure you have an active internet connection
3. Verify your API key hasn't been restricted or reached quota limits
4. Try generating a new API key

## 🔐 Google Authentication Setup (Optional)

If you want to use Google Sign-In, you need to configure Firebase:

### Enable Google Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`ai-career-coach-bf06f`)
3. Go to **Authentication** → **Sign-in method**
4. Click **Google** and toggle **Enable**
5. Set your support email and save

### Add Your Domain (for Production)

In Firebase Console → Authentication → Settings → Authorized domains:
- Add your production domain (e.g., `yourapp.vercel.app`)
- `localhost` is already authorized for development

## 🎯 Features

Once set up correctly, you can use:

### 🔐 Authentication Features
- **🔐 Google Sign-In** - Quick authentication with your Google account
- **📧 Email/Password Auth** - Traditional login system  
- **👤 User Avatar** - Shows your initials or Google profile picture in header
- **📋 User Menu** - Dropdown with profile access and logout
- **🔄 Auto-redirect** - Logged-in users automatically redirected from auth page

### 🚀 AI Career Tools
- **Resume Analysis** - Compare your resume against job descriptions
- **Interview Practice** - Get feedback on your interview answers  
- **Cover Letter Generation** - Create tailored cover letters
- **Interview Question Generation** - Get relevant questions for practice

## 🔍 How Authentication Works

1. **Sign In** - Use Google or email/password on `/auth` page
2. **Header Updates** - "Sign in" button becomes your avatar with initials
3. **User Menu** - Click avatar to access profile and logout
4. **Auto Protection** - Already logged-in users can't access `/auth` page
5. **Persistent Session** - Stay logged in across browser sessions

Happy job hunting! 🎉
