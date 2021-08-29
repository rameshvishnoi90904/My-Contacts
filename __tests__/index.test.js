import { expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";
import {getUserInitials} from '../src/helper/index'
import {contactList} from '../src/mockData/contactList';

describe("Helper Functions", () => {
    it('returns the correct initials to use in thumbnail', () => {
        const mockData = contactList[0];
        const firstInitial = mockData.givenName[0].toUpperCase();
        const lastInitial = mockData.familyName[0].toUpperCase();
        expect(getUserInitials(mockData)).toBe(`${firstInitial}${lastInitial}`);
    });
});