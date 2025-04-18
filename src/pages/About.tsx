import MainLayout from "@/layouts/MainLayout";
import { Search, Users, AlertCircle, Brain, MessageCircle, Shield, Clock, BarChart } from "lucide-react";
import AboutAIChat from "@/components/AboutAIChat";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <MainLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text inline-block">About TruthLens</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protecting professionals from deepfake scams with advanced AI detection technology
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
        </section>

        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <div className="w-16 h-1 bg-primary/50 rounded-full"></div>
            <p className="text-lg text-muted-foreground">
              TruthLens was created to protect individuals and businesses from the growing threat of deepfake scams in professional contexts. As AI-generated media becomes increasingly sophisticated, our mission is to provide accessible tools that help verify the authenticity of important communications.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe everyone deserves access to technology that helps them stay safe from increasingly sophisticated digital scams, especially in professional environments where trust is essential.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl opacity-50"></div>
            <Card className="glass-card rounded-2xl hover-scale overflow-hidden border-0">
              <CardContent className="p-8 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Trust & Security</h3>
                <p className="text-muted-foreground">
                  Our advanced AI algorithms analyze multiple dimensions of media to detect even the most sophisticated deepfakes, helping to preserve trust in digital communications.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              TruthLens uses state-of-the-art AI technology to analyze and verify the authenticity of media
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg rounded-2xl overflow-hidden hover-scale">
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary font-semibold">1</div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Upload Media</h3>
                <p className="text-muted-foreground">
                  Simply upload the video or audio file you want to verify, and select the professional context in which you received it.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg rounded-2xl overflow-hidden hover-scale">
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary font-semibold">2</div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our sophisticated AI system analyzes multiple dimensions of the media to detect signs of manipulation or synthetic generation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-secondary/50 border-0 shadow-lg rounded-2xl overflow-hidden hover-scale">
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary font-semibold">3</div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <BarChart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Results</h3>
                <p className="text-muted-foreground">
                  Receive a comprehensive analysis with deepfake probability score, confidence level, and final authentication verdict.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid md:grid-cols-4 gap-8">
          <Card className="bg-card shadow-lg rounded-2xl overflow-hidden hover-scale border-0">
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Protection</h3>
              <p className="text-sm text-muted-foreground">
                Safeguarding professionals from sophisticated deepfake scams
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-lg rounded-2xl overflow-hidden hover-scale border-0">
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Making advanced detection technology accessible to everyone
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-lg rounded-2xl overflow-hidden hover-scale border-0">
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Awareness</h3>
              <p className="text-sm text-muted-foreground">
                Educating users about the risks of deepfake technology
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-lg rounded-2xl overflow-hidden hover-scale border-0">
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Continuously improving our detection algorithms
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Echo Chat Assistant Section */}
        <section className="max-w-2xl mx-auto">
          <Card className="glass-card rounded-2xl border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-center">Chat with Echo</h2>
              </div>
              <p className="text-center text-muted-foreground mb-6">
                Have questions about deepfakes or media verification? Echo is here to help.
              </p>
              <AboutAIChat />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-secondary/30 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-8 text-center">Common Deepfake Warning Signs</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Visual Indicators</h3>
                  </div>
                  <ul className="space-y-3 pl-5">
                    {[
                      "Unnatural eye movements or blinking",
                      "Inconsistent lighting or shadows",
                      "Blurry or changing face edges",
                      "Mismatched skin tones or textures",
                      "Strange head positions or movements"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Audio Indicators</h3>
                  </div>
                  <ul className="space-y-3 pl-5">
                    {[
                      "Robotic or unnatural voice qualities",
                      "Inconsistent audio quality",
                      "Unusual speech patterns or rhythm",
                      "Mismatched lip movements with audio",
                      "Background noise inconsistencies"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
