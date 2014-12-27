#!/bin/bash
pandoc index.md --output index.html --mathjax=http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML --standalone --css=style.css --highlight-style=pygments  --table-of-contents --toc-depth=3 --include-after-body=after.html --include-in-header=head.html
