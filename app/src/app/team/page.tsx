import { PeopleSection } from "./PeopleSection";

export const metadata = {
  title: 'Behind Castle Masters',
  description:
    'Meet the team behind Castle Masters — the people shaping the future of chess education and technology.',
};

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-background pt-16 overflow-hidden">
      <PeopleSection />
    </div>
  );
}
