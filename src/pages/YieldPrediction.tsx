import { motion } from "framer-motion";
import { TrendingUp, Cloud, Thermometer, Droplets, Calendar, BarChart3, ArrowLeft, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { yieldPredictor, YieldPredictionInput } from "@/lib/yield-prediction";
import YieldAnalytics from "@/components/YieldAnalytics";
import { useState, useEffect } from "react";

const YieldPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [formData, setFormData] = useState({
    crop: 'wheat',
    district: 'Patna',
    season: 'kharif' as 'kharif' | 'rabi',
    area_hectares: 5,
    year: 2025
  });

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const input: YieldPredictionInput = {
        crop: formData.crop,
        district: formData.district,
        season: formData.season,
        area_hectares: formData.area_hectares,
        year: formData.year
      };
      
      const result = await yieldPredictor.predictYield(input);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-predict with default values on component mount
  useEffect(() => {
    handlePredict();
  }, []);

  const predictionFactors = [
    {
      title: "Weather Analysis",
      description: "Temperature, rainfall, humidity, and seasonal patterns analysis",
      icon: "🌤️",
      weight: "35%",
      factors: ["Temperature", "Rainfall", "Humidity", "Sunshine Hours"]
    },
    {
      title: "Soil Conditions",
      description: "Soil type, pH, nutrient levels, and organic matter content",
      icon: "🌱",
      weight: "25%",
      factors: ["Soil Type", "pH Level", "NPK Content", "Organic Matter"]
    },
    {
      title: "Crop Cycle Data",
      description: "Growth stages, variety characteristics, and planting patterns",
      icon: "🌾",
      weight: "20%",
      factors: ["Growth Stage", "Variety", "Planting Date", "Spacing"]
    },
    {
      title: "Historical Yields",
      description: "Past yield data, trends, and performance patterns",
      icon: "📊",
      weight: "20%",
      factors: ["Past Yields", "Trends", "Seasonal Patterns", "Performance"]
    }
  ];

  const mlModels = [
    {
      name: "Random Forest",
      accuracy: "94%",
      description: "Ensemble learning for complex pattern recognition",
      useCase: "Multi-factor yield prediction",
      icon: "🌳"
    },
    {
      name: "LSTM Networks",
      accuracy: "92%",
      description: "Time series analysis for seasonal patterns",
      useCase: "Weather pattern analysis",
      icon: "🧠"
    },
    {
      name: "Gradient Boosting",
      accuracy: "96%",
      description: "Advanced regression for precise predictions",
      useCase: "Final yield estimation",
      icon: "⚡"
    },
    {
      name: "XGBoost",
      accuracy: "95%",
      description: "Extreme gradient boosting for optimization",
      useCase: "Feature importance ranking",
      icon: "🚀"
    }
  ];

  const cropPredictions = [
    { crop: "Wheat", accuracy: "96%", season: "Rabi", avgYield: "4.2 tons/ha" },
    { crop: "Rice", accuracy: "94%", season: "Kharif", avgYield: "3.8 tons/ha" },
    { crop: "Cotton", accuracy: "92%", season: "Kharif", avgYield: "2.1 tons/ha" },
    { crop: "Sugarcane", accuracy: "95%", season: "Annual", avgYield: "75 tons/ha" },
    { crop: "Maize", accuracy: "93%", season: "Both", avgYield: "5.5 tons/ha" },
    { crop: "Soybean", accuracy: "91%", season: "Kharif", avgYield: "1.8 tons/ha" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold gradient-text">AgriSphere AI</span>
          </div>
        </div>
      </header>
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">📈</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI Yield Prediction Engine
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Advanced machine learning models predict crop yields using weather data, soil conditions, 
              crop cycles, and historical patterns with industry-leading accuracy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary"
                onClick={() => {
                  const element = document.getElementById('live-prediction');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <TrendingUp className="mr-2 w-5 h-5" />
                Predict Yield
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowAnalytics(true)}
              >
                <BarChart3 className="mr-2 w-5 h-5" />
                View Analytics
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prediction Factors */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Prediction Factors</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {predictionFactors.map((factor, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {factor.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{factor.title}</h3>
                      <div className="bg-primary/20 px-3 py-1 rounded-full text-primary font-bold text-sm">
                        {factor.weight}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{factor.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {factor.factors.map((item, idx) => (
                        <div key={idx} className="text-xs bg-muted px-2 py-1 rounded text-center">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ML Models */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Machine Learning Models</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mlModels.map((model, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {model.icon}
                </div>
                <h3 className="font-bold mb-2">{model.name}</h3>
                <div className="bg-primary/20 px-2 py-1 rounded-full text-primary font-bold text-sm mb-3">
                  {model.accuracy}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{model.description}</p>
                <div className="text-xs bg-accent/20 px-2 py-1 rounded-full text-accent">
                  {model.useCase}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Prediction Tool */}
      <section id="live-prediction" className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Live Yield Prediction</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Input Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select value={formData.crop} onValueChange={(value) => setFormData({...formData, crop: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {yieldPredictor.getSupportedCrops().map(crop => (
                          <SelectItem key={crop} value={crop} className="capitalize">{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Select value={formData.district} onValueChange={(value) => setFormData({...formData, district: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {yieldPredictor.getSupportedDistricts().map(district => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="season">Season</Label>
                      <Select value={formData.season} onValueChange={(value: 'kharif' | 'rabi') => setFormData({...formData, season: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                          <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}
                        min={2024}
                        max={2030}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="area_hectares">Area (hectares)</Label>
                    <Input
                      id="area_hectares"
                      type="number"
                      value={formData.area_hectares}
                      onChange={(e) => setFormData({...formData, area_hectares: Number(e.target.value)})}
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                  <Button 
                    onClick={handlePredict} 
                    className="w-full bg-gradient-primary" 
                    disabled={isLoading}
                  >
                    <Brain className="mr-2 w-4 h-4" />
                    {isLoading ? 'Predicting...' : 'Predict Yield'}
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  Prediction Results
                </h3>
                {prediction ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {(prediction.predicted_yield / 1000).toFixed(2)} tons/ha
                      </div>
                      <div className="text-sm text-muted-foreground">Predicted Yield</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Range: {(prediction.confidence_interval.lower / 1000).toFixed(2)} - {(prediction.confidence_interval.upper / 1000).toFixed(2)} tons/ha
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-3">Factor Analysis</h4>
                      <div className="space-y-2">
                        {Object.entries(prediction.factors).map(([factor, value]) => (
                          <div key={factor} className="flex justify-between items-center">
                            <span className="capitalize text-sm">{factor.replace('_', ' ')}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                                  style={{width: `${Math.min(100, value * 100)}%`}}
                                />
                              </div>
                              <span className="text-sm font-medium">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-3">Historical Comparison</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>5-Year Average:</span>
                          <span className="font-medium">{(prediction.historical_comparison.avg_yield_5yr / 1000).toFixed(2)} tons/ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trend:</span>
                          <span className={`font-medium capitalize ${
                            prediction.historical_comparison.trend === 'increasing' ? 'text-green-600' :
                            prediction.historical_comparison.trend === 'decreasing' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {prediction.historical_comparison.trend}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Percentile:</span>
                          <span className="font-medium">{prediction.historical_comparison.percentile}th</span>
                        </div>
                      </div>
                    </div>
                    
                    {prediction.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-bold mb-3">Recommendations</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {prediction.recommendations.slice(0, 5).map((rec, idx) => (
                            <div key={idx} className="text-xs p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-blue-700 dark:text-blue-300">
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter parameters and click "Predict Yield" to see results</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Crop-Specific Predictions */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Supported Crops (Bihar)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {yieldPredictor.getSupportedCrops().map((crop, i) => {
              const cropInfo = yieldPredictor.getCropInfo(crop);
              return (
                <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold capitalize">{crop}</h3>
                    <div className="bg-primary/20 px-2 py-1 rounded-full text-primary font-bold text-xs">
                      94%+
                    </div>
                  </div>
                  {cropInfo && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg Yield:</span>
                        <span className="font-medium">{(cropInfo.avg_yield / 1000).toFixed(1)} tons/ha</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Range:</span>
                        <span>{(cropInfo.min_yield / 1000).toFixed(1)} - {(cropInfo.max_yield / 1000).toFixed(1)} tons/ha</span>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="analytics-section" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Analytics & How Prediction Works</h2>
          <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {[
              { step: "1", title: "Data Collection", desc: "Gather weather, soil, crop data", icon: Cloud },
              { step: "2", title: "Feature Engineering", desc: "Process and normalize data", icon: BarChart3 },
              { step: "3", title: "Model Training", desc: "Train ML models on historical data", icon: TrendingUp },
              { step: "4", title: "Prediction", desc: "Generate yield forecasts", icon: Calendar },
              { step: "5", title: "Validation", desc: "Continuous model improvement", icon: Thermometer }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Prediction Benefits</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Better Planning", desc: "Plan resources in advance", icon: "📅" },
              { title: "Risk Management", desc: "Identify potential issues early", icon: "⚠️" },
              { title: "Market Strategy", desc: "Optimize selling decisions", icon: "💰" },
              { title: "Insurance Claims", desc: "Accurate yield documentation", icon: "🛡️" }
            ].map((benefit, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Analytics Modal */}
      {showAnalytics && (
        <YieldAnalytics onClose={() => setShowAnalytics(false)} />
      )}
    </div>
  );
};

export default YieldPrediction;