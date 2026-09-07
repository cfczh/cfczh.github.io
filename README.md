# Michael Zhang · Academic Homepage

A responsive, static academic homepage for Michael Zhang / 张哲晗. The layout follows the restrained academic format of https://dylansheng.github.io/: profile sidebar, section navigation, serif body text, and blue accents.

## Preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` in this directory and open http://127.0.0.1:8000. No build step or external dependencies are required. The files can also be served through GitHub Pages.

## Editing

- `index.html`: profile, research interests, projects, education, and contact details.
- `styles.css`: desktop, mobile, reduced-motion, and print styles.
- `script.js`: mobile navigation, active section tracking, and email copying.
- `assets/monogram.svg`: locally hosted favicon. The profile monogram is styled in CSS.

## Content sources

The biography, education, internship, research projects, awards, and skills are based on the two-page CV at `/Users/zhangzhehan/Projects/CV/CV/pdf/Zhehan_Zhang_PhD_CV_2pages.pdf`, verified as two pages. A byte-for-byte copy is served from `assets/files/Zhehan_Zhang_CV.pdf`. The portrait comes from the CV project's `tmp/pdfs/resume_photo.png`. The university email and Michael alias are retained from the existing site.

ChartMirror is explicitly labeled as a planned submission to PacificVis 2027; The Afterlife of a Chart is an unpublished manuscript. Neither is presented as an accepted publication. Project graphics are decorative CSS illustrations, not screenshots or research results.

To update the downloadable CV, replace `assets/files/Zhehan_Zhang_CV.pdf` and reconcile the page copy. All assets are local, and the site has no build dependencies.
