import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from "@testing-library/react";
import {UserAvatar} from "./index";
import {mockUser} from "../../../../__mocks__/users";

describe("App", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render", () => {
        const component = render(<UserAvatar image={mockUser.image} name={mockUser.name} />);

        // check if discussion component is rendered
        expect(screen.getByTestId("avatar")).toBeVisible();

        component.unmount();
    });
});
