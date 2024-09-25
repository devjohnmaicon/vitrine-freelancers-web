import CardComponent from "@/components/CardComponent";

export default function Home() {
  return (
    <div>
      <section
        className="hero min-h-screen"
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
            <a href="/vagas" className="btn btn-primary">
              Ver vagas
            </a>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="w-1/2 m-auto flex flex-col items-center gap-2">
          <h2 className="text-3xl font-semibold underline underline-offset-4 mb-4">Últimas publicações</h2>

          <CardComponent />
          <CardComponent />
          <CardComponent />

          <a href="/vagas" className="w-1/2 mt-4 btn btn-neutral">
            TODAS AS VAGAS
          </a>
        </div>
      </section>
    </div>
  );
}
