import imageDataService from "./img.service";
import imageLocalService from "./img.local.storage.service";
import config from "./config.json";

jest.mock("./img.local.storage.service");

describe("Image Data Service Tests ", () => {
    const image1 = {
        id: 1,
        previewSrcSet: `
        url4.jpg 640w,
        url5.jpg 150w
        `,
        previewURL: "url5.jpg",
        previewHeight: 100,
        previewWidth: 150,
        url: "url3.jpg",
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

    beforeEach(async () => {
        config.apiKey = "###";
    });

    describe("Get Images", () => {
        beforeEach(() => {
            const imageData = {
                totalHits: 1, hits: [{
                    id: 1,
                    previewHeight: 100,
                    previewWidth: 150,
                    previewURL: "url5.jpg",
                    webformatURL: "url4.jpg",
                    largeImageURL:"url3.jpg",
                    fullHDURL:"url2.jpg",
                    imageURL: "url1.jpg",
                    views: 5000,
                    downloads: 267,
                    tags: "picture,image,rendering",
                    imageSize: "5000",
                    user: "Gary"
                }]
            };

            jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({json: () => Promise.resolve(imageData)}));

        });

        afterEach(() => {
            global.fetch.mockRestore();
        });

        describe("cached", () => {
            let results;
            beforeEach(async () => {
                imageLocalService.getImages.mockResolvedValue({total: 1, images: [image1]});
                results = await imageDataService.getImages(30, 1);
            });

            it("data is retrieved", () => {
                expect(results.total).toBe(1);
                expect(results.images).toEqual([image1]);
            });

            it("url passed was correct", () => {
                expect(imageLocalService.getImages).toBeCalledWith("https://pixabay.com/api/?key=###&per_page=30&page=1");
            });

            it("No fetch call was made", () => {
                expect(global.fetch).toHaveBeenCalledTimes(0);
            });
        });

        describe("uncached", () => {
            let results;
            beforeEach(async () => {
                imageLocalService.getImages = () => { return null; };

                results = await imageDataService.getImages(30, 1);
            });

            it("url passed was correct", () => {
                expect(global.fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith("https://pixabay.com/api/?key=###&per_page=30&page=1", {"headers": {}, "method": "GET"});
            });

            it("data is retrieved", () => {
                expect(results.total).toBe(1);
                const trimWhitespace = (image) => {
                    return {...image, srcSet: image.srcSet.replace(/\s/g, ""),
                    previewSrcSet: image.previewSrcSet.replace(/\s/g, "")};
                };
                expect(results.images.map(trimWhitespace)).toEqual([trimWhitespace(image1)]);
            });

            it("data is cached", () => {
                expect(imageLocalService.setImages).toBeCalledWith(
                    "https://pixabay.com/api/?key=###&per_page=30&page=1",
                    results.images,
                    results.total
                );
            });
        });
    });

    describe("Get Image", () => {
        const url = "https://pixabay.com/api/?key=###&per_page=20&id=1";
        beforeEach(() => {
            const imageData = {
                totalHits: 1, hits: [{
                    id: 1,
                    previewHeight: 100,
                    previewWidth: 150,
                    previewURL: "url5.jpg",
                    webformatURL: "url4.jpg",
                    largeImageURL:"url3.jpg",
                    fullHDURL:"url2.jpg",
                    imageURL: "url1.jpg",
                    views: 5000,
                    downloads: 267,
                    tags: "picture,image,rendering",
                    imageSize: "5000",
                    user: "Gary"
                }]
            };

            jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({json: () => Promise.resolve(imageData)})
            );

        });

        afterEach(() => {
            global.fetch.mockRestore();
        });

        describe("cached", () => {
            let result;
            beforeEach(async () => {
                imageLocalService.getImage.mockResolvedValue(image1);
                result = await imageDataService.getImage(1);
            });

            it("image is retrieved", () => {
                expect(result).toEqual(image1);
            });

            it("id passed to caching service", () => {
                expect(imageLocalService.getImage).toBeCalledWith(image1.id);
            });

            it("No fetch call was made", () => {
                expect(global.fetch).toHaveBeenCalledTimes(0);
            });
        });

        describe("uncached", () => {
            let result;
            beforeEach(async () => {
                imageLocalService.getImage = () => { return null; };

                result = await imageDataService.getImage(1);
            });

            it("url passed was correct", () => {
                expect(global.fetch).toHaveBeenCalledTimes(1);
                expect(global.fetch).toHaveBeenCalledWith(url, {"headers": {}, "method": "GET"});
            });

            it("data is retrieved", () => {
                const trimWhitespace = (image) => {
                    return {...image, srcSet: image.srcSet.replace(/\s/g, ""),
                    previewSrcSet: image.previewSrcSet.replace(/\s/g, "")};
                };
                expect(trimWhitespace(result)).toEqual(trimWhitespace(image1));
            });

        });
    });
});

