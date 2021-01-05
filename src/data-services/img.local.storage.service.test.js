import imageLocalService from "./img.local.storage.service";

describe("Image Local Service Tests ", () => {

    it("setting images", () => {
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
        const image2 = {...image1, id: 2, user: "Nuala"};

        let setUrl = "";
        let paramString = "";
        window.localStorage.__proto__.setItem = (url, params) => {
            setUrl = url;
            paramString = params;
        };

        imageLocalService.setImages("testUrl", [image1, image2], 2);

        expect(setUrl).toBe("testUrl");
        const cached = JSON.parse(paramString);
        expect(cached.images).toEqual([image1, image2]);
        expect(cached.total).toBe(2);
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);
        expect(Math.round(cached.expiry / 1000)).toBe(Math.round(expiry.getTime() / 1000));
    });

    describe("retrieving images", () => {
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
        const image2 = {...image1, id: 2, user: "Nuala"};

        let removedItem;

        beforeEach(() => {
            window.localStorage.__proto__.getItem = (url) => {
                if (url === "testUrl") {
                    return JSON.stringify({images: [image1, image2], total: 2, expiry: new Date("3000-01-01").getTime()});
                } else if (url === "expiredUrl") {
                    return JSON.stringify({images: [image1, image2], total: 2, expiry: new Date("2000-01-01").getTime()});
                }
            };
            removedItem = "";
            window.localStorage.__proto__.removeItem = (url) => {
                removedItem = url;
            };
        });
        it("where present and not expired", () => {
            const response = imageLocalService.getImages("testUrl");
            expect(response.images).toEqual([image1, image2]);
            expect(response.total).toBe(2);
        });

        it("where present but expired", () => {
            const response = imageLocalService.getImages("expiredUrl");
            expect(response).not.toBeDefined();
            expect(removedItem).toBe("expiredUrl");
        });

        it("where not present", () => {
            const response = imageLocalService.getImages("Url");
            expect(response).not.toBeDefined();
        });

    });

    describe("get Image", () => {
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
        const image2 = {...image1, id: 2, user: "Nuala"};

        let removedItem;
        beforeEach(() => {
            window.localStorage.__proto__ = {
                length: 2,
                key: (idx) => {
                    return ["expiredUrl", "testUrl"][idx];
                },
                removeItem: (url) => {
                    removedItem = url;
                },
                getItem: (url) => {
                    if (url === "testUrl") {
                        return JSON.stringify({images: [image1, image2], total: 2, expiry: new Date("3000-01-01").getTime()});
                    } else if (url === "expiredUrl") {
                        return JSON.stringify({images: [{...image1, id:4}], total: 1, expiry: new Date("2000-01-01").getTime()});
                    }
                }
            };
        });

        it("where present", () => {
            const response = imageLocalService.getImage("1");
            expect(response).toEqual(image1);
        });

        it("where present but expired", () => {
            const response = imageLocalService.getImage("4");
            expect(response).not.toBeDefined();
            expect(removedItem).toBe("expiredUrl");
        });

        it("where not present", () => {
            const response = imageLocalService.getImage("10");
            expect(response).not.toBeDefined();
            expect(removedItem).toBe("expiredUrl");
        });
    });

});