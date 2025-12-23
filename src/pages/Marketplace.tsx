
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Calendar as CalendarIcon, TrendingUp, TrendingDown, Minus, IndianRupee, Clock, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Marketplace = () => {
  const [date, setDate] = useState<Date>();
  const [crop, setCrop] = useState<string>("");
  const [acres, setAcres] = useState<string>("1");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!crop || !date) {
      toast({
        title: "Missing Information",
        description: "Please select a crop and sowing date.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Format date as YYYY-MM-DD for backend
      const formattedDate = format(date, "yyyy-MM-dd");

      const response = await axios.post("http://localhost:5000/market-advisory", {
        crop,
        sowing_date: formattedDate,
        acres: parseFloat(acres) || 1
      });

      setResult(response.data);
      toast({
        title: "Analysis Complete",
        description: "Market intelligence report generated.",
      });
    } catch (error) {
      console.error("Market analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not fetch market data. Ensure server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Seed-to-Market Advisory</h1>
        <p className="text-muted-foreground">
          Plan your harvest and sell at the right time with AI-driven price forecasts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Input Section */}
        <Card className="md:col-span-4 h-fit border-primary/20 shadow-lg">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              Crop Details
            </CardTitle>
            <CardDescription>Enter your farming details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Crop</label>
              <Select onValueChange={setCrop} value={crop}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice (Paddy)</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="maize">Maize (Corn)</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sowing Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Field Size (Acres)</label>
              <Input
                type="number"
                placeholder="Ex: 5"
                value={acres}
                onChange={(e) => setAcres(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Get Market Insights"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-8 space-y-6">
          {result ? (
            <>
              {/* Top Stats Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-card border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Market Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      {result.market_trend === 'Bullish (Rising)' && <TrendingUp className="text-green-500" />}
                      {result.market_trend === 'Bearish (Falling)' && <TrendingDown className="text-red-500" />}
                      {result.market_trend === 'Stable' && <Minus className="text-yellow-500" />}
                      {result.market_trend.split(' ')[0]}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{result.advisory}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Est. Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center gap-1">
                      <IndianRupee className="h-5 w-5" />
                      {result.estimated_revenue.replace('₹', '')}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Based on {result.estimated_yield} yield</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Harvest In</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-500" />
                      {result.days_to_harvest} Days
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{result.harvest_date_start} - {result.harvest_date_end}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Price Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>4-Week Price Forecast (₹/Quintal)</CardTitle>
                  <CardDescription>Projected market rates for {result.crop}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { week: 'Current', price: result.current_price },
                      ...result.forecast
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="week" />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        formatter={(value: any) => [`₹${value}`, "Price"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#16a34a" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  Crop Cycle Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Sowing Date</span>
                    <span className="font-medium">{result.sowing_date}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Harvest Window</span>
                    <span className="font-medium">{result.harvest_date_start} to {result.harvest_date_end}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Current Price</span>
                    <span className="font-medium">₹{result.current_price}/Q</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Volatility</span>
                    <span className="font-medium">{result.crop === 'Tomato' ? 'High' : 'Moderate'}</span>
                  </div>
                </div>
              </div>

            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-muted/20">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
              <p className="text-muted-foreground max-w-sm">
                Enter your crop and date details to generate a customized harvest and market report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;