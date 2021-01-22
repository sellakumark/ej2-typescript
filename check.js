var gulp = require('gulp');
var fs = require('fs');
var glob = require('glob');
var rimraf = require("rimraf");
var del = require('del')
var arr, langName, obj = {}, variable;
var dir = './converted_language';
var shelljs = require('shelljs');
var translate = require('translation-google')
var folder = glob.sync('./support/*');
// culArr means culture array - Replacing words of culture name are added in this array
var user = process.env.GITLAB_USER;
var token = process.env.GITLAB_TOKEN;
var branch = 'hotfix/18.4.0.30_Vol4';

// culArr means culture array - Replacing words of culture name are added in this array
var culArr = ['nl'];
var culArrCheck = ['ar-AE', 'ar', 'cs', 'da', 'de', 'en-GB', 'en-US', 'es', 'fa', 'fi', 'fr', 'he', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'ms', 'nb', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'th', 'tr', 'vi', 'zh'];
gulp.task('build', function () {
    var configPackage = JSON.parse(fs.readFileSync('./locale/locale.json', 'utf8'));
    for (var i = 0; i < folder.length; i++) {
        langName = folder[i].replace(/(.\/support\/|.txt)/g, '');
        obj = {};
        var cultureFile = fs.readFileSync(folder[i], 'utf8');
        arr = cultureFile.match(/(.*)[^\n\r]+/g);
        var j = 0;
        if (j < arr.length) {
            for (variable in configPackage) {
                Object.keys(configPackage[variable]).forEach(function (keys) {
                    configPackage[variable][keys] = arr[j];
                    j++
                });
            }
        }
        obj[langName] = configPackage;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(dir + '/' + folder[i].split('/')[2].replace('txt', 'json'), JSON.stringify(obj, null, 4));
    }
});

//Task to change only a new changes
gulp.task('locale-changes', function () {
    culArrCheck.forEach(function (cul) {
        var convertLang = JSON.parse(fs.readFileSync(`./converted_language/${cul}.json`, 'utf8'))[cul];
        var prevLang = JSON.parse(fs.readFileSync(`./previous-converted/${cul}.json`, 'utf8'))[cul];
        var keys = Object.keys(convertLang);
        for (var i = 0; i < keys.length; i++) {
            convertLang[keys[i]] = extend({}, convertLang[keys[i]], prevLang[keys[i]], true);
        }
        var obj = {};
        obj[cul] = convertLang;
        fs.writeFileSync(`./converted_language/${cul}.json`, JSON.stringify(obj, null, 4));
    });
});

//Task to replacing wrong translation locale word to correct value for corresponding culture
gulp.task('convert-select-key', function (done) {
    culArr.forEach(function (cul) {
        var ogJson = JSON.parse(fs.readFileSync(`./lang-files/${cul}-og.json`, 'utf8'));
        var langJson = JSON.parse(fs.readFileSync(`./converted_language/${cul}.json`, 'utf8'));
        langJson = extend({}, langJson[cul], ogJson, true);
        var obj = {};
        obj[cul] = langJson;
        fs.writeFileSync(`./converted_language/ ${cul}.json`, JSON.stringify(obj, null, 4));
    });
});

//Here using extend method to replacing key value to new value given in the lang-files folder og.json files
function extend(copied, first, second, deep) {
    var result = copied || {};
    var length = arguments.length;
    if (deep) {
        length = length - 1;
    }
    for (var i = 1; i < length; i++) {
        if (!arguments[i]) {
            continue;
        }
        var obj1 = arguments[i];
        Object.keys(obj1).forEach((key) => {
            var src = result[key];
            var copy = obj1[key];
            var clone;
            if (deep && (isObject(copy) || Array.isArray(copy))) {
                if (isObject(copy)) {
                    clone = src ? src : {};
                    result[key] = extend({}, clone, copy, deep);
                } else {
                    clone = src ? src : [];
                    result[key] = extend([], clone, copy, deep);
                }
            } else {
                result[key] = copy;
            }
        });
    }
    return result;
}
function isObject(obj) {
    var objCon = {};
    return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
}
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

