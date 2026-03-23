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

    useGSAP(
        () => {
            gsap.fromTo(
                '.anim-form',
                { x: type === 'login' ? -50 : 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            );
            gsap.fromTo(
                '.anim-panel',
                { x: type === 'login' ? 50 : -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            );
        },
        { dependencies: [type], scope: container },
    );

    return (
        <div
            ref={container}
            className="relative flex min-h-screen overflow-hidden bg-background"
        >
            <div
                className={`anim-form flex w-full flex-col justify-center px-8 py-12 sm:px-12 lg:w-1/2 lg:px-20 ${
                    type === 'login' ? 'order-1' : 'order-2'
                }`}
            >
                <div className="mx-auto w-full max-w-sm">
                    <div className="mb-8 lg:hidden">
                        <Link href={home()} className="flex justify-center">
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

            <div
                className={`anim-panel relative hidden w-1/2 flex-col bg-zinc-900 p-12 text-white lg:flex ${
                    type === 'login' ? 'order-2 border-l' : 'order-1 border-r'
                } border-zinc-800`}
            >
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href={home()} className="flex items-center gap-2">
                        <AppLogoIcon className="size-8 fill-current text-white" />
                        {name}
                    </Link>
                </div>

                <div className="relative z-20 m-auto max-w-sm text-center">
                    {type === 'login' ? (
                        <>
                            <h2 className="mb-4 text-3xl font-bold">
                                ¿No tienes cuenta?
                            </h2>
                            <p className="mb-8 text-zinc-400">
                                Únete a KitKeeper para gestionar todos los
                                materiales de tu centro de forma eficiente.
                            </p>
                            <Link
                                href={register()}
                                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-700 px-8 text-sm font-medium transition-colors hover:bg-zinc-800"
                            >
                                Crear una cuenta
                            </Link>
                        </>
                    ) : (
                        <>
                            <h2 className="mb-4 text-3xl font-bold">
                                ¡Bienvenido de nuevo!
                            </h2>
                            <p className="mb-8 text-zinc-400">
                                Si ya formas parte de KitKeeper, accede a tu
                                panel de control.
                            </p>
                            <Link
                                href={login()}
                                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-700 px-8 text-sm font-medium transition-colors hover:bg-zinc-800"
                            >
                                Iniciar sesión
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
