import type { Match } from "@/app/_utils/types/match";

type TrebleDisplay = {
  trebles: Match[][];
};

export default function TrebleDisplay({ trebles }: TrebleDisplay) {
  return (
    <div className="flex flex-col gap-2">
      {trebles.map((treble, index) => (
        <div key={index} className="border flex p-2 w-fit gap-4">
          {treble.map((match, index) => (
            <div key={index}>
              <div>{`${match.team1} vs ${match.team2}`}</div>
            </div>
          ))}
          <p>{treble.reduce((a, c) => a * c.betfairLay, 1).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
