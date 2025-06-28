# API Documentation

## Text Analysis API

### `analyzeText(text: string): Promise<AnalysisResult>`

Analyzes text content for credibility and misinformation.

#### Parameters
- `text` (string): The content to analyze

#### Returns
```typescript
interface AnalysisResult {
  credibilityScore: number;
  warnings: string[];
  suggestions: string[];
  factCheck: {
    isFactual: boolean;
    explanation: string;
    sources?: DetailedSource[];
  };
  sentiment?: {
    score: number;
    label: 'negative' | 'neutral' | 'positive';
  };
  readability?: {
    score: number;
    level: 'Easy' | 'Medium' | 'Hard';
    suggestions: string[];
  };
  bias?: {
    score: number;
    type: string;
    explanation: string;
  };
  statistics: ContentStatistics;
  timeline?: TimelineAnalysis;
  citations?: CitationAnalysis;
}
```

### `analyzeNewsArticle(): Promise<NewsArticle[]>`

Retrieves and analyzes current news articles.

#### Returns
```typescript
interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  credibilityScore: number;
  summary: string;
  warnings: string[];
  verifiedClaims: string[];
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}
```

## Types

### ContentStatistics
```typescript
interface ContentStatistics {
  wordCount: number;
  averageSentenceLength: number;
  paragraphCount: number;
  complexWords: number;
  readingTimeMinutes: number;
  topKeywords: string[];
  emotionalTone: {
    positive: number;
    negative: number;
    urgent: number;
  };
  uniqueWords: number;
  averageWordLength: number;
}
```

### DetailedSource
```typescript
interface DetailedSource {
  url: string;
  title: string;
  publishDate?: string;
  author?: string;
  reliability: number;
  verificationDetails: string[];
}
```