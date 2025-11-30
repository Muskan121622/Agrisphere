import React, { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, Camera, Zap, Bug, Leaf, Apple, AlertTriangle, 
  CheckCircle, TrendingUp, Droplets, Thermometer, Activity,
  MapPin, BarChart3, Target, Brain
} from 'lucide-react';
import { EnhancedDiseaseDetector, MultiClassResult } from '@/lib/enhanced-disease-detection';
import { weatherIntegration } from '@/lib/advanced-weather-integration';

interface EnhancedImageAnalysisProps {
  analysisType?: 'disease' | 'pest' | 'nutrient' | 'soil' | 'comprehensive';
  onResultsChange?: (results: MultiClassResult | null) => void;
}

const EnhancedImageAnalysis: React.FC<EnhancedImageAnalysisProps> = ({ 
  analysisType = 'comprehensive',
  onResultsChange 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MultiClassResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [detector] = useState(() => new EnhancedDiseaseDetector());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResults(null);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Initialize detector
      await detector.loadModels();
      setProgress(20);

      // Simulate progressive analysis
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 80));
      }, 300);

      // Perform multi-class analysis
      const analysisResults = await detector.detectMultiClass(selectedFile);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setResults(analysisResults);
      onResultsChange?.(analysisResults);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, [selectedFile, detector, onResultsChange]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-primary transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {selectedFile ? (
              <div className="space-y-4">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className="max-w-xs max-h-48 mx-auto rounded-lg shadow-md"
                />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Upload Plant Image</p>
                  <p className="text-muted-foreground">
                    Support for leaf, stem, fruit, and soil images
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex gap-4 justify-center mt-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Choose Image
              </Button>
              
              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className="flex items-center gap-2 bg-gradient-primary"
              >
                <Brain className="w-4 h-4" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
              </Button>
            </div>
          </div>
        </div>

        {isAnalyzing && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>AI Analysis Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground text-center">
              Processing with multiple AI models...
            </p>
          </div>
        )}
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Overall Health Score */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Overall Plant Health</h3>
              <Badge className={`${getHealthStatusColor(results.overallHealth.status)} text-lg px-3 py-1`}>
                {results.overallHealth.score}/100
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="font-medium">Health Status</span>
                </div>
                <p className={`text-2xl font-bold capitalize ${getHealthStatusColor(results.overallHealth.status)}`}>
                  {results.overallHealth.status}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="font-medium">Image Analysis</span>
                </div>
                <div className="text-sm space-y-1">
                  <p>Plant Part: <span className="font-medium capitalize">{results.imageAnalysis.plantPart}</span></p>
                  <p>Quality: <span className="font-medium capitalize">{results.imageAnalysis.quality}</span></p>
                  <p>Processing Time: <span className="font-medium">{results.imageAnalysis.processingTime}ms</span></p>
                </div>
              </div>
            </div>

            {results.overallHealth.recommendations.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Priority Recommendations
                </h4>
                <ul className="text-sm space-y-1">
                  {results.overallHealth.recommendations.slice(0, 3).map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* Detailed Analysis Tabs */}
          <Card className="p-6">
            <Tabs defaultValue="diseases" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="diseases" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Diseases ({results.diseases.length})
                </TabsTrigger>
                <TabsTrigger value="pests" className="flex items-center gap-2">
                  <Bug className="w-4 h-4" />
                  Pests ({results.pests.length})
                </TabsTrigger>
                <TabsTrigger value="nutrients" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Nutrients ({results.nutrientDeficiency.length})
                </TabsTrigger>
                <TabsTrigger value="soil" className="flex items-center gap-2">
                  <Apple className="w-4 h-4" />
                  Soil Analysis
                </TabsTrigger>
              </TabsList>

              {/* Disease Analysis */}
              <TabsContent value="diseases" className="space-y-4">
                {results.diseases.length > 0 ? (
                  results.diseases.map((disease, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg capitalize">{disease.disease.replace('_', ' ')}</h4>
                          <p className="text-sm text-muted-foreground">
                            Affected: {disease.affectedPart} • Confidence: {(disease.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                        <Badge className={getSeverityColor(disease.severity)}>
                          {disease.severity}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Symptoms</h5>
                          <ul className="text-sm space-y-1">
                            {disease.symptoms.map((symptom, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Treatment</h5>
                          <p className="text-sm bg-green-50 dark:bg-green-950/30 p-3 rounded">
                            {disease.treatment}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium mb-2">Preventive Measures</h5>
                            <ul className="text-xs space-y-1">
                              {disease.preventiveMeasures.map((measure, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                                  {measure}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Economic Impact</h5>
                            <p className="text-xs bg-orange-50 dark:bg-orange-950/30 p-2 rounded">
                              {disease.economicImpact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <p>No diseases detected. Plant appears healthy!</p>
                  </div>
                )}
              </TabsContent>

              {/* Pest Analysis */}
              <TabsContent value="pests" className="space-y-4">
                {results.pests.length > 0 ? (
                  results.pests.map((pest, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg capitalize">{pest.pest.replace('_', ' ')}</h4>
                          <p className="text-sm text-muted-foreground">
                            Confidence: {(pest.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                        <Badge className={getSeverityColor(pest.severity)}>
                          {pest.severity}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Damage Type</h5>
                          <p className="text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded">
                            {pest.damage}
                          </p>
                          
                          <h5 className="font-medium mb-2 mt-4">Lifecycle</h5>
                          <p className="text-sm">{pest.lifecycle}</p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Biological Control</h5>
                          <ul className="text-sm space-y-1 mb-4">
                            {pest.biologicalControl.map((control, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Bug className="w-3 h-3 text-green-500" />
                                {control}
                              </li>
                            ))}
                          </ul>

                          <h5 className="font-medium mb-2">Chemical Control</h5>
                          <ul className="text-sm space-y-1">
                            {pest.chemicalControl.map((control, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-orange-500" />
                                {control}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <p>No pests detected. Plant is pest-free!</p>
                  </div>
                )}
              </TabsContent>

              {/* Nutrient Analysis */}
              <TabsContent value="nutrients" className="space-y-4">
                {results.nutrientDeficiency.length > 0 ? (
                  results.nutrientDeficiency.map((nutrient, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg capitalize">
                            {nutrient.nutrient.replace('_', ' ')}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Confidence: {(nutrient.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                        <Badge className={getSeverityColor(nutrient.severity)}>
                          {nutrient.severity}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Symptoms</h5>
                          <ul className="text-sm space-y-1">
                            {nutrient.symptoms.map((symptom, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <AlertTriangle className="w-3 h-3 text-yellow-500 mt-1" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Recommended Fertilizer</h5>
                          <p className="text-sm bg-blue-50 dark:bg-blue-950/30 p-3 rounded mb-3">
                            {nutrient.fertilizer}
                          </p>
                          
                          <h5 className="font-medium mb-2">Soil Amendment</h5>
                          <p className="text-sm">{nutrient.soilAmendment}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <h5 className="font-medium mb-2">Growth Impact</h5>
                        <p className="text-sm bg-orange-50 dark:bg-orange-950/30 p-3 rounded">
                          {nutrient.affectedGrowth}
                        </p>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <p>No nutrient deficiencies detected. Nutrition levels are adequate!</p>
                  </div>
                )}
              </TabsContent>

              {/* Soil Analysis */}
              <TabsContent value="soil" className="space-y-4">
                <Card className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg">Soil Analysis Results</h4>
                    <Badge className="bg-primary text-white">
                      {(results.soilAnalysis.confidence * 100).toFixed(1)}% Confidence
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-brown-50 dark:bg-brown-950/30 rounded-lg">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-brown-600" />
                      <div className="font-bold text-lg capitalize">{results.soilAnalysis.texture}</div>
                      <div className="text-sm text-muted-foreground">Soil Texture</div>
                    </div>

                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-bold text-lg">{results.soilAnalysis.ph.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">pH Level</div>
                    </div>

                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className="font-bold text-lg capitalize">{results.soilAnalysis.fertility}</div>
                      <div className="text-sm text-muted-foreground">Fertility</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Soil Properties</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Moisture:</span>
                          <span className="font-medium">{results.soilAnalysis.moisture.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Organic Matter:</span>
                          <span className="font-medium">{results.soilAnalysis.organicMatter.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Drainage:</span>
                          <span className="font-medium capitalize">{results.soilAnalysis.drainage}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-3">Recommendations</h5>
                      <ul className="text-sm space-y-2">
                        {results.soilAnalysis.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedImageAnalysis;