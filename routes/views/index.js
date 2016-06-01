/**
 * Boston Civic Media Website
 * Developed by Engagement Lab, 2016
 * ==============
 * Home page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class index
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');

// Include models here!
var Home = keystone.list('Home');
var LightningTalk = keystone.list('LightningTalk');
var Syllabi = keystone.list('Syllabi');
var Event = keystone.list('Event')
var _ = require('underscore');

// News data propagated by ./jobs/news
var store = require('json-fs-store')('./tmp');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';

    // Make any queries
    view.on('init', function(next) {

        // locals.missionStatement = Home.model.find({missionStatement});
        // locals.mainDescription = Home.model.find({description});
        locals.missionStatements = [];
        locals.featured_lightning_talks = [];
        locals.featured_syllabi = [];
        locals.featured_events = [];

        // EXAMPLE OF QUERY TO GET FEATURED STUFF

        // This query gets mission statement array
        // var missionStatement = Home.model.missionStatement;
        var missionStatements = Home.model.findOne({}, "missionStatements", {
            sort: {
                'createdAt': -1
            }
        });

        var beckyBanner = Home.model.findOne({}, "beckyBanner", {
            sort: {
                'createdAt': -1
            }
        });

        var bannerURL = Home.model.findOne({}, "beckyBannerURL", {
            sort: {
                'createdAt': -1
            }
        });

        var bannerHeader = Home.model.findOne({}, "beckyBannerHeader", {
            sort: {
                'createdAt': -1
            }
        });

        var bannerBlurb = Home.model.findOne({}, "beckyBannerBlurb", {
            sort: {
                'createdAt': -1
            }
        });

        var background = Home.model.findOne({}, "background", {
            sort: {
                'createdAt': -1
            }
        });

        
        // This query gets all featured projects
        var lightningTalkQuery = LightningTalk.model.find({
            'enabled': true,
            'homePage': true
        });

        var syllabiQuery = Syllabi.model.find({
            'enabled': true,
            'featured': true
        });

        var queryFeaturedEvent = Event.model.find({
            'enabled': true,
            'featured': true
        });

        

        // Setup the locals to be used inside view
        missionStatements.exec(function(err, result){
            // console.log (result)
            if (err) throw err;
            
            if(result !== null)
                locals.missionStatements = result.missionStatements;
            
            beckyBanner.exec(function(err, result){
                locals.beckyBanner = result.beckyBanner;

                bannerURL.exec(function(err, result){
                    locals.bannerURL = result.beckyBannerURL;
               
                    bannerHeader.exec(function(err, result){
                        locals.bannerHeader = result.beckyBannerHeader;
                        
                        bannerBlurb.exec(function(err, result){
                            locals.bannerBlurb = result.beckyBannerBlurb;
                        
                            background.exec(function(err, result) {
                                locals.background = result.background;
                                // console.log (locals.background);

                                lightningTalkQuery.exec(function(err, result){
                                    // console.log ("hi")
                                    if (err) throw err;

                                    if(result !== null)
                                        locals.featured_lightning_talks = result;
                                    
                                    syllabiQuery.exec(function(err, result) {
                                        if (err) throw err;
                                        
                                        if(result !== null)
                                            locals.featured_syllabi = result;

                                        queryFeaturedEvent.exec(function(err, resultEvent) {
                                            locals.featured_events = resultEvent;

                                            next(err);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // Render the view
    view.render('index');

};
