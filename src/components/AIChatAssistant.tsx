
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getInitialMessage } from "@/utils/aiAssistant";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: input }
      });

      if (error) throw new Error(error.message);
      
      if (!data || !data.response) {
        throw new Error("No response received from AI");
      }
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response 
      }]);
      
      // Reset retry count on successful response
      setRetryCount(0);
    } catch (error) {
      console.error("AI Chat Error:", error);
      
      // Add error message as assistant response
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error processing your request. Please try again." 
      }]);
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
      
      // Show toast only on first error
      if (retryCount < 1) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to get AI response. Please try a different question.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    if (messages.length < 2 || isLoading) return;
    
    // Get the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === "user");
    
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
    
    // Remove the last assistant message if it was an error
    const newMessages = [...messages];
    if (newMessages[newMessages.length - 1].role === "assistant") {
      newMessages.pop();
    }
    
    setMessages(newMessages);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: lastUserMessage.content }
      });

      if (error) throw new Error(error.message);
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response 
      }]);
    } catch (error) {
      console.error("AI Chat Retry Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI response on retry. Please try a different question.",
      });
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm still having trouble processing your request. Maybe try phrasing your question differently?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden backdrop-blur-md bg-white/80 dark:bg-black/50 border border-white/20 dark:border-gray-800/50 shadow-lg">
      <div className="p-4 space-y-4">
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg transition-all duration-300 animate-fade-in ${
                  message.role === "assistant"
                    ? "bg-primary/10 ml-4"
                    : "bg-muted mr-4"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center p-2">
                <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              </div>
            )}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="resize-none"
            rows={2}
          />
          <div className="flex flex-col gap-2">
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
            
            {messages.length > 1 && messages[messages.length - 1].role === "assistant" && (
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleRetry}
                disabled={isLoading}
                className="border-primary/20 hover:bg-primary/5 transition-all"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AIChatAssistant;
