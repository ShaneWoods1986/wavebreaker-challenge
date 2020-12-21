function imageDataService() {

    function getHeaders(hrs = {}) {
        return {...hrs};
    }

    function getImageUrl(id, page, perPage = '20', searchTerm) {
        const apiKey = '6473511-0417f2cad683f1bee54cafe15';
        let url = `https://pixabay.com/api/?key=${apiKey}&per_page=${perPage}`;
        if (id) {
            url = url + `&id=${id}`;
        }
        if (searchTerm) {
            url = url + `&q=${searchTerm}`;
        }
        if (page) {
            url = url + `&page=${page}`;
        }
        return url;

    }

    function getImages(perPage = 20, page = 1) {
        // const cachedImages = localService.getCachedImages();
        // if (cachedImages) {
        //     return new Promise(resolve => resolve(cachedImages));
        // }

        return fetch(getImageUrl(null, page, perPage), {
            "method": "GET",
            "headers": getHeaders()
        }).then(response => response.json())
        .then(response => {
            return {
                total: response.totalHits,
                images: response.hits.map((image) => {
                    return {
                        id: image.id,
                        url: image.previewURL,
                        height: image.previewHeight,
                        width: image.previewWidth,
                        tags: image.tags
                    }
                })
                };
        });
    }

    function getImage(id) {
        return fetch(getImageUrl(id), {
            "method": "GET",
            "headers": getHeaders()
        }).then(response => response.json())
        .then(response => {
            const image = response.hits[0];
            return {
                url: image.imageURL,
                views: image.views,
                downloads: image.downloads,
                tags: image.tags,
                size: image.imageSize,
                user: image.user
            };
        });
    }


return { getImages, getImage };

}
export default imageDataService();