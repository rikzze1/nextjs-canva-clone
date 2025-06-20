# Development Server Fix Guide

## 🎯 Quick Start

Your server is terminating because of potential database connection issues. Try these solutions in order:

### 1. **Immediate Fix** (Recommended)
```bash
chmod +x *.sh
./test-and-start.sh
```

### 2. **Alternative Commands**
```bash
# Safe mode with error handling
bun run dev:safe

# Most stable (without turbopack)
bun run dev:stable

# Manual with full control
bunx next dev --hostname 0.0.0.0 --port 3000
```

### 3. **Database-Related Fixes**
If the database test fails:
- Check your internet connection
- Verify DATABASE_URL in `.env` file
- Check if Neon database is accessible

## 🔧 Scripts Created

- `test-and-start.sh` - Tests database connection then starts server
- `fix-and-start.sh` - Comprehensive server startup with cleanup
- `start-dev.sh` - Simple stable server start
- `debug-server.sh` - System diagnostics

## 🐛 Troubleshooting

### Server Keeps Crashing?
1. **Database Issues**: Most likely cause. Run `./test-and-start.sh`
2. **Port Conflicts**: Check with `lsof -i :3000`
3. **Memory Issues**: Use `bun run dev:safe` (increased memory)
4. **WSL Networking**: Try different hostname bindings

### Still Not Working?
1. Run `./debug-server.sh` for diagnostics
2. Check terminal for specific error messages
3. Try `bun run type-check` to find TypeScript errors

## 📊 Server Status

- ✅ Next.js 15.1.8 installed
- ✅ Bun runtime working
- ✅ Port 3000 available
- ⚠️  Database connection needs testing

## 🌐 Access URLs

After starting:
- **Local**: http://localhost:3000
- **Network**: http://[your-wsl-ip]:3000
- **Editor**: http://localhost:3000/editor

---

**TL;DR**: Run `./test-and-start.sh` - it will test your database connection and start the server safely.
