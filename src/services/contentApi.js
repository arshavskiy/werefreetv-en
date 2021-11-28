const contentApi = {};

const key = '86ada218ec30f07f1f44985d57';
contentApi.contentBaseUrl = 'https://www.wearefree.tv/ghost/api/v3/content';

contentApi.postsAPI = `${contentApi.contentBaseUrl}/posts/?key=${key}&filter=tag:en&limit=10&include=tags&version=v3`;

contentApi.postByTagAPI = `${contentApi.contentBaseUrl}/posts/?key=${key}&limit=10&include=tags&version=v3`;

contentApi.tagsAPI = `${contentApi.contentBaseUrl}/tags/?key=${key}`;

contentApi.navAPI = `${contentApi.contentBaseUrl}/pages/?key=${key}`;

contentApi.pageSlug = `${contentApi.contentBaseUrl}/page/slug`;

contentApi.postAPI = `${contentApi.contentBaseUrl}/posts/slug/`;

export {
    contentApi as contentApi
};