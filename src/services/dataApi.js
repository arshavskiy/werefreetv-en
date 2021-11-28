const dataAPI = {}

dataAPI.dataBaseUrl = 'https://data.wearefree.tv';

dataAPI.surveyRuPostAPI = `${dataAPI.dataBaseUrl}/survey-en/`;

dataAPI.surveyRuAPI = `${dataAPI.dataBaseUrl}/get-survey-en`;

dataAPI.dataViews = `${dataAPI.dataBaseUrl}/views`;

export {
    dataAPI as dataAPI
};