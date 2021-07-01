const gulp = require('gulp');
const less = require('gulp-less');
const esbuild = require('esbuild');
const esbuildSvelte = require("esbuild-svelte");


/* ----------------------------------------- */
/*  Compile LESS
/* ----------------------------------------- */

const MOUSEGUARD_LESS = ["styles/*.less"];
function compileLESS() {
  return gulp.src("styles/simple.less")
    .pipe(less())
    .pipe(gulp.dest("./styles/"))
}
const css = gulp.series(compileLESS);


//Compile JS
async function buildCode() {
  return esbuild.build({
    entryPoints: ["./module/mouseguard.js"],
    bundle: true,
    outfile: `./dist/mouseguard.js`,
    sourcemap: true,
    minify: false,
    format: "esm",
    platform: "browser",
    plugins: [esbuildSvelte()],
    external: ["../assets/*"],
  });
}

const build = gulp.series(buildCode);
exports.build = build;

const STSTEM_JS = ["module/**/*.js", "module/*.js", "module/**/*.svelte"];

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
  gulp.watch(STSTEM_JS, build);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(
  watchUpdates,
  buildCode,
);
exports.css = css;
