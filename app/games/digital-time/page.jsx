import PageTemplate from "@/components/templates/GamePage";
import ClockLearningGame from "@/components/games/digital-time";

export const metadata = {
  title: "Clock Learning Game - Kids Learning Platform",
  description: "Play the Clock Learning Game and master time-telling skills in this interactive learning experience!",
};

export default function ClockLearningGamePage() {
  const gameName = "Clock Learning Game";
  const gameDescription =
    "An engaging game to help children learn and practice time-telling skills. Progress through different levels of difficulty and improve your ability to read and calculate time!";
  const learningPoints = [
    "Understanding clock face and time representation",
    "Practicing addition of hours and minutes",
    "Developing mental math skills for time calculations",
    "Learning to read analog and digital time formats",
    "Improving time management awareness",
  ];

  return (
    <PageTemplate gameName={gameName} gameDescription={gameDescription} learningPoints={learningPoints}>
      <ClockLearningGame />
    </PageTemplate>
  );
}
