"use client";

import {useParams, useRouter} from "next/navigation";
import {JobType} from "@/types/JobType";
import {Trash2} from "lucide-react";
import Link from "next/link";


export default function EditJobPage() {
    const {id} = useParams()
    const router = useRouter()
    const job: JobType = fetch(`http://localhost:3333/jobs/${id}`, {method: "GET"}).then((res) => res.json());

    const handleDelete = async () => {
        alert("Certeza que seja excluir a vaga?")
    }

    return (
        <div className="min-h-screen p-2">
            <form className='m-auto w-1/2 bg-slate-100 flex flex-col gap-3 rounded-lg border p-4 mt-5'>
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl py-2 font-semibold">EDITAR VAGA</h2>
                    <span onClick={handleDelete} className='cursor-pointer'><Trash2 color='red'/></span>
                </div>

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
                    <a href='/minhas-vagas' className="btn">Cancelar</a>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Publicado em:  14/02/2025  10:11</span>
                        <span className='text-sm'>Última edição:  14/02/2025  11:00</span>
                    </div>

                    <button className="btn btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    );
}