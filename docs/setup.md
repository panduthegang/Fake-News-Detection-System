# Setup Guide

## Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- Google Gemini API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fake-news-detector.git
cd fake-news-detector
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_GEMINI_API_KEY | Google Gemini API key for content analysis | Yes |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
fake-news-detector/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── lib/           # Library code
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── docs/             # Documentation
└── package.json      # Project configuration
```

## Development Guidelines

1. Code Style
   - Use TypeScript for type safety
   - Follow ESLint configuration
   - Use Prettier for formatting

2. Component Structure
   - Create reusable components
   - Use proper type definitions
   - Follow React best practices

3. Testing
   - Write unit tests for utilities
   - Test components in isolation
   - Ensure proper error handling

4. Performance
   - Optimize component renders
   - Use proper memoization
   - Follow React performance guidelines