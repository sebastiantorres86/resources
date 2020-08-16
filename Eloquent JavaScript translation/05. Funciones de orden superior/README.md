### Capítulo 5

# Funciones de orden superior

> «Tzu-li y Tzu-ssu se jactaban del tamaño de sus últimos programas. "Doscientas mil líneas", dijo Tzu-li, "¡sin contar los comentarios!" Tzu-ssu respondió: 'Pssh, la mía ya tiene casi un _millón_ de líneas'. El Maestro Yuan-Ma dijo: 'Mi mejor programa tiene quinientas líneas. 'Al escuchar esto, Tzu-li y Tzu-ssu se iluminaron.»
>
> Maestro Yuan-Ma, _El libro de programación_
>
> «Hay dos formas de construir un diseño de software: una forma es hacerlo tan simple que obviamente no haya deficiencias, y la otra forma es hacerlo tan complicado que no haya deficiencias obvias.»
>
> C.A.R. Hoare, _Conferencia del Premio ACM Turing de 1980_

![](https://eloquentjavascript.net/img/chapter_picture_5.jpg)

Un programa grande es un programa costoso, y no solo por el tiempo que lleva construirlo. El tamaño casi siempre implica complejidad y la complejidad confunde a los programadores. Los programadores confundidos, a su vez, introducen errores (_bugs_) en los programas. Un programa grande proporciona una gran cantidad de espacio para que estos bugs se oculten, lo que los hace difíciles de encontrar.

Volvamos brevemente a los dos últimos programas de ejemplo de la introducción. El primero es autónomo y tiene seis líneas.

```javascript
let total = 0,
  count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
```

El segundo se basa en dos funciones externas y tiene una línea de longitud.

```javascript
console.log(sum(range(1, 10)));
```

¿Cuál es más probable que contenga un error?

Si contamos el tamaño de las definiciones de `sum` y `range`, el segundo programa también es grande, incluso más grande que el primero. Pero aún así, diría que es más probable que sea correcto.

Es más probable que sea correcta porque la solución se expresa en un vocabulario que corresponde al problema que se está resolviendo. Sumar un rango de números no se trata de bucles y contadores. Se trata de rangos y sumas.

Las definiciones de este vocabulario (las funciones `sum` y `range`) aún incluirán bucles, contadores y otros detalles incidentales. Pero debido a que expresan conceptos más simples que el programa en su conjunto, es más fácil hacerlo bien.

## Abstracción

En el contexto de la programación, estos tipos de vocabularios suelen denominarse _abstracciones_. Las abstracciones ocultan detalles y nos dan la capacidad de hablar sobre problemas en un nivel superior (o más abstracto).

Como analogía, compare estas dos recetas de sopa de guisantes. El primero dice así:

> «Ponga 1 taza de guisantes secos por persona en un recipiente. Agrega agua hasta que los guisantes estén bien cubiertos. Deje los guisantes en agua durante al menos 12 horas. Saca los guisantes del agua y colócalos en una sartén. Agregue 4 tazas de agua por persona. Tape la sartén y mantenga los guisantes hirviendo a fuego lento durante dos horas. Toma media cebolla por persona. Córtalo en pedazos con un cuchillo. Agréguelo a los guisantes. Tome un tallo de apio por persona. Córtalo en pedazos con un cuchillo. Agréguelo a los guisantes. Toma una zanahoria por persona. Córtalo en pedazos. ¡Con un cuchillo! Agréguelo a los guisantes. Cocine por 10 minutos más.»

Y esta es la segunda receta:

> «Por persona: 1 taza de guisantes secos, media cebolla picada, un tallo de apio y una zanahoria.
>
> Remoje los guisantes durante 12 horas. Cocine a fuego lento durante 2 horas en 4 tazas de agua (por persona). Pica y agrega las verduras. Cocine por 10 minutos más.»

El segundo es más corto y más fácil de interpretar. Pero es necesario que comprenda algunas palabras más relacionadas con la cocina, como _remojar_, _hervir a fuego lento_, _picar_ y, supongo, _verdura_.

Al programar, no podemos confiar en todas las palabras que necesitamos que nos estén esperando en el diccionario. Por lo tanto, podríamos caer en el patrón de la primera receta: calcular los pasos precisos que la computadora tiene que realizar, uno por uno, ciega a los conceptos de nivel superior que expresan.

Es una habilidad útil, en programación, darse cuenta de cuándo se trabaja con un nivel de abstracción demasiado bajo.

## Abstrayendo la repetición

Las funciones simples, como las hemos visto hasta ahora, son una buena forma de construir abstracciones. Pero a veces se quedan cortos.

Es común que un programa haga algo un número determinado de veces. Puede escribir un bucle `for` para eso, así:

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

¿Podemos abstraer "hacer algo _N_ veces" como una función? Bueno, es fácil escribir una función que llame a `console.log` _N_ veces.

```javascript
function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
```

Pero, ¿y si queremos hacer algo más que registrar los números? Dado que "hacer algo" se puede representar como una función y las funciones son solo valores, podemos pasar nuestra acción como un valor de función.

```javascript
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// → 0
// → 1
// → 2
```

No tenemos que pasar una función predefinida para `repeat`. A menudo, es más fácil crear un valor de función en el lugar.

```javascript
let labels = [];
repeat(5, (i) => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
```

Está estructurado un poco como un bucle `for`: primero describe el tipo de bucle y luego proporciona un cuerpo. Sin embargo, el cuerpo ahora se escribe como un valor de función, que está entre paréntesis de la llamada a `repeat`. Es por eso que debe cerrarse con la llave de cierre _y_ el paréntesis de cierre. En casos como este ejemplo, donde el cuerpo es una sola expresión pequeña, también puede omitir las llaves y escribir el bucle en una sola línea.

## Funciones de orden superior

Las funciones que operan en otras funciones, ya sea tomándolas como argumentos o devolviéndolas, se denominan _funciones de orden superior_. Como ya hemos visto que las funciones son valores regulares, no hay nada particularmente notable en el hecho de que existan tales funciones. El término proviene de las matemáticas, donde la distinción entre funciones y otros valores se toma más en serio.

Las funciones de orden superior nos permiten abstraer _acciones_, no solo valores. Vienen en varias formas. Por ejemplo, podemos tener funciones que creen nuevas funciones.

```javascript
function greaterThan(n) {
  return m => m > n;
}
let ​​greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → verdadero
```

Y podemos tener funciones que cambien otras funciones.

```javascript
function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("calling with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → calling with [3, 2, 1], returned 1
```

Incluso podemos escribir funciones que proporcionen nuevos tipos de flujo de control.

```javascript
function unless(test, then) {
  if (!test) then();
}

repeat(3, (n) => {
  unless(n % 2 == 1, () => {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even
```

Hay un método de matriz incorporado, `forEach`, que proporciona algo así como un bucle `for / of` como una función de orden superior.

```javascript
["A", "B"].ForEach((l) => console.log(l));
// → A
// → B
```

## Conjunto de datos de script

Un área donde brillan las funciones de orden superior es el procesamiento de datos. Para procesar datos, necesitaremos algunos datos reales. Este capítulo utilizará un conjunto de datos sobre escrituras: sistemas de escritura como el latín, el cirílico o el árabe.

¿Recuerda Unicode del [Capítulo 1](), el sistema que asigna un número a cada carácter en el lenguaje escrito? La mayoría de estos caracteres están asociados con un script específico. El estándar contiene 140 secuencias de comandos diferentes: 81 todavía se utilizan en la actualidad y 59 son históricas.

Aunque solo puedo leer con fluidez caracteres latinos, aprecio el hecho de que la gente esté escribiendo textos en al menos otros 80 sistemas de escritura, muchos de los cuales ni siquiera reconocería. Por ejemplo, aquí hay una muestra de escritura tamil:

![](https://eloquentjavascript.net/img/tamil.png)

El conjunto de datos de ejemplo contiene algunos datos sobre los 140 scripts definidos en Unicode. Está disponible en la [zona de pruebas de codificación](https://eloquentjavascript.net/code#5) de este capítulo como enlace `SCRIPTS`. El enlace contiene una matriz de objetos, cada uno de los cuales describe un script.

```javascript
{
  name: "Copto",
  range: [
    [994, 1008],
    [11392, 11508],
    [11513, 11520]
  ],
  direction: "ltr",
  year: -200,
  living: falso,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
```

Dicho objeto nos dice el nombre del script, los rangos Unicode asignados, la dirección en la que está escrito, el tiempo de origen (aproximado), si todavía está en uso y un enlace a más información. La dirección puede ser `"ltr"` de izquierda a derecha, `"rtl"` de derecha a izquierda (la forma en que se escriben los textos en árabe y hebreo) o `"ttb"` de arriba a abajo (como en la escritura mongol).

La propiedad `ranges` contiene una matriz de rangos de caracteres Unicode, cada uno de los cuales es una matriz de dos elementos que contiene un límite inferior y un límite superior. Cualquier código de carácter dentro de estos rangos se asigna al script. El límite inferior es inclusivo (el código 994 es un carácter copto) y el límite superior es no inclusivo (el código 1008 no lo es).

## Filtrando matrices

Para encontrar los scripts en el conjunto de datos que todavía están en uso, la siguiente función puede resultar útil. Filtra los elementos de una matriz que no pasan una prueba.

```javascript
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      pass.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, (script) => script.living));
// → [{name: "Adlam",…},…]
```

La función usa el argumento llamado `test`, un valor de función, para llenar un "vacío" en el cálculo, el proceso de decidir qué elementos recolectar.

Observe cómo la función `filter` , en lugar de eliminar elementos de la matriz existente, crea una nueva matriz con solo los elementos que pasan la prueba. Esta función es _pura_. No modifica la matriz que se le da.

Como `forEach`, `filter` es un método de matriz estándar. El ejemplo definió la función solo para mostrar lo que hace internamente. A partir de ahora, lo usaremos así:

```javascript
console.log(SCRIPTS.filter((s) => s.direction == "ttb"));
// → [{name: "Mongol",…},…]
```

## Transformar con map

Digamos que tenemos una matriz de objetos que representan scripts, producidos filtrando la matriz `SCRIPTS` de alguna manera. Pero queremos una variedad de nombres, que sea más fácil de inspeccionar.

El método `map` transforma una matriz aplicando una función a todos sus elementos y construyendo una nueva matriz a partir de los valores devueltos. La nueva matriz tendrá la misma longitud que la matriz de entrada, pero la función habrá _mapeado_ su contenido a una nueva forma.

```javascript
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter((s) => s.direction == "rtl");
console.log(map(rtlScripts, (s) => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic",…]
```

Como `forEach` y `filter`, `map` es un método de matriz estándar.

## Resumiendo con reduce

Otra cosa común que se hace con las matrices es calcular un valor único a partir de ellas. Nuestro ejemplo recurrente, sumando una colección de números, es un ejemplo de esto. Otro ejemplo es encontrar el script con más caracteres.

La operación de orden superior que representa este patrón se llama _reduce_ (a veces también se llama _plegar_). Construye un valor tomando repetidamente un solo elemento de la matriz y combinándolo con el valor actual. Al sumar números, comenzaría con el número cero y, para cada elemento, agregaría eso a la suma.

Los parámetros de `reduce` son, además de la matriz, una función de combinación y un valor inicial. Esta función es un poco menos sencilla que el `filter` y el `map`, así que échale un vistazo de cerca:

```javascript
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```

El método de matriz estándar `reduce`, que por supuesto corresponde a esta función, tiene una conveniencia adicional. Si su matriz contiene al menos un elemento, puede dejar el argumento de inicio. El método tomará el primer elemento de la matriz como su valor inicial y comenzará a reducir en el segundo elemento.

```javascript
console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10
```

Para usar `reduce` (dos veces) para encontrar el script con más caracteres, podemos escribir algo como esto:

```javascript
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(
  SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  })
);
// → {name: "Han",…}
```

La función `characterCount` reduce los rangos asignados a un script sumando sus tamaños. Tenga en cuenta el uso de desestructuración en la lista de parámetros de la función reductora. La segunda llamada a `reduce` utiliza esto para encontrar el script más grande comparando repetidamente dos scripts y devolviendo el más grande.

El script Han tiene asignados más de 89.000 caracteres en el estándar Unicode, lo que lo convierte, con mucho, en el sistema de escritura más grande del conjunto de datos. Han es un script (a veces) que se utiliza para texto en chino, japonés y coreano. Esos idiomas comparten muchos caracteres, aunque tienden a escribirlos de manera diferente. El Consorcio Unicode (con sede en EE. UU.) Decidió tratarlos como un único sistema de escritura para guardar códigos de caracteres. Esto se llama _unificación Han_ y todavía enoja mucho a algunas personas.

## Composabilidad

Considere cómo habríamos escrito el ejemplo anterior (encontrando el script más grande) sin funciones de orden superior. El código no es mucho peor.

```javascript
let biggest = null;
for (let script of SCRIPTS) {
  if (biggest == null || characterCount(biggest) < characterCount(script)) {
    biggest = script;
  }
}
console.log(biggest);
// → {name: "Han",…}
```

Hay algunas vinculaciones más y el programa es cuatro líneas más largo. Pero sigue siendo muy legible.

Las funciones de orden superior comienzan a brillar cuando necesita _componer_ operaciones. Como ejemplo, escribamos código que encuentre el año promedio de origen de los scripts vivos y muertos en el conjunto de datos.

```javascript
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(
  Math.round(average(SCRIPTS.filter((s) => s.living).map((s) => s.year)))
);
// → 1165
console.log(
  Math.round(average(SCRIPTS.filter((s) => !S.living).map((s) => s.year)))
);
// → 204
```

Entonces, los scripts muertos en Unicode son, en promedio, más antiguos que los vivos. Esta no es una estadística muy significativa o sorprendente. Pero espero que esté de acuerdo en que el código utilizado para calcularlo no es difícil de leer. Puede verlo como una canalización: comenzamos con todos los scripts, filtramos los vivos (o muertos), tomamos los años de esos, los promediamos y redondeamos el resultado.

Definitivamente también podría escribir este cálculo como un gran bucle.

```javascript
let total = 0,
  count = 0;
for (let scripts of SCRIPTS) {
  if (script.living) {
    total += script.year;
    contar += 1;
  }
}
console.log(Math.round(total / count));
// → 1165
```

Pero es más difícil ver qué se estaba calculando y cómo. Y debido a que los resultados intermedios no se representan como valores coherentes, sería mucho más complicado extraer algo como el `average` en una función separada.

En términos de lo que realmente hace la computadora, estos dos enfoques también son bastante diferentes. El primero creará nuevas matrices al ejecutar `filter` y `map`, mientras que el segundo calcula solo algunos números, haciendo menos trabajo. Por lo general, puede pagar el enfoque legible, pero si está procesando matrices enormes y lo hace tantas veces, el estilo menos abstracto podría valer la pena la velocidad adicional.

## Cadenas y códigos de caracteres

Un uso del conjunto de datos sería averiguar qué secuencia de comandos está usando un fragmento de texto. Repasemos un programa que hace esto.

Recuerde que cada secuencia de comandos tiene una matriz de rangos de códigos de caracteres asociados. Entonces, dado un código de carácter, podríamos usar una función como esta para encontrar el script correspondiente (si lo hay):

```javascript
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latín",…}
```

El método `some` es otra función de orden superior. Toma una función de prueba y le dice si esa función devuelve verdadero para cualquiera de los elementos de la matriz.

Pero, ¿cómo obtenemos los códigos de caracteres en una cadena?

En el [Capítulo 1]() mencioné que las cadenas de JavaScript están codificadas como una secuencia de números de 16 bits. Estos se denominan _unidades de código_. Inicialmente, se suponía que un código de caracteres Unicode encajaba dentro de dicha unidad (lo que le da un poco más de 65.000 caracteres). Cuando quedó claro que no sería suficiente, muchas personas se resistieron a la necesidad de utilizar más memoria por carácter. Para abordar estas preocupaciones, se inventó UTF-16, el formato utilizado por las cadenas de JavaScript. Describe los caracteres más comunes usando una sola unidad de código de 16 bits, pero usa un par de dos de tales unidades para otras.

UTF-16 generalmente se considera una mala idea en la actualidad. Parece diseñado casi intencionalmente para invitar a errores. Es fácil escribir programas que simulen que las unidades de código y los caracteres son lo mismo. Y si su idioma no usa caracteres de dos unidades, parecerá que funciona bien. Pero tan pronto como alguien intenta usar un programa de este tipo con algunos caracteres chinos menos comunes, se rompe. Afortunadamente, con el advenimiento de los emoji, todo el mundo ha comenzado a utilizar caracteres de dos unidades y la carga de lidiar con estos problemas se distribuye de manera más justa.

Desafortunadamente, las operaciones obvias en cadenas de JavaScript, como obtener su longitud a través de la propiedad length y acceder a su contenido usando corchetes, solo tratan con unidades de código.

```javascript
// Two emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half.character)
console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character)
console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse emoji)
```

El método `charCodeAt` de JavaScript le proporciona una unidad de código, no un código de carácter completo. El método `codePointAt`, agregado más adelante, proporciona un carácter Unicode completo. Entonces podríamos usar eso para obtener caracteres de una cadena. Pero el argumento pasado a `codePointAt` sigue siendo un índice en la secuencia de unidades de código. Entonces, para recorrer todos los caracteres de una cadena, aún tendríamos que abordar la cuestión de si un carácter ocupa una o dos unidades de código.

En el [capítulo anterior](), mencioné que un bucle `for / of` también se puede usar en cadenas. Al igual que `codePointAt`, este tipo de bucle se introdujo en un momento en el que la gente era muy consciente de los problemas con UTF-16. Cuando lo usa para recorrer una cadena, le brinda caracteres reales, no unidades de código.

```javascript
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
  console.log(char);
}
// → 🌹
// → 🐉
```

Si tiene un carácter (que será una cadena de una o dos unidades de código), puede usar `codePointAt(0)` para obtener su código.

## Reconociendo texto

Tenemos una función `characterScript` y una forma de recorrer correctamente los caracteres. El siguiente paso es contar los caracteres que pertenecen a cada script. La siguiente abstracción de conteo será útil allí:

```javascript
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(element);
    let know = count.findIndex((c) => c.name == name);
    if (know == -1) {
      count.push({ name, count: 1 });
    } else {
      counts[know].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]
```

La función `countBy` espera una colección (cualquier cosa con la que podamos recorrer con `for / of`) y una función que calcula un nombre de grupo para un elemento dado. Devuelve una matriz de objetos, cada uno de los cuales nombra un grupo y le dice el número de elementos que se encontraron en ese grupo.

Utiliza otro método de matriz: `findIndex`. Este método es algo así como `indexOf`, pero en lugar de buscar un valor específico, encuentra el primer valor para el que la función dada devuelve verdadero. Como `indexOf`, devuelve -1 cuando no se encuentra dicho elemento.

Usando `countBy`, podemos escribir la función que nos dice qué scripts se usan en un fragmento de texto.

```javascript
function textScripts(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");

  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}% ${name}`;
    })
    .join(", ");
}

