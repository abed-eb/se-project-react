import React from 'react';
import ReactDom from 'react-dom';
import {render, fireEvent, cleanup} from '@testing-library/react';
import PersonalInfo from '../account-setting/personal-info';
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer';
afterEach(cleanup)

it('profile renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<PersonalInfo/>, div);
  });
  

// it("email contains @", () =>{
//     const {getByTestId} = render(<PersonalInfo />)
//     expect(getByTestId("personalInfo-emailId").
// })

it("email is not null", () =>{
    const {getByTestId} = render(<PersonalInfo />);
    expect(getByTestId("personalInfo-emailId")).not.toBeNull;
})

it("firstName is not null", () =>{
    const {getByTestId} = render(<PersonalInfo />);
    expect(getByTestId("personalInfo-firstName")).not.toBeNull;
})

it("lastName is not null", () =>{
    const {getByTestId} = render(<PersonalInfo />);
    expect(getByTestId("personalInfo-lastName")).not.toBeNull;
})

// it("matches snapShot", () =>{
//     const tree = renderer.create(<PersonalInfo />).toJSON();
//     expect(tree).toMatchSnapshot();
// })

