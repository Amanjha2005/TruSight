
export const isDeepfakeRelatedQuery = (query: string): boolean => {
  // Always return true since we're allowing all types of questions now
  return true;
};

export const getInitialMessage = () => ({
  role: "assistant" as const,
  content: "Hi there! I'm Echo, your AI assistant. I can answer questions about deepfakes, media verification, or any other topic you're curious about. How can I help you today?",
  status: "success" as const
});
