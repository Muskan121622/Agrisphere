import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Sprout, Newspaper, PlaySquare } from "lucide-react";
import { toast } from "sonner";

// Services & Data
import { ALL_SCHEMES } from "@/services/schemesData";
import { getEligibleSchemes } from "@/services/schemeEngine";
import { fetchFarmingNews } from "@/services/newsService";
import { fetchFarmingVideos } from "@/services/youtubeService";
import { FarmerProfile, Scheme, NewsArticle, Video } from "@/types/advisory";

// Components
import { SchemeCard } from "@/components/Advisory/SchemeCard";
import { NewsCard } from "@/components/Advisory/NewsCard";
import { VideoCard } from "@/components/Advisory/VideoCard";

const AdvisoryHub = () => {
    // State
    const [activeTab, setActiveTab] = useState("schemes");
    const [schemes, setSchemes] = useState<Scheme[]>([]);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loadingNews, setLoadingNews] = useState(false);
    const [loadingVideos, setLoadingVideos] = useState(false);

    // Farmer Profile State (Default Mock)
    const [profile, setProfile] = useState<FarmerProfile>({
        state: "Bihar",
        landSize: 2.5,
        farmerType: "Small", // Derived from landSize ideally, but user selectable for now
        name: "Kisan Bhai"
    });

    // Fetch Data Effects
    useEffect(() => {
        // Initial Scheme Calculation
        const eligible = getEligibleSchemes(profile, ALL_SCHEMES);
        setSchemes(eligible);
    }, [profile]); // Recalculate when profile changes

    useEffect(() => {
        const loadExternalData = async () => {
            setLoadingNews(true);
            const newsData = await fetchFarmingNews();
            setNews(newsData);
            setLoadingNews(false);

            setLoadingVideos(true);
            const videoData = await fetchFarmingVideos();
            setVideos(videoData);
            setLoadingVideos(false);
        };
        loadExternalData();
    }, []);

    // Handlers
    const handleProfileChange = (field: keyof FarmerProfile, value: any) => {
        setProfile(prev => ({ ...prev, [field]: value }));
        toast.success("Profile updated! Checking eligibility...");
    };

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
                        <Sprout className="h-8 w-8" /> AgriSphere Advisory Hub
                    </h1>
                    <p className="text-gray-600 mt-1">Real-time schemes, news, and expert videos for smart farming.</p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-green-50 mb-4">
                    <TabsTrigger value="schemes" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                        🏛️ Schemes
                    </TabsTrigger>
                    <TabsTrigger value="news" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                        📰 News
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                        🎥 Videos
                    </TabsTrigger>
                </TabsList>

                {/* --- SCHEMES TAB --- */}
                <TabsContent value="schemes" className="space-y-6">
                    <Card className="border-green-100 bg-green-50/50">
                        <CardHeader>
                            <CardTitle className="text-green-800">Check Eligibility</CardTitle>
                            <CardDescription>Update your profile to see relevant government schemes.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>State</Label>
                                <Select value={profile.state} onValueChange={(v) => handleProfileChange("state", v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bihar">Bihar</SelectItem>
                                        <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                                        <SelectItem value="Punjab">Punjab</SelectItem>
                                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Land Size (Acres)</Label>
                                <Input
                                    type="number"
                                    value={profile.landSize}
                                    onChange={(e) => handleProfileChange("landSize", parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Farmer Type</Label>
                                <Select value={profile.farmerType} onValueChange={(v) => handleProfileChange("farmerType", v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Small">Small (1-2 Hectares)</SelectItem>
                                        <SelectItem value="Marginal">Marginal (&lt;1 Hectare)</SelectItem>
                                        <SelectItem value="Large">Large</SelectItem>
                                        <SelectItem value="Landless">Landless</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schemes.length > 0 ? (
                            schemes.map(scheme => (
                                <SchemeCard key={scheme.id} scheme={scheme} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                <p>No eligible schemes found for this profile in {profile.state}.</p>
                                <Button variant="link" onClick={() => setProfile(prev => ({ ...prev, state: "All" }))}>
                                    View All India Schemes
                                </Button>
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* --- NEWS TAB --- */}
                <TabsContent value="news" className="space-y-6">
                    {loadingNews ? (
                        <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-green-600" /></div>
                    ) : news.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item, idx) => (
                                <NewsCard key={idx} article={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">No news available at the moment.</div>
                    )}
                </TabsContent>

                {/* --- VIDEOS TAB --- */}
                <TabsContent value="videos" className="space-y-6">
                    {loadingVideos ? (
                        <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-red-600" /></div>
                    ) : videos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">No videos available at the moment.</div>
                    )}
                </TabsContent>

            </Tabs>
        </div>
    );
};

export default AdvisoryHub;
