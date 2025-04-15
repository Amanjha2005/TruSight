import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ContextType } from "@/types";
import { simulateAnalysis } from "@/utils/analysis";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const UploadForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState<ContextType>("job-interview");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is video or audio
      if (!selectedFile.type.includes("video") && !selectedFile.type.includes("audio")) {
        setError("Please upload a video or audio file");
        setFile(null);
        return;
      }

      // Check file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File size must be less than 50MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    
    try {
      const fileType = file.type.includes("video") ? "video" : "audio";
      const result = await simulateAnalysis(file.name, fileType as "video" | "audio", context);
      
      // Save result to Supabase
      const { error: saveError } = await supabase
        .from('analysis_results')
        .insert({
          file_name: file.name,
          file_type: fileType,
          context,
          score: result.score,
          confidence: result.confidence,
          verdict: result.verdict,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (saveError) throw saveError;
      
      // Store result for the results page
      localStorage.setItem("analysisResult", JSON.stringify(result));
      
      toast({
        title: "Analysis Complete",
        description: `Your ${fileType} has been analyzed successfully.`,
      });
      
      navigate("/results");
    } catch (err) {
      setError("An error occurred during analysis. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="context">Media Context</Label>
            <Select value={context} onValueChange={(value) => setContext(value as ContextType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select context" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="job-interview">Job Interview</SelectItem>
                <SelectItem value="recruitment-call">Recruitment Call</SelectItem>
                <SelectItem value="business-message">Business Message</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary transition-colors ${
                file ? "border-primary" : "border-muted-foreground/30"
              }`}
              onClick={() => document.getElementById("file")?.click()}
            >
              <input
                id="file"
                type="file"
                accept="video/*,audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
              
              {file ? (
                <div className="mt-2">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: MP4, MOV, MP3, WAV (max 50MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={!file || isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Media"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
