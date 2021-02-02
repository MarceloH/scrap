import cheerio from 'cheerio';

describe('Process Url', () => {
    beforeAll(async () => {
    });

    afterAll(async () => {
    });

    it('scraping with cheerio', async () => {
        const $ = await cheerio.load('<ul id="fruits"><li>apple</li></ul>');
        expect($.html()).toEqual(
            '<html><head></head><body><ul id="fruits"><li>apple</li></ul></body></html>'
        );
    })
        
})