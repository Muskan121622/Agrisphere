import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Volume2, StopCircle } from "lucide-react";
import { simplifyTextForFarmer, speakText } from "../../services/voiceService";
import { toast } from "sonner";

interface VoiceExplainButtonProps {
    textToExplain: string;
    context?: string; // e.g., "Scheme Details"
}

export const VoiceExplainButton: React.FC<VoiceExplainButtonProps> = ({ textToExplain, context }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleExplain = async () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        try {
            setIsLoading(true);
            toast.info("AI is simplifying the explanation...");

            const simplifiedText = await simplifyTextForFarmer(textToExplain, "Hindi");

            setIsLoading(false);
            setIsSpeaking(true);
            toast.success("Playing explanation in Hindi");

            speakText(simplifiedText, "hi-IN");

            // Reset state when speech ends (approximate or via event listener if we moved logic here)
            const utterance = new SpeechSynthesisUtterance(simplifiedText);
            utterance.onend = () => setIsSpeaking(false);

        } catch (error) {
            console.error("Voice Explain Error", error);
            setIsLoading(false);
            setIsSpeaking(false);
            toast.error("Failed to explain details.");
        }
    };

    return (
        <Button
            variant={isSpeaking ? "destructive" : "outline"}
            size="sm"
            onClick={handleExplain}
            disabled={isLoading}
            className="gap-2"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSpeaking ? (
                <StopCircle className="h-4 w-4" />
            ) : (
                <Volume2 className="h-4 w-4" />
            )}
            {isSpeaking ? "Stop" : "Explain (Voice)"}
        </Button>
    );
};
