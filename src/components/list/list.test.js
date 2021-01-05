import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import List from "./list";
import imageDataService from "../../data-services/img.service";
jest.mock("../../data-services/img.service");

describe("List Tests ", () => {
    const image1 = {
        id: 1,
        previewSrcSet: `
        url4.jpg 640w,
        url5.jpg 150w
        `,
        previewURL: "url5.jpg",
        previewHeight: 100,
        previewWidth: 150,
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
        describe("with no entries", () => {
            beforeEach(() => {
                imageDataService.getImages.mockResolvedValue({total: 0, images: []});
                act(() => {
                    render(<BrowserRouter><List/></BrowserRouter>, container);
                });
            });

            it("renders no images", () => {
                expect(container.querySelector(".list-page .parent")).toBeInTheDocument();
                expect(container.querySelector(".list-page .parent img")).not.toBeInTheDocument();
                expect(imageDataService.getImages).toHaveBeenCalledTimes(1);
            });
        });

        describe("with entries", () => {
            beforeEach(() => {
                const images = [image1, {...image1, id: 2}, {...image1, id: 3}];
                imageDataService.getImages.mockResolvedValue({total: 3, images});
                act(() => {
                    render(<BrowserRouter><List/></BrowserRouter>, container);
                });
            });

            it("renders images", () => {
                expect(imageDataService.getImages).toHaveBeenCalledTimes(1);
                expect(container.querySelector(".list-page .parent")).toBeInTheDocument();
                expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img")).toBeInTheDocument();
                expect(container.querySelector(".list-page .parent .item:nth-of-type(2) img")).toBeInTheDocument();
                expect(container.querySelector(".list-page .parent .item:nth-of-type(3) img")).toBeInTheDocument();
            });

            it("switch Photo Size", () => {
                expect(imageDataService.getImages).toHaveBeenCalledTimes(1);
                expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img").style.height).toBe("200px");
                expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img").style.width).toBe("300px");

                act(() => {
                    document.querySelector(".radio-group .btn:nth-of-type(1)")
                    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });

                expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img").style.height).toBe("100px");
                expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img").style.width).toBe("150px");
                expect(container.querySelector(".list-page .parent .item:nth-of-type(2) img").style.height).toBe("100px");
                expect(container.querySelector(".list-page .parent .item:nth-of-type(2) img").style.width).toBe("150px");

                act(() => {
                    document.querySelector(".radio-group .btn:nth-of-type(3)")
                    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });

                expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img").style.height).toBe("300px");
                expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img").style.width).toBe("450px");
                expect(container.querySelector(".list-page .parent .item:nth-of-type(2) img").style.height).toBe("300px");
                expect(container.querySelector(".list-page .parent .item:nth-of-type(2) img").style.width).toBe("450px");
            });
        });
    });

    describe("change page", () => {
        beforeEach(() => {
            imageDataService.getImages
            .mockResolvedValueOnce({total: 50, images: [{...image1, id: 16, previewHeight: 5}]})
            .mockResolvedValueOnce({total: 50, images: [{...image1, id: 19, previewHeight: 7}]});
            act(() => {
                render(<BrowserRouter><List/></BrowserRouter>, container);
            });
        });

        it("calls the dataservice and switches images", async () => {
            expect(imageDataService.getImages).toHaveBeenCalledTimes(1);
            expect(container.querySelector(".list-page .parent .item:nth-of-type(1) img").style.height).toBe("10px");
            act(() => {
                document.querySelector(".pageItem:nth-of-type(2)")
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            expect(imageDataService.getImages).toHaveBeenCalledTimes(2);
        });
    });
});