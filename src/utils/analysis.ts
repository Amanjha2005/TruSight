
import { AnalysisResult, ContextType, VerdictType } from "@/types";

// This is a mock function that simulates API analysis
// In a real application, this would be an API call to a service like Hive.ai
export const simulateAnalysis = async (
  fileName: string,
  fileType: "video" | "audio",
  context: ContextType
): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate a random score between 0 and 100
  // In a real app, this would come from the AI analysis API
  const score = Math.floor(Math.random() * 101);
  
  // Generate a random confidence level (more likely to be high)
  const confidence = Math.floor(Math.random() * 30) + 70;

  // Determine verdict based on score
  let verdict: VerdictType = "Authentic";
  if (score > 70) {
    verdict = "Deepfake";
  } else if (score > 40) {
    verdict = "Possibly Fake";
  }

  return {
    score,
    confidence,
    verdict,
    context,
    fileName,
    fileType,
    timestamp: new Date().toLocaleString(),
  };
};
