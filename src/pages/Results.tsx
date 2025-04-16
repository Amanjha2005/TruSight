
import MainLayout from "@/layouts/MainLayout";
import ResultDisplay from "@/components/ResultDisplay";
import AIChatAssistant from "@/components/AIChatAssistant";

const Results = () => {
  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Analysis Results</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Detailed results of your media analysis
          </p>
        </div>
        <div className="space-y-8">
          <ResultDisplay />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">AI Assistant</h2>
            <p className="text-center text-muted-foreground mb-6">
              Have questions about your results? Our AI assistant can help explain them.
            </p>
            <AIChatAssistant />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Results;
