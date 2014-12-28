#!/bin/bash
pandoc index.md --output index.html --mathjax=http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML --standalone --css=assets/style.css --highlight-style=pygments --table-of-contents --toc-depth=3 --include-before-body=assets/before.html --include-after-body=assets/after.html --include-in-header=assets/head.html
