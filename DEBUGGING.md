# Debugging Guide

This application includes comprehensive debugging tools similar to v0.dev to help you troubleshoot issues quickly.

## 🐛 Debug Features

### 1. Debug Panel (Bottom-Right Corner)
Click the **🐛 Debug** button to open an interactive debug console that shows:
- Real-time logs from the application
- Errors with full details
- Warnings and info messages
- Filter by log type (All, Errors, Warnings, Info)
- Clear logs button
- Environment status (API key check)

**Usage:**
- The panel automatically captures all console logs with `[DEBUG]`, `[ERROR]`, `[WARN]`, or `[APP]` prefixes
- Red badge shows error count
- Logs include timestamps for tracking
- Scrollable history (last 100 logs)

### 2. Startup Checks
Automatic validation when the app loads:
- ✅ API Key exists and is not placeholder
- ✅ API Key format validation (length check)
- ✅ Network connectivity test

If any check fails, you'll see a detailed screen with:
- Status of each check
- Step-by-step fix instructions
- Retry button

### 3. Error Boundary
Catches React errors and displays:
- User-friendly error message
- Detailed error information
- Expandable stack trace
- Troubleshooting tips
- Reload and Go Back buttons

### 4. Enhanced Console Logging
All operations log to the browser console with emoji prefixes:

| Emoji | Type | Description |
|-------|------|-------------|
| 🚀 | Info | API calls starting |
| ✅ | Success | Operations completed |
| ❌ | Error | Failures and errors |
| ⚠️ | Warning | Non-critical issues |
| 🔧 | Debug | Configuration info |
| 📰 | Info | Article operations |
| 🖼️ | Info | Image generation |
| 🔍 | Info | Fact-checking |
| 🎉 | Success | Major milestones |

### 5. Detailed Error Messages
The app provides specific error messages for common issues:
- Invalid API key
- API quota exceeded
- Network errors
- Empty responses
- JSON parsing errors

## 🔍 How to Debug

### Step 1: Check the Debug Panel
1. Click the 🐛 button in the bottom-right
2. Look for red error messages
3. Check the timestamp to see when the error occurred
4. Read the full error message for details

### Step 2: Check Browser Console
1. Press F12 (or Cmd+Option+I on Mac)
2. Go to the Console tab
3. Look for messages with emoji prefixes
4. Errors will be in red with full stack traces

### Step 3: Verify Environment
Check the Debug Panel footer shows:
- Environment: development
- API Key: ✅ Set

If API Key shows ❌ Missing:
1. Check `.env.local` exists in project root
2. Verify it contains `VITE_API_KEY=your_key_here`
3. Restart the dev server

### Step 4: Check Network
1. Open browser DevTools (F12)
2. Go to Network tab
3. Look for failed requests (red)
4. Click on failed request to see details

## 🔧 Common Issues & Solutions

### "Failed to fetch articles"

**Possible causes:**
1. API key not set or invalid
2. Network connectivity issues
3. API quota exceeded
4. Gemini API service down

**Solutions:**
1. Check Debug Panel for specific error
2. Verify API key in `.env.local`
3. Test network: `ping google.com`
4. Check API quota at https://aistudio.google.com
5. Try again in a few minutes

### "VITE_API_KEY environment variable not set"

**Solution:**
1. Create `.env.local` in project root
2. Add: `VITE_API_KEY=your_actual_api_key`
3. Get key from: https://aistudio.google.com/apikey
4. Restart dev server: `pnpm dev`

### "API key is still set to placeholder value"

**Solution:**
1. Open `.env.local`
2. Replace `PLACEHOLDER_API_KEY` with your real key
3. Save the file
4. Restart dev server

### TypeScript Errors

**Solution:**
1. Make sure `@types/react` and `@types/react-dom` are installed
2. Run: `pnpm install`
3. Check `vite-env.d.ts` exists in project root
4. Restart your IDE/editor

### Images Not Loading

**Check Debug Panel for:**
- Image generation errors (⚠️ warnings)
- Fallback to picsum.photos

**Note:** Image generation failures are non-critical. The app automatically falls back to placeholder images.

## 📊 Monitoring API Calls

Each API call logs detailed information:

```
📰 [DEBUG] ========== Fetching articles for category: Latest ==========
🚀 [DEBUG] Calling Gemini API for article generation...
📝 [DEBUG] Prompt: Generate a diverse list of 4 recent...
✅ [DEBUG] Gemini API response received
📄 [DEBUG] Response length: 12543 characters
📊 [DEBUG] Parsed 4 articles from response

🔄 [DEBUG] Processing article 1/4: "AI Breakthrough..."
🖼️  [DEBUG] Generating image for: "AI Breakthrough..."
✅ [DEBUG] Image generated successfully (45231 bytes)
🔍 [DEBUG] Starting fact-check...
✅ [DEBUG] Fact-check completed: 2 claims found
✅ [DEBUG] Article 1 processed successfully

🎉 [DEBUG] ========== Successfully fetched 4 articles in 8234ms ==========
```

## 🎯 Best Practices

1. **Always check the Debug Panel first** - It shows the most recent errors
2. **Look for patterns** - Multiple similar errors might indicate a configuration issue
3. **Check timestamps** - Helps identify when issues started
4. **Read full error messages** - They often contain the solution
5. **Test incrementally** - If you make changes, test immediately
6. **Keep console open** - During development, keep F12 console visible

## 🆘 Still Having Issues?

1. Check all environment variables are set correctly
2. Verify your Gemini API key is valid
3. Test your internet connection
4. Try in an incognito/private browser window
5. Clear browser cache and reload
6. Check the GitHub repository for known issues
7. Review the full console output for clues

## 📝 Logging Your Own Debug Info

To add your own debug logs that appear in the Debug Panel:

```typescript
console.log('🔧 [DEBUG] Your message here');
console.error('❌ [ERROR] Error message');
console.warn('⚠️  [WARN] Warning message');
```

The Debug Panel automatically captures logs with these prefixes.
