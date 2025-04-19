
import MainLayout from "@/layouts/MainLayout";
import ResultDisplay from "@/components/ResultDisplay";


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
          
        </div>
      </div>
    </MainLayout>
  );
};

export default Results;
