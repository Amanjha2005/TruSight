
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileVideo, FileAudio, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type AnalysisResult = {
  id: string;
  file_name: string;
  file_type: string;
  context: string;
  score: number;
  confidence: number;
  verdict: string;
  created_at: string;
};

const AnalysisDashboard = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('analysis_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Deepfake':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'Possibly Fake':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'Authentic':
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return null;
    }
  };

  const filteredResults = results.filter(result => {
    if (filter === "all") return true;
    return result.verdict.toLowerCase() === filter;
  });

  if (isLoading) {
    return <div>Loading results...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Analysis History</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by verdict" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="authentic">Authentic</SelectItem>
              <SelectItem value="possibly fake">Suspicious</SelectItem>
              <SelectItem value="deepfake">Deepfake</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Context</TableHead>
              <TableHead>Verdict</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  {result.file_type === "video" ? (
                    <FileVideo className="h-5 w-5" />
                  ) : (
                    <FileAudio className="h-5 w-5" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{result.file_name}</TableCell>
                <TableCell>{result.context}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getVerdictIcon(result.verdict)}
                    <span>{result.verdict}</span>
                  </div>
                </TableCell>
                <TableCell>{result.score}%</TableCell>
                <TableCell>
                  {new Date(result.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AnalysisDashboard;
