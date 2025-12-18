import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, Smartphone } from "lucide-react";
import { useGoogleLogin } from '@react-oauth/google';

// Simplified Schemas
const emailSchema = z.string().email("Invalid email address");

export default function Auth() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Flow State: 'email' -> 'otp' OR 'password'
    const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [isShopOwner, setIsShopOwner] = useState(false); // New state

    // Step 1: Send OTP
    const handleSendOtp = async () => {
        try {
            emailSchema.parse(email);
        } catch (e) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

            if (data.devOtp) {
                toast.success(`Code sent! (Dev: ${data.devOtp})`, { description: "You should also receive an email." });
            } else {
                toast.success("Code sent!", { description: "Check your email for the code." });
            }
            setStep('otp');
        } catch (err: any) {
            toast.error("Error", { description: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit code");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // SEND ROLE HERE
                body: JSON.stringify({
                    email,
                    otp,
                    role: isShopOwner ? 'shop-owner' : 'user'
                })
            });
            const data = await res.json();

            if (data.pendingApproval) {
                toast.success(data.message || "Account created! Pending Admin Approval.");
                setStep('email'); // Reset to start
                return;
            }

            if (!res.ok) throw new Error(data.error || 'Invalid Code');

            login(data.token, data.user);
            toast.success("Welcome back!", { description: "Logged in successfully." });

            if (data.user.isAdmin) {
                navigate("/admin");
            } else if (data.user.isShopOwner) {
                navigate("/shop-owner");
            } else {
                navigate("/");
            }
        } catch (err: any) {
            toast.error("Login Failed", { description: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    // Alternative: Login with Password
    const handlePasswordLogin = async () => {
        if (!password) return toast.error("Enter password");
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Login failed");

            login(result.token, result.user);
            toast.success("Welcome back!", { description: "Logged in successfully." });

            if (result.user.isAdmin) {
                navigate("/admin");
            } else if (result.user.isShopOwner) {
                navigate("/shop-owner");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            toast.error("Login Failed", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // 1. Get User Info from Google
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const googleUser = await userInfoRes.json();

                // 2. Send to Backend to Login/Register
                const res = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: googleUser.email,
                        name: googleUser.name,
                        picture: googleUser.picture,
                        googleId: googleUser.sub
                    })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Google Login Failed');

                // 3. Login in App
                login(data.token, data.user);
                toast.success(`Welcome ${data.user.username}!`);

                if (data.user.isAdmin) {
                    navigate("/admin");
                } else if (data.user.isShopOwner) {
                    navigate("/shop-owner");
                } else {
                    navigate("/");
                }

            } catch (error) {
                console.error(error);
                toast.error("Google Sign-In Failed");
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => toast.error("Google Sign-In Failed"),
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">

                {/* Left Side: Brand/Illustration */}
                <div className="w-full md:w-1/2 bg-primary p-12 flex flex-col justify-between text-primary-foreground relative overflow-hidden">
                    <div className="z-10">
                        <h1 className="text-4xl font-bold mb-4">Coimbatore Discounts</h1>
                        <p className="text-lg opacity-90">Discover the best discounts in your city, curated just for you.</p>
                    </div>

                    <div className="z-10 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <span className="text-2xl">🎉</span>
                            </div>
                            <div>
                                <h3 className="font-bold">Exclusive Discounts</h3>
                                <p className="text-sm opacity-80">Save big on local favorites</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <h3 className="font-bold">Real-time Updates</h3>
                                <p className="text-sm opacity-80">Never miss a flash sale</p>
                            </div>
                        </div>
                    </div>

                    {/* Abstract circles */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                </div>

                {/* Right Side: Auth Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 left-4"
                        onClick={() => step === 'email' ? navigate('/') : setStep('email')}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div className="max-w-sm mx-auto w-full space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                            <p className="text-sm text-muted-foreground mt-2">
                                {step === 'email' && "Enter your email to continue"}
                                {step === 'otp' && `Enter the code sent to ${email}`}
                                {step === 'password' && `Enter password for ${email}`}
                            </p>
                        </div>

                        {/* STEP 1: Email Input */}
                        {step === 'email' && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Input
                                            placeholder="you@example.com"
                                            className="pl-10 h-12"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                                        />
                                    </div>
                                </div>
                                <Button className="w-full h-12 text-base" onClick={handleSendOtp} disabled={isLoading}>
                                    {isLoading ? "Sending..." : "Continue"}
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">Or</span></div>
                                </div>

                                <div className="flex justify-center flex-col items-center gap-3">
                                    <Button variant="outline" className="w-full h-11" onClick={() => handleGoogleLogin()}>
                                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                        Continue with Google
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="text-xs text-muted-foreground"
                                        onClick={() => setStep('password')}
                                    >
                                        I have a password
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: OTP Input */}
                        {step === 'otp' && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Enter OTP</Label>
                                    <Input
                                        placeholder="123456"
                                        className="h-14 text-center text-2xl tracking-[0.5em] font-bold"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                                    />
                                    <p className="text-xs text-center text-muted-foreground">
                                        Didn't receive it? <button className="text-primary hover:underline" onClick={handleSendOtp}>Resend</button>
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="shop-owner"
                                        checked={isShopOwner}
                                        onChange={(e) => setIsShopOwner(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="shop-owner" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        I am a Shop Owner (Requires Approval)
                                    </label>
                                </div>

                                <Button className="w-full h-12 text-base" onClick={handleVerifyOtp} disabled={isLoading}>
                                    {isLoading ? "Verifying..." : "Verify & Login"}
                                </Button>
                                <Button variant="ghost" className="w-full" onClick={() => setStep('email')}>
                                    Change Email
                                </Button>
                            </div>
                        )}

                        {/* STEP 3: Password Input */}
                        {step === 'password' && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" placeholder="Email" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            className="pl-10 h-12"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handlePasswordLogin()}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="text-xs text-primary hover:underline">Forgot Password?</button>
                                    </div>
                                </div>
                                <Button className="w-full h-12 text-base" onClick={handlePasswordLogin} disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                                <Button variant="ghost" className="w-full" onClick={() => setStep('email')}>
                                    Use OTP instead
                                </Button>
                            </div>
                        )}

                        <p className="text-xs text-center text-gray-500 mt-6">
                            By clicking continue, you agree to our Terms and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
