
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getInitialMessage } from "@/utils/aiAssistant";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  status?: "loading" | "error" | "success";
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
    const currentInput = input.trim();
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add a temporary loading message
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: "Thinking...",
      status: "loading" 
    }]);

    try {
      console.log("Sending message to AI:", currentInput.substring(0, 50) + "...");
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: currentInput }
      });

      // Remove the loading message
      setMessages(prev => prev.filter(msg => msg.status !== "loading"));

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to get AI response");
      }
      
      if (!data || !data.response) {
        console.error("No response data:", data);
        throw new Error("No response received from AI");
      }
      
      console.log("AI response received successfully");
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response,
        status: "success"
      }]);
      
      // Reset retry count on successful response
      setRetryCount(0);
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        status: "error" 
      }]);
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI response. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    if (messages.length < 2 || isLoading) return;
    
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === "user");
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
    console.log("Retrying with message:", lastUserMessage.content.substring(0, 50) + "...");
    
    // Remove the last assistant message if it was an error
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages[newMessages.length - 1].role === "assistant") {
        newMessages.pop();
      }
      return newMessages;
    });
    
    setIsLoading(true);

    // Add a loading message
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: "Retrying...",
      status: "loading" 
    }]);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: lastUserMessage.content }
      });

      // Remove the loading message
      setMessages(prev => prev.filter(msg => msg.status !== "loading"));

      if (error) {
        console.error("Retry error:", error);
        throw new Error(error.message || "Failed to get AI response");
      }
      
      if (!data || !data.response) {
        console.error("No retry response data:", data);
        throw new Error("No response received from AI on retry");
      }
      
      console.log("Retry successful");
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response,
        status: "success" 
      }]);

      // Reset retry count on successful retry
      setRetryCount(0);
    } catch (error) {
      console.error("AI Chat Retry Error:", error);
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm still having trouble processing your request. Maybe try a different question?",
        status: "error"
      }]);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI response on retry. Please try a different question.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden backdrop-blur-md bg-white/80 dark:bg-black/50 border border-white/20 dark:border-gray-800/50 shadow-lg animate-fade-in">
      <div className="p-4 space-y-4">
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  message.role === "assistant"
                    ? "bg-primary/10 ml-4 animate-scale-in"
                    : "bg-muted mr-4 animate-scale-in"
                } ${message.status === "error" ? "border-l-2 border-destructive" : ""}`}
              >
                {message.status === "loading" ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">{message.content}</p>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Echo anything..."
            className="resize-none transition-all duration-300 focus:ring-2 focus:ring-primary/50"
            rows={2}
            disabled={isLoading}
          />
          <div className="flex flex-col gap-2">
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
            
            {messages.length > 1 && messages[messages.length - 1].role === "assistant" && 
             messages[messages.length - 1].status === "error" && (
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleRetry}
                disabled={isLoading}
                className="border-primary/20 hover:bg-primary/5 transition-all animate-fade-in"
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
