
export const isDeepfakeRelatedQuery = (query: string): boolean => {
  const relevantKeywords = [
    'deepfake', 'fake', 'analysis', 'result', 'video', 'audio',
    'detection', 'authentic', 'manipulated', 'ai', 'generated',
    'synthetic', 'media', 'trust', 'verification', 'report',
    'score', 'confidence', 'verdict'
  ];
  
  return relevantKeywords.some(keyword => 
    query.toLowerCase().includes(keyword)
  );
};

export const getInitialMessage = () => ({
  role: "assistant" as const,
  content: "Hello! I'm here to help you understand deepfake detection results and answer questions about AI-generated media. What would you like to know?"
});
