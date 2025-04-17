
export const isDeepfakeRelatedQuery = (query: string): boolean => {
  // Always return true since we're allowing all types of questions now
  return true;
};

export const getInitialMessage = () => ({
  role: "assistant" as const,
  content: "Hello! I'm Echo, your AI assistant. I can answer questions about deepfakes, AI-generated media, or any other topics you're curious about. How can I help you today?"
});
