import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Clock, ShieldCheck, Zap } from "lucide-react";
import HomeSectionTwo from "@/components/home-section-two";

const features = [
  {
    icon: <Zap size={20} className="text-blue-950" />,
    title: "Vagas de 12 horas",
    desc: "Cada oportunidade fica ativa por apenas 12 horas — encontre e candidate-se rápido.",
  },
  {
    icon: <Briefcase size={20} className="text-blue-950" />,
    title: "Para qualquer serviço",
    desc: "De entregas a eventos, gastronomia e muito mais. Vagas perto de você.",
  },
  {
    icon: <ShieldCheck size={20} className="text-blue-950" />,
    title: "Plataforma moderada",
    desc: "Conteúdo monitorado para garantir qualidade e segurança em todas as vagas.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-center justify-start bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-300 uppercase mb-4">
              Plataforma de freelancers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Encontre o Freelancer Ideal para Seu Negócio
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Publique vagas, conecte-se com freelancers disponíveis agora e
              preencha suas necessidades com agilidade.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-950 hover:bg-slate-100 font-semibold px-6"
              >
                <Link href="/vagas">
                  Ver Vagas <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 backdrop-blur px-6"
              >
                <Link href="/register">Criar conta grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  {icon}
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent jobs */}
      <HomeSectionTwo />
    </div>
  );
}
