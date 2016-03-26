var menuContexts = ["image", "link"];

chrome.contextMenus.create({
    title: "Go to Flickr",
    contexts: menuContexts,
    onclick: goToFlickr
});

function goToFlickr(pageInfo, tabInfo) {
    var flickrUrl = getFlickrUrl(pageInfo);

    if (flickrUrl && validateFlickrUrl(flickrUrl)) {
        var imageId = flickrUrl.split("/").slice(-1).pop().split("_")[0];

        if (imageId) {
            chrome.tabs.create({
                url: "http://flickr.com/photo.gne?id=" + imageId
            });
        }
    } else {
        alert("The [" + flickrUrl + "] is not valid Flickr URL");
    }
}

function getFlickrUrl(pageInfo) {
    flickrUrl = null;

    if (typeof pageInfo.linkUrl !== "undefined") {
        flickrUrl = pageInfo.linkUrl;
    } else if (typeof pageInfo.srcUrl !== "undefined") {
        flickrUrl = pageInfo.srcUrl;
    }

    return flickrUrl;
}

function validateFlickrUrl(flickrUrl) {
    if (flickrUrl.match(/^(http|https):\/\/.*?\.staticflickr\.com(\/\w+)+\.(jpg|jpeg)$/i)) {
        return true;
    }

    return false;
}
