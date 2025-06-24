import Link from 'next/link';
import React from 'react';
import {Button} from './ui/button';

const JobNotFoundComponent = () => {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-md font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Pagina não encontrada</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Desculpe, nós não podemos encontrar está página.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button asChild>
                        <Link href='/vagas/minhas-vagas'>Voltar</Link>
                    </Button>
                    <Link href="/contato" className="text-sm font-semibold text-gray-900">Contato suporte <span aria-hidden="true">&rarr;</span></Link>

                </div>
            </div>
        </main>

    );
};

export default JobNotFoundComponent;
