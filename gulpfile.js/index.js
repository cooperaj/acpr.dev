'use strict'

const { src, dest, series, parallel } = require('gulp')
const sass = require('gulp-sass')
const cleancss = require('gulp-clean-css')
const purgecss = require('gulp-purgecss')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')

const { generateFavicon, injectFaviconMarkups } = require('./favicon')

function processAssets(cb) {
    return src([ 
        'assets/images/*.svg',
        'assets/images/*.jpg', 
        ])
        .pipe(dest('public/images/'))
}

function processFiles(cb) {
    return src([ 
        'assets/files/*'
        ])
        .pipe(dest('public/'))
}

function processFonts(cb) {
    return src([ 
        'assets/fontawesome-subset/webfonts/fa-brands*',
        'assets/fontawesome-subset/webfonts/fa-regular*' 
        ])
        .pipe(dest('public/webfonts/'))
}

function createCSS(cb) {
    return src([ 'assets/stylesheets/main.scss' ])
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['./node_modules']}).on('error', sass.logError))
        .pipe(purgecss({
            content: ['views/**/*.pug']
        }))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('css/'))
        .pipe(dest('public/')
    )
}

module.exports = {
    processAssets: processAssets,
    processFiles: processFiles,
    createCSS: createCSS,
    generateFavicon: generateFavicon,
    injectFaviconMarkups: injectFaviconMarkups,
    build: parallel(processAssets, processFiles, processFonts, createCSS, series(generateFavicon, injectFaviconMarkups))
}

module.exports.default = module.exports.build