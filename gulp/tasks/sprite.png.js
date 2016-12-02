'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function () {
    var spriteData =
      $.gulp.src('./source/images/sprite/*.png')
        .pipe($.gp.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe($.gp.spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.scss',
          cssFormat: 'css',
          padding: 30,
          imgPath: '../img/sprite.png',
          cssVarMap: function (sprite) {
            sprite.name = 'icon-' + sprite.name;
          },
      	}));

        spriteData.img.pipe($.gulp.dest($.config.root + '/assets/img'));
        spriteData.css.pipe($.gulp.dest('./source/style/common/'));
        return spriteData;
    });
};
