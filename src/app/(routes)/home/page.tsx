"use client";

import { dummyCouponData } from "@/app/_utils/dummyCouponData";
import { useState } from "react";
import { Formik, FieldArray } from "formik";

export default function HomePage() {
  const [matches, setMatches] = useState<
    {
      team1: string;
      team2: string;
      betfairLay: number;
    }[]
  >(() => dummyCouponData);

  return (
    <div className="bg-slate-100 text-center">
      <Formik
        initialValues={matches}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <form>
          <div className="border rounded-lg p-4 w-fit">
            <table border={2} className="table-auto">
              <thead className="text-sm">
                <tr>
                  <th></th>
                  <th className="text-sm px-4">Team 1</th>
                  <th className="text-sm px-4"></th>
                  <th className="text-sm px-4">Team 2</th>
                  <th className="text-sm px-4">Betfair price</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, index) => (
                  <tr key={index}>
                    <td className="text-sm">{index + 1}</td>
                    <td className="text-xs md:px-4">
                      <input>{match.team1}</input>
                    </td>
                    <td className="text-xs md:px-4">Vs</td>
                    <td className="text-xs md:px-4">{match.team2}</td>
                    <td className="text-xs md:px-4">
                      {match.betfairLay.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </Formik>
    </div>
  );
}
