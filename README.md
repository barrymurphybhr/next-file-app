# next-file-app

A file browser built with [Next.js](https://nextjs.org), React 19, TypeScript, and Tailwind CSS. Browse a folder/file hierarchy, navigate into nested folders, and sort items by name or date.

## Features

- **File listing** — displays files and folders from a JSON data source with type-appropriate icons from `@brighthr/icons`
- **Folder navigation** — double-click a folder to navigate into it; the URL reflects the current path (e.g. `/Expenses/Receipts`)
- **Breadcrumb** — always-visible breadcrumb trail with links back to any ancestor folder
- **Sorting** — sort by name (A–Z / Z–A) or date added (oldest / newest) via a URL search param (`?sort=`)

## Project structure

```
app/
  page.tsx          # Root file listing
  [...path]/
    page.tsx        # Dynamic nested folder page
  layout.tsx        # Root layout with breadcrumb and sort controls
components/
  Breadcrumb/       # Path breadcrumb component
  FileItem/         # Individual file/folder row
  FileList/         # Renders a list of FileItems
  Options/          # Header bar (breadcrumb + sort)
  Sorting/          # Sort dropdown
data/
  files.json        # File/folder data source
  data.tsx          # Re-exports files.json for use in pages
lib/
  sort.ts           # Sorting utility
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Script               | Description                  |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start the development server |
| `npm run build`      | Build for production         |
| `npm run start`      | Start the production server  |
| `npm run lint`       | Run ESLint                   |
| `npm test`           | Run Jest tests               |
| `npm run test:watch` | Run Jest in watch mode       |

## Testing

Tests are written with [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Each component has a co-located test file.

```bash
npm test
```
