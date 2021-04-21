
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
class Login extends Component {

  state = {
    selected: this.props.users[0]
  }

  setSelected = (selected) => {
    this.setState(() => ({
      selected
    }))
  }

  setUser = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.selected.id))
  }

  render() {
    const { users } = this.props
    const { selected } = this.state

    console.log('Users', users)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" >
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-xl font-extrabold text-gray-900">
              Welcome to the Would You Rather App
            </h1>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to continue
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or <a href="#" className="font-medium text-blue-600 hover:text-blue-500">create an account</a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={this.setUser}>
            <Listbox value={selected} onChange={this.setSelected}>
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
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
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

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Sign in
            </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users: !users ? [] : Object.values(users).sort((a, b) => b.name - a.name)
  }
}

export default connect(mapStateToProps)(Login)