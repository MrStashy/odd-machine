"use client";

import { dummyCouponData } from "@/app/_utils/dummyCouponData";
import { Formik, FieldArray, Field } from "formik";

export default function HomePage() {
  return (
    <div className="bg-slate-100 ">
      <Formik
        initialValues={{ matches: dummyCouponData }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <form>
            <div className="border rounded-lg p-4 w-fit">
              <table border={2} className="table-auto">
                <thead className="text-sm">
                  <tr>
                    <th></th>
                    <th className="text-left">Team 1</th>
                    <th className="text-left"></th>
                    <th className="text-left">Team 2</th>
                    <th className="text-left">Betfair price</th>
                  </tr>
                </thead>

                <FieldArray
                  name="matches"
                  render={(arrayHelpers) => (
                    <tbody>
                      {values.matches.map((match, index) => (
                        <tr key={index}>
                          <td className="text-sm">{index + 1}</td>
                          <td className="text-xs">
                            <Field
                              name={`matches.${index}.team1`}
                              value={match.team1}
                              className="w-[125px]"
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
                              className="w-[125px]"
                            />
                          </td>
                          <td className="text-xs">
                            <Field
                              name={`matches.${index}.betfairLay`}
                              value={match.betfairLay}
                              type="number"
                              className="w-12"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                />
              </table>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
