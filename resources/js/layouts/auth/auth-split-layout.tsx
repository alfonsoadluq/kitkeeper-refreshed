import { useGSAP } from '@gsap/react';
import { Link, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { useRef } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home, register, login } from '@/routes';

type AuthSplitLayoutProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    type?: 'login' | 'register';
};

export default function AuthSplitLayout({
    children,
    title,
    description,
    type = 'login',
}: AuthSplitLayoutProps) {
    const { name } = usePage().props;
    const container = useRef<HTMLDivElement>(null);
    const isLogin = type === 'login';

    useGSAP(
        () => {
            const prevType = sessionStorage.getItem('auth_type');
            sessionStorage.setItem('auth_type', type);

            if (!prevType || prevType === type) {
                gsap.set('.form-container', { xPercent: isLogin ? 0 : 100 });
                gsap.set('.panel-container', { xPercent: isLogin ? 0 : -100 });

                return;
            }

            if (isLogin) {
                gsap.fromTo(
                    '.form-container',
                    { xPercent: 100 },
                    { xPercent: 0, duration: 0.8, ease: 'expo.inOut' },
                );
                gsap.fromTo(
                    '.panel-container',
                    { xPercent: -100 },
                    { xPercent: 0, duration: 0.8, ease: 'expo.inOut' },
                );
            } else {
                gsap.fromTo(
                    '.form-container',
                    { xPercent: 0 },
                    { xPercent: 100, duration: 0.8, ease: 'expo.inOut' },
                );
                gsap.fromTo(
                    '.panel-container',
                    { xPercent: 0 },
                    { xPercent: -100, duration: 0.8, ease: 'expo.inOut' },
                );
            }
        },
        { dependencies: [type], scope: container },
    );

    return (
        <div
            ref={container}
            className="relative flex min-h-screen w-full overflow-hidden bg-background"
        >
            <div className="form-container z-20 flex w-full flex-col justify-center bg-background px-8 py-12 sm:px-12 lg:w-1/2 lg:px-20">
                <div className="mx-auto w-full max-w-sm">
                    <div className="mb-8 lg:hidden">
                        <Link href={home()}>
                            <AppLogoIcon className="h-10 fill-current" />
                        </Link>
                    </div>

                    <div className="mb-6 flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>

            <div className="panel-container absolute inset-y-0 left-1/2 z-10 hidden w-1/2 flex-col border-l border-zinc-800 bg-zinc-900 p-12 text-white lg:flex">
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link
                        href={home()}
                        className="flex items-center gap-2 text-white"
                    >
                        <AppLogoIcon className="size-8 fill-current text-white" />
                        {name}
                    </Link>
                </div>

                <div className="relative z-20 m-auto max-w-sm text-center">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-bold italic">
                            {isLogin ? '¿Eres nuevo?' : '¡Bienvenido de nuevo!'}
                        </h2>

                        <p className="text-zinc-400">
                            {isLogin
                                ? 'Regístrate para empezar a gestionar el material de tu aula.'
                                : 'Accede con tu cuenta para continuar donde lo dejaste.'}
                        </p>

                        <Link
                            href={isLogin ? register() : login()}
                            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-transform hover:scale-105"
                        >
                            {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
                        </Link>
                    </div>
                </div>

                <div className="relative z-20 mt-auto text-xs text-zinc-500">
                    © 2026 KitKeeper
                </div>
            </div>
        </div>
    );
}