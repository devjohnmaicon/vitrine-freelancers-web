export default function DeniedPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-5xl font-bold mb-4">Acesso Negado</h1>
            <p className="text-xl">Você não tem permissão para acessar esta página.</p>
        </div>
    );
}