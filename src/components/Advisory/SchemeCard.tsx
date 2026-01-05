import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scheme } from "../../types/advisory";
import { ExternalLink, FileText } from "lucide-react";
import { VoiceExplainButton } from "./VoiceExplainButton";

interface SchemeCardProps {
    scheme: Scheme;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow border-green-100">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <Badge variant={scheme.central ? "default" : "secondary"} className="mb-2">
                        {scheme.central ? "Central Govt" : scheme.state}
                    </Badge>
                    <Badge variant="outline" className="border-green-500 text-green-700">{scheme.type}</Badge>
                </div>
                <CardTitle className="text-xl text-green-800">{scheme.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-medium text-gray-900">Benefits: <span className="text-green-600">{scheme.benefits}</span></p>
                    <p>{scheme.description}</p>
                    {scheme.docsRequired && (
                        <div className="flex gap-2 flex-wrap mt-2">
                            <span className="text-xs font-semibold text-gray-500">Docs Required:</span>
                            {scheme.docsRequired.map(doc => (
                                <Badge key={doc} variant="secondary" className="text-[10px]">{doc}</Badge>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
                <VoiceExplainButton
                    textToExplain={`Scheme Name: ${scheme.name}. Benefits: ${scheme.benefits}. Eligibility: ${scheme.description}`}
                />
                <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-800">
                    <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
                        Apply <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
};
