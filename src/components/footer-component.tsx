export function FooterComponent() {
    return (
        <footer className="  shadow-sm  dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row flex-col-reverse items-center justify-between gap-2">
                <span className="text-xs md:text-base  text-gray-500 sm:text-center dark:text-gray-400">© 2024
                    <a href="/" className="hover:underline"> Vitrine-Freelancers™</a>. Todos os direitos reservados.
                </span>

                <ul className="flex flex-wrap items-center justify-center lg:mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li>
                        <a href="/" className="hover:underline me-4 md:me-6">Início</a>
                    </li>
                    <li>
                        <a href="/vagas" className="hover:underline me-4 md:me-6">Vagas</a>
                    </li>
                    <li>
                        <a href="/sobre" className="hover:underline me-4 md:me-6">Sobre</a>
                    </li>
                    <li>
                        <a href="/contato" className="hover:underline">Contato</a>
                    </li>
                </ul>
            </div>
        </footer>

    );
}
