const gulp = require('gulp');
const sass = require('gulp-sass'); // we have not used sass so we removed sass
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('delete');

// require will not work because of ES6 so we use import instead moreover we also changed the package.json just befor debug "type":"module" so that import can work but issuw with this is that the server will not start as it treats every file as es module so its better to install gulp-imagemin@6.0.0

// npm install gulp-imagemin@6.0.0




gulp.task('css',function(done){// for minifying css
    console.log(`minfying css`);
    gulp.src('./assets/css/**/*.css')
    // .pipe(sass())
    .pipe(cssnano())
    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));

    
    done();
});


gulp.task('js',function(done){
    console.log('minfying js');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));


    done();
});

gulp.task('images',function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|svg|gif|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();    
})

gulp.task('clean:assets',function(done){
    console.log('cleaning assets');
    del.sync('./public/assets');
    done();
})

gulp.task('build',gulp.series('clean:assets','js','css','images'),function(done){
    console.log('building assets');
    done();
})



