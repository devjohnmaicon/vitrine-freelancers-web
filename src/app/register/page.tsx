'use client';

export default function RegisterComponent() {
    return (
        <div className='min-h-screen'>
            <form className="bg-gray-100 w-1/2 m-auto mt-5 py-6 px-10 border-2 rounded-2xl ">
                <h2 className="text-md font-semibold mb-3">1. Informações de login</h2>
                <div className='flex flex-col gap-3'>
                    <label className="input validator input-bordered flex items-center gap-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input type="input" required placeholder="Nome" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30"
                               title="Only letters, numbers or dash"/>
                    </label>
                    <label className="input validator input-bordered flex items-center gap-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="joão@email.com" required/>
                    </label>
                    <label className="input validator input-bordered flex items-center gap-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input type="password" required placeholder="Senha" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                               title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"/>
                    </label>
                    <label className="input validator input-bordered flex items-center gap-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input type="password" required placeholder="Confirme a senha" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                               title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"/>
                    </label>
                </div>
                <hr className='border-2 my-6'/>
                <div className=''>
                    <h2 className="text-md font-semibold mb-3">2. Informações sobre a Loja/Empresa</h2>
                    <div className='grid grid-cols-2 gap-3'>
                        <input type="text" placeholder="Nome da empresa" required className="input input-bordered"/>
                        <input type="text" placeholder="CNPJ*" required className="input input-bordered"/>
                        <input type="text" placeholder="Telefone" required className="input input-bordered"/>
                        <input type="text" placeholder="Estado" required className="input input-bordered"/>
                        <input type="text" placeholder="Rua" required className="input input-bordered"/>
                        <input type="text" placeholder="Número" required className="input input-bordered"/>
                        <input type="text" placeholder="Bairro" required className="input input-bordered"/>
                        <input type="text" placeholder="Cidade" required className="input input-bordered"/>
                    </div>
                    <div className='flex mt-8'>
                        <button type='submit' className='btn btn-neutral w-1/2 m-auto'>Cadastrar</button>
                    </div>

                </div>
            </form>
        </div>
    );
};

