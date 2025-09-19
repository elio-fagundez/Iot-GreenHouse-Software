"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import LayoutHome from '../(routes)/LayoutHome';

export default function VerifyCodePage() {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // cooldown para reenviar
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Timer de cooldown
  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0) setCanResend(true);
  }, [timeLeft, canResend]);

  // Auto focus primer input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < digits.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < digits.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!data) return;
    const arr = data.split('');
    const filled = [...digits];
    for (let i = 0; i < 6; i++) {
      filled[i] = arr[i] || '';
    }
    setDigits(filled);
    inputsRef.current[Math.min(data.length, 5)]?.focus();
  };

  const fullCode = digits.join('');
  const isComplete = fullCode.length === 6;

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    setError('');
    setInfoMsg('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: fullCode })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Código inválido');
        // Reset visual opcional
        return;
      }
      router.push('/dashboard');
    } catch (err) {
      setError('Error de red');
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async () => {
    if (!canResend || resending) return;
    setError('');
    setInfoMsg('');
    setResending(true);
    try {
      const res = await fetch('/api/auth/resend-2fa', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo reenviar');
      } else {
        setInfoMsg('Código reenviado. Revisa tu correo.');
        setTimeLeft(30);
        setCanResend(false);
        setDigits(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
      }
    } catch (_) {
      setError('Error de red al reenviar');
    } finally {
      setResending(false);
    }
  };

  return (
    <LayoutHome>
      <main className="container mx-auto px-6 py-16 mt-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Verifica tu <span className="text-primary">correo</span>
            </h1>
            <p className="text-muted-foreground">Hemos enviado un código de 6 dígitos a tu email</p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Ingresa el código</CardTitle>
              <CardDescription className="text-center">Introduce los 6 dígitos para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitCode} className="space-y-6">
                <div className="flex justify-center gap-3">
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputsRef.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 bg-input transition-all outline-none disabled:opacity-50"
                      autoComplete="one-time-code"
                    />
                  ))}
                </div>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                {infoMsg && <p className="text-sm text-green-600 text-center">{infoMsg}</p>}
                <Button
                  type="submit"
                  disabled={!isComplete || submitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center"><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Verificando...</span>
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <div className="text-sm text-muted-foreground">¿No recibiste el código?</div>
                {canResend ? (
                  <Button
                    variant="ghost"
                    onClick={resend}
                    disabled={resending}
                    className="text-primary hover:text-primary/80"
                  >
                    {resending ? <span className="flex items-center"><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Enviando...</span> : 'Reenviar código'}
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">Puedes reenviar en {timeLeft}s</p>
                )}
              </div>

              <div className="mt-6 text-center">
                <Link href="/login" className="inline-flex items-center text-sm text-primary hover:text-primary/80">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Volver a iniciar sesión
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              ¿Problemas? Contacta al <Link href="/support" className="text-primary hover:text-primary/80">soporte</Link>
            </p>
          </div>
        </div>
      </main>
    </LayoutHome>
  );
}
