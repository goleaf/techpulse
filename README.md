<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17AuJ-sb6mlYhaLpiA8j-qAsDO1LBjDWJ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Set up your API key:
   - Open `.env.local` file
   - Replace `PLACEHOLDER_API_KEY` with your actual Gemini API key
   - Get your API key from: https://aistudio.google.com/apikey
   - The variable should be named `VITE_API_KEY` (not `GEMINI_API_KEY`)
   
   Example `.env.local`:
   ```
   VITE_API_KEY=your_actual_api_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Debugging

This app includes comprehensive debugging tools to help troubleshoot issues:

### Debug Panel
- Click the **🐛 Debug** button in the bottom-right corner to open the debug console
- View real-time logs, errors, and warnings
- Filter logs by type (All, Errors, Warnings, Info)
- Check environment variables and API key status

### Startup Checks
The app automatically runs startup checks when it loads:
- ✅ API Key configuration
- ✅ API Key format validation
- ✅ Network connectivity

If any check fails, you'll see a detailed error screen with instructions.

### Console Logging
All API calls and operations are logged to the browser console with emojis for easy scanning:
- 🚀 API calls
- ✅ Successful operations
- ❌ Errors
- ⚠️ Warnings
- 🔧 Debug information

### Common Issues

**"Failed to fetch articles"**
- Check that `VITE_API_KEY` is set correctly in `.env.local`
- Verify your API key is valid at https://aistudio.google.com/apikey
- Make sure you've restarted the dev server after changing `.env.local`
- Check the Debug Panel for detailed error messages

**"API Key not found"**
- The environment variable must be named `VITE_API_KEY` (with the `VITE_` prefix)
- Make sure `.env.local` is in the project root directory
- Restart your dev server after making changes

**Network errors**
- Check your internet connection
- Verify you can access https://ai.google.dev
- Check if you're behind a firewall or proxy

**API quota exceeded**
- Check your Gemini API usage at https://aistudio.google.com
- You may need to wait or upgrade your plan

### Error Boundary
If the app crashes, you'll see a detailed error screen with:
- Error message and details
- Stack trace (expandable)
- Troubleshooting tips
- Options to reload or go back
