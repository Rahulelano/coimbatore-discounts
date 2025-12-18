import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label: string;
    className?: string;
}

export const ImageUpload = ({ value, onChange, label, className }: ImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState<string>("upload");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 15 * 1024 * 1024) {
            toast.error('File size must be less than 15MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('File must be an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        const loadingToast = toast.loading('Uploading image...');

        try {
            const token = localStorage.getItem('token');
            const headers: Record<string, string> = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers,
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            onChange(data.url);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image. Please try again.');
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const handleRemove = () => {
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium leading-none text-foreground">
                    {label}
                </span>
                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 text-destructive hover:text-destructive"
                        onClick={handleRemove}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Remove Image
                    </Button>
                )}
            </div>

            {!value ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">
                            <Upload className="w-4 h-4 mr-2" /> Upload
                        </TabsTrigger>
                        <TabsTrigger value="url">
                            <LinkIcon className="w-4 h-4 mr-2" /> URL
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="mt-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <div
                            onClick={triggerUpload}
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors bg-muted/20"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload file</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="url" className="mt-2">
                        <div className="flex gap-2">
                            <Input
                                placeholder="https://example.com/image.jpg"
                                onChange={(e) => onChange(e.target.value)}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Paste a direct link to an image (e.g. from Unsplash)
                        </p>
                    </TabsContent>
                </Tabs>
            ) : (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-muted/30 group">
                    <img
                        src={value.replace('5000', '5001')} // Hotfix for port change
                        alt="Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => onChange('')}
                        >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Change Image
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
