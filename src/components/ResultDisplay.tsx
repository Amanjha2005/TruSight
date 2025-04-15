
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, AlertTriangle, X, Info, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnalysisResult } from "@/types";

const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case "Authentic":
      return "text-success";
    case "Possibly Fake":
      return "text-warning";
    case "Deepfake":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const getVerdictBgColor = (verdict: string) => {
  switch (verdict) {
    case "Authentic":
      return "bg-success/10";
    case "Possibly Fake":
      return "bg-warning/10";
    case "Deepfake":
      return "bg-destructive/10";
    default:
      return "bg-muted";
  }
};

const getVerdictIcon = (verdict: string) => {
  switch (verdict) {
    case "Authentic":
      return <Check className="h-6 w-6 text-success" />;
    case "Possibly Fake":
      return <AlertTriangle className="h-6 w-6 text-warning" />;
    case "Deepfake":
      return <X className="h-6 w-6 text-destructive" />;
    default:
      return <Info className="h-6 w-6 text-muted-foreground" />;
  }
};

const getContextLabel = (context: string) => {
  switch (context) {
    case "job-interview":
      return "Job Interview";
    case "recruitment-call":
      return "Recruitment Call";
    case "business-message":
      return "Business Message";
    default:
      return "Other";
  }
};

const ResultDisplay = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be fetched from an API
    const storedResult = localStorage.getItem("analysisResult");
    
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      // If no result is found, redirect to upload page
      navigate("/upload");
    }
    
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleNewAnalysis = () => {
    navigate("/upload");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64">
        <RefreshCw className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-lg">Loading analysis results...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center p-8">
        <p className="text-lg mb-4">No analysis results found.</p>
        <Button onClick={handleNewAnalysis}>Start New Analysis</Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h3 className="text-lg font-semibold">Analysis Results</h3>
            <p className="text-sm text-muted-foreground">
              {result.fileType === "video" ? "Video" : "Audio"} analyzed on {result.timestamp}
            </p>
          </div>
          <div className={`mt-2 sm:mt-0 px-3 py-1 rounded-full ${getVerdictBgColor(result.verdict)} flex items-center`}>
            {getVerdictIcon(result.verdict)}
            <span className={`ml-2 font-medium ${getVerdictColor(result.verdict)}`}>
              {result.verdict}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Deepfake Score</span>
              <span className="text-sm font-medium">{result.score}%</span>
            </div>
            <Progress 
              value={result.score} 
              className={`h-2 ${
                result.score > 70 
                  ? "bg-muted text-destructive" 
                  : result.score > 40 
                  ? "bg-muted text-warning" 
                  : "bg-muted text-success"
              }`} 
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Confidence Level</span>
              <span className="text-sm font-medium">{result.confidence}%</span>
            </div>
            <Progress value={result.confidence} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
          <div>
            <p className="text-sm text-muted-foreground">File Name</p>
            <p className="text-sm font-medium truncate">{result.fileName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Context</p>
            <p className="text-sm font-medium">{getContextLabel(result.context)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">File Type</p>
            <p className="text-sm font-medium capitalize">{result.fileType}</p>
          </div>
        </div>

        <div className="pt-2">
          <div className={`p-4 rounded-lg ${getVerdictBgColor(result.verdict)} space-y-2`}>
            <div className="flex items-start">
              {getVerdictIcon(result.verdict)}
              <div className="ml-3">
                <h4 className={`font-medium ${getVerdictColor(result.verdict)}`}>{result.verdict}</h4>
                {result.verdict === "Authentic" && (
                  <p className="text-sm">This media appears to be authentic with high confidence.</p>
                )}
                {result.verdict === "Possibly Fake" && (
                  <p className="text-sm">This media shows some signs of manipulation and should be verified through other channels.</p>
                )}
                {result.verdict === "Deepfake" && (
                  <p className="text-sm">This media has strong indicators of being artificially generated or manipulated.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleNewAnalysis}>Analyze New Media</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
