"use client";

import { dummyCouponData } from "@/app/_utils/dummyCouponData";
import { useState } from "react";

export default function HomePage() {
  const [matches, setMatches] = useState<
    | {
        team1: string;
        team2: string;
        betfairLay: number;
      }[]
  >(() => dummyCouponData);

  return (
    <div className="w-[670px] border-2 p-4 rounded-lg bg-slate-100">
      <div className="flex flex-row gap-4 text-center mb-4">
        <p className="w-52 text-xl">Team 1</p>
        <p className="w-10 text-xl"></p>
        <p className="w-52 text-xl">Team 2</p>
        <p className="w-32 text-xl">Betfair price</p>
      </div>
      {matches.map((match, index) => (
        <div key={index} className="flex flex-row gap-4 text-center">
          <p className="w-52">{match.team1}</p>
          <p className="w-10">Vs</p>
          <p className="w-52">{match.team2}</p>
          <p className="w-32">{match.betfairLay}</p>
        </div>
      ))}
    </div>
  );
}
