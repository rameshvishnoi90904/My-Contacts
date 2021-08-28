import { expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";
import EditContact from '../src/screens/EditContact';
import {contactList} from '../src/mockData/contactList';

describe("<EditContact />", () => {
    const mockData = contactList[0];
    it('renders correctly across screens', () => {
        const container = renderer.create(<EditContact route={{params: {contactInfo: mockData}}}/>)
        const tree = container.toJSON();
        expect(tree).toMatchSnapshot();
    });
});