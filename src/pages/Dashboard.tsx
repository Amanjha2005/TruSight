
import MainLayout from "@/layouts/MainLayout";
import AnalysisDashboard from "@/components/AnalysisDashboard";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Your Analysis History</h1>
          <p className="text-lg text-muted-foreground mt-2">
            View and filter your past deepfake detection results
          </p>
        </div>
        <AnalysisDashboard />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
