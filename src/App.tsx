import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Input } from './components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { LoadingAnimation } from './components/LoadingAnimation';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Shield, FileText, Link, Sparkles, Brain } from 'lucide-react';

type AnalysisState = 'idle' | 'loading' | 'complete';

interface AnalysisResult {
  isAI: boolean;
  confidence: number;
  modelResults: {
    name: string;
    prediction: 'AI' | 'Human';
    confidence: number;
  }[];
  reasoning: string[];
}

export default function App() {
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState('text');

  const handleAnalyze = async () => {
    if ((!textInput.trim() && activeTab === 'text') || (!urlInput.trim() && activeTab === 'url')) {
      return;
    }

    setAnalysisState('loading');
    setResult(null);

    // Simulate AI analysis with mock results
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        isAI: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
        modelResults: [
          {
            name: 'GPT Detector',
            prediction: Math.random() > 0.6 ? 'AI' : 'Human',
            confidence: Math.floor(Math.random() * 20) + 80
          },
          {
            name: 'BERT Classifier',
            prediction: Math.random() > 0.4 ? 'AI' : 'Human',
            confidence: Math.floor(Math.random() * 25) + 75
          },
          {
            name: 'RoBERTa Model',
            prediction: Math.random() > 0.5 ? 'AI' : 'Human',
            confidence: Math.floor(Math.random() * 30) + 70
          },
          {
            name: 'Custom Ensemble',
            prediction: Math.random() > 0.3 ? 'AI' : 'Human',
            confidence: Math.floor(Math.random() * 15) + 85
          }
        ],
        reasoning: [
          'Repetitive sentence structures commonly found in AI-generated text',
          'Vocabulary complexity indicates potential machine generation',
          'Semantic coherence patterns suggest human authorship',
          'Stylistic consistency across paragraphs',
          'Presence of domain-specific terminology and context'
        ]
      };

      setResult(mockResult);
      setAnalysisState('complete');
    }, 2500);
  };

  const canAnalyze = (activeTab === 'text' && textInput.trim()) || (activeTab === 'url' && urlInput.trim());

  return (
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Find the Fake
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI detection powered by multiple machine learning models. 
            Analyze text and content to identify AI-generated vs human-written material.
          </p>
        </motion.div>

        {/* Main Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-8 border-2 transition-all duration-300 hover:shadow-xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="text" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Text Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center space-x-2">
                  <Link className="h-4 w-4" />
                  <span>URL Analysis</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <label className="block mb-2">Enter text to analyze</label>
                  <Textarea
                    placeholder="Paste your text here to check if it was written by AI or a human. The more text you provide, the more accurate the analysis will be..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[200px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    disabled={analysisState === 'loading'}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {textInput.length} characters • Minimum 50 characters recommended
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div>
                  <label className="block mb-2">Enter URL to analyze</label>
                  <Input
                    placeholder="https://example.com/article-to-analyze"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    disabled={analysisState === 'loading'}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    We'll extract and analyze the main text content from the URL
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <motion.div
              whileHover={{ scale: canAnalyze ? 1.02 : 1 }}
              whileTap={{ scale: canAnalyze ? 0.98 : 1 }}
            >
              <Button
                onClick={handleAnalyze}
                disabled={!canAnalyze || analysisState === 'loading'}
                className="w-full mt-6 h-12 text-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {analysisState === 'loading' ? (
                    <LoadingAnimation />
                  ) : (
                    <>
                      <Brain className="h-5 w-5" />
                      <span>Analyze Content</span>
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Results Section */}
        {result && analysisState === 'complete' && (
          <ResultsDisplay result={result} />
        )}

        {/* Feature Highlights */}
        {analysisState === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multiple AI Models</h3>
              <p className="text-muted-foreground text-sm">
                Uses ensemble of GPT detectors, BERT, and custom models for higher accuracy
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                Your content is analyzed securely and not stored or shared
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Detailed Insights</h3>
              <p className="text-muted-foreground text-sm">
                Get comprehensive analysis with reasoning and confidence scores
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}