
import MainLayout from "@/layouts/MainLayout";
import UploadForm from "@/components/UploadForm";

const Upload = () => {
  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Verify Media Authenticity</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Upload a video or audio file to check if it's authentic or a deepfake
          </p>
        </div>
        <UploadForm />
      </div>
    </MainLayout>
  );
};

export default Upload;
