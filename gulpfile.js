import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import fileinclude from "gulp-file-include";
import cssmin from "gulp-cssmin";
import concatCss from "gulp-concat-css";
import autoprefixer from "gulp-autoprefixer";
import sync from "browser-sync";
sync.create();

// HTML

export const html = () => {
	return gulp
		.src("src/html/**/*.html")
		.pipe(fileinclude())
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest("dist"));
};

// Styles

export const styles = () => {
	return gulp
		.src("src/css/*.css")
		.pipe(autoprefixer())
		.pipe(concatCss("index.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"))
		.pipe(gulp.src("src/css/__static/**/*.css"))
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"));
};

// More

export const more = () => {
	return gulp.src("src/more/**/*").pipe(gulp.dest("dist"));
};

// Fonts

export const fonts = () => {
	return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
};

// Images

export const images = () => {
	return gulp.src("src/img/**/*").pipe(gulp.dest("dist/img"));
};

// Server

export const server = () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: "dist",
		},
	});
};

// Watch

export const watch = () => {
	gulp.watch("src/**/*.html", gulp.series(html));
	gulp.watch("src/**/*.css", gulp.series(styles));
	gulp.watch(
		["src/more/**/*", "src/fonts/**/*", "src/img/**/*"],
		gulp.series(more, fonts, images)
	);
};

// Default

export default gulp.series(
	gulp.parallel(html, styles, more, fonts, images),
	gulp.parallel(watch, server)
);
