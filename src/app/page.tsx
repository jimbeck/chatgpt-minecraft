'use client';
import { Configuration, OpenAIApi } from "openai";
import React, { useEffect, useRef, useState } from 'react'
import { images } from "./images";
import { ApiButton } from "./apiButton";

export default function Home() {
  const [orgId, setOrgId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [birthdayMonth, setBirthdayMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('Waiting to blow your mind...');

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
          {role: "user", content: 
            `Can you provide me a minecraft block that is best represented by the following information:` +
            `The first letter of my name is ${firstLetter}.` + 
            `My birthday month is ${birthdayMonth}.` +
            `Can you provide why?`}
      ]
    });
    setLoading(false);
    if (response.data.choices[0].message?.content) {
      setResponse(response.data.choices[0].message?.content)
    }
    
  };

  return (
    <>
      <ApiButton 
        orgId={orgId} 
        apiKey={apiKey} 
        onOrgIdUpdate={(id: string) => setOrgId(id)} 
        onApiKeyUpdate={(key: string) => setApiKey(key)} />
      <img src="minecraft-text.png" className="h-46 pb-4"/>
      <div className="flex">
        <img src={images[currentImage].url} alt="Switched Image" className="my-4 h-32 w-32"/>
        <img src={images[(currentImage + 1) % images.length].url} alt="Switched Image" className="my-4 h-32 w-32"/>
        <img src={images[(currentImage + 2) % images.length].url} alt="Switched Image" className="my-4 h-32 w-32"/>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <label htmlFor="letter" className="block text-sm font-medium leading-6 text-white">
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
            <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-white">
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
          <button onClick={callChatGPT} className="px-4 py-2 rounded bg-emerald-400 text-slate-700">Submit</button>
        </div>
        <div className="mt-2 p-4 max-w-2xl bg-white rounded border-2 border-gray-200 focus:border-slate-400 focus:outline-none flex items-center">
          {loading ? 
            (<div>loading</div>) :
            (<div className="whitespace-pre-line">{response}</div>)
          }
        </div>
      </div>
      </>
  )
}
