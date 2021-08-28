import { expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";
import PreviewContact from '../src/screens/PreviewContact';
import { render } from "@testing-library/react-native";
import {contactList} from '../src/mockData/contactList';

describe("<PreviewContact />", () => {
    const mockData = contactList[0];

    it('renders correctly across screens', () => {
        const container = renderer.create(<PreviewContact route={{params: {contactInfo: mockData}}}/>)
        const tree = container.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('match contact name',() => {
        const component = render(<PreviewContact route={{params: {contactInfo: mockData}}}/>);
        const nameNode = component.getByText(`${mockData.givenName} ${mockData.familyName}`);
        expect(nameNode).toBeDefined();
    })


    it('match emailid',() => {
        const component = render(<PreviewContact route={{params: {contactInfo: mockData}}}/>);
        const emailNode = component.getByText(`${mockData.emailAddresses[0].email}`);
        expect(emailNode).toBeDefined();
    })

    it('match phone',() => {
        const component = render(<PreviewContact route={{params: {contactInfo: mockData}}}/>);
        const phoneNode = component.getByText(`${mockData.phoneNumbers[0].number}`);
        expect(phoneNode).toBeDefined();
    })
});