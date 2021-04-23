import React, {Component, Fragment} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiSelector } from "react-icons/hi";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

class UserListBox extends Component {
  render() {
    const { users, handleChange, selected } = this.props

    return (
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <div>
            <Listbox.Label className="block text-sm font-medium text-gray-700">Select user</Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                {selected ?
                  (<span className="flex items-center">
                    <img src={selected.avatarURL} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>)
                  : <span className="flex items-center">Select a user</span>
                }
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {users.map((user) => (
                    <Listbox.Option
                      key={user.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-blue-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={user}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img src={user.avatarURL} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {user.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-green-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    )
  }
}

export default UserListBox