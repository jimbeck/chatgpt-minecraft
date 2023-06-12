'use client';
import { Configuration, OpenAIApi } from "openai";
import React, { useState } from 'react'

export default function Home() {
  const [orgId, setOrgId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const callChatGPT = async() => {
    setLoading(true);
    const config = new Configuration({
      organization: orgId,
      apiKey: apiKey
    });
    const openapi = new OpenAIApi(config);
    const response = await openapi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
          {role: "user", content: prompt}
      ]
    });
    setLoading(false);
    setResponse(response.data.choices[0].message?.content ?? '')
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center py-56">
    <svg className="mb-4 w-48" width="560" height="158" viewBox="0 0 560 158" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M65.0885 156.259L101.058 0.391113H142.38C184.558 0.391113 210.465 11.7386 200.402 55.2016C195.906 75.1133 179.634 92.2416 158.438 101.662C161.007 113.652 166.574 121.146 180.704 121.146C183.488 121.146 186.485 120.931 190.125 120.289L181.775 156.259C122.682 160.755 119.471 126.498 120.755 109.37H117.33L106.41 156.259H65.0885ZM159.08 54.7734C162.934 37.6451 151.8 29.5092 135.314 31.0079L124.181 78.9671C141.309 79.1812 155.44 71.4735 159.08 54.7734Z" fill="#121212"/>
      <path d="M228.235 0.391113H269.557L233.588 156.259H192.266L228.235 0.391113Z" fill="#121212"/>
      <path d="M244.721 156.259L280.691 0.391113H372.755L365.69 31.4361H314.947L307.882 61.8388L300.602 92.8839L286.043 156.259H244.721Z" fill="#121212"/>
      <path d="M300.602 92.8839L307.882 61.8389H349.418L342.138 92.8839H300.602Z" fill="#121212"/>
      <path d="M0.856934 157.115L8.13657 126.07H49.6727L42.3931 157.115H0.856934Z" fill="#121212"/>
      <path d="M383.675 0.391113H424.997L389.027 156.259H347.705L383.675 0.391113Z" fill="#121212"/>
      <path d="M436.131 0.391113H477.453L462.465 65.2645L512.78 0.391113H559.454L497.578 77.8966L523.485 156.259H476.81L456.47 90.9569L441.483 156.259H400.161L436.131 0.391113Z" fill="#121212"/>
    </svg>
      <div>
        <input
          type="text"
          name="org"
          id="org"
          placeholder="Enter OrgId..."
          value={orgId}
          className="mb-4 w-96 pl-4 py-2 mr-4 border-2 border-gray-200 focus:border-slate-400 focus:outline-none rounded"
          onChange={(e) => setOrgId(e.target.value)}
        />
        <input
          type="text"
          name="key"
          id="key"
          placeholder="Enter ApiKey..."
          value={apiKey}
          className="mb-4 w-96 pl-4 py-2 mr-4 border-2 border-gray-200 focus:border-slate-400 focus:outline-none rounded"
          onChange={(e) => setApiKey(e.target.value)}
        />
        <div className="flex justify-center">
          <input
            type="text"
            name="prompt"
            id="prompt"
            placeholder="Enter prompt..."
            value={prompt}
            className="w-96 pl-4 py-2 mr-4 border-2 border-gray-200 focus:border-slate-400 focus:outline-none rounded"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={callChatGPT} className="px-4 py-2 rounded bg-emerald-400 text-slate-700">Submit</button>
        </div>
      </div>
      <div className="mt-12 max-w-2xl">
      {loading ? 
      (<div>loading</div>) :
      (<div className="whitespace-pre-line">{response}</div>)
    }
      </div>
    </div>
    </>
  )
}
