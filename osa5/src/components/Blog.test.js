import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom' fireEvent
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author'
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'blog title'
  )

  expect(div).toHaveTextContent(
    'blog author'
  )
  /*expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )*/
  /*expect(
    component.container.querySelector('.url'),
    component.container.querySelector('.likes')
  ).toBeDefined()*/
})

describe('togglevisibility', () => {
  let component

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} buttonLabel="Show">
        <div className="url" />
        <div className="likes" />
      </Blog>
    )
  })

  //component.debug()

  test('renders its children', () => {

    component.debug()

    expect(
      component.container.querySelector('.url')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.hideWhenVisible')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    //const mockHandler = jest.fn()

    const div = component.container.querySelector('.hideWhenVisible')
    expect(div).not.toHaveStyle('display: none')
    //expect(mockHandler.mock.calls).toHaveLength(1)
  })

  /*test('after clicking the button...', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} toggleVisibility={mockHandler} />
    )

    const button = component.container.querySelector('#showhide')
    fireEvent.click(button)

    //const div = component.container.querySelector('.hideWhenVisible')
    //expect(div).not.toHaveStyle('display: none')
    expect(mockHandler.mock.calls).toHaveLength(1)
  })*/

})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} sendUpdate={mockHandler} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})