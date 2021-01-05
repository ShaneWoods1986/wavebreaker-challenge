import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ScrollToTop from "./scroll-top";

describe("Scroll To Top Tests ", () => {

    let container = null;
    beforeEach(() => {
        container = document.createElement("div");
        container.style = "display: block; float:left; width: 500px, height: 5000px;";
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    describe("rendering", () => {
        beforeEach(() => {
            act(() => {
                render(<ScrollToTop/>, container);
            });
        });

        it("does not render the button when scrolled to top", () => {
            expect(container.querySelector(".scroll-to-top")).not.toBeInTheDocument();
        });

        it("renders the button", () => {
            document.documentElement.scrollTop = 100;
            window.onscroll();
            expect(container.querySelector(".scroll-to-top")).toBeInTheDocument();
        });

    });

        it("clicking the button scrolls To Top", () => {
            act(() => {
                render(<ScrollToTop/>, container);
            });
            document.documentElement.scrollTop = 100;
            window.onscroll();
            act(() => {
                document.querySelector(".scroll-to-top").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            expect(container.querySelector(".scroll-to-top")).not.toBeInTheDocument();
    });

});