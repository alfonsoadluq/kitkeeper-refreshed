import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({
    children,
    title,
    description,
    type = 'login',
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    type?: 'login' | 'register';
}) {
    return (
        <AuthSplitLayout title={title} description={description} type={type}>
            {children}
        </AuthSplitLayout>
    );
}