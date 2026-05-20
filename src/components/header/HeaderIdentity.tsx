export default function HeaderIdentity() {
  return (
    <a href="/" className="flex items-center gap-2 shrink-0">
      <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center">
        <span className="text-white text-xs font-bold">VF</span>
      </div>
      <span className="text-base font-bold text-slate-900 tracking-tight hidden sm:block">
        Vitrine <span className="text-blue-950">Freelancers</span>
      </span>
    </a>
  );
}
