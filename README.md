# Next.js Canva Clone

A powerful web-based design editor built with Next.js and Fabric.js, inspired by Canva. Create, edit, and export graphics with an intuitive drag-and-drop interface.

## 🚀 Features

- **Canvas Editor** - Interactive design workspace with zoom and pan
- **Text Tools** - Add, edit, and style text with custom fonts, weights, and styles
- **Shape Library** - Circles, rectangles, triangles, diamonds, and more
- **Color Controls** - Fill colors, stroke colors, and opacity adjustments
- **Layer Management** - Bring forward/send backward functionality
- **Export Options** - Save designs as PNG, JPEG, SVG, or JSON
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Canvas Library:** Fabric.js
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / shadcn/ui
- **TypeScript:** Full type safety
- **State Management:** React hooks

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── editor/[projectid]/ # Editor page
│   └── globals.css         # Global styles
├── components/             # Reusable UI components
│   └── ui/                 # shadcn/ui components
└── features/
    └── Editor/
        ├── components/     # Editor-specific components
        │   ├── NavBar/     # Top navigation
        │   ├── SideBar/    # Tool sidebars
        │   ├── ToolBar/    # Bottom toolbar
        │   └── Footer/     # Status footer
        ├── hooks/          # Custom React hooks
        ├── constants.ts    # Editor constants
        ├── types.ts        # TypeScript definitions
        └── utils.ts        # Utility functions
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd image-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Usage

1. **Access the Editor** - Go to `/editor/123` (or any project ID)
2. **Add Elements** - Use the sidebar to add text, shapes, and images
3. **Customize** - Select elements to modify colors, fonts, and properties
4. **Export** - Save your design in multiple formats

## 🔧 Key Features Implementation

- **Canvas Management** - Custom hooks for canvas initialization and events
- **Type Safety** - Comprehensive TypeScript definitions for all editor functions
- **Modular Architecture** - Feature-based folder structure for scalability
- **Responsive UI** - Tailwind CSS with mobile-first design
- **State Management** - React hooks for editor state and selections

## 📱 Responsive Design

The editor adapts to different screen sizes with:

- Collapsible sidebars on mobile
- Touch-friendly controls
- Optimized toolbar layout
- Responsive canvas sizing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and Fabric.js
