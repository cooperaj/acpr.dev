'use strict'

const gulp = require('gulp')
const realFavicon = require ('gulp-real-favicon')
const fs = require('fs')

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json'

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
function generateFavicon(cb) {
    realFavicon.generateFavicon({
        masterPicture: 'assets/images/logo.svg',
        dest: 'public/',
        iconsPath: '/',
            design: {
                ios: {
                    pictureAspect: 'backgroundAndMargin',
                    backgroundColor: '#ffffff',
                    margin: '14%',
                    assets: {
                        ios6AndPriorIcons: false,
                        ios7AndLaterIcons: false,
                        precomposedIcons: false,
                        declareOnlyDefaultIcon: true
                    },
                    appName: 'acpr.dev'
                },
                desktopBrowser: {},
                windows: {
                    pictureAspect: 'whiteSilhouette',
                    backgroundColor: '#00aba9',
                    onConflict: 'override',
                    assets: {
                        windows80Ie10Tile: false,
                        windows10Ie11EdgeTiles: {
                            small: false,
                            medium: true,
                            big: false,
                            rectangle: false
                        }
                    },
                    appName: 'acpr.dev'
                },
                androidChrome: {
                    pictureAspect: 'noChange',
                    themeColor: '#ffffff',
                    manifest: {
                        name: 'acpr.dev',
                        display: 'standalone',
                        orientation: 'notSet',
                        onConflict: 'override',
                        declared: true
                    },
                    assets: {
                        legacyIcon: false,
                        lowResolutionIcons: false
                    }
                },
                safariPinnedTab: {
                    pictureAspect: 'silhouette',
                    themeColor: '#00aba9'
                }
            },
            settings: {
                compression: 2,
                scalingAlgorithm: 'Mitchell',
                errorOnImageTooSmall: false,
                readmeFile: false,
                htmlCodeFile: false,
                usePathAsIs: false
            },
            markupFile: FAVICON_DATA_FILE
        }, function() {
            cb()
        })
}

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
function injectFaviconMarkups(cb) {
    return gulp.src([ 'views/partials/_favicon.pug' ])
        .pipe(
            realFavicon.injectFaviconMarkups(
                JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
            )
        )
        .pipe(gulp.dest('views/partials'))
}
  
// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
function checkForFaviconUpdates(cb) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err
        }
    })
  }

module.exports = {
    generateFavicon: generateFavicon,
    injectFaviconMarkups: injectFaviconMarkups,
    checkForFaviconUpdates: checkForFaviconUpdates
}