const dataAPI = {}

dataAPI.dataBaseUrl = 'https://data.wearefree.tv';

dataAPI.surveyRuPostAPI = `${dataAPI.dataBaseUrl}/survey-ru/`;

dataAPI.surveyRuAPI = `${dataAPI.dataBaseUrl}/get-survey-ru`;

dataAPI.dataViews = `${dataAPI.dataBaseUrl}/views`;

export {
    dataAPI as dataAPI
};