
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Droplets, CloudRain, Thermometer } from "lucide-react";
import axios from 'axios';

const PestPrediction = () => {
    const [crop, setCrop] = useState("rice");
    const [temp, setTemp] = useState(30);
    const [humidity, setHumidity] = useState(70);
    const [rainfall, setRainfall] = useState(50);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handlePredict = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/predict-pest', {
                crop,
                temp,
                humidity,
                rainfall
            });
            setResult(response.data);
        } catch (error) {
            console.error("Prediction failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (level: string) => {
        if (level === 'High') return 'text-red-600';
        if (level === 'Medium') return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Leaf className="h-8 w-8 text-green-600" />
                Pest Attack Prediction (AI Forecasting)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Field Conditions</CardTitle>
                        <CardDescription>Enter current weather and crop details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Select Crop</Label>
                            <Select onValueChange={setCrop} defaultValue={crop}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select crop" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rice">Rice (Paddy)</SelectItem>
                                    <SelectItem value="wheat">Wheat</SelectItem>
                                    <SelectItem value="cotton">Cotton</SelectItem>
                                    <SelectItem value="maize">Maize</SelectItem>
                                    <SelectItem value="tomato">Tomato</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="flex items-center gap-2"><Thermometer className="h-4 w-4" /> Temperature (°C)</Label>
                                <span className="font-bold">{temp}°C</span>
                            </div>
                            <Slider value={[temp]} min={0} max={50} step={1} onValueChange={(v) => setTemp(v[0])} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="flex items-center gap-2"><Droplets className="h-4 w-4" /> Humidity (%)</Label>
                                <span className="font-bold">{humidity}%</span>
                            </div>
                            <Slider value={[humidity]} min={0} max={100} step={1} onValueChange={(v) => setHumidity(v[0])} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="flex items-center gap-2"><CloudRain className="h-4 w-4" /> Rainfall (mm)</Label>
                                <span className="font-bold">{rainfall} mm</span>
                            </div>
                            <Slider value={[rainfall]} min={0} max={200} step={5} onValueChange={(v) => setRainfall(v[0])} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handlePredict} disabled={loading}>
                            {loading ? "Analyzing Risk..." : "Predict Pest Risk"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <>
                            <Card className="border-l-4 border-l-blue-500 shadow-md">
                                <CardHeader>
                                    <CardTitle>Forecast Result</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg text-gray-500">Pest Attack Probability</h3>
                                        <div className={`text-5xl font-extrabold ${getRiskColor(result.primary_pest.risk_level)}`}>
                                            {result.primary_pest.risk_score}%
                                        </div>
                                        <div className={`text-xl font-bold mt-2 ${getRiskColor(result.primary_pest.risk_level)}`}>
                                            {result.primary_pest.risk_level} Risk
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 mb-2">Primary Threat: {result.primary_pest.pest_name}</h4>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Recommendation:</strong> {result.primary_pest.recommendation}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>7-Day Risk Forecast</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={result.forecast_7_days}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" fontSize={12} tickMargin={5} />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="risk_score" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <Card className="h-full flex items-center justify-center bg-gray-50 border-dashed">
                            <CardContent className="text-center text-gray-500">
                                <Leaf className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p>Adjust sliders and click Predict to see AI Analysis</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PestPrediction;
