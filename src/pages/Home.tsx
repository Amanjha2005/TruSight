
import { useNavigate } from "react-router-dom";
import { Shield, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
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
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-card border rounded-xl p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Upload Media</h3>
            <p className="text-muted-foreground">
              Upload the video or audio file you want to verify and select the context.
            </p>
          </div>
          <div className="bg-card border rounded-xl p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Advanced Analysis</h3>
            <p className="text-muted-foreground">
              Our AI system analyzes the media to detect signs of manipulation or synthetic generation.
            </p>
          </div>
          <div className="bg-card border rounded-xl p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Get Results</h3>
            <p className="text-muted-foreground">
              Receive a detailed analysis with deepfake score, confidence level, and final verdict.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Protect Yourself From Deepfake Scams</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              As technology advances, deepfake scams in professional settings are becoming more common. Our tool helps detect them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Job Interview Scams</h3>
              <p className="text-muted-foreground mb-4">
                Fake interviews asking for personal information or requesting payment for "training" are increasingly common. Verify before sharing sensitive information.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Executive Impersonation</h3>
              <p className="text-muted-foreground mb-4">
                Scammers can now create convincing videos of executives requesting urgent fund transfers or sensitive information from employees.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Recruitment Fraud</h3>
              <p className="text-muted-foreground mb-4">
                Deepfake technologies can be used to impersonate recruiters from legitimate companies to collect personal data or fees.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Business Communication</h3>
              <p className="text-muted-foreground mb-4">
                Verify important business communications, especially those requesting unusual actions or containing financial instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Verify Your Media?</h2>
        <Button size="lg" onClick={() => navigate("/upload")} className="text-lg px-8 py-6 h-auto">
          Start Analysis Now
        </Button>
      </section>
    </MainLayout>
  );
};

export default Home;
