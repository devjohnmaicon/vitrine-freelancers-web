"use client";

import {useParams, useRouter} from "next/navigation";
import {JobType} from "@/types/JobType";
import {Button} from "@/components/ui/button";
import ModalCloseJob from "@/components/modal-close-job";
import {useState, useEffect} from "react";


export default function EditJobPage() {
    const {id} = useParams()
    const router = useRouter()
    const [job, setJob] = useState<JobType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:3333/jobs/${id}`, {method: "GET"});
                if (!response.ok) {
                    throw new Error("Failed to fetch job data");
                }
                const data: JobType = await response.json();
                setJob(data);
            } catch (error) {
                console.error("Error fetching job:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) {
        return <div className='h-screen w-full flex flex-col justify-center items-center'>
            <h2 className="text-xl py-2 font-semibold">Carregando...</h2>
            <p className="text-sm">Aguarde enquanto carregamos os dados da vaga.</p>
            <div className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"/>
                    <path className="opacity-75" fill="none" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"/>
                </svg>
            </div>
        </div>;
    }

    if (!job) {
        return <div>
            <h2 className="text-xl py-2 font-semibold">Vaga não encontrada</h2>
            <p className="text-sm">A vaga que você está tentando editar não existe ou foi removida.</p>
            <a href='/minhas-vagas'
               className='border-2 flex justify-center items-center py-1 px-2 rounded-md bg-zinc-200 hover:bg-zinc-300/90'>Voltar</a>
        </div>;
    }

    return (
        <form className='m-auto lg:w-1/2 bg-zinc-100 flex flex-col gap-3 rounded-md shadow shadow-2xl p-4'>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl py-2 font-semibold">EDITAR VAGA</h2>
                <ModalCloseJob/>
            </div>

            <hr className='border-2 my-2'/>
            <div className='grid grid-cols-2 gap-4'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-2">Vaga</legend>
                    <select defaultValue={job.position} className="select w-full">
                        <option value='motoboy'>Moto entregador</option>
                        <option value='sushiman'>Sushiman</option>
                        <option value='balconista'>Balconista</option>
                        <option value='pizzaiolo'>Pizzaiolo</option>
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-2">Tipo:</legend>
                    <select defaultValue={job.type} className="select w-full">
                        <option disabled={true}>Tipo de vaga</option>
                        <option value='FIXO'>FIXO</option>
                        <option value='FREELANCER'>FREELANCER</option>
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-2">Data</legend>
                    <input type="date" className="input w-full cursor-pointer" pattern="\d{4}-\d{2}-\d{2}"
                           placeholder="01/02/2022" defaultValue={job.date}/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-2">Valor Diária</legend>
                    <input type="text" placeholder="R$ 00,00" required className="input input-bordered w-full" defaultValue={`R$ ${job.dailyValue},00`}/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-2">Hora de início</legend>
                    <input type="time"   required className="input input-bordered w-full" defaultValue={job.startTime}/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend mb-2">Hora de término</legend>
                    <input type="time" required className="input input-bordered w-full" defaultValue={job.endTime}/>
                </fieldset>
            </div>

            <fieldset className="fieldset my-3">
                <legend className="fieldset-legend mb-2">Descrição</legend>
                <textarea placeholder="Descreva em algumas palavras as atividades pertinentes a vaga ofertada."
                          className="col-span-2 textarea text-neutral resize-none w-full h-24 p-2" defaultValue={job.description}></textarea>
            </fieldset>

            <hr className='border-2 my-2'/>

            {/* if there is a button in form, it will close the modal */}
            <div className='flex justify-between mt-4'>
                <a href='/minhas-vagas'
                   className='border-2 flex justify-center items-center py-1 px-2 rounded-md bg-zinc-200 hover:bg-zinc-300/90'>Cancelar</a>
                <div className='flex flex-col gap-1'>
                    <span className='text-sm'>Publicado em:  14/02/2025  10:11</span>
                    <span className='text-sm'>Última edição:  14/02/2025  11:00</span>
                </div>

                <Button className="">Salvar</Button>
            </div>
        </form>
    );
}