'use client';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react';


interface ApiButtonProps {
  orgId: string,
  apiKey: string,
  onOrgIdUpdate: (id: string) => void;
  onApiKeyUpdate?: (key: string) => void;
}

export function ApiButton({orgId, apiKey, onOrgIdUpdate, onApiKeyUpdate}: ApiButtonProps) {
  return <div className="fixed top-6 right-0 px-4"><Popover className="relative">
  {({ open }) => (
    <>
      <Popover.Button
        className={`
          ${open ? '' : 'text-opacity-90'}
          group inline-flex items-center rounded-md bg-gray-700 bg-opacity-90 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <div>{orgId && apiKey ? <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> <span>API Ready</span></div> : <div className="flex items-center space-x-2
        "><div className="w-2 h-2 rounded-full bg-red-500"></div> <span>API Key Required</span></div>}</div>
        <ChevronDownIcon
          className={`${open ? '' : 'text-opacity-70'}
            ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
          aria-hidden="true"
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm right-0 transform px-4 sm:px-0 lg:max-w-md">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative flex flex-col bg-white p-7">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Org ID
              </label>
              <input autoFocus className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={e => onOrgIdUpdate(e.target.value)} value={orgId} />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                API Key
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={e => onApiKeyUpdate(e.target.value)} value={apiKey} />
            </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  )}
</Popover>
</div>
}