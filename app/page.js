import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calculator, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  const categories = [
    {
      name: "Math",
      icon: <Calculator className="h-6 w-6" />,
      color: "bg-blue-100",
      games: [
        { title: "Dummy Game", description: "Practice basic gaming", url: "/games/dummy-game" },
        { title: "Ten Buddies", description: "Learn addition to ten", url: "/games/ten-buddies" },
        { title: "Fraction Action", description: "Master fractions and decimals", url: "/games/fraction-action" },
      ],
    },
    {
      name: "Reading",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-green-100",
      games: [
        { title: "Word Wizard", description: "Expand your vocabulary", url: "/games/word-wizard" },
        { title: "Story Time", description: "Practice reading comprehension", url: "/games/story-time" },
        { title: "Rhyme Master", description: "Learn about rhyming words", url: "/games/rhyme-master" },
      ],
    },
    {
      name: "Writing",
      icon: <Pencil className="h-6 w-6" />,
      color: "bg-yellow-100",
      games: [
        { title: "Sentence Builder", description: "Construct proper sentences", url: "/games/sentence-builder" },
        { title: "Creative Corner", description: "Write short stories", url: "/games/creative-corner" },
        { title: "Spelling Bee", description: "Improve your spelling skills", url: "/games/spelling-bee" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">Fun Learning Games</h1>
        {categories.map((category, index) => (
          <section key={index} className="mb-12">
            <h2 className={`mb-4 flex items-center gap-2 text-2xl font-semibold ${category.color} rounded-lg p-2`}>
              {category.icon}
              {category.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.games.map((game, gameIndex) => (
                <Link href={game.url} key={gameIndex} className="group">
                  <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                    <Image
                      src={`/placeholder.svg?height=150&width=300`}
                      alt={game.title}
                      width={300}
                      height={150}
                      className="h-[150px] w-full object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">{game.title}</h3>
                      <p className="text-sm text-gray-600">{game.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
