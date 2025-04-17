
import MainLayout from "@/layouts/MainLayout";
import { Search, Users, AlertCircle, Brain, MessageCircle } from "lucide-react";
import AIChatAssistant from "@/components/AIChatAssistant";

const About = () => {
  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">About TruthLens</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Protecting professionals from deepfake scams with advanced AI detection technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              TruthLens was created to protect individuals and businesses from the growing threat of deepfake scams in professional contexts. As AI-generated media becomes increasingly sophisticated, our mission is to provide accessible tools that help verify the authenticity of important communications.
            </p>
            <p className="text-muted-foreground">
              We believe everyone deserves access to technology that helps them stay safe from increasingly sophisticated digital scams, especially in professional environments where trust is essential.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground mb-4">
              TruthLens uses advanced AI algorithms to analyze video and audio content for signs of manipulation or synthetic generation. Our technology examines multiple layers of the media, looking for inconsistencies that human eyes and ears might miss.
            </p>
            <p className="text-muted-foreground">
              For each analysis, we provide a comprehensive report with a deepfake probability score, confidence level, and a final verdict to help you make informed decisions about the media's authenticity.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-card shadow-md rounded-xl p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Protection</h3>
            <p className="text-muted-foreground">
              Helping professionals protect themselves from sophisticated scams
            </p>
          </div>
          <div className="bg-card shadow-md rounded-xl p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              Making advanced detection technology accessible to everyone
            </p>
          </div>
          <div className="bg-card shadow-md rounded-xl p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Awareness</h3>
            <p className="text-muted-foreground">
              Educating users about the risks of deepfake technology
            </p>
          </div>
          <div className="bg-card shadow-md rounded-xl p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              Continuously improving our detection algorithms
            </p>
          </div>
        </div>

        {/* Echo Chat Assistant Section */}
        <section className="max-w-2xl mx-auto bg-card shadow-md rounded-xl p-6 mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-center">Chat with Echo</h2>
          </div>
          <p className="text-center text-muted-foreground mb-6">
            Have questions about deepfakes or media verification? Echo is here to help.
          </p>
          <AIChatAssistant />
        </section>

        <div className="border shadow-md rounded-xl p-8 bg-card">
          <h2 className="text-2xl font-bold mb-4 text-center">Common Deepfake Warning Signs</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Visual Indicators</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Unnatural eye movements or blinking</li>
                <li>Inconsistent lighting or shadows</li>
                <li>Blurry or changing face edges</li>
                <li>Mismatched skin tones or textures</li>
                <li>Strange head positions or movements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Audio Indicators</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Robotic or unnatural voice qualities</li>
                <li>Inconsistent audio quality</li>
                <li>Unusual speech patterns or rhythm</li>
                <li>Mismatched lip movements with audio</li>
                <li>Background noise inconsistencies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
