
export type ContextType = 'job-interview' | 'recruitment-call' | 'business-message' | 'other';

export type VerdictType = 'Authentic' | 'Possibly Fake' | 'Deepfake';

export interface AnalysisResult {
  score: number;
  confidence: number;
  verdict: VerdictType;
  context: ContextType;
  fileName: string;
  fileType: 'video' | 'audio';
  timestamp: string;
}
