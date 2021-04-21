import React, { Component, Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

  logOut = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    const { user } = this.props
    
    return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-white font-bold">
                    Would You Rather
                  </div>
                  <nav className='ml-10 flex items-baseline space-x-4'>
                    <NavLink to='/' exact className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' activeClassName='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'>
                      Home
                    </NavLink>
                    <NavLink to='/new' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' activeClassName='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'>
                      New Question
                    </NavLink>
                    <NavLink to='/board' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' activeClassName='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'>
                      Leader Board
                    </NavLink>
                  </nav>
                </div>
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="max-w-xs flex items-center text-gray-300 hover:text-white px-3 pl-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.avatarURL}
                            alt=""
                          />
                          <span className="text-gray-300 hover:text-white px-3 pl-2 text-sm font-bold">{user.name}</span>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            <button className='px-4 py-2 text-sm text-gray-700' onClick={this.logOut}>
                              Log out
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    )
  }
}


function mapStateToProps({ authedUser, users }) {
  return {
    user: !authedUser ? null : users[authedUser]
  }
}

export default connect(mapStateToProps)(Nav)