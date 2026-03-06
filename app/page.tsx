import Link from "next/link";
import {
  Package,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  LayoutDashboard,
  Clock,
  Zap,
  Box,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-24 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50 transition-all">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <Box className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">
            STORA.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-500">
          <Link
            href="#fitur"
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#tentang"
            className="hover:text-indigo-600 transition-colors"
          >
            Resources
          </Link>
          <Link
            href="#kontak"
            className="hover:text-indigo-600 transition-colors"
          >
            Contact
          </Link>
        </div>
        <div>
          <Link
            href="/login"
            className="px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 md:px-12 lg:px-24 flex flex-col items-center text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black tracking-[0.2em] mb-8 uppercase animate-in fade-in slide-in-from-top-4 duration-1000">
            <Zap className="w-3 h-3 fill-current" />
            <span>Smart Inventory OS v2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-950 mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700">
            Storage <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] animate-gradient">
              Perfected.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            The next generation of warehouse management. Track, organize, and
            optimize your global assets with precision positioning and real-time
            intelligent monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Link
              href="/login"
              className="px-10 py-5 bg-indigo-600 text-white rounded-full font-black flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all group shadow-2xl shadow-indigo-200 active:scale-95"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#fitur"
              className="px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-full font-black hover:bg-slate-50 transition-all active:scale-95"
            >
              Explore Features
            </Link>
          </div>

          {/* Hero Image Mockup */}
          <div className="mt-28 w-full relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[2.5rem] blur-2xl opacity-10"></div>
            <div className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-4 md:p-6">
              <div className="w-full bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden aspect-[16/9] flex flex-col items-center justify-center gap-6 group hover:bg-slate-100/50 transition-colors">
                <div className="relative">
                  <LayoutDashboard className="w-24 h-24 text-slate-200 group-hover:text-indigo-200 transition-all duration-700" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl scale-0 group-hover:scale-150 transition-transform duration-1000" />
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                  Premium Console Preview
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="fitur"
          className="px-6 py-32 md:px-12 lg:px-24 bg-slate-50/50 border-y border-slate-100"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 text-center md:text-left">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
                  Engineered for Efficiency
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  Stora eliminates the friction in logistics. Our intelligent
                  positioning system ensures your team spends less time
                  searching and more time shipping.
                </p>
              </div>
              <Link
                href="/login"
                className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                See more capabilities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Clock className="w-6 h-6 text-indigo-600" />,
                  title: "Real-time Precision",
                  desc: "Instant tracking of every asset movement with sub-map positioning accuracy.",
                },
                {
                  icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
                  title: "Intelligent Analytics",
                  desc: "Predictive reporting and stock optimization powered by Stora's core engine.",
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-slate-900" />,
                  title: "Shield Security",
                  desc: "Role-based access control and enterprise-grade encryption for your data assets.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-32 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 relative z-10 leading-[1.1]">
              Ready to Upgrade <br />
              Your Warehouse?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-14 relative z-10 max-w-2xl mx-auto font-medium">
              Join industry leaders who trust Stora to power their most critical
              supply chain operations.
            </p>
            <Link
              href="/login"
              className="px-12 py-5 bg-white text-slate-950 rounded-full font-black inline-flex items-center gap-3 hover:bg-slate-50 transition-all shadow-2xl relative z-10 active:scale-95"
            >
              Launch Dashboard Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-16 md:px-12 lg:px-24 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter italic">
            STORA.
          </span>
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Stora Systems Indonesia. Built for
          Excellence.
        </p>
        <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <Link href="#" className="hover:text-slate-900 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-slate-900 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-slate-900 transition-colors">
            Security
          </Link>
        </div>
      </footer>
    </div>
  );
}
