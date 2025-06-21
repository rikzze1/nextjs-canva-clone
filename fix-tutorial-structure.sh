#!/bin/bash

echo "🎯 FIXED: Applied Tutorial Code Structure!"

# Kill processes
pkill -f "next dev" 2>/dev/null || true
pkill -f "bun run dev" 2>/dev/null || true

# Clear cache
rm -rf .next

echo "✅ FIXES APPLIED:"
echo ""
echo "1. ✅ Added missing defaultHeight prop to useEditor"
echo "2. ✅ Fixed canvas layout to match tutorial structure"  
echo "3. ✅ Moved containerRef to correct div element"
echo "4. ✅ Use-editor already had correct workspace logic"
echo "5. ✅ addToCanvas now centers objects on workspace (not canvas)"
echo ""
echo "🎯 KEY DIFFERENCE FROM TUTORIAL:"
echo "- Tutorial: center(object) -> uses workspace.getCenterPoint()"
echo "- Your old code: manual canvas center calculation"
echo ""
echo "🧪 NOW ELEMENTS SHOULD APPEAR ON THE WHITE WORKSPACE!"

cd /home/rikki/playground/nextjs-canva-clone
bun run dev
