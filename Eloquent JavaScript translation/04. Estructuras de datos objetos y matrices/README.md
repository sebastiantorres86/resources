### Capítulo 4

# Estructuras de datos: objetos y matrices

> «En dos ocasiones me han preguntado: 'Ore, Sr. Babbage, si pone en la máquina cifras incorrectas, ¿saldrán las respuestas correctas?' [...] No soy capaz de captar correctamente el tipo de confusión de ideas que podría provocar tal pregunta.»
>
> Charles Babbage, _Pasajes de la vida de un filósofo (1864)_

![](https://eloquentjavascript.net/img/chapter_picture_4.jpg)

Los números, los valores booleanos y las cadenas son los átomos a partir de los cuales se construyen las estructuras de datos. Sin embargo, muchos tipos de información requieren más de un átomo. Los _objetos_ nos permiten agrupar valores, incluidos otros objetos, para construir estructuras más complejas.

Los programas que hemos construido hasta ahora han estado limitados por el hecho de que operaban solo con tipos de datos simples. Este capítulo presentará las estructuras de datos básicas. Al final, sabrá lo suficiente para comenzar a escribir programas útiles.

El capítulo trabajará a través de un ejemplo de programación más o menos realista, presentando conceptos que se aplican al problema en cuestión. El código de ejemplo a menudo se basará en funciones y enlaces que se introdujeron anteriormente en el texto.

## La ardilla

De vez en cuando, generalmente entre las 8 p.m. y las 10 p.m., Jacques se encuentra transformándose en un pequeño roedor peludo con una cola tupida.

Por un lado, Jacques está bastante contento de no tener la licantropía clásica. Convertirse en ardilla causa menos problemas que convertirse en lobo. En lugar de tener que preocuparse por comerse accidentalmente al vecino (_eso_ sería incómodo), le preocupa que el gato del vecino se lo coma. Tras dos ocasiones en las que se despertó en una rama precariamente delgada en la copa de un roble, desnudo y desorientado, ha empezado a cerrar las puertas y ventanas de su habitación por la noche y a poner unas nueces en el suelo para mantenerse ocupado.

Eso se encarga de los problemas de los gatos y los árboles. Pero Jacques preferiría deshacerse de su condición por completo. Las ocurrencias irregulares de la transformación le hacen sospechar que podrían ser provocadas por algo. Durante un tiempo, creyó que solo sucedía los días en que había estado cerca de robles. Pero evitar los robles no detuvo el problema.

Al cambiar a un enfoque más científico, Jacques ha comenzado a llevar un registro diario de todo lo que hace en un día determinado y si cambió de forma. Con estos datos espera acotar las condiciones que desencadenan las transformaciones.

Lo primero que necesita es una estructura de datos para almacenar esta información.

## Conjuntos de datos

Para trabajar con una gran cantidad de datos digitales, primero tendremos que encontrar una forma de representarlos en la memoria de nuestra máquina. Digamos, por ejemplo, que queremos representar una colección de los números 2, 3, 5, 7 y 11.

Podríamos ser creativos con las cadenas (después de todo, las cadenas pueden tener cualquier longitud, por lo que podemos poner muchos datos en ellas) y usar `"2 3 5 7 11"` como nuestra representación. Pero esto es incómodo. Tendría que extraer de alguna manera los dígitos y convertirlos nuevamente en números para acceder a ellos.

Afortunadamente, JavaScript proporciona un tipo de datos específicamente para almacenar secuencias de valores. Se llama _matriz_ y se escribe como una lista de valores entre corchetes, separados por comas.

```javascript
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3
```

La notación para llegar a los elementos dentro de una matriz también usa corchetes. Un par de corchetes inmediatamente después de una expresión, con otra expresión dentro de ellos, buscará el elemento en la expresión de la izquierda que corresponde al índice dado por la expresión entre corchetes.

El primer índice de una matriz es cero, no uno. Entonces, el primer elemento se recupera con `listOfNumbers[0]`. El conteo basado en cero tiene una larga tradición en la tecnología y, en ciertos aspectos, tiene mucho sentido, pero lleva un tiempo acostumbrarse. Piense en el índice como la cantidad de elementos a omitir, contando desde el comienzo de la matriz.

## Propiedades

Hemos visto algunas expresiones de apariencia sospechosa como `myString.length` (para obtener la longitud de una cadena) y `Math.max` (la función máxima) en capítulos anteriores. Son expresiones que acceden a una _propiedad_ de algún valor. En el primer caso, accedemos a la propiedad `length` del valor en `myString`. En el segundo, accedemos a la propiedad denominada `max` en el objeto `Math` (que es una colección de constantes y funciones relacionadas con las matemáticas).

Casi todos los valores de JavaScript tienen propiedades. Las excepciones son `null` e `undefined`. Si intenta acceder a una propiedad en uno de estos no valores, obtiene un error.

```javascript
null.length;
// → TypeError: null has no properties
```

Las dos formas principales de acceder a las propiedades en JavaScript son con un punto y con corchetes. Tanto `value.x` y `value[x]` acceden a una propiedad en `value`, pero no necesariamente a la misma propiedad. La diferencia está en cómo se interpreta `x`. Cuando se usa un punto, la palabra después del punto es el nombre literal de la propiedad. Cuando se utilizan corchetes, la expresión entre corchetes se evalúa para obtener el nombre de la propiedad. Mientras que `value.x` obtiene la propiedad de `value` denominada “x”, `value[x]` intenta evaluar la expresión `x` y usa el resultado, convertido en una cadena, como el nombre de la propiedad.

Entonces, si sabe que la propiedad que le interesa se llama _color_, diga `value.color`. Si desea extraer la propiedad nombrada por el valor contenido en el enlace `i`, diga `value[i]`. Los nombres de propiedad son cadenas. Pueden ser cualquier cadena, pero la notación de puntos solo funciona con nombres que parecen nombres de enlace válidos. Por lo tanto, si desea acceder a una propiedad llamada _2_ o _John Doe_, debe usar corchetes: `value[2]` o `value["John Doe"]`.

Los elementos de una matriz se almacenan como propiedades de la matriz, utilizando números como nombres de propiedad. Debido a que no puede usar la notación de puntos con números y, por lo general, desea usar un enlace que contenga el índice de todos modos, debe usar la notación de corchetes para obtenerlos.

La propiedad `length` de una matriz nos dice cuántos elementos tiene. Este nombre de propiedad es un nombre de enlace válido, y sabemos su nombre de antemano, por lo que para encontrar la longitud de una matriz, normalmente escribe `array.length` porque es más fácil de escribir que `array["length"]`.

## Métodos

Tanto los valores de cadena como los de matriz contienen, además de la propiedad `length`, varias propiedades que contienen valores de función.

```javascript
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// → función
console.log(doh.toUpperCase());
// → DOH
```

Cada cadena tiene una propiedad `toUpperCase`. Cuando se llama, devolverá una copia de la cadena en la que todas las letras se han convertido a mayúsculas. También está `toLowerCase`, yendo en sentido contrario.

Curiosamente, aunque la llamada a `toUpperCase` no pasa ningún argumento, la función de alguna manera tiene acceso a la cadena `"Doh"`, el valor cuya propiedad llamamos. Cómo funciona esto se describe en el [Capítulo 6]().

Las propiedades que contienen funciones se denominan generalmente _métodos_ del valor al que pertenecen, como en "`toUpperCase` es un método de una cadena".

Este ejemplo muestra dos métodos que puede utilizar para manipular matrices:

```javascript
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
```

El método `push` agrega valores al final de una matriz, y el método `pop` hace lo contrario, eliminando el último valor de la matriz y devolviéndolo.

Estos nombres algo tontos son los términos tradicionales para las operaciones en una _pila_. Una pila, en programación, es una estructura de datos que le permite insertar valores en ella y sacarlos nuevamente en el orden opuesto para que la última cosa que se agregó se elimine primero. Estos son comunes en la programación; es posible que recuerde la pila de llamadas a funciones [del capítulo anterior](), que es una instancia de la misma idea.

## Objetos

De vuelta al hombre ardilla. Un conjunto de entradas de registro diarias se puede representar como una matriz. Pero las entradas no constan solo de un número o una cadena; cada entrada necesita almacenar una lista de actividades y un valor booleano que indique si Jacques se convirtió en una ardilla o no. Idealmente, nos gustaría agruparlos en un solo valor y luego poner esos valores agrupados en una matriz de entradas de registro.

Los valores del tipo _objeto_ son colecciones arbitrarias de propiedades. Una forma de crear un objeto es utilizando llaves como expresión.

```javascript
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"],
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = falso;
console.log(day1.wolf);
// → false
```

Dentro de las llaves, hay una lista de propiedades separadas por comas. Cada propiedad tiene un nombre seguido de dos puntos y un valor. Cuando un objeto se escribe en varias líneas, sangrarlo como en el ejemplo ayuda a mejorar la legibilidad. Las propiedades cuyos nombres no sean nombres vinculantes válidos o números válidos deben estar entre comillas.

```javascript
let descriptions = {
  work: "Went to work",
  "touched tree": "Touched tree",
};
```

Esto significa que las llaves tienen _dos_ significados en JavaScript. Al comienzo de una declaración, comienzan un bloque de declaraciones. En cualquier otra posición, describen un objeto. Afortunadamente, rara vez es útil comenzar una declaración con un objeto entre llaves, por lo que la ambigüedad entre estos dos no es un gran problema.

Leer una propiedad que no existe le dará el valor `undefined`.

Es posible asignar un valor a una expresión de propiedad con el operador `=`. Esto reemplazará el valor de la propiedad si ya existía o creará una nueva propiedad en el objeto si no existía.

Para volver brevemente a nuestro modelo de enlaces de tentáculo, los enlaces de propiedad son similares. _Captan_ valores, pero es posible que otros enlaces y propiedades mantengan esos mismos valores. Puede pensar en los objetos como pulpos con cualquier número de tentáculos, cada uno de los cuales tiene un nombre tatuado.

El operador `delete` corta un tentáculo de tal pulpo. Es un operador unario que, cuando se aplica a una propiedad de objeto, eliminará la propiedad nombrada del objeto. Esto no es algo común, pero es posible.

```javascript
let anObject = { left: 1, right: 2 };
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true
```

El operador binario `in`, cuando se aplica a una cadena y un objeto, le dice si ese objeto tiene una propiedad con ese nombre. La diferencia entre establecer una propiedad como `undefined` y eliminarla es que, en el primer caso, el objeto todavía _tiene_ la propiedad (simplemente no tiene un valor muy interesante), mientras que en el segundo caso la propiedad ya no está presente. y en devolverá `false`.

Para averiguar qué propiedades tiene un objeto, puede utilizar la función `Object.keys`. Le da un objeto y devuelve una matriz de cadenas: los nombres de propiedad del objeto.

```javascript
console.log(Object.keys({ x: 0, y: 0, z: 2 }));
// → ["x", "y", "z"]
```

Hay una función `Object.assign` que copia todas las propiedades de un objeto a otro.

```javascript
let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });
console.log(objectA);
// → {a: 1, b: 3, c: 4}
```

Las matrices, entonces, son solo una especie de objeto especializado para almacenar secuencias de cosas. Si evalúa `typeof []`, produce `"object"`. Puede verlos como pulpos largos y planos con todos sus tentáculos en una fila ordenada, etiquetados con números.

Representaremos el diario que Jacques guarda como una serie de objetos.

```javascript
let journal = [
  {
    events: ["work", "touched tree", "pizza", "running", "television"],
    squirrel: false,
  },
  {
    events: [
      "work",
      "ice cream",
      "cauliflower",
      "lasagna",
      "touched tree",
      "brushed teeth",
    ],
    squirrel: false,
  },
  {
    events: ["weekend", "cycling", "break", "peanuts", "beer"],
    squirrel: true,
  },
  /* and so on... */
];
```

## Mutabilidad

Pronto llegaremos a la programación _real_. Primero, hay una pieza más de teoría que comprender.

Vimos que los valores de los objetos se pueden modificar. Los tipos de valores discutidos en capítulos anteriores, como números, cadenas y booleanos, son todos _inmutables_; es imposible cambiar los valores de esos tipos. Puede combinarlos y derivar nuevos valores de ellos, pero cuando toma un valor de cadena específico, ese valor siempre será el mismo. El texto que contiene no se puede cambiar. Si tiene una cadena que contiene `"cat"`, no es posible que otro código cambie un carácter en su cadena para que se deletree `"rat"`.

Los objetos funcionan de manera diferente. _Puede_ cambiar sus propiedades, lo que hace que el valor de un solo objeto tenga contenido diferente en momentos diferentes.

Cuando tenemos dos números, 120 y 120, podemos considerarlos precisamente el mismo número, se refieran o no a los mismos bits físicos. Con los objetos, existe una diferencia entre tener dos referencias al mismo objeto y tener dos objetos diferentes que contienen las mismas propiedades. Considere el siguiente código:

```javascript
let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };

console.log(object1 == object2);
// → verdadero
console.log(object1 == object3);
// → falso

object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10
```

Los enlaces `object1` y `object2` agarran el mismo objeto, por lo que cambiar `object1` también cambia el valor de `object2`. Se dice que tienen la misma identidad. El enlace `object3` apunta a un objeto diferente, que inicialmente contiene las mismas propiedades que el `object1` pero vive una vida separada.

Los enlaces también pueden ser cambiantes o constantes, pero esto es independiente de la forma en que se comportan sus valores. Aunque los valores numéricos no cambian, puede usar un enlace `let` para realizar un seguimiento de un número cambiante cambiando el valor en el que apunta el enlace. De manera similar, aunque un enlace `const` a un objeto no se puede cambiar y continuará apuntando al mismo objeto, el _contenido_ de ese objeto podría cambiar.

```javascript
const score = { visitors: 0, home: 0 };
// Esto está bien
score.visitors = 1;
// Esto no está permitido
score = { visitors: 1, home: 1 };
```

Cuando compara objetos con el operador `==` de JavaScript, compara por identidad: producirá `true` solo si ambos objetos tienen exactamente el mismo valor. La comparación de diferentes objetos devolverá `false`, incluso si tienen propiedades idénticas. No existe una operación de comparación "profunda" integrada en JavaScript, que compara objetos por contenido, pero es posible escribirla usted mismo (que es uno de los ejercicios al final de este capítulo).

## El registro del licántropo

Entonces, Jacques inicia su intérprete de JavaScript y configura el entorno que necesita para llevar su diario.

```javascript
let journal = [];

function addEntry(events, squirrel) {
  journal.push({ events, squirrel });
}
```

Tenga en cuenta que el objeto agregado al diario parece un poco extraño. En lugar de declarar propiedades como `events: events`, solo da un nombre de propiedad. Esta es una abreviatura que significa lo mismo: si el nombre de una propiedad en notación entre llaves no va seguido de un valor, su valor se toma del enlace con el mismo nombre.

Entonces, todas las tardes a las 10 de la noche, o a veces a la mañana siguiente, después de bajar del estante superior de su biblioteca, Jacques registra el día.

```javascript
addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(
  [
    "work",
    "ice cream",
    "cauliflower",
    "lasagna",
    "touched tree",
    "brushed teeth",
  ],
  false
);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);
```

Una vez que tenga suficientes puntos de datos, tiene la intención de usar estadísticas para averiguar cuál de estos eventos puede estar relacionado con las ardillas.

La _correlación_ es una medida de dependencia entre variables estadísticas. Una variable estadística no es exactamente lo mismo que una variable de programación. En estadística, normalmente tiene un conjunto de _mediciones_ y cada variable se mide para cada medición. La correlación entre variables generalmente se expresa como un valor que va de -1 a 1. La correlación cero significa que las variables no están relacionadas. Una correlación de uno indica que los dos están perfectamente relacionados: si conoce uno, también conoce al otro. Uno negativo también significa que las variables están perfectamente relacionadas pero que son opuestas: cuando una es verdadera, la otra es falsa.

Para calcular la medida de correlación entre dos variables booleanas, podemos usar el _coeficiente phi_ (_ϕ_). Esta es una fórmula cuya entrada es una tabla de frecuencias que contiene el número de veces que se observaron las diferentes combinaciones de las variables. El resultado de la fórmula es un número entre -1 y 1 que describe la correlación.

Podríamos tomar el evento de comer pizza y ponerlo en una tabla de frecuencia como esta, donde cada número indica la cantidad de veces que ocurrió esa combinación en nuestras mediciones:

![](https://eloquentjavascript.net/img/pizza-squirrel.svg)

Si llamamos a esa tabla _n_, podemos calcular _ϕ_ usando la siguiente fórmula:

_ϕ_ = (n<sub>11</sub>n<sub>00</sub> - n<sub>10</sub>n<sub>01</sub>)/
(√(n<sub>1•</sub> n<sub>0•</sub> n<sub>•1</sub> n<sub>•0</sub>))

(Si en este punto estás dejando el libro para enfocarte en un terrible flashback de la clase de matemáticas de décimo grado, ¡espera! No pretendo torturarte con páginas interminables de notación críptica, es solo esta fórmula por ahora. Y incluso con esta, todo lo que hacemos es convertirlo en JavaScript).

La notación _n<sub>01</sub>_ indica el número de mediciones donde la primera variable (squirrelness) es falsa (0) y la segunda variable (pizza) es verdadera (1). En la tabla de pizza, _n<sub>01</sub>_ es 9.

El valor _n<sub>1•</sub>_ se refiere a la suma de todas las medidas donde la primera variable es verdadera, que es 5 en la tabla de ejemplo. Asimismo, _n<sub>•0</sub>_ se refiere a la suma de las medidas donde la segunda variable es falsa.

Entonces, para la tabla de la pizza, la parte sobre la línea de división (el dividendo) sería 1 × 76−4 × 9 = 40, y la parte debajo (el divisor) sería la raíz cuadrada de 5 × 85 × 10 × 80 o √340000. Esto resulta en _ϕ_ ≈ 0.069, que es pequeño. Comer pizza no parece influir en las transformaciones.

## Correlación informática

Podemos representar una tabla de dos por dos en JavaScript con una matriz de cuatro elementos (`[76, 9, 4, 1]`). También podríamos utilizar otras representaciones, como una matriz que contiene dos matrices de dos elementos (`[[76, 9], [4, 1]]`) o un objeto con nombres de propiedad como `"11"` y `"01"`, pero la matriz plana es simple y hace que las expresiones que acceden a la tabla sean agradablemente cortas. Interpretaremos los índices de la matriz como números binarios de dos bits, donde el dígito más a la izquierda (más significativo) se refiere a la variable ardilla y el dígito más a la derecha (menos significativo) se refiere a la variable de evento. Por ejemplo, el número binario 10 se refiere al caso en el que Jacques se convirtió en una ardilla, pero el evento (digamos, "pizza") no ocurrió. Esto sucedió cuatro veces. Y dado que el `10` binario es 2 en notación decimal, almacenaremos este número en el índice 2 de la matriz.

Esta es la función que calcula el coeficiente _ϕ_ de dicha matriz:

```javascript
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}

console.log(phi([76, 9, 4, 1]));
// → 0.068599434
```

Esta es una traducción directa de la fórmula _ϕ_ a JavaScript. `Math.sqrt` es la función de raíz cuadrada, proporcionada por el objeto `Math` en un entorno JavaScript estándar. Tenemos que agregar dos campos de la tabla para obtener campos como n<sub>1•</sub> porque las sumas de filas o columnas no se almacenan directamente en nuestra estructura de datos.

Jacques mantuvo su diario durante tres meses. El conjunto de datos resultante está disponible en la [zona de pruebas de codificación](https://eloquentjavascript.net/code#4) de este capítulo, donde se almacena en el enlace de `JOURNAL` y en un [archivo](https://eloquentjavascript.net/code/journal.js) descargable.

Para extraer una tabla de dos por dos para un evento específico del diario, debemos recorrer todas las entradas y contar cuántas veces ocurre el evento en relación con las transformaciones de ardilla.

```javascript
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i],
      index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]
```

Las matrices tienen un método `includes` que comprueba si existe un valor dado en la matriz. La función usa eso para determinar si el nombre del evento que le interesa es parte de la lista de eventos para un día determinado.

El cuerpo del bucle en `tableFor` determina en qué casilla de la tabla se encuentra cada entrada del diario al verificar si la entrada contiene el evento específico que le interesa y si el evento ocurre junto con un incidente de ardilla. Luego, el bucle agrega uno al cuadro correcto en la tabla.

Ahora tenemos las herramientas que necesitamos para calcular correlaciones individuales. El único paso que queda es encontrar una correlación para cada tipo de evento que se registró y ver si algo se destaca.

## Bucles de matriz

En la función `tableFor`, hay un ciclo como este:

```javascript
for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Hacer algo con entrada
}
```

Este tipo de bucle es común en JavaScript clásico: revisar las matrices un elemento a la vez es algo que surge mucho, y para hacer eso, ejecutaría un contador sobre la longitud de la matriz y seleccionaría cada elemento a su vez.

Existe una forma más sencilla de escribir tales bucles en JavaScript moderno.

```javascript
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events`);
}
```

Cuando un bucle `for` se ve así, con la palabra `of` después de una definición de variable, recorrerá los elementos del valor dado después de `of`. Esto funciona no solo para matrices sino también para cadenas y algunas otras estructuras de datos. Discutiremos _cómo_ funciona en el [Capítulo 6]().

## El análisis final

Necesitamos calcular una correlación para cada tipo de evento que ocurre en el conjunto de datos. Para hacer eso, primero necesitamos _encontrar_ cada tipo de evento.

```javascript
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", ...]
```

Al revisar todos los eventos y agregar los que aún no están allí a la matriz de `events`, la función recopila todos los tipos de eventos.

Usando eso, podemos ver todas las correlaciones.

```javascript
for (let event of journalEvents(JOURNAL)) {
  console.log(event + " :", phi(tableFor(event, JOURNAL)));
}
// → carrot: 0.0140970969
// → exercise: 0.0685994341
// → weekend: 0.1371988681
// → bread: -0.0757554019
// → pudding: -0.0648203724
//and so on...
```

La mayoría de las correlaciones parecen estar cercanas a cero. Comer zanahorias, pan o budín aparentemente no desencadena la licantropía de las ardillas. Parece _ocurrir_ con más frecuencia los fines de semana. Filtremos los resultados para mostrar solo correlaciones superiores a 0,1 o inferiores a -0,1.

```javascript
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if ((correlation > 0, 1 || correlation < -0, 1)) {
    console.log(event + ":", correlation);
  }
}
// → weekend: 0.1371988681
// → brushed teeth: -0.3805211953
// → candy: 0.1296407447
// → work: -0.1371988681
// → spaghetti: 0.2425356250
// → reading: 0.1106828054
// → peanuts: 0.5902679812
```

¡Ajá! Hay dos factores con una correlación que es claramente más fuerte que los demás. Comer cacahuetes tiene un fuerte efecto positivo sobre la posibilidad de convertirse en ardilla, mientras que cepillarse los dientes tiene un efecto negativo significativo.

Interesante. Intentemos algo.

```javascript
for (let entry of JOURNAL) {
  if (
    entry.events.includes("peanuts") &&
    !entry.events.includes("brushed teeth")
  ) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// → 1
```

Ese es un resultado sólido. El fenómeno ocurre precisamente cuando Jacques come cacahuetes y no se cepilla los dientes. Si no fuera tan descuidado con la higiene dental, nunca se habría dado cuenta de su aflicción.

Sabiendo esto, Jacques deja de comer cacahuetes por completo y descubre que sus transformaciones no regresan.

Durante unos años, las cosas le van muy bien a Jacques. Pero en algún momento pierde su trabajo. Debido a que vive en un país desagradable donde no tener trabajo significa no tener servicios médicos, se ve obligado a trabajar en un circo donde actúa como _The Incredible Squirrelman_, llenándose la boca con mantequilla de maní antes de cada espectáculo.

Un día, harto de esta lamentable existencia, Jacques no logra volver a su forma humana, salta por una grieta en la carpa del circo y desaparece en el bosque. Nunca más se le vuelve a ver.

## Más arrayología

Antes de terminar el capítulo, quiero presentarles algunos conceptos más relacionados con objetos. Comenzaré presentando algunos métodos de matriz generalmente útiles.

Vimos `push` y `pop`, que agregan y eliminan elementos al final de una matriz, anteriormente en este capítulo. Los métodos correspondientes para agregar y eliminar elementos al comienzo de una matriz se denominan `unshift` y `shift`.

```javascript
let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}
```

Ese programa gestiona una cola de tareas. Agrega tareas al final de la cola llamando a `remember("groceries")`, y cuando esté listo para hacer algo, llame a `getTask()` para obtener (y eliminar) el elemento del frente de la cola. La función `RememberUrgently` también agrega una tarea pero la agrega al principio en lugar de al final de la cola.

Para buscar un valor específico, las matrices proporcionan un método `indexOf`. El método busca en la matriz desde el principio hasta el final y devuelve el índice en el que se encontró el valor solicitado, o -1 si no se encontró. Para buscar desde el final en lugar del inicio, existe un método similar llamado `lastIndexOf`.

```javascript
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
```

Tanto `indexOf` como `lastIndexOf` toman un segundo argumento opcional que indica dónde empezar a buscar.

Otro método de matriz fundamental es `slice`, que toma índices de inicio y finalización y devuelve una matriz que solo tiene los elementos entre ellos. El índice de inicio es inclusivo, el índice final es exclusivo.

```javascript
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]
```

Cuando no se proporciona el índice final, `slice` tomará todos los elementos después del índice inicial. También puede omitir el índice de inicio para copiar toda la matriz.

El método `concat` se puede utilizar para unir matrices para crear una nueva matriz, similar a lo que hace el operador `+` para las cadenas.

El siguiente ejemplo muestra tanto `concat` como `slice` en acción. Toma una matriz y un índice, y devuelve una nueva matriz que es una copia de la matriz original con el elemento en el índice dado eliminado.

```javascript
function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]
```

Si pasa `concat` un argumento que no es una matriz, ese valor se agregará a la nueva matriz como si fuera una matriz de un elemento.

## Cadenas y sus propiedades

Podemos leer propiedades como `length` y `toUpperCase` a partir de valores de cadena. Pero si intenta agregar una nueva propiedad, no se mantiene.

```javascript
let kim = "Kim";
kim.age = 88;
console.log(kim.age);
// → undefined
```

Los valores de tipo cadena, número y booleano no son objetos, y aunque el lenguaje no se queja si intenta establecer nuevas propiedades en ellos, en realidad no almacena esas propiedades. Como se mencionó anteriormente, estos valores son inmutables y no se pueden cambiar.

Pero estos tipos tienen propiedades integradas. Cada valor de cadena tiene varios métodos. Algunos muy útiles son `slice` e `indexOf`, que se asemejan a los métodos de matriz del mismo nombre.

```javascript
console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5
```

Una diferencia es que `indexOf` de una cadena puede buscar una cadena que contenga más de un carácter, mientras que el método de matriz correspondiente busca solo un elemento.

```javascript
console.log("one two three".indexOf("ee"));
// → 11
```

El método `trim` elimina los espacios en blanco (espacios, nuevas líneas, tabulaciones y caracteres similares) del principio y el final de una cadena.

```javascript
console.log("okay \n".trim());
// → okay
```

La función `zeroPad` del [capítulo anterior]() también existe como método. Se llama `padStart` y toma la longitud deseada y el carácter de relleno como argumentos.

```javascript
console.log(String(6).padStart(3, "0"));
// → 006
```

Puede dividir una cadena en cada aparición de otra cadena con `split` y volver a unirla con `join`.

```javascript
let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split("");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join("."));
// → Secretarybirds. specialize. in. stomping
```

Una cadena se puede repetir con el método `repeat`, que crea una nueva cadena que contiene varias copias de la cadena original, pegadas entre sí.

```javascript
console.log("LA".repeat(3));
// → LALALA
```

Ya hemos visto la propiedad `length` del tipo de cadena. Acceder a los caracteres individuales de una cadena parece acceder a elementos de una matriz (con una advertencia que discutiremos en el [Capítulo 5]()).

```javascript
let string = "abc";
console.log(string.length);
// → 3
console.log(string[1]);
// → b
```

## Parámetros de descanso

Puede resultar útil que una función acepte cualquier número de argumentos. Por ejemplo, `Math.max` calcula el máximo de _todos_ los argumentos que se le dan.

Para escribir una función de este tipo, coloque tres puntos antes del último parámetro de la función, así:

```javascript
function max(...numbers) {
  let result = -Infinito;
  for (let number of numbers) {
    if (number > result) result = número;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9
```

Cuando se llama a una función de este tipo, el _parámetro rest_ está vinculado a una matriz que contiene todos los argumentos adicionales. Si hay otros parámetros antes, sus valores no forman parte de esa matriz. Cuando, como en `max`, es el único parámetro, contendrá todos los argumentos.

Puede usar una notación similar de tres puntos para _llamar_ a una función con una matriz de argumentos.

```javascript
let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7
```

Esto "extiende" la matriz en la llamada a la función, pasando sus elementos como argumentos separados. Es posible incluir una matriz como esa junto con otros argumentos, como en `max(9, ...numbers, 2)`.

La notación de matriz de corchetes permite de manera similar que el operador de tres puntos distribuya otra matriz en la nueva matriz.

```javascript
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]
```

## El objeto Math

Como hemos visto, `Math` es una bolsa de sorpresas de funciones de utilidad relacionadas con los números, como `Math.max` (máximo), `Math.min` (mínimo) y `Math.sqrt` (raíz cuadrada).

El objeto `Math` se utiliza como contenedor para agrupar un montón de funciones relacionadas. Solo hay un objeto `Math` y casi nunca es útil como valor. Más bien, proporciona un _espacio de nombres_ para que todas estas funciones y valores no tengan que ser enlaces globales.

Tener demasiados enlaces globales "contamina" el espacio de nombres. Cuantos más nombres se hayan tomado, más probabilidades tendrá de sobrescribir accidentalmente el valor de algún enlace existente. Por ejemplo, no es improbable que desee nombrar algo como `max` en uno de sus programas. Dado que la función `max` incorporada de JavaScript está guardada de forma segura dentro del objeto `Math`, no tenemos que preocuparnos por sobrescribirlo.

Muchos lenguajes te detendrán, o al menos te advertirán, cuando estés definiendo un enlace con un nombre que ya está tomado. JavaScript hace esto para los enlaces que declaró con `let` o `const` pero, perversamente, no para los enlaces estándar ni para los enlaces declarados con `var` o `function`.

Volver al objeto `Math`. Si necesita hacer trigonometría, `Math` puede ayudar. Contiene `cos` (coseno), `sin` (seno) y `tan` (tangente), así como sus funciones inversas, `acos`, `asin` y `atan`, respectivamente. El número π (pi), o al menos la aproximación más cercana que cabe en un número de JavaScript, está disponible como `Math.PI`. Existe una antigua tradición de programación de escribir los nombres de los valores constantes en mayúsculas.

```javascript
function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return { x: radius * Math.cos(angle), y: radio * Math.sin(angle) };
}
console.log(randomPointOnCircle(2));
// → {x: 0.3667, y: 1.966}
```

Si los senos y cosenos no son algo con lo que esté familiarizado, no se preocupe. Cuando se utilicen en este libro, en el [capítulo 14](), los explicaré.

El ejemplo anterior usó `Math.random`. Esta es una función que devuelve un nuevo número pseudoaleatorio entre cero (incluido) y uno (exclusivo) cada vez que lo llama.

```javascript
console.log(Math.random());
// → 0.36993729369714856
console.log(Math.random());
// → 0,727367032552138
console.log(Math.random());
// → 0.40180766698904335
```

Aunque las computadoras son máquinas deterministas, siempre reaccionan de la misma manera si se les da la misma entrada, es posible que produzcan números que parecen aleatorios. Para hacer eso, la máquina mantiene algún valor oculto y cada vez que solicita un nuevo número aleatorio, realiza cálculos complicados sobre este valor oculto para crear un nuevo valor. Almacena un nuevo valor y devuelve un número derivado de él. De esa manera, puede producir números siempre nuevos y difíciles de predecir de una manera que _parece_ aleatoria.

Si queremos un número entero aleatorio en lugar de uno fraccionario, podemos usar `Math.floor` (que se redondea al número entero más cercano) en el resultado de `Math.random`.

```javascript
console.log(Math.floor(Math.random() * 10));
// → 2
```

Multiplicar el número aleatorio por 10 nos da un número mayor o igual a 0 e inferior a 10. Dado que `Math.floor` se redondea hacia abajo, esta expresión producirá, con la misma probabilidad, cualquier número del 0 al 9.

También están las funciones `Math.ceil` (para "techo", que se redondea a un número entero), `Math.round` (al número entero más cercano) y `Math.abs`, que toma el valor absoluto de un número, lo que significa que niega los valores negativos pero deja los positivos como están.

## Desestructurando

Volvamos a la función phi por un momento.

```javascript
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}
```

Una de las razones por las que esta función es incómoda de leer es que tenemos un enlace apuntando a nuestra matriz, pero preferiríamos tener enlaces para los _elementos_ de la matriz, es decir, `let n00 = table[0]` y así sucesivamente. Afortunadamente, existe una forma sucinta de hacer esto en JavaScript.

```javascript
function phi([n00, n01, n10, n11]) {
  return (
    (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
  );
}
```

Esto también funciona para enlaces creados con `let`, `var` o `const`. Si sabe que el valor que está vinculando es una matriz, puede usar corchetes para "mirar dentro" del valor, vinculando su contenido.

Un truco similar funciona para los objetos, usando llaves en lugar de corchetes.

```javascript
let { name } = { name: "Faraji", age: 23 };
console.log(name);
// → Faraji
```

Tenga en cuenta que si intenta desestructurar un valor `null` o `undefined`, obtendrá un error, como lo haría si intentara acceder directamente a una propiedad de esos valores.

## JSON

Debido a que las propiedades solo captan su valor, en lugar de contenerlo, los objetos y las matrices se almacenan en la memoria de la computadora como secuencias de bits que contienen las _direcciones_ (el lugar en la memoria) de su contenido. Entonces, una matriz con otra matriz dentro de ella consiste en (al menos) una región de memoria para la matriz interna y otra para la matriz externa, que contiene (entre otras cosas) un número binario que representa la posición de la matriz interna.

Si desea guardar datos en un archivo para más tarde o enviarlo a otra computadora a través de la red, debe convertir de alguna manera estos enredos de direcciones de memoria en una descripción que pueda almacenarse o enviarse. _Podría_ enviar toda la memoria de su computadora junto con la dirección del valor que le interesa, supongo, pero ese no parece el mejor enfoque.

Lo que podemos hacer es _serializar_ los datos. Eso significa que se convierte en una descripción plana. Un formato de serialización popular se llama _JSON_ (pronunciado "Jason"), que significa notación de objetos JavaScript. Se utiliza ampliamente como formato de comunicación y almacenamiento de datos en la Web, incluso en lenguajes distintos de JavaScript.

JSON se parece a la forma de escribir matrices y objetos de JavaScript, con algunas restricciones. Todos los nombres de propiedad deben estar rodeados de comillas dobles y solo se permiten expresiones de datos simples, sin llamadas a funciones, vinculaciones o cualquier cosa que implique un cálculo real. No se permiten comentarios en JSON.

Una entrada de diario podría verse así cuando se representa como datos JSON:

```json
{
  "squirrel": false,
  "events": ["work", "touched tree", "pizza", "running"]
}
```

JavaScript nos proporciona las funciones `JSON.stringify` y `JSON.parse` para convertir datos hacia y desde este formato. El primero toma un valor de JavaScript y devuelve una cadena codificada en JSON. El segundo toma dicha cadena y la convierte al valor que codifica.

```javascript
let string = JSON.stringify({ squirrel: false, events: ["weekend"] });
console.log(string);
// → {"squirrel": false, "events": ["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
```

## Resumen

Los objetos y las matrices (que son un tipo específico de objeto) proporcionan formas de agrupar varios valores en un solo valor. Conceptualmente, esto nos permite poner un montón de cosas relacionadas en una bolsa y correr con la bolsa, en lugar de envolver nuestros brazos alrededor de todas las cosas individuales y tratar de sujetarlas por separado.

La mayoría de los valores en JavaScript tienen propiedades, las excepciones son `null` y `undefined`. Se accede a las propiedades mediante `value.prop` o `value["prop"]`. Los objetos tienden a usar nombres para sus propiedades y almacenan más o menos un conjunto fijo de ellas. Las matrices, por otro lado, generalmente contienen cantidades variables de valores conceptualmente idénticos y usan números (comenzando desde 0) como nombres de sus propiedades.

Hay _algunas_ propiedades con nombre en las matrices, como `length` y varios métodos. Los métodos son funciones que viven en propiedades y (generalmente) actúan sobre el valor del que son una propiedad.

Puede iterar sobre matrices usando un tipo especial de bucle `for` — `for(let element of array)`.

## Ejercicios

### La suma de un rango

La [introducción]() de este libro aludió a lo siguiente como una buena forma de calcular la suma de un rango de números:

```javascript
console.log(sum(range(1, 10)));
```

Escriba una función `range` que tome dos argumentos, `start` y `end`, y devuelva una matriz que contenga todos los números desde el `start` hasta (incluido) `end`.

A continuación, escriba una función `sum` que tome una matriz de números y devuelva la suma de estos números. Ejecute el programa de ejemplo y vea si de hecho devuelve 55.

Como asignación adicional, modifique su función de rango para tomar un tercer argumento opcional que indique el valor de "paso" usado al construir la matriz. Si no se da ningún paso, los elementos suben en incrementos de uno, lo que corresponde al comportamiento anterior. La función de llamada `range(1, 10, 2)` debe devolver `[1, 3, 5, 7, 9]`. Asegúrese de que también funcione con valores de paso negativos para que `range(5, 2, -1)` produzca `[5, 4, 3, 2]`.

```javascript
// Tu código aquí.

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
```

<details>
  <summary>Mostrar pistas...</summary>
  
La construcción de una matriz se hace más fácilmente inicializando primero un enlace a `[]` (una matriz nueva y vacía) y llamando repetidamente a su método `push` para agregar un valor. No olvide devolver la matriz al final de la función.

Dado que el límite final es inclusivo, deberá usar el operador `<=` en lugar de `<` para verificar el final de su ciclo.

El parámetro de paso puede ser un parámetro opcional que por defecto (usando el operador `=`) es 1.

Hacer que `range` comprenda los valores de pasos negativos probablemente se haga mejor escribiendo dos bucles separados, uno para contar hacia arriba y otro para contar hacia atrás, porque la comparación que verifica si el bucle está terminado debe ser `>=` en lugar de `<=` cuando se cuenta hacia abajo.

También podría valer la pena utilizar un paso predeterminado diferente, a saber, -1, cuando el final del rango es menor que el inicio. De esa manera, `range(5, 2)` devuelve algo significativo, en lugar de quedarse atascado en un bucle infinito. Es posible hacer referencia a parámetros anteriores en el valor predeterminado de un parámetro.

</details>

### Invertir una matriz

Las matrices tienen un método `reverse` que cambia la matriz invirtiendo el orden en que aparecen sus elementos. Para este ejercicio, escriba dos funciones, `reverseArray` y `reverseArrayInPlace`. El primero, `reverseArray`, toma una matriz como argumento y produce una nueva matriz que tiene los mismos elementos en orden inverso. El segundo, `reverseArrayInPlace`, hace lo que hace el método inverso: modifica la matriz dada como argumento invirtiendo sus elementos. Ninguno de los dos puede utilizar el método `reverse` estándar.

Pensando en las notas sobre efectos secundarios y funciones puras del [capítulo anterior](), ¿qué variante espera que sea útil en más situaciones? ¿Cuál corre más rápido?

```javascript
// Tu código aquí.

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
```

<details>
  <summary>Mostrar pistas...</summary>

Hay dos formas obvias de implementar `reverseArray`. La primera es simplemente repasar la matriz de entrada de adelante hacia atrás y usar el método `unshift` en la nueva matriz para insertar cada elemento al principio. El segundo es recorrer la matriz de entrada hacia atrás y usar el método `push`. Iterar sobre una matriz al revés requiere una especificación (algo incómoda), como `(let i = array.length - 1; i >= 0; i--)`.

Invertir la matriz en su lugar es más difícil. Debe tener cuidado de no sobrescribir elementos que luego necesitará. Usar `reverseArray` o copiar toda la matriz (`array.slice (0)` es una buena forma de copiar una matriz) funciona pero es hacer trampa.

El truco consiste en _intercambiar_ el primer y el último elemento, luego el segundo y el penúltimo, y así sucesivamente. Puede hacer esto haciendo un bucle sobre la mitad de la longitud de la matriz (use `Math.floor` para redondear hacia abajo; no necesita tocar el elemento del medio en una matriz con un número impar de elementos) e intercambiando el elemento en la posición `i` con el de la posición `array.length - 1 - i`. Puede utilizar un enlace local para mantener brevemente uno de los elementos, sobrescribirlo con su imagen reflejada y luego poner el valor del enlace local en el lugar donde solía estar la imagen reflejada.

</details>

### Una lista

Los objetos, como blobs genéricos de valores, se pueden usar para construir todo tipo de estructuras de datos. Una estructura de datos común es la _lista_ (que no debe confundirse con la matriz). Una lista es un conjunto anidado de objetos, donde el primer objeto tiene una referencia al segundo, el segundo al tercero, y así sucesivamente.

```javascript
let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};
```

Los objetos resultantes forman una cadena, así:

![](https://eloquentjavascript.net/img/linked-list.svg)

Una ventaja de las listas es que pueden compartir partes de su estructura. Por ejemplo, si creo dos nuevos valores `{value: 0, rest: list}` y `{value: -1, rest: list}` (con la `list` haciendo referencia al enlace definido anteriormente), ambas son listas independientes, pero comparten la estructura que compone sus tres últimos elementos. La lista original también sigue siendo una lista válida de tres elementos.

Escriba una función `arrayToList` que construya una estructura de lista como la que se muestra cuando se le da `[1, 2, 3]` como argumento. También escriba una función `listToArray` que produzca una matriz a partir de una lista. Luego agregue una función auxiliar `prepend`, que toma un elemento y una lista y crea una nueva lista que agrega el elemento al frente de la lista de entrada, y `nth`, que toma una lista y un número y devuelve el elemento en la posición dada en la lista (con cero refiriéndose al primer elemento) o indefinido cuando no existe tal elemento.

Si aún no lo ha hecho, también escriba una versión recursiva de `nth`.

```javascript
// Tu código aquí.

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
```

<details>
  <summary>Mostrar pistas...</summary>

Crear una lista es más fácil cuando se hace al revés. Por lo tanto, `arrayToList` podría iterar sobre la matriz hacia atrás (ver el ejercicio anterior) y, para cada elemento, agregar un objeto a la lista. Puede usar un enlace local para mantener la parte de la lista que se creó hasta ahora y usar una asignación como `list = {value: X, rest: list}` para agregar un elemento.

Para ejecutar una lista (en `listToArray` y `nth`), se puede usar una especificación de bucle `for` como esta:

```javascript
for (let node = list; node; node = node.rest) {}
```

¿Puedes ver cómo funciona eso? En cada iteración del bucle, el nodo apunta a la sublista actual y el cuerpo puede leer su propiedad de valor para obtener el elemento actual. Al final de una iteración, el nodo pasa a la siguiente sublista. Cuando eso sea nulo, habremos llegado al final de la lista y el ciclo habrá finalizado.

La versión recursiva de `nth`, de manera similar, observará una parte cada vez más pequeña de la "cola" de la lista y, al mismo tiempo, contará hacia atrás el índice hasta que llegue a cero, momento en el que puede devolver la propiedad `value` del nodo que está mirando. Para obtener el elemento cero de una lista, simplemente toma la propiedad `value` de su nodo principal. Para obtener el elemento _N_ + 1, se toma el elemento _N_ de la lista que está en la propiedad `rest` de esta lista.

</details>

### Comparación profunda

El operador `==` compara objetos por identidad. Pero a veces preferiría comparar los valores de sus propiedades reales.

Escriba una función `deepEqual` que tome dos valores y devuelva verdadero solo si tienen el mismo valor o son objetos con las mismas propiedades, donde los valores de las propiedades son iguales en comparación con una llamada recursiva a `deepEqual`.

Para saber si los valores deben compararse directamente (use el operador `===` para eso) o comparar sus propiedades, puede usar el operador `typeof`. Si produce `"object"` para ambos valores, debería hacer una comparación profunda. Pero hay que tener en cuenta una excepción tonta: debido a un accidente histórico, `typeof null` también produce `"object"`.

La función `Object.keys` será útil cuando necesite repasar las propiedades de los objetos para compararlos.

```javascript
// Tu código aquí.

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
```

<details>
  <summary>Mostrar pistas...</summary>

Su prueba para determinar si está tratando con un objeto real se verá como `typeof x == "object" && x != Null`. Tenga cuidado de comparar propiedades solo cuando _ambos_ argumentos sean objetos. En todos los demás casos, puede devolver inmediatamente el resultado de aplicar `===`.

Utilice `Object.keys` para revisar las propiedades. Debe probar si ambos objetos tienen el mismo conjunto de nombres de propiedad y si esas propiedades tienen valores idénticos. Una forma de hacerlo es asegurarse de que ambos objetos tengan el mismo número de propiedades (las longitudes de las listas de propiedades son las mismas). Y luego, al recorrer una de las propiedades del objeto para compararlas, siempre primero asegúrese de que el otro realmente tenga una propiedad con ese nombre. Si tienen el mismo número de propiedades y todas las propiedades de una también existen en la otra, tienen el mismo conjunto de nombres de propiedad.

La mejor manera de devolver el valor correcto de la función es devolver inmediatamente falso cuando se encuentra una falta de coincidencia y devolver verdadero al final de la función.

</details>