console.log(textScripts('英国 的 狗 说 "guau", 俄罗斯 的 狗 说 "тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic
```

La función primero cuenta los caracteres por nombre, usando `characterScript` para asignarles un nombre y recurriendo a la cadena `"none"` para los caracteres que no forman parte de ningún script. La llamada de filtro elimina la entrada para `"none"` de la matriz resultante, ya que no estamos interesados ​​en esos caracteres.

Para poder calcular porcentajes, primero necesitamos el número total de caracteres que pertenecen a un script, que podemos calcular con `reduce`. Si no se encuentran tales caracteres, la función devuelve una cadena específica. De lo contrario, transforma las entradas de conteo en cadenas legibles con `map` y luego las combina con `join`.

## Resumen

Ser capaz de pasar valores de función a otras funciones es un aspecto muy útil de JavaScript. Nos permite escribir funciones que modelen cálculos con "huecos" en ellos. El código que llama a estas funciones puede llenar los vacíos proporcionando valores de función.

Las matrices proporcionan varios métodos útiles de orden superior. Puede usar `forEach` para recorrer los elementos de una matriz. El método de `filter` devuelve una nueva matriz que contiene solo los elementos que pasan la función de predicado. La transformación de una matriz poniendo cada elemento a través de una función se realiza con `map`. Puede usar `reduce` para combinar todos los elementos de una matriz en un solo valor. El método `some` prueba si algún elemento coincide con una función de predicado determinada. Y `findIndex` busca la posición del primer elemento que coincide con un predicado.

## Ejercicios

### Aplastamiento

Utilice el método `reduce` en combinación con el método `concat` para "aplanar" una matriz de matrices en una única matriz que tenga todos los elementos de las matrices originales.

```javascript
let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]
```

### Tu propio bucle

Escriba una función de orden superior `loop` que proporcione algo así como una instrucción de bucle `for`. Toma un valor, una función de prueba, una función de actualización y una función de cuerpo. En cada iteración, primero ejecuta la función de prueba en el valor del ciclo actual y se detiene si devuelve falso. Luego llama a la función del cuerpo, dándole el valor actual. Finalmente, llama a la función de actualización para crear un nuevo valor y comienza desde el principio.

Al definir la función, puede utilizar un bucle regular para realizar el bucle real.

```javascript
// Your code here.

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);
// → 3
// → 2
// → 1
```

### Todo

De manera análoga al método `some`, las matrices también tienen un método `every`. Este devuelve verdadero cuando la función dada devuelve verdadero para _cada_ elemento de la matriz. En cierto modo, `some` es una versión del operador `||` que actúa sobre matrices, y `every` es como el operador `&&`.

Implemente `every` como una función que tome una matriz y una función de predicado como parámetros. Escribe dos versiones, una usando un bucle y otra usando el método `some`.

```javascript
function every(array, test) {
  // Your code here.
}

