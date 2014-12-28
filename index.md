![](HexastoreLogo.svg)

A fast, pure javascript triple store implementation, also useful as a graph database. Works in any browser, with browserify or webpack. Early development, API is subject to changes.

Hexastore is based on [this research paper](http://karras.rutgers.edu/hexastore.pdf). It is a way to structure RDF data such that queries are really fast. However, as implemented here, it has a 6 fold increase in memory usage as compared to a naive implementation of a triple store.

[![Travis](https://img.shields.io/travis/crubier/Hexastore.svg?style=flat-square)](https://travis-ci.org/crubier/Hexastore) [![Coverage Status](https://img.shields.io/coveralls/crubier/Hexastore.svg?style=flat-square)](https://coveralls.io/r/crubier/Hexastore) [![Gemnasium](https://img.shields.io/gemnasium/crubier/Hexastore.svg?style=flat-square)](https://gemnasium.com/crubier/Hexastore)  [![npm](https://img.shields.io/npm/dm/hexastore.svg?style=flat-square)](https://www.npmjs.com/package/hexastore) [![npm](https://img.shields.io/npm/v/hexastore.svg?style=flat-square)](https://www.npmjs.com/package/hexastore) [![node](https://img.shields.io/node/v/hexastore.svg?style=flat-square)](https://www.npmjs.com/package/hexastore)




# Hello

## Tests

### Some math

Lolilole

$$ 5 + 5 = 6 $$

Okiiii

$$\langle a,b,c\rangle \in \mathbb{N}^3 $$

loliloe

$$ A_\infty + \pi A_0$$

### And tables

Okau


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

--------------

### Here is some code

Wow :

    such.code("lolilo");

Ok !

### Lists

Here is a nice list

- Hello
- Wow
    - lol
        - wowioeoe
        - bouhou
    - aha
- Ok
    - nested !
    - olala !
- Lol


### Formatted code

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.haskell}
qsort []     = []
qsort (x:xs) = qsort (filter (< x) xs) ++ [x] ++
qsort (filter (>= x) xs)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Something else

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ { .javascript}
mydb.putAll([
  ["hexastore","is","nice"],
  ["hexastore","speed","fast"],
  ["javascript","is","nice"]
  ]);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Super

## A lot of text right here

### Le passage de Lorem Ipsum standard, utilisé depuis 1500

"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

###  Section 1.10.32 du "De Finibus Bonorum et Malorum" de Ciceron (45 av. J.-C.)

"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

### Traduction de H. Rackham (1914)

"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

### Section 1.10.33 du "De Finibus Bonorum et Malorum" de Ciceron (45 av. J.-C.)

"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."

## Math again

$$ x = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{a_3 + a_4}}} $$


$$\lim_{x\to 0}{\frac{e^x-1}{2x}}\overset{\left[\frac{0}{0}\right]}{\underset{\mathrm{H}}{=}}\lim_{x\to 0}{\frac{e^x}{2}}={\frac{1}{2}}$$


$$
\begin{gather*}
a_0=\frac{1}{\pi}\int\limits_{-\pi}^{\pi}f(x)\,\mathrm{d}x\\[6pt]
\begin{split}
a_n=\frac{1}{\pi}\int\limits_{-\pi}^{\pi}f(x)\cos nx\,\mathrm{d}x=\\
=\frac{1}{\pi}\int\limits_{-\pi}^{\pi}x^2\cos nx\,\mathrm{d}x
\end{split}\\[6pt]
\begin{split}
b_n=\frac{1}{\pi}\int\limits_{-\pi}^{\pi}f(x)\sin nx\,\mathrm{d}x=\\
=\frac{1}{\pi}\int\limits_{-\pi}^{\pi}x^2\sin nx\,\mathrm{d}x
\end{split}\\[6pt]
\end{gather*}
$$


