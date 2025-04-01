'use client';

export default function RegisterJobPage() {
    return (
        <div className="min-h-screen p-2">
            <form className='m-auto w-1/2 bg-slate-100 flex flex-col gap-3 rounded-lg border p-4 mt-5'>
                <h2 className="text-xl py-2 font-semibold">CADASTRO DA VAGA</h2>
                <div className='divider my-2'/>
                <div className='grid grid-cols-2 gap-3'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend mb-2">Vaga</legend>
                        <select defaultValue="motoboy" className="select w-full">
                            <option value='motoboy'>Moto entregador</option>
                            <option>Sushiman</option>
                            <option>Balconista</option>
                            <option>Pizzaiolo</option>
                        </select>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend mb-2">Tipo:</legend>
                        <select defaultValue="Pick a text editor" className="select w-full">
                            <option disabled={true}>Tipo de vaga</option>
                            <option>FIXO</option>
                            <option>FREELANCER</option>
                        </select>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend mb-2">Data</legend>
                        <input type="date" className="input w-full cursor-pointer" pattern="\d{4}-\d{2}-\d{2}"
                               placeholder="01/02/2022"/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend mb-2">Valor Diária</legend>
                        <input type="text" placeholder="R$ 00,00" required className="input input-bordered w-full"/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend mb-2">Hora de início</legend>
                        <input type="time" required className="input input-bordered w-full"/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend mb-2">Hora de término</legend>
                        <input type="time" required className="input input-bordered w-full"/>
                    </fieldset>
                </div>

                <fieldset className="fieldset my-3">
                    <legend className="fieldset-legend mb-2">Descrição</legend>
                    <textarea placeholder="Descreva em algumas palavras as atividades pertinentes a vaga ofertada."
                              className="col-span-2 textarea text-neutral resize-none w-full"></textarea>
                </fieldset>

                {/* if there is a button in form, it will close the modal */}
                <div className='flex justify-between mt-2'>
                    <button className="btn">Cancelar</button>
                    <button className="btn btn-neutral">Publicar</button>
                </div>
            </form>
        </div>
    )
        ;
}