import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Sprout, CloudRain, Calculator, Leaf, Thermometer, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const FertilizerRecommendation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    crop: "rice",
    soil_n: "medium",
    soil_p: "medium",
    soil_k: "medium",
    soil_ph: 6.5,
    soil_moisture: 50,
    rainfall: 0,
    stage: "vegetative",
    temperature: 25,
    soil_type: "clay"
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/recommend-fertilizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const data = await response.json();
      setResult(data);
      toast({
        title: "Recommendation Ready!",
        description: "AI has generated your personalized farming plan.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the recommendation engine. Is the server running?",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="fixed top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-primary/10"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Smart Fertilizer & Irrigation</h1>
          <p className="text-muted-foreground text-lg">AI-powered recommendations for optimal crop nutrition and water management</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm card-gradient">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/20 text-primary">
                  <Calculator className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold">Field Parameters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-2 block">Crop Type</Label>
                  <Select
                    value={formData.crop}
                    onValueChange={(val) => handleInputChange("crop", val)}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice (Paddy)</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn (Maize)</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-2 block">Nitrogen (N)</Label>
                    <Select value={formData.soil_n} onValueChange={(val) => handleInputChange("soil_n", val)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Phosphorus (P)</Label>
                    <Select value={formData.soil_p} onValueChange={(val) => handleInputChange("soil_p", val)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Potassium (K)</Label>
                    <Select value={formData.soil_k} onValueChange={(val) => handleInputChange("soil_k", val)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      Soil Moisture (%)
                    </Label>
                    <span className="font-mono text-primary font-bold">{formData.soil_moisture}%</span>
                  </div>
                  <Slider
                    value={[formData.soil_moisture]}
                    onValueChange={(val) => handleInputChange("soil_moisture", val[0])}
                    max={100}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Dry</span>
                    <span>Wet</span>
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <CloudRain className="h-4 w-4 text-blue-400" />
                    Rainfall Forecast (Next 3 Days) (mm)
                  </Label>
                  <Input
                    type="number"
                    value={formData.rainfall}
                    onChange={(e) => handleInputChange("rainfall", Number(e.target.value))}
                    className="bg-background/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Soil pH</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.soil_ph}
                      onChange={(e) => handleInputChange("soil_ph", Number(e.target.value))}
                      className="bg-background/50"
                      placeholder="e.g. 6.5"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Sprout className="h-4 w-4 text-green-500" />
                      Growth Stage
                    </Label>
                    <Select
                      value={formData.stage}
                      onValueChange={(val) => handleInputChange("stage", val)}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sowing">Sowing/Germination</SelectItem>
                        <SelectItem value="vegetative">Vegetative (Growth)</SelectItem>
                        <SelectItem value="flowering">Flowering/Heading</SelectItem>
                        <SelectItem value="harvest">Maturity/Harvest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={getRecommendation}
                  className="w-full bg-gradient-primary text-lg h-12 hover:shadow-glow-primary transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/50 border-t-white"></div>
                      Analyzing...
                    </div>
                  ) : (
                    "Get Recommendation"
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {!result ? (
              <Card className="h-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-dashed border-2 bg-transparent">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Leaf className="h-12 w-12 opacity-50" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Recommendations Yet</h3>
                <p>Enter field details and click "Get Recommendation" to see AI insights.</p>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>Source: <strong>{result.source}</strong></span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>

                {/* Fertilizer Card */}
                <Card className="overflow-hidden border-green-500/30 bg-card/40 backdrop-blur-md">
                  <div className="p-4 bg-green-500/10 border-b border-green-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <h3 className="font-bold text-lg text-green-500">Fertilizer Plan</h3>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                      {formData.crop.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                        <div className="text-sm text-muted-foreground mb-1">Nitrogen (N)</div>
                        <div className="text-2xl font-bold text-primary">{result.fertilizer.nitrogen}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                        <div className="text-sm text-muted-foreground mb-1">Phosphorus (P)</div>
                        <div className="text-2xl font-bold text-orange-400">{result.fertilizer.phosphorus}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                        <div className="text-sm text-muted-foreground mb-1">Potassium (K)</div>
                        <div className="text-2xl font-bold text-yellow-400">{result.fertilizer.potassium}</div>
                      </div>
                    </div>

                    {result.fertilizer.adjustments && result.fertilizer.adjustments.length > 0 && (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-xs text-yellow-200">
                        <strong>Smart Adjustments:</strong>
                        <ul className="list-disc pl-4 mt-1">
                          {result.fertilizer.adjustments.map((adj: string, i: number) => (
                            <li key={i}>{adj}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Soil Health / pH Card */}
                {result.soil_health.ph_recommendation && (
                  <Card className="p-4 border-red-500/30 bg-red-500/5 backdrop-blur-md">
                    <div className="flex gap-3">
                      <div className="p-2 rounded-full bg-red-500/10 text-red-500 h-fit">
                        <Thermometer className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-400 mb-1">Soil Acidity Alert (pH {result.soil_health.ph_status})</h4>
                        <p className="text-sm text-muted-foreground">{result.soil_health.recommendation}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Irrigation Card */}
                <Card className="overflow-hidden border-blue-500/30 bg-card/40 backdrop-blur-md">
                  <div className="p-4 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <h3 className="font-bold text-lg text-blue-500">Irrigation Schedule</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${result.irrigation.status === "Irrigate Immediately"
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      }`}>
                      {result.irrigation.status}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Water Amount:</span>
                      <span className="text-xl font-bold">{result.irrigation.water_amount}</span>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 text-sm">
                      <p className="leading-relaxed">
                        Apply <strong>{result.irrigation.water_amount}</strong> of water.
                        {result.irrigation.schedule.next_3_days === "Rain Expected"
                          ? " Rain is expected soon, so you might want to delay slightly."
                          : " Monitor moisture levels closely over the next 3 days."}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Summary / Context */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-card/30 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-accent/10 text-accent">
                      <Thermometer className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Temperature</div>
                      <div className="font-semibold">{formData.temperature}°C</div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card/30 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Wind className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Wind Speed</div>
                      <div className="font-semibold">Normal</div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FertilizerRecommendation;
