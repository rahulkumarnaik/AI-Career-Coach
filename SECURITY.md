# 🔐 Security Notice

## ⚠️ Important: API Key Security

This project uses environment variables to store sensitive API keys. **NEVER commit actual API keys to version control.**

### 🚨 If You Accidentally Exposed API Keys:

1. **Immediately revoke the exposed keys**
2. **Generate new API keys**
3. **Remove secrets from code history** (if needed)
4. **Configure keys as environment variables only**

### 🛡️ Secure Setup:

1. **Copy `.env.example` to `.env.local`**
2. **Fill in your actual API keys in `.env.local`**
3. **Never commit `.env.local`** (it's in .gitignore)
4. **Use environment variables in production** (Vercel, Netlify, etc.)

### 🔑 Required API Keys:

- **Gemini API**: Get from [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Firebase Config**: Get from [Firebase Console](https://console.firebase.google.com/)

### ✅ Safe Practices:

- ✅ Use `.env.local` for local development
- ✅ Use platform environment variables for production
- ✅ Keep `.env.example` with placeholders only
- ✅ Add `.env*` to `.gitignore`
- ❌ Never put real keys in source code
- ❌ Never commit `.env.local`

### 🔍 Check for Exposed Secrets:

```bash
# Search for potential API keys in your code
git log --all -S "AIzaSy" --source --all
git log --all -S "your_actual_" --source --all
```

If you find exposed keys in git history, rotate them immediately and consider using tools like `git-filter-repo` to clean the history.
