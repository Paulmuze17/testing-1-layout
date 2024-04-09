import fileInclude from 'gulp-file-include';
import webHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number'; //adds an unique key to avoid hashing in browser, changes apply on rebuild
// import pug from 'gulp-pug'; // if is used deactivate .pipe(fileInclude()) method

import { path } from '../config/path.js'; //adds an unique key to avoid hashing in browser, changes apply on rebuild


const includeFilesSettings = {
    prefix: '@@',
    basepath: '@file',
    // context: {
    //     equipmentItems: equipmentItems
    // }
}

export const html = () => {
    return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: 'HTML',
            message: 'Error: <%= error.message %>',
            // sound: false
        })
    ))
    .pipe(fileInclude(includeFilesSettings)) //making one html file form diff.html include files
    // .pipe(pug({
    //     pretty: true,
    //     verbose: true
    // }))
    .pipe(app.plugins.replace(/@images\//g, `${path.assetsPath}/images/`)) // replacing paths on valid ones
    .pipe(
        app.plugins.if(
            app.isBuild,
            webHtmlNosvg() // webp plugin
        )
    ) 
    // .pipe(
    //     app.plugins.if(
    //         app.isBuild,
    //         versionNumber({
    //             'value': '%DT%',
    //             'append': {
    //                 'key': '_v',
    //                 'cover': 0,
    //                 'to': [
    //                     'css',
    //                     'js'
    //                 ]
    //             },
    //             'output': {
    //                 'file': 'gulp/version.json'
    //             }
    //         })
    //     )
    // )
    .pipe(app.gulp.dest(app.path.build.html));
}