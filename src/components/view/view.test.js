import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import View from "./View";
import imageDataService from "../../data-services/img.service";
jest.mock("../../data-services/img.service");

describe("View Tests ", () => {
    const image1 = {
        id: 1,
        previewSrcSet: `
        url4.jpg 640w,
        url5.jpg 150w
        `,
        previewURL: "url5.jpg",
        previewHeight: 100,
        previewWidth: 100,
        url: "url2.jpg",
        srcSet: `
        url1.jpg 6000w,
        url2.jpg 1920w,
        url3.jpg 1280w,
        url4.jpg 640w,
        url5.jpg 150w
        `,
        views: 5000,
        downloads: 267,
        tags: "picture,image,rendering",
        size: "5000",
        user: "Gary"
    };

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
        beforeEach(() => {
            imageDataService.getImage.mockResolvedValue(image1);
            act(() => {
                const params = {params: {id: 1}};
                render(<View match={params}/>, container);
            });
        });

        it("renders image data", () => {
            expect(container.querySelector(".img-data .row:nth-of-type(1) strong").textContent).toBe("Photographer");
            expect(container.querySelector(".img-data .row:nth-of-type(1) span").textContent).toBe("Gary");
            expect(container.querySelector(".img-data .row:nth-of-type(2) strong").textContent).toBe("Tags");
            expect(container.querySelector(".img-data .row:nth-of-type(2) span").textContent).toBe("picture,image,rendering");
            expect(container.querySelector(".img-data .row:nth-of-type(3) strong").textContent).toBe("Views");
            expect(container.querySelector(".img-data .row:nth-of-type(3) span").textContent).toBe("5000");
            expect(container.querySelector(".img-data .row:nth-of-type(4) strong").textContent).toBe("Downloads");
            expect(container.querySelector(".img-data .row:nth-of-type(4) span").textContent).toBe("267");
            expect(container.querySelector(".img-data .row:nth-of-type(5) strong").textContent).toBe("Size");
            expect(container.querySelector(".img-data .row:nth-of-type(5) span").textContent).toBe("5000");
        });

        it("renders image", () => {
            expect(container.querySelector(".view-page img")).toBeInTheDocument();
        });
    });
});