### Capítulo 1

# Valores, tipos y operadores

> «Debajo de la superficie de la máquina, el programa se mueve. Sin esfuerzo, se expande y contrae. En gran armonía, los electrones se dispersan y se reagrupan. Los formularios en el monitor no son más que ondas en el agua. La esencia permanece invisiblemente debajo.»
>
> -Maestro Yuan-Ma, _El libro de la programación_

![](https://eloquentjavascript.net/img/chapter_picture_1.jpg)

Dentro del mundo de la computadora, solo hay datos. Puede leer datos, modificar datos, crear nuevos datos, pero no se pueden mencionar los que no son datos. Todos estos datos se almacenan como largas secuencias de bits y, por lo tanto, son fundamentalmente similares.

Los _bits_ son cualquier tipo de cosas de dos valores, generalmente descritos como ceros y unos. Dentro de la computadora, toman formas tales como una carga eléctrica alta o baja, una señal fuerte o débil, o un punto brillante o opaco en la superficie de un CD. Cualquier información discreta puede reducirse a una secuencia de ceros y unos y, por lo tanto, representarse en bits.

Por ejemplo, podemos expresar el número 13 en bits. Funciona de la misma manera que un número decimal, pero en lugar de 10 dígitos diferentes, solo tiene 2, y el peso de cada uno aumenta en un factor de 2 de derecha a izquierda. Aquí están los bits que forman el número 13, con los pesos de los dígitos que se muestran debajo de ellos:

```
   0  0  0  0 1 1 0 1
 128 64 32 16 8 4 2 1
```

Ese es el número binario 00001101. Sus dígitos distintos de cero representan 8, 4 y 1, y suman 13.

## Valores

Imagina un mar de bits, un océano de ellos. Una computadora moderna típica tiene más de 30 mil millones de bits en su almacenamiento de datos volátiles (memoria de trabajo). El almacenamiento no volátil (el disco duro o equivalente) tiende a tener aún algunos órdenes de magnitud más.

Para poder trabajar con tales cantidades de bits sin perderse, debemos separarlos en fragmentos que representen piezas de información. En un entorno JavaScript, esos fragmentos se denominan _valores_. Aunque todos los valores están hechos de bits, juegan diferentes roles. Cada valor tiene un tipo que determina su rol. Algunos valores son números, algunos valores son fragmentos de texto, algunos valores son funciones, etc.

Para crear un valor, simplemente debe invocar su nombre. Esto es conveniente. No tiene que reunir material de construcción para sus valores o pagarlos. Solo pides uno, y _whoosh_, lo tienes. No se crean realmente de la nada, por supuesto. Cada valor debe almacenarse en algún lugar, y si desea utilizar una cantidad gigantesca de ellos al mismo tiempo, es posible que se quede sin memoria. Afortunadamente, este es un problema solo si los necesita a todos simultáneamente. Tan pronto como ya no use un valor, se disipará, dejando atrás sus bits para ser reciclados como material de construcción para la próxima generación de valores.

Este capítulo presenta los elementos atómicos de los programas JavaScript, es decir, los tipos de valores simples y los operadores que pueden actuar sobre dichos valores.

## Números

Los valores del tipo _número_ son, como era de esperar, valores numéricos. En un programa de JavaScript, se escriben de la siguiente manera:

```javascript
13;
```

Úselo en un programa, y ​​hará que el patrón de bits para el número 13 entre en la memoria de la computadora.

JavaScript utiliza un número fijo de bits, 64 de ellos, para almacenar un solo valor numérico. Solo hay tantos patrones que puede hacer con 64 bits, lo que significa que el número de números diferentes que se pueden representar es limitado. Con _N_ dígitos decimales, puede representar 10<sup>N</sup> números. De manera similar, dados 64 dígitos binarios, puede representar 2<sup>64</sup> números diferentes, lo que equivale aproximadamente a 18 trillones (un 18 con 18 ceros después). Eso es mucho.

La memoria de la computadora solía ser mucho más pequeña, y las personas solían usar grupos de 8 o 16 bits para representar sus números. Fue fácil _desbordar_ accidentalmente números tan pequeños, para terminar con un número que no encajaba en el número dado de bits. Hoy en día, incluso las computadoras que caben en su bolsillo tienen mucha memoria, por lo que puede usar fragmentos de 64 bits y debe preocuparse por el desbordamiento solo cuando se trata de números verdaderamente astronómicos.

Sin embargo, no todos los números enteros de menos de 18 trillones caben en un número de JavaScript. Esos bits también almacenan números negativos, por lo que un bit indica el signo del número. Un problema mayor es que los números no enteros también deben estar representados. Para hacer esto, algunos de los bits se utilizan para almacenar la posición del punto decimal. El número entero máximo real que puede almacenarse está más en el rango de 9 mil billones (15 ceros), que todavía es agradablemente grande.

Los números fraccionarios se escriben usando un punto.

```javascript
9.81;
```

Para números muy grandes o muy pequeños, también puede usar notación científica agregando una _e_ (para _exponente_), seguido del exponente del número.

```javascript
2.998e8;
```

Eso es 2.998 × 10<sup>8</sup> = 299,800,000.

Se garantiza que los cálculos con números _enteros_ más pequeños que los 9 mil billones mencionados anteriormente siempre serán precisos. Desafortunadamente, los cálculos con números fraccionarios generalmente no lo son. Así como π (pi) no puede expresarse con precisión por un número finito de dígitos decimales, muchos números pierden algo de precisión cuando solo están disponibles 64 bits para almacenarlos. Es una pena, pero causa problemas prácticos solo en situaciones específicas. Lo importante es ser consciente de ello y tratar los números digitales fraccionarios como aproximaciones, no como valores precisos.

## Aritmética

Lo principal que se debe hacer con los números es la aritmética. Las operaciones aritméticas como la suma o la multiplicación toman dos valores numéricos y producen un nuevo número a partir de ellos. Así es como se ven en JavaScript:

```javascript
100 + 4 * 11;
```

Los símbolos + y \* se llaman _operadores_. El primero representa la suma y el segundo representa la multiplicación. Poner un operador entre dos valores lo aplicará a esos valores y producirá un nuevo valor.

¿Pero el ejemplo significa "sumar 4 y 100, y multiplicar el resultado por 11", o la multiplicación se realiza antes de sumar? Como habrás adivinado, la multiplicación ocurre primero. Pero como en matemáticas, puede cambiar esto envolviendo la adición entre paréntesis.

```javascript
(100 + 4) * 11;
```

Para la resta, está el operador -, y la división se puede hacer con el operador /.

Cuando los operadores aparecen juntos sin paréntesis, el orden en que se aplican está determinado por la _precedencia_ de los operadores. El ejemplo muestra que la multiplicación viene antes que la suma. El operador / tiene la misma precedencia que \*. Del mismo modo para + y -. Cuando varios operadores con la misma precedencia aparecen uno al lado del otro, como en `1 - 2 + 1`, se aplican de izquierda a derecha: `(1 - 2) + 1`.

Estas reglas de precedencia no son algo de lo que deba preocuparse. En caso de duda, solo agregue paréntesis.

Hay un operador aritmético más, que quizás no reconozca de inmediato. El símbolo % se utiliza para representar la operación _restante_. X % Y es el resto de dividir X entre Y. Por ejemplo, 314 % 100 produce 14, y 144 % 12 da 0. La precedencia del operador restante es la misma que la de multiplicación y división. También verá a menudo este operador denominado _módulo_.

## Numeros especiales

Hay tres valores especiales en JavaScript que se consideran números, pero no se comportan como números normales.

Los dos primeros son `Infinity` y `-Infinity`, que representan los infinitos positivo y negativo. `Infinity - 1` sigue siendo `Infinity`, y así sucesivamente. Sin embargo, no confíes demasiado en la computación basada en el infinito. No es matemáticamente sólido, y rápidamente conducirá al siguiente número especial: `NaN`.

NaN significa "not a number" ("no un número"), aunque _es_ un valor del tipo número. Obtendrá este resultado cuando, por ejemplo, intente calcular `0 / 0` (cero dividido por cero), `Infinity - Infinity` o cualquier otra cantidad de operaciones numéricas que no produzcan un resultado con sentido.

## Cadenas

El siguiente tipo de datos básicos es la _cadena_. Las cadenas se usan para representar texto. Se escriben encerrando su contenido entre comillas.

```javascript
`Abajo en el mar`;
("Acuéstate en el océano");
("Flotar en el océano");
```

Puede usar comillas simples, comillas dobles o comillas invertidas para marcar cadenas, siempre que las comillas al inicio y al final de la cadena coincidan.

Se puede poner casi cualquier cosa entre comillas, y JavaScript creará un valor de cadena. Pero algunos caracteres son más difíciles. Puedes imaginar cómo poner comillas entre comillas podría ser difícil. Las _líneas nuevas_ (los caracteres que se obtienen al presionar ENTER) se pueden incluir sin escapar solo cuando la cadena se cita con comillas invertidas (`).

Para que sea posible incluir dichos caracteres en una cadena, se utiliza la siguiente notación: cada vez que se encuentra una barra diagonal inversa (\) dentro del texto citado, indica que el carácter después de esto tiene un significado especial. Esto se llama _escapar_ el caracter. Una cita precedida por una barra diagonal inversa no finalizará la cadena sino que será parte de ella. Cuando aparece un carácter `n` después de una barra invertida, se interpreta como una nueva línea. Del mismo modo, una `t` después de una barra invertida significa un carácter de tabulación. Tome la siguiente cadena:

```javascript
"Esta es la primera línea \nY esta es la segunda";
```

El texto real contenido es este:

```
Esta es la primera linea
Y esta es la segunda
```

Por supuesto, hay situaciones en las que desea que una barra diagonal inversa en una cadena sea solo una barra diagonal inversa, no un código especial. Si dos barras diagonales inversas se suceden, se colapsarán juntas y solo quedará una en el valor de cadena resultante. Así es como se escribe la cadena _"Un carácter de nueva línea como "\n"."_ se puede expresar:

```javascript
"Un carácter de nueva línea se escribe como \"\\n\".";
```

Las cadenas también deben modelarse como una serie de bits para poder existir dentro de la computadora. La forma en que JavaScript lo hace se basa en el estándar _Unicode_. Este estándar asigna un número a prácticamente todos los caracteres que pueda necesitar, incluidos los caracteres del griego, árabe, japonés, armenio, etc. Si tenemos un número para cada carácter, una secuencia se puede describir mediante una secuencia de números.

Y eso es lo que hace JavaScript. Pero hay una complicación: la representación de JavaScript utiliza 16 bits por elemento de cadena, que puede describir hasta 2<sup>16</sup> caracteres diferentes. Pero Unicode define más caracteres que eso, aproximadamente el doble en este momento. Por lo tanto, algunos caracteres, como muchos emoji, ocupan dos "posiciones de caracteres" en las cadenas de JavaScript. Volveremos a esto en el [Capítulo 5]().

Las cadenas no se pueden dividir, multiplicar o restar, pero el operador + se puede usar en ellas. No agrega, pero _concatena_: pega dos cadenas juntas. La siguiente línea producirá la cadena "concatenate":

```javascript
"con" + "cat" + "e" + "nate";
```

Los valores de cadena tienen varias funciones asociadas (_métodos_) que se pueden usar para realizar otras operaciones en ellos. Diré más sobre esto en el [Capítulo 4.]()

Las cadenas escritas con comillas simples o dobles se comportan de la misma manera: la única diferencia es en qué tipo de comillas necesita escapar dentro de ellas. Las cadenas entre comillas, generalmente llamadas _plantillas literales_, pueden hacer algunos trucos más. Además de poder abarcar líneas, también pueden incorporar otros valores.

```javascript
`la mitad de 100 es ${100 / 2}`;
```

Cuando escribe algo dentro de \${} en una plantilla literal, su resultado se computará, se convertirá en una cadena y se incluirá en esa posición. El ejemplo produce "_la mitad de 100 es 50_".

## Operadores unarios

No todos los operadores son símbolos. Algunos están escritos como palabras. Un ejemplo es el operador `typeof`, que produce un valor de cadena que nombra el tipo del valor que le da.

```javascript
console.log(typeof 4.5);
// → number
console.log(typeof "x");
// → string
```

Usaremos `console.log` en el código de ejemplo para indicar que queremos ver el resultado de evaluar algo. Más sobre eso en el [próximo capítulo]().

Los otros operadores mostrados todos operaron en dos valores, pero `typeof` solo toma uno. Los operadores que usan dos valores se llaman operadores _binarios_, mientras que los que toman uno se llaman operadores _unarios_. El operador menos se puede utilizar como operador binario y como operador unario.

```javascript
console.log(-(10 - 2));
// → -8
```

## Valores booleanos

A menudo es útil tener un valor que distinga entre solo dos posibilidades, como "sí" y "no" o "encendido" y "apagado". Para este propósito, JavaScript tiene un tipo _booleano_, que tiene solo dos valores, verdadero (true) y falso (false), que se escriben como esas palabras.

### Comparación

Aquí hay una forma de producir valores booleanos:

```javascript
console.log(3 > 2);
// → true
console.log(3 < 2);
// → false
```

Los signos > y < son los símbolos tradicionales para "es mayor que" y "es menor que", respectivamente. Son operadores binarios. Su aplicación da como resultado un valor booleano que indica si son verdaderas en este caso.

Las cadenas se pueden comparar de la misma manera.

```javascript
console.log("Aardvark" < "Zoroaster");
// → true
```

La forma en que se ordenan las cadenas es más o menos alfabética, pero no es realmente lo que esperaría ver en un diccionario: las letras mayúsculas siempre son "menos" que las minúsculas, por lo que "Z" < "a" y los caracteres no alfabéticos (!, -, y así sucesivamente) también se incluyen en el pedido. Al comparar cadenas, JavaScript pasa sobre los caracteres de izquierda a derecha, comparando los códigos Unicode uno por uno.

Otros operadores similares son >= (mayor o igual que), <= (menor o igual que), == (igual a) y != (No igual a).

```javascript
console.log("Itchy" != "Scratchy");
// → true
console.log("Apple" == "Naranja");
// → false
```

Solo hay un valor en JavaScript que no es igual a sí mismo, y es `NaN` ("no es un número").

```javascript
console.log(NaN == NaN);
// → false
```

Se supone que `NaN` denota el resultado de un cálculo sin sentido, y como tal, no es igual al resultado de cualquier _otro_ cálcu

### Operadores logicos

También hay algunas operaciones que se pueden aplicar a los valores booleanos. JavaScript admite tres operadores lógicos: _y_, _o_, y _no_. Estos se pueden utilizar para "razonar" sobre los booleanos.

El operador `&&` representa lógico _y_. Es un operador binario, y su resultado es verdadero solo si ambos valores dados son verdaderos.

```javascript
console.log(true && false);
// → false
console.log(true && true);
// → true
```

El `||` operador denota lógico _o_. Produce verdadero si alguno de los valores dados es verdadero.

```javascript
console.log(false || true);
// → true
console.log(false || false);
// → false
```

_No_ se escribe como un signo de exclamación (`!`). Es un operador unario que invierte el valor que se le da: `!true` produce `false` y `!false` da `true`.

Cuando se mezclan estos operadores booleanos con operadores aritméticos y otros, no siempre es obvio cuando se necesitan paréntesis. En la práctica, por lo general, puede pasar sabiendo que, de los operadores que hemos visto hasta ahora, `||` tiene la precedencia más baja, luego viene `&&`, luego los operadores de comparación (`>`, `==`, etc.), y luego el resto. Este orden se ha elegido de modo que, en expresiones típicas como la siguiente, se necesiten el menor número posible de paréntesis:

```javascript
1 + 1 == 2 && 10 * 10 > 50;
```

El último operador lógico que discutiré no es unario, no binario, sino _ternario_, operando en tres valores. Está escrito con un signo de interrogación y dos puntos, así:

```javascript
console.log(true ? 1 : 2);
// → 1
console.log(false ? 1 : 2);
// → 2
```

Este se llama operador _condicional_ (o, a veces, solo operador _ternario_, ya que es el único operador de este tipo en el lenguaje). El valor a la izquierda del signo de interrogación "elige" cuál de los otros dos valores saldrá. Cuando es verdadero, elige el valor medio, y cuando es falso, elige el valor de la derecha.

## Valores vacíos

Hay dos valores especiales, escritos `null` y `undefined`, que se utilizan para denotar la ausencia de un valor _con sentido_. Son valores en sí mismos, pero no llevan información.

Muchas operaciones en el lenguaje que no producen un valor con sentido (verás algunas más adelante) rinden `undefined` simplemente porque tienen que dar _algún_ valor.

La diferencia de significado entre `undefined` y `null` es un accidente del diseño de JavaScript, y no importa la mayor parte del tiempo. En los casos en que realmente deba preocuparse por estos valores, le recomiendo tratarlos como mayormente intercambiables.

## Conversión automática de tipo

En la Introducción, mencioné que JavaScript hace todo lo posible para aceptar casi cualquier programa que le des, incluso programas que hacen cosas extrañas. Esto está bien demostrado por las siguientes expresiones:

```javascript
console.log(8 * null);
// → 0
console.log("5" - 1);
// → 4
console.log("5" + 1);
// → 51
console.log("five" * 2);
// → NaN
console.log(false == 0);
// → true
```

Cuando un operador se aplica al tipo de valor "incorrecto", JavaScript convertirá silenciosamente ese valor al tipo que necesita, utilizando un conjunto de reglas que a menudo no son lo que desea o espera. Esto se llama _coerción de tipo_. El `null` en la primera expresión se convierte en `0`, y el `"5"` en la segunda expresión se convierte en `5` (de cadena a número). Sin embargo, en la tercera expresión, `+` intenta la concatenación de cadenas antes de la suma numérica, por lo que el `1` se convierte en `"1"` (de número a cadena).

Cuando algo que no se asigna a un número de una manera obvia (como `"cinco"` o `undefined`) se convierte en un número, se obtiene el valor `NaN`. Otras operaciones aritméticas en `NaN` siguen produciendo `NaN`, por lo que si encuentra uno de esos en un lugar inesperado, busque conversiones de tipo accidentales.

Al comparar valores del mismo tipo con `==`, el resultado es fácil de predecir: debe ser verdadero cuando ambos valores son iguales, excepto en el caso de `NaN`. Pero cuando los tipos difieren, JavaScript utiliza un conjunto de reglas complicado y confuso para determinar qué hacer. En la mayoría de los casos, solo intenta convertir uno de los valores al tipo del otro valor. Sin embargo, cuando ocurre `null` o `undefined` en cualquier lado del operador, produce verdadero solo si ambos lados son `null` o `undefined`.

```javascript
console.log(null == undefined);
// → verdadero
console.log(null == 0);
// → falso
```

Ese comportamiento es a menudo útil. Cuando desee probar si un valor tiene un valor real en lugar de `null` o `undefined`, puede compararlo con `null` con el operador `==` (o `!=`).

Pero, ¿qué pasa si quieres probar si algo se refiere al valor preciso `false`? Las expresiones como `0 == false` y `"" == false` también son verdaderas debido a la conversión automática de tipos. Cuando _no_ desea que se produzca ninguna conversión de tipo, hay dos operadores adicionales: `===` y `!==`. La primera prueba si un valor es _exactamente_ igual al otro, y la segunda prueba si no es exactamente igual. Entonces `"" === false` es falso como se esperaba.

Recomiendo usar los operadores de comparación de tres caracteres a la defensiva para evitar que las conversiones de tipo inesperadas te hagan tropezar. Pero cuando esté seguro de que los tipos en ambos lados serán los mismos, no hay problema con el uso de operadores más cortos.

### Cortocircuito de operadores lógicos

Los operadores lógicos `&&` y `||` manejar valores de diferentes tipos de una manera peculiar. Convertirán el valor en su lado izquierdo al tipo booleano para decidir qué hacer, pero dependiendo del operador y el resultado de esa conversión, devolverán el valor _original_ de la izquierda o el valor de la derecha.

El operador `||`, por ejemplo, devolverá el valor a su izquierda cuando se pueda convertir en verdadero y, de lo contrario, devolverá el valor a su derecha. Esto tiene el efecto esperado cuando los valores son booleanos y hace algo análogo para valores de otros tipos.

```javascript
console.log(null || "usuario");
// → usuario
console.log("Agnes" || "usuario");
// → Agnes
```

Podemos usar esta funcionalidad como una forma de recurrir a un valor predeterminado. Si tiene un valor que puede estar vacío, puede poner `||` después con un valor de reemplazo. Si el valor inicial se puede convertir a falso, en su lugar obtendrá el reemplazo. Las reglas para convertir cadenas y números a valores booleanos indican que `0`, `NaN` y la cadena vacía (`""`) cuentan como `false`, mientras que todos los demás valores cuentan como `true`. Entonces `0 || -1` produce `-1` y `"" || "!?"` produce `"!?"`.

El operador `&&` funciona de manera similar pero al revés. Cuando el valor a su izquierda es algo que se convierte en falso, devuelve ese valor y, de lo contrario, devuelve el valor a su derecha.

Otra propiedad importante de estos dos operadores es que la parte a su derecha se evalúa solo cuando es necesario. En el caso de `true || X`, no importa qué sea `X`, incluso si se trata de un programa que hace algo _terrible_, el resultado será verdadero y `X` nunca se evalúa. Lo mismo ocurre con `false && X`, que es falso e ignorará `X`. Esto se denomina _evaluación de cortocircuito_.

El operador condicional funciona de manera similar. Del segundo y tercer valor, solo se evalúa el seleccionado.

## Resumen

Analizamos cuatro tipos de valores de JavaScript en este capítulo: números, cadenas, valores booleanos y valores indefinidos.

Dichos valores se crean escribiendo su nombre (`true`, `null`) o valor (`13`, `"abc"`). Puede combinar y transformar valores con operadores. Vimos operadores binarios para aritmética (`+`, `-`, `*`, `/` y `%`), concatenación de cadenas (+), comparación (`==`,`!=`, `===`, `!==`, `<`, `>`, `<=`, `>=`), y lógica (`&&`, `||`), así como varios operadores unarios (`-` para negar un número, `!` para negar lógicamente, y `typeof` para encontrar el tipo de un valor) y un operador ternario (`?:`) para elegir uno de dos valores basados en un tercer valor.

Esto le brinda suficiente información para usar JavaScript como una calculadora de bolsillo, pero no mucho más. El [próximo capítulo]() comenzará a vincular estas expresiones en programas básicos.
