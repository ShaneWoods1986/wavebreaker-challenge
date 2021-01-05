import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter } from "react-router-dom";

import Header from "./header";

describe("Header Tests ", () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    describe("renders correctly", () => {
        it("renders Pixabay Logo", () => {
            expect(true).toBe(true);
        });

        beforeEach(() => {
            act(() => {
                render(<BrowserRouter><Header title="Test Page"/></BrowserRouter>, container);
            });
        });

        it("renders Pixabay Logo", () => {
            expect(container.querySelector(".pixabay-logo a")).toBeInTheDocument();
        });

        it("renders Title", () => {
            expect(container.querySelector(".group h3:nth-of-type(2)").textContent).toBe("Test Page");
        });

        it("renders Link", () => {
            expect(container.querySelector(".button-group button:nth-of-type(1)").textContent).toBe("Home");
        });
    });
});