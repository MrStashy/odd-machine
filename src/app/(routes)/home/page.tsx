"use client";

import { dummyCouponData } from "@/app/_utils/dummyCouponData";
import { betFredMults } from "@/app/_utils/betFredMults";
import { Formik, FieldArray, Field } from "formik";
import { useState } from "react";
import type { Match } from "@/app/_utils/types/match";
import TrebleDisplay from "@/app/components/TrebleDisplay";

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>(dummyCouponData);
  const [trebles, setTrebles] = useState<Match[][] | null>(null);

  function handleFindTriples() {
    const results = [];
    const newMatches = [...matches];

    for (let i = 0; i < newMatches.length; i++) {
      const currentTriple = [];
      const matchToCompare1 = newMatches[i];
      currentTriple.push(matchToCompare1);

      for (let j = i; j < newMatches.length; j++) {
        if (j === i) {
          continue;
        }
        const matchToCompare2 = newMatches[j];
        currentTriple.push(matchToCompare2);

        for (let k = j; k < newMatches.length; k++) {
          if (k === j || k === i) {
            continue;
          }
          const matchToCompare3 = newMatches[k];
          currentTriple.push(matchToCompare3);
          results.push([...currentTriple]);
          currentTriple.pop();
        }
        currentTriple.pop();
      }
    }
    const filteredResults = results.filter(
      (treble) =>
        treble.reduce((a, c) => a * c.betfairLay, 1) < betFredMults.treble
    );
    setTrebles(filteredResults);
  }

  return (
    <div>
      <Formik
        initialValues={{ matches: dummyCouponData }}
        onSubmit={(values) => {
          setMatches(values.matches);
          console.log(values.matches);
        }}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray
              name="matches"
              render={(arrayHelpers) => (
                <div className="border rounded-lg p-4 w-fit bg-white ">
                  <table border={2} className="min-w-[500px]">
                    <thead className="text-sm">
                      <tr>
                        <th className="w-[25px]"></th>
                        <th className="text-left w-[125px]">Team 1</th>
                        <th className="w-[30px]"></th>
                        <th className="text-left w-[125px]">Team 2</th>
                        <th className="text-left w-[100px]">Betfair price</th>
                        <th className="text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.matches.map((match, index) => (
                        <tr key={index}>
                          <td className="text-sm w-[25px]">{index + 1}</td>
                          <td className="text-xs">
                            <Field
                              name={`matches.${index}.team1`}
                              value={match.team1}
                              className="w-[125px] focus:bg-white"
                            />
                          </td>
                          <td className="text-xs">
                            <div className="w-[30px]">Vs</div>
                          </td>
                          <td className="text-xs">
                            <Field
                              name={`matches.${index}.team2`}
                              value={match.team2}
                              type="input"
                              className="w-[125px] focus:bg-white"
                            />
                          </td>
                          <td className="text-xs">
                            <Field
                              name={`matches.${index}.betfairLay`}
                              value={match.betfairLay}
                              type="number"
                              className="w-[100px] focus:bg-white"
                            />
                          </td>
                          <td
                            className="text-xs text-red-500 px-4 cursor-pointer"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Delete
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          team1: "Team 1",
                          team2: "Team 2",
                          betfairLay: 0,
                        })
                      }
                      className="mt-4 border rounded-lg px-6 shadow-lg cursor-pointer bg-white text-center"
                    >
                      Add new match
                    </button>
                    {values.matches !== matches && (
                      <p className="text-xs text-red-500 text-center mt-3">
                        You have changes to save
                      </p>
                    )}
                  </div>
                </div>
              )}
            />

            <button
              className="mt-4 border w-fit text-center rounded-lg p-6 shadow-lg cursor-pointer bg-white"
              type="submit"
            >
              Save
            </button>
          </form>
        )}
      </Formik>
      <button
        onClick={() => handleFindTriples()}
        className="my-4 border w-fit text-center rounded-lg p-6 shadow-lg cursor-pointer bg-white"
      >
        Find me some trebles
      </button>
      {trebles && <TrebleDisplay trebles={trebles} />}
    </div>
  );
}
