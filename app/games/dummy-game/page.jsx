import PageTemplate from "@/components/templates/GamePage";
import DummyGame from "@/components/games/dummy-game";

export const metadata = {
  title: "Dummy Game - Kids Learning Platform",
  description: "Play the Dummy Game and test your skills in this interactive learning experience!",
};

export default function DummyGamePage() {
  const gameName = "Dummy Game";
  const gameDescription =
    "A simple game to demonstrate the game layout and functionality. Test your skills and learn through interactive challenges!";
  const learningPoints = [
    "Understanding basic game mechanics",
    "Practicing decision-making skills",
    "Improving reaction time and accuracy",
    "Learning to follow instructions and complete challenges",
  ];

  return (
    <PageTemplate gameName={gameName} gameDescription={gameDescription} learningPoints={learningPoints}>
      <DummyGame />
    </PageTemplate>
  );
}
