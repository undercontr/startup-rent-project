import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import axios from 'axios';


export default function LocationCombobox({onLocationSelect}) {
    const [selected, setSelected] = useState();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState<string>("istanbul");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          if (query.length > 3) {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${
              process.env.NEXT_PUBLIC_GEOCODING_API
            }`).then((json) => {
              setData(json.data.results);
            });
          }
    
          if (query.length <= 0) {
            setData([])
          } 
        }, 500);
        return () => clearTimeout(timeoutId);
      }, [query]);

  return (
    <div>
      <Combobox
      value={selected}
      onChange={(e) => {
        setSelected(e.address);
        onLocationSelect(e.loc)
      }}
    >
        <div className="relative">
          <div className="relative border-2 border-blue-500 w-full h-[32px] cursor-default overflow-hidden rounded-md bg-white text-left">
            <Combobox.Input
              className="w-full border-none pb-2 pt-1 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                data.map((loc, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      }`
                    }
                    value={{address: loc.formatted_address, loc: loc.geometry.location}}
                    
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {loc.formatted_address}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
