import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, AlertTriangle, Brain, User } from 'lucide-react';

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

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { isAI, confidence, modelResults, reasoning } = result;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Result */}
      <Card className="p-6 border-2 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {isAI ? (
              <Brain className="h-8 w-8 text-orange-500" />
            ) : (
              <User className="h-8 w-8 text-green-500" />
            )}
            <div>
              <h3 className="text-xl font-semibold">
                {isAI ? 'AI Generated' : 'Human Written'}
              </h3>
              <p className="text-muted-foreground">
                {confidence}% confidence
              </p>
            </div>
          </div>
          <Badge 
            variant={isAI ? "destructive" : "default"}
            className="text-sm px-3 py-1"
          >
            {isAI ? 'AI Content' : 'Human Content'}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Confidence Level</span>
            <span>{confidence}%</span>
          </div>
          <Progress 
            value={confidence} 
            className="h-2"
          />
        </div>
      </Card>

      {/* Model Results */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
          AI Model Analysis
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {modelResults.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-muted/50 border"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{model.name}</span>
                <Badge variant={model.prediction === 'AI' ? 'destructive' : 'secondary'}>
                  {model.prediction}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Confidence</span>
                  <span>{model.confidence}%</span>
                </div>
                <Progress value={model.confidence} className="h-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Reasoning */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
          Analysis Insights
        </h4>
        <ul className="space-y-2">
          {reasoning.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-2 text-sm"
            >
              <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">{point}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}