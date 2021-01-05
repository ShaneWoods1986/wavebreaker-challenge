import imageLocalService from "./img.local.storage.service";

const config = require("./config.json");

function imageDataService() {

    function getHeaders(hrs = {}) {
        return {...hrs};
    }

    function getImageUrl(id, page, perPage = "20") {
        let url = `https://pixabay.com/api/?key=${config.apiKey}&per_page=${perPage}`;
        if (id) {
            url = url + `&id=${id}`;
        }
        if (page) {
            url = url + `&page=${page}`;
        }
        return url;
    }

    function getImages(perPage = 20, page = 1) {
        const url = getImageUrl(null, page, perPage);
        const cachedImages = imageLocalService.getImages(url);
        if (cachedImages) {
            return new Promise(resolve => resolve(cachedImages));
        }

        return fetch(url, {
            "method": "GET",
            "headers": getHeaders()
        }).then(response => response.json())
        .then(response => {
            const data = {
                total: response.totalHits,
                images: response.hits.map(getImageInfo)
            };
            imageLocalService.setImages(url, data.images, data.total);
            return data;
        });
    }

    function getImageInfo(image) {
        return {
            id: image.id,
            previewSrcSet: `
                ${image.webformatURL} 640w,
                ${image.previewURL} 150w
            `,
            previewURL: image.previewURL,
            previewHeight: image.previewHeight,
            previewWidth: image.previewWidth,
            url: image.largeImageURL,
            srcSet: `
                ${image.imageURL} 6000w,
                ${image.fullHDURL} 1920w,
                ${image.largeImageURL} 1280w,
                ${image.webformatURL} 640w,
                ${image.previewURL} 150w
            `,
            views: image.views,
            downloads: image.downloads,
            tags: image.tags,
            size: image.imageSize,
            user: image.user
        };
    }

    function getImage(id) {
        const cachedImage = imageLocalService.getImage(id);
        if (cachedImage) {
            return new Promise(resolve => resolve(cachedImage));
        }

        return fetch(getImageUrl(id), {
            "method": "GET",
            "headers": getHeaders()
        }).then(response => response.json())
        .then(response => {
            return getImageInfo(response.hits[0]);
        });
    }


return { getImages, getImage };

}
export default imageDataService();