console.log(every([1, 3, 5], (n) => n < 10));
// → true
console.log(every([2, 4, 16], (n) => n < 10));
// → false
console.log(every([], (n) => n < 10));
// → true
```

<details>
  <summary>Mostrar pistas...</summary>

Al igual que el operador `&&`, el método `every` puede dejar de evaluar más elementos tan pronto como encuentre uno que no coincida. Por lo tanto, la versión basada en bucle puede salirse del bucle, con `break` o `return`, tan pronto como se encuentre con un elemento para el que la función de predicado devuelve falso. Si el ciclo llega al final sin encontrar tal elemento, sabemos que todos los elementos coinciden y debemos devolver verdadero.

Para construir `every` sobre `some`, podemos aplicar las _leyes de De Morgan_, que establecen que `a && b` es igual `(!a || !b)`. Esto se puede generalizar a matrices, donde todos los elementos de la matriz coinciden si no hay ningún elemento en la matriz que no coincida.

</details>

### Dirección de escritura dominante

Escribe una función que calcule la dirección de escritura dominante en una cadena de texto. Recuerde que cada objeto de secuencia de comandos tiene una propiedad de `direction` que puede ser `"ltr"` (de izquierda a derecha), `"rtl"` (de derecha a izquierda) o `"ttb"` (de arriba a abajo).

La dirección dominante es la dirección de la mayoría de los caracteres que tienen un guión asociado. Las funciones `characterScript` y `countBy` definidas anteriormente en este capítulo probablemente sean útiles aquí.

```javascript
function dominantDirection(text) {
  // Your code here.
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
```

<details>
  <summary>Mostrar pistas</summary>

Su solución puede parecerse mucho a la primera mitad del ejemplo de `textScripts`. De nuevo, debe contar los caracteres según un criterio basado en `characterScript` y luego filtrar la parte del resultado que se refiere a caracteres poco interesantes (sin script).

Encontrar la dirección con el mayor número de caracteres se puede hacer con `reduce`. Si no está claro cómo, consulte el ejemplo anterior en el capítulo, donde se usó `reduce` para encontrar el script con más caracteres.

</details>
