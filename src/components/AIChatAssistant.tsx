
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isDeepfakeRelatedQuery, getInitialMessage } from "@/utils/aiAssistant";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isDeepfakeRelatedQuery(input)) {
      setMessages(prev => [...prev, 
        { role: "user", content: input },
        { role: "assistant", content: "I can only help with questions about deepfakes, AI-generated content, and media verification. Please ask something related to these topics." }
      ]);
      setInput("");
      return;
    }

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: input }
      });

      if (error) throw new Error(error.message);
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response 
      }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-4 space-y-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
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
            placeholder="Ask about deepfake detection..."
            className="resize-none"
            rows={2}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default AIChatAssistant;