//copy the locale.json values into locale.txt
gulp.task("copy", function () {
    var localeFiles = require("./locale/locale.json", "utf8");
    var localeContent = "";
    for (var i in localeFiles) {
        var copyFiles = localeFiles[i];
        localeContent = localeContent + Object.values(copyFiles).join("\n") + '\n';
    }
    fs.writeFileSync("./locale.txt", localeContent, "utf8");
});

//locale.json clone
gulp.task('locale-clone', function (done) {
    var gitPath = 'https://' + user + ':' + token + '@gitlab.syncfusion.com/essential-studio/ej2-resources.git'
    var gitLocalPath = 'locale';
    if (fs.existsSync(gitLocalPath)) {
        rimraf.sync(gitLocalPath);
    }
    var clone = shelljs.exec('git clone ' + ' -b ' + branch + " " + gitPath + ' ' + gitLocalPath, { silent: true });
    if (clone.code !== 0) {
        console.log('clone failed');
        process.exit(1);
    } else {
        console.log('clone success')
        del(['locale/**', '!locale/locale.json'])
        done();
    }
})

//clone previous languages from ej2-locale
gulp.task('previous-languages', function () {
    var gitpath = 'https://' + user + ':' + token + '@github.com/syncfusion/ej2-locale.git';
    console.log('clone started');
    var clone = shelljs.exec('git clone ' + gitpath + ' ' + './previous', { silent: false });
    if (clone.code !== 0) {
        console.log('clone failed');
    }
    else {
        console.log('clone succeeded')
        for (let i = 0; i < culArrCheck.length; i++) {
            //replace the cloned json files into previous-converted repository
            var previous_converted = fs.readFileSync('./previous/src/' + culArrCheck[i] + '.json', 'utf8')
            fs.writeFileSync('./previous-converted/' + culArrCheck[i] + '.json', previous_converted, 'utf8')
        }
        if (fs.existsSync('./previous')) {
            rimraf.sync('./previous')
        }
    }
})

//task to convert our supporting cultures
gulp.task('locale-translate', function () {
    shelljs.mkdir('-p', './support')
    let culturefile1 = fs.readFileSync('./locale.txt', 'utf8');
    let lang = ['ar', 'cs', 'da', 'de', 'es', 'fa', 'fi', 'fr', 'iw', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ko', 'ms', 'no', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'th', 'tr', 'vi', 'zh-cn']
    lang.forEach(temp => {
        translate(culturefile1, { to: temp }).then(res => {
            if (temp == 'ar') {
                fs.writeFileSync('./support/' + temp + '-AE.txt', res.text, 'utf8');
                fs.writeFileSync('./support/' + temp + '.txt', res.text, 'utf8');
            }
            else if (temp == 'zh-cn') {
                fs.writeFileSync('./support/zh.txt', res.text, 'utf8');
            }
            else {
                fs.writeFileSync('./support/' + temp + '.txt', res.text, 'utf8');
            }
            console.log('translated successfully')
        }).catch(err => {
            console.error('google translate quota exceeded')
        });
    })
    fs.writeFileSync('./support/en-GB.txt', culturefile1, 'utf8')
    fs.writeFileSync('./support/en-US.txt', culturefile1, 'utf8')
})

gulp.task('rename', function () {
    //rename new Hebrew and Norwegian code to old language code
    var newCode = ['iw', 'no'];
    var oldCode = ['he', 'nb'];
    for (var j = 0; j < newCode.length; j++) {
        if (fs.existsSync('./support/' + newCode[j] + '.txt')) {
            fs.renameSync('./support/' + newCode[j] + '.txt', './support/' + oldCode[j] + '.txt', 'utf8')
        }
    }
})
