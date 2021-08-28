import { expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";
import HomeScreen from '../src/screens/HomeScreen';
import {contactList} from '../src/mockData/contactList';
import {UserController, UserContext} from '../src/context/context';
import { render } from "@testing-library/react-native";

describe("<HomeScreen />", () => {
    it('renders correctly across screens', () => {
        const container = renderer.create(
        <UserController value={{contactList: contactList}}>
          <HomeScreen />
        </UserController>
        )
        const tree = container.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contact list match',() => {
      const component = render(
        <UserContext.Provider value={[{contactList: contactList},() => {}]}>
          <HomeScreen />
        </UserContext.Provider>
      )
      const flatList = component.getByTestId("flatlist");
      expect(flatList.props.data.length).toBe(contactList.length)
    })
});