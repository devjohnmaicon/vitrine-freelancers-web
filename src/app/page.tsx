import CardComponent from "@/components/CardComponent";
import {JobType} from "@/types/JobType";
import Link from "next/link";

export default async function Home() {
    const listJobs: JobType[] = await fetch('http://localhost:3333/jobs/').then((res) => res.json());

    return (
        <div>
            <section
                className="hero min-h-screen bg-base-200 bg-cover bg-center w-screen"
                style={{
                    backgroundImage:
                        "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-start">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5 text-2xl">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                            et a id nisi.
                        </p>
                        <a href="/vagas" className="btn btn-primary">Ver vagas</a>
                    </div>
                </div>
            </section>
            <section className="w-full ">
                <div className="w-1/2 bg-zinc-100 m-auto">
                    <h2 className="text-3xl font-semibold underline underline-offset-4 my-4 p-4">Últimas publicações</h2>
                    <div className='flex flex-col gap-4 p-4'>
                        {
                            listJobs.slice(0, 3).map(
                                (jobData: JobType, index: number) => (
                                    <CardComponent key={index} data={jobData} showEditButtons={false}/>
                                ))
                        }
                        <div className='h-2'/>
                        <Link href="/vagas" className="w-1/2 m-auto bg-zinc-900 text-white text-center p-2 rounded-full">
                            TODAS AS VAGAS
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}
