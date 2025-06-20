# Fix for WSL Development Server Issues

## Quick Fixes to Try (in order):

### 1. Use the stable dev script instead of turbopack:
```bash
bun run dev:stable
```

### 2. If that doesn't work, run with explicit host binding:
```bash
bunx next dev --hostname 0.0.0.0 --port 3000
```

### 3. Alternative: Use npm/yarn instead of bun for dev:
```bash
npm run dev:stable
```

### 4. If still having issues, try without turbopack:
```bash
bunx next dev --hostname localhost --port 3000
```

## Root Cause Analysis:

The issue is likely caused by:
- Turbopack compatibility issues in WSL environment
- Port binding problems between WSL and Windows
- Bun runtime conflicts with Next.js in WSL

## Permanent Fix:

Update your package.json scripts to be more WSL-friendly:

```json
{
  "scripts": {
    "dev": "next dev --hostname 0.0.0.0",
    "dev:turbo": "next dev --turbopack --hostname 0.0.0.0", 
    "dev:stable": "next dev --hostname localhost"
  }
}
```

## Testing:
After making changes, test with:
1. `bun run dev:stable` 
2. Open browser to `http://localhost:3000`
3. If that works, try `bun run dev:turbo`