$$
\begin{align*}
&\int_0^1 \int_0^{2(1-z)} \int_0^{3(1- x/2 - z)} dy \, dx \, dz\\
&\qquad =
\int_0^1 \int_0^{2(1-z)} 3\left(1 - \frac{x}{2} -  z \right) dx \,
dz\\
&\qquad = \int_0^1 3\left.\left[x - \frac{x^2}{4} -zx\right]_{x=0}^{x=2(1-z)}\right. dz\\
&\qquad = \int_0^1 3\left(2(1-z) - (1-z)^2 - 2z(1-z)\right) dz\\
&\qquad = \int_0^1 3(1 - 2z +z^2) dz\\
&\qquad =  3 \left.\left[ z - z^2 + \frac{z^3}{3} \right]_0^1\right.\\
&\qquad = 3\left(1 - 1 +\frac{1}{3}\right) = 3\left(\frac{1}{3}\right) = 1.
\end{align*}
$$

$$
\sum_{\substack{ a + b + c = 20 \\
  a,b,c \ge 0 \\ a + 2b \ge 5 }} abc
$$

# Hexastore

## Installation

It is pure JS, so nothing fancy, just:

    npm install hexastore

## Usage

### Create a database

Just require Hexastore, and then you can start creating stores everywhere !

    var Hexastore = require('Hexastore');
    var mydb = new Hexastore();

### Add triples

#### Add a single triple

    mydb.put(["hexastore","is","awesome"]);

#### Add a collection of triples

    mydb.putAll([
        ["hexastore","is","nice"],
        ["hexastore","speed","fast"],
        ["javascript","is","nice"]
      ]);

#### Add triples represented as nested JS objects

    mydb.addSPO({
        hexastore:{is:{awesome:true,nice:true},speed:{fast:true}},
        javascript:{is:{nice:true}}
      });

Or

    mydb.addSOP({
        hexastore:{awesome:{is:true},nice:{is:true},fast:{speed:true}},
        javascript:{nice:{is:true}}
      };)

You get it ? So basically you can use any of the 6 orderings of the hexastore :

    mydb.addSPO(...);
    mydb.addSOP(...);
    mydb.addOSP(...);
    mydb.addOPS(...);
    mydb.addPSO(...);
    mydb.addPOS(...);

#### Add named JS Objects

Finally, you can add arbitrary JS object this way, it acts a bit like Object Relational Mapping:

    mydb.addObject("bob",{address:{number:10,street:"Avenue des Champs Elysees",city:"Paris",country:"France"},friend:["toto","titi","tata"]})

Which is equivalent to:

    mydb.putAll([
        ["bob","address","bob/address"],
        ["bob/address","number","10"],
        ["bob/address","street","Avenue des Champs Elysees"],
        ["bob/address","city","Paris"],
        ["bob","friend","bob/friend"],
        ["bob/friend","0","toto"],
        ["bob/friend","1","titi"],
        ["bob/friend","2","tata"]
      ]);

### Import and export

Databases are imported and exported as Subjects containing Predicates containing Objects containing Values (SPO ordering). Import and export can work on normal JSON files, or on Zipped "data.json" files.

    db.import("Mydatabase");    // Import "Mydatabase.json"
    db.importZip("Mydatabase"); // Import "Mydatabase.zip"
    db.importNt("Mydatabase");  // Import "Mydatabase.nt"

    db.export("Mydatabase");    // Export "Mydatabase.json"
    db.exportZip("Mydatabase"); // Export "Mydatabase.zip"
    db.exportNt("Mydatabase");  // Export "Mydatabase.nt"

### Search

#### Simple search

Searching is **very** simple. Just query a set of triples, adding `[]` around variable names. This acts a bit like SQL `JOIN` statements.

    var result = db.search([
        [["what"],"is","nice"]
      ]);
    // result == [{what:hexastore},{what:javascript}]

A bit more complex

    var result = db.search([
        [["what"],"is","nice"]
        [["what"],"speed",["howfast"]]
      ]);
    // result == [{what:"hexastore",howfast:"fast"}]

Queries are really fast, so don't hesitate to do complex queries.

#### Using filters

You can use filters to filter results, a bit like in SQL `WHERE` statements

    var result = db.search([
          [["what"],"is","nice"]
        ]).filter(function(match){
          return match.what.length <10;
        })
    // result == [what:"hexastore"]

## Tests

    gulp test

## Contributing
