"use client";

import { useState } from "react";

export default function BlockForm() {
  const [firstLetter, setFirstLetter] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const callChatGPT = async () => {
    setLoading(true);
    console.log("got here");
    try {
      const res = await fetch(`/api/chat`, {
        method: "POST",
        body: JSON.stringify({
          firstLetter,
          birthdayMonth,
        }),
      });
      setResponse((await res.json()).value);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-4 justify-center">
        <div>
          <label
            htmlFor="letter"
            className="block text-sm font-medium leading-6 text-white"
          >
            First Letter of Name
          </label>
          <input
            type="text"
            name="letter"
            id="letter"
            placeholder="J..."
            value={firstLetter}
            onChange={(e) => setFirstLetter(e.target.value)}
            className="w-96 pl-4 py-2 border-2 border-gray-200 focus:border-slate-400 focus:outline-none rounded"
          />
        </div>
        <div>
          <label
            htmlFor="birthday"
            className="block text-sm font-medium leading-6 text-white"
          >
            Birthday Month
          </label>
          <input
            type="text"
            name="birthday"
            id="birthday"
            placeholder="January..."
            value={birthdayMonth}
            onChange={(e) => setBirthdayMonth(e.target.value)}
            className="w-96 pl-4 py-2 border-2 border-gray-200 focus:border-slate-400 focus:outline-none rounded"
          />
        </div>
        <button
          onClick={callChatGPT}
          className="px-4 py-2 rounded bg-emerald-400 text-slate-700"
        >
          Submit
        </button>
      </div>
      <div className="mt-2 p-4 max-w-2xl bg-white rounded border-2 border-gray-200 focus:border-slate-400 focus:outline-none flex items-center">
        {loading ? (
          <div>loading</div>
        ) : (
          <div className="whitespace-pre-line">
            {!response ? (
              <>
                <img
                  src={"/question.gif"}
                  alt="Switched Image"
                  className="my-4 h-32 w-32"
                />
              </>
            ) : (
              <>{response}</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
