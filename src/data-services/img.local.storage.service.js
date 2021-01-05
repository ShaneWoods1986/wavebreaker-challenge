function imageLocalService() {

    function setImages(url, images, total) {
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);

        localStorage.setItem(url, JSON.stringify({
            expiry: expiry.getTime(),
            images,
            total
        }));
    }

    function getImages(url) {
        if (localStorage.getItem(url)) {
            const cachedImages = JSON.parse(localStorage.getItem(url));
            if (new Date(cachedImages.expiry) > new Date()) {
                return { images: cachedImages.images, total:  cachedImages.total };
            }
            localStorage.removeItem(url);
        }
        return;
    }

    function getImage(idStr) {
        const id = parseInt(idStr);
        for (var i = 0; i < localStorage.length; i++) {
            const cachedData = getImages(localStorage.key(i));
            if (cachedData && cachedData.images) {
                const match = cachedData.images.find(image => image.id === id);
                if (match) {
                    return match;
                }
            }
        }
    }

    return { getImages, setImages, getImage };
}

export default imageLocalService();