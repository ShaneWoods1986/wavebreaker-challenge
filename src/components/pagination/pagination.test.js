import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Pagination from "./pagination";

describe("Pagination Tests ", () => {

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

    describe("renders correctly with multiple pages", () => {
        let dataPassedOut;
        beforeEach(() => {
            act(() => {
                dataPassedOut = "";
                const pageChanged = (i) => {
                    dataPassedOut = i;
                };
                render(<Pagination total={30} entriesDisplayed={10} activePage={2} pageChanged={(i) => pageChanged(i)}/>, container);
            });
        });

        it("renders all pages correctly", () => {
            expect(container.textContent).toBe("1234");
            expect(container.querySelector(".pageItem:nth-of-type(1)").textContent).toBe("1");
            expect(container.querySelector(".pageItem:nth-of-type(2)").textContent).toBe("2");
            expect(container.querySelector(".pageItem:nth-of-type(3)").textContent).toBe("3");
            expect(container.querySelector(".pageItem:nth-of-type(4)").textContent).toBe("4");
        });

        it("set active page class", () => {
            expect(container.querySelector(".pageItem.active").textContent).toBe("2");
        });

        it("page changed method is passing data out of the component", () => {
            act(() => {
                const button = document.querySelector(".pageItem:nth-of-type(3)");
                button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            expect(dataPassedOut).toEqual({activePage: 3});
        });
    });

    it("renders correctly with no pages", () => {
        act(() => {
            const pageChanged = (i) => {};
            render(<Pagination total={8} entriesDisplayed={10} activePage={1} pageChanged={(i) => pageChanged(i)}/>, container);
        });
        expect(container.textContent).toBe("");
    });
});