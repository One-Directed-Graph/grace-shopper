/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserHome } from './user-home'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    const user = { email: 'cody@email.com' }
    userHome = shallow(<UserHome user={user} />)
  })

  // it('renders the email in an h6', () => {
  //   expect(userHome.find('h6').text()).to.be.equal(
  //     'Logged in as cody@email.com'
  //   )
  // })
})
