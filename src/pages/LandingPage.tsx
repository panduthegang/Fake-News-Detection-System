import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Search, Sparkles, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Particles } from '@/components/Particles';

const exampleArticles = [
  {
    title: "Breaking: Miracle Cure Found!",
    text: "Scientists have discovered a revolutionary cure that treats all diseases overnight...",
    type: "Health Misinformation"
  },
  {
    title: "Shocking Political Scandal Revealed",
    text: "Anonymous sources claim high-ranking officials involved in secret underground...",
    type: "Political Disinformation"
  },
  {
    title: "5G Towers Cause Unusual Phenomena",
    text: "Residents report strange occurrences near newly installed 5G towers...",
    type: "Technology Myths"
  }
];

interface LandingPageProps {
  onStartAnalyzing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartAnalyzing }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Particles />
      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-8"
          >
            <Shield className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Fake News Detection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          >
            Verify Before You Trust
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Combat misinformation with our advanced AI technology. Analyze news articles,
            social media posts, and any content for credibility and factual accuracy in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-lg"
              onClick={onStartAnalyzing}
            >
              Start Analyzing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-lg"
              asChild
            >
              <Link to="/about">
                <Info className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Search,
                title: "Deep Content Analysis",
                description: "Advanced AI algorithms analyze text patterns, sources, and credibility markers"
              },
              {
                icon: Shield,
                title: "Real-time Verification",
                description: "Instant fact-checking against trusted sources and databases"
              },
              {
                icon: Sparkles,
                title: "Smart Recommendations",
                description: "Get actionable insights and verification suggestions"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6"
              >
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-left"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Common Types of Misinformation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exampleArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-destructive/5 border border-destructive/20 rounded-xl p-6"
                >
                  <AlertTriangle className="h-6 w-6 text-destructive mb-4" />
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{article.text}</p>
                  <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                    {article.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};