'use client';

export function HeroBanner() {
  return (
    <div className="relative w-full h-64 md:h-96 bg-gradient-to-r from-primary to-primary/70 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05))] bg-[length:40px_40px]" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 text-balance">
            Civil Engineering Knowledge
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-balance">
            Discover comprehensive e-books and resources for structural design, construction management, and modern engineering practices
          </p>
          <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Explore Now
          </button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
