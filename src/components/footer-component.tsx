export function FooterComponent() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-950 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">VF</span>
          </div>
          <span className="text-sm font-semibold text-slate-700">Vitrine Freelancers</span>
          <span className="text-slate-300 text-sm hidden sm:block">·</span>
          <span className="text-xs text-slate-400 hidden sm:block">© {new Date().getFullYear()}</span>
        </div>

        <nav className="flex items-center gap-5">
          {[
            { href: "/", label: "Início" },
            { href: "/vagas", label: "Vagas" },
            { href: "/sobre", label: "Sobre" },
            { href: "/contato", label: "Contato" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
