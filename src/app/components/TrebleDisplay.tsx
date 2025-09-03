import type { Match } from "@/app/_utils/types/match";
import { betFredMults } from "@/app/_utils/betFredMults";

type TrebleDisplay = {
  trebles: Match[][];
};

export default function TrebleDisplay({ trebles }: TrebleDisplay) {
  return (
    <div className=" border rounded-md w-fit">
      <div className="text-center pt-4">
        <p>Advantage Trebles</p>
      </div>
      <div className="gap-2 p-4 text-xs grid grid-cols-3 w-fit">
        {trebles.map((treble, index) => (
          <div key={index} className="border p-2 rounded-md w-[250px] bg-white">
            {treble.map((match, index) => (
              <div key={index} className="">
                <div>{`${match.team1} vs ${match.team2}`}</div>
              </div>
            ))}
            <p>{treble.reduce((a, c) => a * c.betfairLay, 1).toFixed(2)}</p>
            <p className="text-green-500">
              +
              {(
                (betFredMults.treble /
                  treble.reduce((a, c) => a * c.betfairLay, 1) -
                  1) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
