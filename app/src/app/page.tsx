import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Mission from '@/components/sections/Mission';
import CoachingOverview from '@/components/sections/CoachingOverview';
import ChessPuzzlesPreview from '@/components/sections/ChessPuzzlesPreview';
import UpcomingTournament from '@/components/sections/UpcomingTournament';
import CorporateOverview from '@/components/sections/CorporateOverview';
import TeamPreview from '@/components/sections/TeamPreview';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import HomeCTA from '@/components/sections/HomeCTA';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Hero />
      <Stats />
      <Mission />
      <CoachingOverview />
      <ChessPuzzlesPreview />
      <UpcomingTournament />
      <CorporateOverview />
      <TeamPreview />
      <Testimonials />
      <FAQ />
      <HomeCTA />
    </div>
  );
}
