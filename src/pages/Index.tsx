import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import AIChatAssistant from "@/components/AIChatAssistant";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <section className="text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Protect Yourself from <span className="text-primary">Deepfake Scams</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Verify the authenticity of videos and audio from job interviews, recruitment calls, and business messages.
          </p>
          <Button size="lg" onClick={() => navigate("/upload")} className="text-lg px-8 py-6 h-auto">
            Verify Media Now
          </Button>
        </section>

        {/* Update the AI Chat Assistant section */}
        <section className="max-w-2xl mx-auto bg-card border rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-center">Chat with Echo</h2>
          </div>
          <p className="text-center text-muted-foreground mb-6">
            Have questions about deepfakes or media verification? Echo is here to help.
          </p>
          <AIChatAssistant />
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
