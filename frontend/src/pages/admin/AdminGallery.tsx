import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from 'sonner';

const STOCK_IMAGES = {
    Food: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80"
    ],
    Fashion: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80",
        "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=800&q=80"
    ],
    Electronics: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80",
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80"
    ],
    Health: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80",
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80"
    ],
    Furniture: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80",
        "https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=800&q=80"
    ]
};

export const AdminGallery = () => {
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<{ id: string, name: string, url: string }[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images');
                if (res.ok) {
                    const data = await res.json();
                    setUploadedImages(data);
                }
            } catch (error) {
                console.error("Failed to fetch images", error);
            }
        };
        fetchImages();
    }, []);

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        toast.success("Image URL copied to clipboard");
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Image Gallery</h2>
                    <p className="text-muted-foreground mt-1">
                        Curated collection of high-quality images for your offers.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <a href="https://unsplash.com" target="_blank" rel="noreferrer">
                        Visit Unsplash <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                </Button>
            </div>

            <Tabs defaultValue="Uploads" className="w-full">
                <TabsList className="mb-4 flex flex-wrap h-auto gap-2 bg-transparent justify-start p-0">
                    <TabsTrigger
                        value="Uploads"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-gray-200"
                    >
                        My Uploads
                    </TabsTrigger>
                    {Object.keys(STOCK_IMAGES).map((category) => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-gray-200"
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="Uploads" className="mt-0">
                    {uploadedImages.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No images uploaded yet. Upload images while creating offers.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {uploadedImages.map((img) => (
                                <Card key={img.id} className="overflow-hidden group">
                                    <div className="relative aspect-video">
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleCopy(img.url)}
                                                className="translate-y-4 group-hover:translate-y-0 transition-transform"
                                            >
                                                {copiedUrl === img.url ? (
                                                    <><Check className="w-4 h-4 mr-2" /> Copied</>
                                                ) : (
                                                    <><Copy className="w-4 h-4 mr-2" /> Copy URL</>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-3 text-xs text-muted-foreground bg-gray-50 flex justify-between items-center">
                                        <span className="truncate max-w-[200px]">{img.name}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(img.url)}>
                                            <Copy className="w-3 h-3" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {Object.entries(STOCK_IMAGES).map(([category, urls]) => (
                    <TabsContent key={category} value={category} className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {urls.map((url, index) => (
                                <Card key={index} className="overflow-hidden group">
                                    <div className="relative aspect-video">
                                        <img
                                            src={url}
                                            alt={`${category} ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleCopy(url)}
                                                className="translate-y-4 group-hover:translate-y-0 transition-transform"
                                            >
                                                {copiedUrl === url ? (
                                                    <><Check className="w-4 h-4 mr-2" /> Copied</>
                                                ) : (
                                                    <><Copy className="w-4 h-4 mr-2" /> Copy URL</>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-3 text-xs text-muted-foreground bg-gray-50 flex justify-between items-center">
                                        <span className="truncate max-w-[200px]">{url}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(url)}>
                                            <Copy className="w-3 h-3" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};
