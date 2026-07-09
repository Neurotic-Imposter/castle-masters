import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Hero />
      <Stats />
    </div>
  );
}
