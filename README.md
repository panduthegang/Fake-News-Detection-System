# Verifai - AI-Powered Content Verification Platform 🔍

<div align="center">
  <img src="/public/Thumbnail.png" alt="Verifai Thumbnail" width="400" />
  <p align="center">
    <strong>Combat misinformation with advanced AI-powered content verification</strong>
  </p>
</div>

## 🌟 Features

### Core Functionality
- 🤖 **Advanced AI Analysis**
  - Real-time content credibility assessment using Google Gemini AI
  - Multi-language support (English, Hindi, Gujarati, Marathi)
  - Sentiment analysis, bias detection, and readability scoring
  - Live fact-checking with Serper search integration

- 🔍 **Comprehensive Verification**
  - Cross-reference with trusted news sources
  - Citation analysis and timeline consistency checking
  - Source credibility scoring with detailed verification

- 📊 **Detailed Analytics**
  - Content statistics and keyword extraction
  - Emotional tone analysis and reading time estimation
  - Pattern recognition across multiple analyses

### User Experience
- 🎨 **Modern Interface** - Clean, responsive design with dark/light mode
- 🗣️ **Accessibility** - Voice input, text-to-speech, multi-language interface
- 📱 **Social Features** - Community feed, collaborative verification, analysis sharing

## 🛠️ Tech Stack

**Frontend:** React 18.3.1, TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion  
**AI/ML:** Google Gemini AI, Serper Search API  
**Backend:** Firebase Authentication, Firestore Database  
**State Management:** Zustand, i18next for internationalization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Google Gemini API key
- Serper API key (for live search)
- Firebase project

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/panduthegang/Fake-News-Detection-System.git
cd Fake-News-Detection-System
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file:
```env
# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# Serper Search API
VITE_SERPER_API_KEY=your_serper_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Start Development Server**
```bash
npm run dev
```

## 🔑 API Keys Setup

### Google Gemini AI
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to `VITE_GEMINI_API_KEY` in your `.env` file

### Serper Search API
1. Go to [Serper.dev](https://serper.dev)
2. Sign up for a free account (2,500 free searches/month)
3. Navigate to your dashboard
4. Copy your API key to `VITE_SERPER_API_KEY` in your `.env` file

### Firebase Setup
1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Get your config from Project Settings > General > Your apps
5. Add the configuration to your `.env` file

## 📱 Key Features

- **Text Analysis**: Paste content for AI-powered credibility assessment
- **Image Analysis**: Upload article images for OCR and verification
- **News Monitoring**: Real-time news analysis from trusted sources
- **Community Feed**: Share and discuss fake news awareness
- **History Tracking**: Save and compare multiple analyses
- **Multi-language**: Support for English, Hindi, Gujarati, Marathi

## 🏗️ Architecture

The application uses a modern tech stack with:
- **Frontend**: React with TypeScript for type safety
- **AI Integration**: Google Gemini for content analysis
- **Search**: Serper API for real-time fact verification
- **Database**: Firestore for user data and analysis history
- **Authentication**: Firebase Auth with Google OAuth

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🙏 Acknowledgments

- Google Gemini AI for content analysis
- Serper.dev for real-time search capabilities
- Firebase for backend infrastructure
- The React and open-source communities

## 📬 Contact

- **Website**: [verifai.vercel.app](https://verifai-by-ai-guardians.vercel.app/)
- **Email**: panduthegang@gmail.com
- **GitHub**: [panduthegang](https://github.com/panduthegang)

---

<div align="center">
  <p>Built with ❤️ by the AI Guardians Team</p>
  <p>Empowering truth in the digital age through AI-powered verification</p>
</div>