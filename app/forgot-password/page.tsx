"use client";
import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import LayoutHome from "../(routes)/LayoutHome";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    if (!email) {
      setError("El email es requerido");
      setLoading(false);
      return;
    }
    try {
      // Aquí deberías llamar a tu API real de recuperación de contraseña
      // Por ahora solo simula el proceso
      await new Promise((res) => setTimeout(res, 1000));
      setMessage(
        "Si el email está registrado, recibirás instrucciones para restablecer tu contraseña."
      );
    } catch (err) {
      setError("Error al intentar recuperar la contraseña");
    } finally {
      setLoading(false);
    }
  };
  if (isSubmitted) {
    return (
      <LayoutHome>
        <div className="min-h-screen bg-background">
          <main className="container mx-auto px-6 py-16">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Check your email
                </h1>
                <p className="text-muted-foreground">
                  We've sent password recovery instructions to your email
                  address
                </p>
              </div>

              <Card className="border-border shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        We sent an email to{" "}
                        <strong className="text-foreground">{email}</strong>
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Click the link in the email to reset your password. If you
                      don't see it, check your spam folder.
                    </p>

                    <div className="space-y-3 pt-4">
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="w-full"
                      >
                        Try another email
                      </Button>

                      <Link href="/login">
                        <Button variant="ghost" className="w-full">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to sign in
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </LayoutHome>
    );
  }

  return (
    <LayoutHome>
      <div className="min-h-screen bg-background mt-16">
        <main className="container mx-auto px-6 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Forgot your password?
              </h1>
              <p className="text-muted-foreground">
                No worries! Enter your email and we'll send you reset
                instructions
              </p>
            </div>

            <Card className="border-border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Reset Password
                </CardTitle>
                <CardDescription className="text-center">
                  Enter the email address associated with your BloomIoT account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input border-border focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium py-2.5"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Sending instructions...
                      </>
                    ) : (
                      "Send reset instructions"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-primary hover:text-accent font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to sign in
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-accent font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </LayoutHome>
  );
}
