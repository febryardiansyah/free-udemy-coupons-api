const express = require('express');
const AxiosService = require('../helpers/axiosService');
const app = express();
const router = express.Router();
const cheerio = require('cheerio');

router.get('/all/:page',async(req, res) => {
    const params = req.params.page;
    const url = params === undefined || params === 1?'courses/all':`courses/all?page=${params}`;
    try {
        const data = await AxiosService(url);
        const $ = cheerio.load(data);
        const courseList = [];
        const obj = {}
        
        obj.status = true
        obj.message = 'success'
        obj.totalCourse = $('#version2 > div > div > div.col-md-8.col-xs-12.job-post-main > h4').text().replace('We found ','')
        $('#version2 > div > div > div.col-md-8.col-xs-12.job-post-main > div > .single-job-post').each((i,el) => {
            courseList.push({
                title : $(el).find('div.job-title > a').text(),
                link : $(el).find('div.job-title > a').attr('href'),
                thumb : $(el).find('div.col-md-3.col-xs-3.nopadding > a > img').attr('src'),
                normalPrice : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(2) > span > del > span').text(),
                status : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(2) > span > span > b').text(),
                category : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(3) > span > a').text(),
                categoryLink : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(3) > span > a').attr('href'),
            })
        })
        obj.courseList = courseList;
        
        res.send(obj)
    } catch (error) {
        res.send(error)
    }
})

router.get('/search/:keyword/:page/',async(req, res) => {
    const params = req.params.page;
    const keyword = req.params.keyword;
    const url = params === undefined || params === 1?`courses/search?keywords=${keyword}`:`courses/search?keywords=${keyword}&page=${params}`;
    try {
        const data = await AxiosService(url);
        const $ = cheerio.load(data);
        const courseList = [];
        const obj = {}
        
        obj.status = true
        obj.message = 'success'
        obj.totalCourse = $('#version2 > div > div > div.col-md-8.col-xs-12.job-post-main > h4').text().replace('We found ','')
        $('#version2 > div > div > div.col-md-8.col-xs-12.job-post-main > div > .single-job-post').each((i,el) => {
            courseList.push({
                title : $(el).find('div.job-title > a').text(),
                link : $(el).find('div.job-title > a').attr('href'),
                thumb : $(el).find('div.col-md-3.col-xs-3.nopadding > a > img').attr('src'),
                normalPrice : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(2) > span > del > span').text(),
                status : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(2) > span > span > b').text(),
                category : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(3) > span > a').text(),
                categoryLink : $(el).find('div.col-md-9.col-xs-6.ptb20 > div:nth-child(3) > span > a').attr('href'),
            })
        })
        obj.courseList = courseList;
        
        res.send(obj)
    } catch (error) {
        res.send(error)
    }
})

router.get('/categories',async(req, res) => {
    try {
        const data = await AxiosService('courses/all');
        const $ = cheerio.load(data);
        const categoryList = [];
        const obj = {}
        
        obj.status = true
        obj.message = 'success'

        $('#version2 > div > div > div.col-md-4.col-xs-12 > div > div > ul>li').each((i,el)=>{
            categoryList.push({
                title : $(el).find('a').text(),
                link : $(el).find('a').attr('href'),
            })
        })
        obj.categoryList = categoryList
        res.send(obj)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;