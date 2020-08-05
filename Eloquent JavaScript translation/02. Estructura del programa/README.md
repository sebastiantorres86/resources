### Capitulo 2

# Estructura del programa

> «Y mi corazón brilla de color rojo brillante debajo de mi piel translúcida y sucia y tienen que administrar 10cc de JavaScript para que regrese. (Respondo bien a las toxinas en la sangre.) Hombre, ¡esas cosas patearán los duraznos directamente en tus agallas!»
>
> _why, \_La guía (conmovedora) de Ruby por Why_

![](https://eloquentjavascript.net/img/chapter_picture_2.jpg)

En este capítulo, comenzaremos a hacer cosas que en realidad se pueden llamar _programación_. Ampliaremos nuestro dominio del lenguaje JavaScript más allá de los sustantivos y fragmentos de oraciones que hemos visto hasta ahora, hasta el punto en que podamos expresar una prosa significativa.

## Expresiones y declaraciones

En el [Capítulo 1](), creamos valores y les aplicamos operadores para obtener nuevos valores. Crear valores como este es la sustancia principal de cualquier programa de JavaScript. Pero esa sustancia tiene que enmarcarse en una estructura más grande para ser útil. Entonces eso es lo que cubriremos a continuación.

Un fragmento de código que produce un valor se llama _expresión_. Cada valor que se escribe literalmente (como `22` o `"psicoanálisis"`) es una expresión. Una expresión entre paréntesis también es una expresión, como lo es un operador binario aplicado a dos expresiones o un operador unario aplicado a una.

Esto muestra parte de la belleza de una interfaz basada en el lenguaje. Las expresiones pueden contener otras expresiones de forma similar a cómo se anidan las subsecuencias en los lenguajes humanos: una subsecuencia puede contener sus propias subsecuencias, y así sucesivamente. Esto nos permite construir expresiones que describen cálculos arbitrariamente complejos.

Si una expresión corresponde a un fragmento de oración, una _declaración_ de JavaScript corresponde a una oración completa. Un programa es una lista de declaraciones.

El tipo más simple de enunciado es una expresión con un punto y coma después. Este es un programa:

```javascript
1;
!false;
```

Sin embargo, es un programa inútil. Una expresión puede contentarse con solo producir un valor, que luego puede ser utilizado por el código adjunto. Una declaración es independiente, por lo que equivale a algo solo si afecta al mundo. Podría mostrar algo en la pantalla, que cuenta como cambiar el mundo, o podría cambiar el estado interno de la máquina de una manera que afectará las declaraciones que vienen después. Estos cambios se llaman _efectos secundarios_. Las declaraciones en el ejemplo anterior solo producen los valores `1` y `true` y luego los tiran inmediatamente. Esto no deja ninguna impresión en el mundo en absoluto. Cuando ejecuta este programa, no sucede nada observable.

En algunos casos, JavaScript le permite omitir el punto y coma al final de una declaración. En otros casos, tiene que estar allí, o la siguiente línea se tratará como parte de la misma declaración. Las reglas sobre cuándo puede omitirse de forma segura son algo complejas y propensas a errores. Entonces, en este libro, cada declaración que necesita un punto y coma siempre tendrá uno. Te recomiendo que hagas lo mismo, al menos hasta que hayas aprendido más sobre las sutilezas de los puntos y comas faltantes.

## Fijaciones

¿Cómo mantiene un programa un estado interno? ¿Cómo recuerda las cosas? Hemos visto cómo producir nuevos valores a partir de valores antiguos, pero esto no cambia los valores antiguos, y el nuevo valor debe usarse inmediatamente o se disipará nuevamente. Para capturar y retener valores, JavaScript proporciona una cosa llamada _enlace_ o _variable_:

```javascript
let caught = 5 * 5;
```

Esa es una segunda clase de declaración. La palabra especial (_palabra clave_) `let` indica que esta oración va a definir un enlace. Le sigue el nombre del enlace y, si queremos darle un valor inmediatamente, un operador `=` y una expresión.

La declaración anterior crea un enlace llamado `caught` y lo utiliza para agarrar el número que se produce al multiplicar 5 por 5.

Una vez que se ha definido un enlace, su nombre se puede usar como una expresión. El valor de dicha expresión es el valor que tiene actualmente el enlace. Aquí hay un ejemplo:

```javascript
let ten = 10;
console.log(ten * ten);
// → 100
```

Cuando un enlace apunta a un valor, eso no significa que esté vinculado a ese valor para siempre. El operador `=` se puede usar en cualquier momento en los enlaces existentes para desconectarlos de su valor actual y hacer que apunten a uno nuevo.

```javascript
let mood = "light";
console.log(mood);
// → light
mood = "dark";
console.log(mood);
// → dark
```

Debes imaginar las fijaciones como tentáculos, en lugar de cajas. No _contienen_ valores; los _captan_: dos enlaces pueden referirse al mismo valor. Un programa solo puede acceder a los valores a los que todavía tiene referencia. Cuando necesitas recordar algo, creces un tentáculo para agarrarlo o vuelves a colocar uno de tus tentáculos existentes.

Veamos otro ejemplo. Para recordar la cantidad de dólares que Luigi aún te debe, creas un enlace. Y luego, cuando paga \$35, le das a este enlace un nuevo valor.

```javascript
let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
console.log(luigisDebt);
// → 105
```

Cuando define un enlace sin darle un valor, el tentáculo no tiene nada que comprender, por lo que termina en el aire. Si solicita el valor de un enlace vacío, obtendrá el valor `undefined`.

Una sola declaración `let` puede definir múltiples enlaces. Las definiciones deben estar separadas por comas.

```javascript
let one = 1,
  two = 2;
console.log(one + two);
// → 3
```

Las palabras `var` y `const` también se pueden usar para crear enlaces, de forma similar a `let`.

```javascript
var name = "Ayda";
const greeting = "Hello";
console.log(greeting + name);
// → Hola Ayda
```

La primera, `var` (abreviatura de "variable"), es la forma en que se declararon los enlaces en JavaScript anterior a 2015. Volveré a la forma precisa en que difiere de `let` en el [próximo capítulo](). Por ahora, recuerde que en su mayoría hace lo mismo, pero rara vez lo usaremos en este libro porque tiene algunas propiedades confusas.

La palabra `const` significa constante. Define un enlace constante, que apunta al mismo valor mientras viva. Esto es útil para los enlaces que dan un nombre a un valor para que pueda consultarlo fácilmente más adelante.

## Nombres vinculantes

Los nombres de enlace pueden ser cualquier palabra. Los dígitos pueden ser parte de los nombres de enlace (`catch22` es un nombre válido, por ejemplo), pero el nombre no debe comenzar con un dígito. Un nombre vinculante puede incluir signos de dólar (\$) o guiones bajos (\_) pero no otros signos de puntuación o caracteres especiales.

Las palabras con un significado especial, como `let`, son _palabras clave_ y no pueden usarse como nombres vinculantes. También hay una serie de palabras que están "reservadas para su uso" en futuras versiones de JavaScript, que tampoco se pueden usar como nombres de enlace. La lista completa de palabras clave y palabras reservadas es bastante larga.

```
break case catch class const continue debugger default
delete do else enum export extends false finally for
function if implements import interface in instanceof let
new package private protected public return static super
switch this throw true try typeof var void while with yield
```

No te preocupes por memorizar esta lista. Cuando la creación de un enlace produce un error de sintaxis inesperado, vea si está intentando definir una palabra reservada.

## El entorno

La colección de enlaces y sus valores que existen en un momento dado se denomina _entorno_. Cuando se inicia un programa, este entorno no está vacío. Siempre contiene enlaces que forman parte del estándar del lenguaje, y la mayoría de las veces, también tiene enlaces que proporcionan formas de interactuar con el sistema circundante. Por ejemplo, en un navegador, hay funciones para interactuar con el sitio web cargado actualmente y para leer la entrada del mouse y el teclado.

## Las funciones

Muchos de los valores proporcionados en el entorno predeterminado tienen el tipo _función_. Una función es un programa envuelto en un valor. Dichos valores se pueden _aplicar_ para ejecutar el programa envuelto. Por ejemplo, en un entorno de navegador, la solicitud (`prompt`) de enlace contiene una función que muestra un pequeño cuadro de diálogo que solicita la entrada del usuario. Se usa así:

```javascript
prompt("Enter passcode");
```

![](https://eloquentjavascript.net/img/prompt.png)

La ejecución de una función se llama _invocar_, _llamar_ o _aplicarla_. Puede llamar a una función poniendo paréntesis después de una expresión que produce un valor de función. Por lo general, usará directamente el nombre del enlace que contiene la función. Los valores entre paréntesis se dan al programa dentro de la función. En el ejemplo, la función `prompt` utiliza la cadena que le damos como texto para mostrar en el cuadro de diálogo. Los valores dados a las funciones se llaman _argumentos_. Las diferentes funciones pueden necesitar un número diferente o diferentes tipos de argumentos.

La función `prompt` no se usa mucho en la programación web moderna, principalmente porque no tienes control sobre el aspecto del cuadro de diálogo resultante, pero puede ser útil en programas de juguete y experimentos.

## La función console.log

En los ejemplos, utilicé `console.log` para generar valores. La mayoría de los sistemas JavaScript (incluidos todos los navegadores web modernos y Node.js) proporcionan una función `console.log` que escribe sus argumentos en _algún_ _dispositivo_ de salida de texto. En los navegadores, la salida llega a la consola de JavaScript. Esta parte de la interfaz del navegador está oculta de forma predeterminada, pero la mayoría de los navegadores la abren cuando presiona F12 o, en una Mac, `COMMAND`-`OPTION`-I. Si eso no funciona, busque en los menús un elemento llamado Herramientas de desarrollador o similar.

Al ejecutar los ejemplos (o su propio código) en las páginas de este libro, la salida de `console.log` se mostrará después del ejemplo, en lugar de en la consola JavaScript del navegador.

```javascript
let x = 30;
console.log("el valor de x es", x);
// → el valor de x es 30
```

Aunque los nombres de enlace no pueden contener caracteres de punto, `console.log` tiene uno. Esto se debe a que `console.log` no es un enlace simple. En realidad, es una expresión que recupera la propiedad de registro (`log`) del valor contenido por el enlace de la consola (`console`). Descubriremos exactamente lo que esto significa en el [Capítulo 4]().

## Valores de retorno

Mostrar un cuadro de diálogo o escribir texto en la pantalla es un _efecto secundario_. Muchas funciones son útiles debido a los efectos secundarios que producen. Las funciones también pueden producir valores, en cuyo caso no necesitan tener un efecto secundario para ser útiles. Por ejemplo, la función `Math.max` toma cualquier cantidad de argumentos numéricos y devuelve el mayor.

```javascript
console.log(Math.max(2, 4));
// → 4
```

Cuando una función produce un valor, se dice que _devuelve_ ese valor. Todo lo que produce un valor es una expresión en JavaScript, lo que significa que las llamadas a funciones se pueden usar dentro de expresiones más grandes. Aquí se usa una llamada a `Math.min`, que es lo opuesto a `Math.max`, como parte de una expresión más:

```javascript
console.log(Math.min(2, 4) + 100);
// → 102
```

El [siguiente capítulo]() explica cómo escribir sus propias funciones.

## Flujo de control

Cuando su programa contiene más de una declaración, las declaraciones se ejecutan como si fueran una historia, de arriba abajo. Este programa de ejemplo tiene dos declaraciones. El primero le pide al usuario un número, y el segundo, que se ejecuta después del primero, muestra el cuadrado de ese número.

```javascript
let theNumber = Number(prompt("Elija un número"));
console.log("Su número es la raíz cuadrada de" + theNumber * theNumber);
```

La función `Number` convierte un valor en un número. Necesitamos esa conversión porque el resultado de prompt es un valor de cadena y queremos un número. Hay funciones similares llamadas `String` y `Boolean` que convierten valores a esos tipos.

Aquí está la representación esquemática bastante trivial del flujo de control en línea recta:

![](https://eloquentjavascript.net/img/controlflow-straight.svg)

## Ejecución condicional

No todos los programas son caminos rectos. Podemos, por ejemplo, querer crear un camino de ramificación, donde el programa toma la rama adecuada en función de la situación en cuestión. Esto se llama _ejecución condicional_.

![](https://eloquentjavascript.net/img/controlflow-if.svg)

La ejecución condicional se crea con la palabra clave `if` en JavaScript. En el caso simple, queremos que se ejecute algún código si, y solo si, se cumple una determinada condición. Podríamos, por ejemplo, querer mostrar el cuadrado de la entrada solo si la entrada es realmente un número.

```javascript
let theNumber = Number(prompt("Elija un número"));
if (!Number.isNaN(theNumber)) {
  console.log("Su número es la raíz cuadrada de" + theNumber * theNumber);
}
```

Con esta modificación, si ingresa "loro", no se muestra ninguna salida.

La palabra clave `if` ejecuta u omite una instrucción según el valor de una expresión booleana. La expresión decisiva se escribe después de la palabra clave, entre paréntesis, seguida de la instrucción a ejecutar.

La función `Number.isNaN` es una función estándar de JavaScript que devuelve `true` solo si el argumento que se le da es `NaN`. La función `Number` devuelve `NaN` cuando le da una cadena que no representa un número válido. Por lo tanto, la condición se traduce como "a menos que `theNumber` no sea un número, haga esto".

La declaración después del `if` está envuelta entre llaves ({ y }) en este ejemplo. Las llaves se pueden usar para agrupar cualquier número de declaraciones en una sola declaración, llamada _bloque_. También podría haberlos omitido en este caso, ya que contienen una sola declaración, pero para evitar tener que pensar si son necesarios, la mayoría de los programadores de JavaScript los usan en cada declaración envuelta como esta. La mayoría de las veces seguiremos esa convención en este libro, a excepción de la frase de una línea ocasional.

```javascript
if (1 + 1 == 2) console.log("Es cierto");
// → Es cierto
```

A menudo no solo tendrá un código que se ejecute cuando una condición sea verdadera, sino también un código que maneje el otro caso. Esta ruta alternativa está representada por la segunda flecha en el diagrama. Puede usar la palabra clave `else`, junto con `if`, para crear dos rutas de ejecución alternativas y separadas.

```javascript
let theNumber = Number(prompt("Elija un número"));
if (!Number.isNaN(theNumber)) {
  console.log("Su número es la raíz cuadrada de" + theNumber * theNumber);
} else {
  console.log("Hey. ¿Por qué no me diste un número?");
}
```

Si tiene más de dos caminos para elegir, puede "encadenar" múltiples pares `if / else` juntos. Aquí hay un ejemplo:

```javascript
let num = Number(prompt("Elige un número"));

if (num < 10) {
  console.log("Small");
} else if (num < 100) {
  console.log("Medium");
} else {
  console.log("Large");
}
```

El programa primero verificará si `num` es menor que 10. Si es así, elige esa rama, muestra `"Small"` y listo. Si no lo es, toma la rama `else`, que contiene un segundo `if`. Si se cumple la segunda condición (`< 100`), eso significa que el número está entre 10 y 100, y se muestra `"Medium"`. Si no es así, se elige la segunda y última rama `else`.

El esquema para este programa se ve así:

![](https://eloquentjavascript.net/img/controlflow-nested-if.svg)

## Bucles while y do

Considere un programa que genera todos los números pares del 0 al 12. Una forma de escribir esto es la siguiente:

```javascript
console.log(0);
console.log(2);
console.log(4);
console.log(6);
console.log(8);
console.log(10);
console.log(12);
```

Eso funciona, pero la idea de escribir un programa es hacer _menos_ trabajo, no más. Si necesitáramos todos los números pares menores a 1,000, este enfoque sería inviable. Lo que necesitamos es una forma de ejecutar un fragmento de código varias veces. Esta forma de flujo de control se denomina _bucle_.

![](https://eloquentjavascript.net/img/controlflow-loop.svg)

El flujo de control en bucle nos permite volver a algún punto del programa donde estábamos antes y repetirlo con nuestro estado actual del programa. Si combinamos esto con un enlace que cuenta, podemos hacer algo como esto:

```javascript
let numero = 0;
while (numero <= 12) {
  console.log(numero);
  numero = numero + 2;
}
// → 0
// → 2
// ... etcétera
```

Una declaración que comienza con la palabra clave `while` crea un bucle. La palabra `while` es seguida por una expresión entre paréntesis y luego una declaración, muy similar a `if`. El bucle sigue ingresando esa declaración siempre que la expresión produzca un valor que sea `true` cuando se convierta a booleano.

El enlace `numero` demuestra la forma en que un enlace puede seguir el progreso de un programa. Cada vez que se repite el ciclo, `numero` obtiene un valor que es 2 más que su valor anterior. Al comienzo de cada repetición, se compara con el número 12 para decidir si el trabajo del programa está terminado.

Como ejemplo que realmente hace algo útil, ahora podemos escribir un programa que calcule y muestre el valor de 2<sup>10</sup> (2 a la 10ma potencia). Utilizamos dos enlaces: uno para realizar un seguimiento de nuestro resultado y otro para contar la frecuencia con la que hemos multiplicado este resultado por 2. El bucle comprueba si el segundo enlace ha llegado a 10 y, si no, actualiza ambos enlaces.

```javascript
let resultado = 1;
let contador = 0;
while (contador < 10) {
  resultado = resultado * 2;
  contador = contador + 1;
}
console.log(resultado);
// → 1024
```

El contador también podría haber comenzado en `1` y verificado `<= 10`, pero por razones que serán evidentes en el [Capítulo 4](), es una buena idea acostumbrarse a contar desde 0.

Un bucle `do` es una estructura de control similar a un bucle `while`. Solo difiere en un punto: un bucle `do` siempre ejecuta su cuerpo al menos una vez, y comienza a probar si debe detenerse solo después de esa primera ejecución. Para reflejar esto, la prueba aparece después del cuerpo del bucle.

```javascript
let yourName;
do {
  yourName = prompt("¿Quién eres?");
} while (!yourName);
console.log(yourName);
```

Este programa te obligará a ingresar un nombre. Preguntará una y otra vez hasta que obtenga algo que no sea una cadena vacía. Aplicando el operador `!` convertirá un valor al tipo booleano antes de negarlo, y todas las cadenas excepto `""` se convertirán a `true`. Esto significa que el ciclo continúa dando vueltas hasta que proporcione un nombre no vacío.

## Indentando código

En los ejemplos, he estado agregando espacios delante de las declaraciones que son parte de una declaración más grande. Estos espacios no son obligatorios: la computadora aceptará el programa sin problemas. De hecho, incluso los saltos de línea en los programas son opcionales. Podría escribir un programa como una sola línea larga si lo desea.

El papel de esta sangría dentro de los bloques es hacer que la estructura del código se destaque. En el código donde se abren nuevos bloques dentro de otros bloques, puede ser difícil ver dónde termina un bloque y comienza otro. Con una sangría adecuada, la forma visual de un programa corresponde a la forma de los bloques en su interior. Me gusta usar dos espacios para cada bloque abierto, pero los gustos difieren: algunas personas usan cuatro espacios y otras usan caracteres de tabulación. Lo importante es que cada nuevo bloque agrega la misma cantidad de espacio.

```javascript
if (true != false) {
  console.log("Eso tiene sentido");
  if (1 < 2) {
    console.log("No hay sorpresa allí");
  }
}
```

La mayoría de los programas de edición de código (incluido el de este libro) ayudarán al sangrar automáticamente nuevas líneas en la cantidad adecuada.

## Bucles for

Muchos bucles siguen el patrón que se muestra en los ejemplos `while`. Primero se crea un enlace de "contador" para seguir el progreso del bucle. Luego viene un ciclo `while`, generalmente con una expresión de prueba que verifica si el contador ha alcanzado su valor final. Al final del cuerpo del bucle, el contador se actualiza para seguir el progreso.

Debido a que este patrón es tan común, JavaScript y lenguajes similares proporcionan una forma un poco más corta y más completa, el ciclo `for`.

```javascript
for (let numero = 0; numero <= 12; numero = numero + 2) {
  console.log(numero);
}
// → 0
// → 2
// ... etcétera
```

Este programa es exactamente equivalente al ejemplo anterior de impresión de números pares. El único cambio es que todas las declaraciones que están relacionadas con el "estado" del bucle se agrupan después de `for`.

Los paréntesis después de una palabra clave `for` deben contener dos puntos y comas. La parte anterior al primer punto y coma _inicializa_ el bucle, generalmente definiendo un enlace. La segunda parte es la expresión que _verifica_ si el ciclo debe continuar. La parte final _actualiza_ el estado del bucle después de cada iteración. En la mayoría de los casos, esto es más corto y más claro que una construcción _while_.

Este es el código que calcula 2<sup>10</sup> usando `for` en lugar de `while`:

```javascript
let resultado = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
  resultado = resultado * 2;
}
console.log(resultado);
// → 1024
```

## Salir de un bucle

Tener la condición de bucle produciendo `false` no es la única forma en que un bucle puede terminar. Hay una declaración especial llamada `break` que tiene el efecto de saltar inmediatamente al ciclo de cierre.

Este programa ilustra la declaración `break`. Encuentra el primer número que es mayor o igual que 20 y divisible por 7.

```javascript
for (let current = 20; ; current = current + 1) {
  if (actual % 7 == 0) {
    console.log(actual);
    break;
  }
}
// → 21
```

Usar el operador restante (`%`) es una manera fácil de probar si un número es divisible por otro número. Si es así, el resto de su división es cero.

La construcción `for` en el ejemplo no tiene una parte que verifique el final del ciclo. Esto significa que el bucle nunca se detendrá a menos que se ejecute la instrucción `break` dentro.

Si eliminara esa declaración `break` o accidentalmente escribiera una condición final que siempre produce `true`, su programa se atascaría en un _bucle infinito_. Un programa atascado en un bucle infinito nunca terminará de ejecutarse, lo que generalmente es algo malo.

Si crea un bucle infinito en uno de los ejemplos en estas páginas, generalmente se le preguntará si desea detener el script después de unos segundos. Si eso falla, tendrá que cerrar la pestaña en la que está trabajando o, en algunos navegadores, cerrar todo su navegador para recuperarse.

La palabra clave `continue` es similar a break, ya que influye en el progreso de un bucle. Cuando se encuentra `continue` en un cuerpo de bucle, el control salta del cuerpo y continúa con la siguiente iteración del bucle.

## Actualización de enlaces de forma sucinta

Especialmente cuando se realiza un bucle, un programa a menudo necesita "actualizar" un enlace para mantener un valor basado en el valor anterior de ese enlace.

```javascript
contador = contador + 1;
```

JavaScript proporciona un atajo para esto.

```javascript
contador += 1;
```

Atajos similares funcionan para muchos otros operadores, como resultado `*= 2` para duplicar el resultado o contador `-= 1` para contar hacia abajo.

Esto nos permite acortar un poco más nuestro ejemplo de conteo.

```javascript
for (let numero = 0; numero <= 12; numero += 2) {
  console.log(numero);
}
```

Para `counter += 1` y `counter -= 1`, hay equivalentes aún más cortos: `counter++` y `counter--`.

## Despacho de un valor con switch

No es raro que el código tenga este aspecto:

```javascript
if (x == "value1") action1();
else if (x == "valor2") acción2();
else if (x == "valor3") action3();
else defaultAction();
```

Hay una construcción llamada `switch` que tiene la intención de expresar tal "despacho" de una manera más directa. Desafortunadamente, la sintaxis que JavaScript usa para esto (que heredó de la línea C/Java de lenguajes de programación) es algo incómoda, una cadena de sentencias `if` puede verse mejor. Aquí hay un ejemplo:

```javascript
switch (prompt("¿Qué tiempo hace?")) {
  case "lluvioso":
    console.log("Recuerde traer un paraguas");
    break;
  case "soleado":
    console.log("Vístase a la ligera");
  case "nublado":
    console.log("Ir afuera");
    break;
  default:
    console.log("¡Tipo de clima desconocido!");
    break;
}
```

Puede colocar cualquier cantidad de etiquetas `case` dentro del bloque abierto por el `switch`. El programa comenzará a ejecutarse en la etiqueta que corresponde al valor que se le dio al conmutador, o por `default` si no se encuentra ningún valor coincidente. Continuará ejecutándose, incluso en otras etiquetas, hasta que llegue a una declaración `break`. En algunos casos, como el caso "soleado" en el ejemplo, esto se puede usar para compartir algún código entre los casos (se recomienda salir al aire libre tanto para clima soleado como nublado). Pero tenga cuidado: es fácil olvidar el `break`, lo que hará que el programa ejecute código que no desea ejecutar.

## Capitalización

Los nombres de enlace pueden no contener espacios, pero a menudo es útil usar varias palabras para describir claramente lo que representa el enlace. Estas son sus opciones para escribir un nombre vinculante con varias palabras:

```
fuzzylittleturtle
fuzzy_little_turtle
FuzzyLittleTurtle
fuzzyLittleTurtle
```

El primer estilo puede ser difícil de leer. Me gusta más el aspecto de los guiones bajos, aunque ese estilo es un poco doloroso de escribir. Las funciones estándar de JavaScript, y la mayoría de los programadores de JavaScript, siguen el estilo inferior: capitalizan cada palabra excepto la primera. No es difícil acostumbrarse a pequeñas cosas como esa, y el código con estilos de nombres mixtos puede ser difícil de leer, por lo que seguimos esta convención.

En algunos casos, como la función `Number`, la primera letra de un enlace también se escribe con mayúscula. Esto se hizo para marcar esta función como un constructor. Lo que es un constructor quedará claro en el [Capítulo 6](). Por ahora, lo importante es no preocuparse por esta aparente falta de consistencia.

## Comentarios

A menudo, el código sin formato no transmite toda la información que desea que un programa transmita a los lectores humanos, o lo transmite de una manera tan críptica que las personas podrían no entenderlo. En otras ocasiones, es posible que desee incluir algunos pensamientos relacionados como parte de su programa. Para eso están los _comentarios_.

Un comentario es un fragmento de texto que forma parte de un programa pero que la computadora ignora por completo. JavaScript tiene dos formas de escribir comentarios. Para escribir un comentario de una sola línea, puede usar dos caracteres de barra diagonal (`//`) y luego el texto del comentario después.

```javascript
let accountBalance = CalculateBalance(cuenta);
// Es un hueco verde donde canta un río
accountBalance.adjust();
// Atrapando locamente jirones blancos en la hierba.
let report = new Report();
// Donde suena el sol en la orgullosa montaña:
addToReport(accountBalance, report);
// Es un pequeño valle que hace espuma como la luz en un vaso.
```

Un comentario `//` va solo al final de la línea. Una sección de texto entre `/*` y `*/` se ignorará en su totalidad, independientemente de si contiene saltos de línea. Esto es útil para agregar bloques de información sobre un archivo o una porción de programa.

```javascript
/*
Primero encontré este número garabateado en la parte posterior de un viejo cuaderno.
Desde entonces, a menudo ha aparecido en números de teléfono.
y los números de serie de los productos que he comprado. Obviamente
le gusto, así que he decidido mantenerlo.
*/
const myNumber = 11213;
```

## Resumen

Ahora sabe que un programa está construido a partir de declaraciones, que a veces contienen más declaraciones. Las declaraciones tienden a contener expresiones, que pueden construirse a partir de expresiones más pequeñas.

Poner declaraciones una tras otra le da un programa que se ejecuta de arriba a abajo. Puede introducir perturbaciones en el flujo de control mediante el uso de sentencias condicionales (`if`, `else` y `switch`) y bucles (`while`, `do` y `for`).

Los enlaces se pueden usar para archivar datos bajo un nombre, y son útiles para rastrear el estado en su programa. El entorno es el conjunto de enlaces que se definen. Los sistemas JavaScript siempre ponen una serie de enlaces estándar útiles en su entorno.

Las funciones son valores especiales que encapsulan una parte del programa. Puede invocarlos escribiendo `functionName(argumento1, argumento2)`. Tal llamada a la función es una expresión y puede producir un valor.

## Ejercicios

Si no está seguro de cómo probar sus soluciones para los ejercicios, consulte la [Introducción]().

Cada ejercicio comienza con una descripción del problema. Lea esta descripción e intente resolver el ejercicio. Si tiene problemas, considere leer las sugerencias después del ejercicio. Las soluciones completas para los ejercicios no están incluidas en este libro, pero puede encontrarlas en línea en [https://eloquentjavascript.net/code](https://eloquentjavascript.net/code). Si desea aprender algo de los ejercicios, le recomiendo que busque las soluciones solo después de haber resuelto el ejercicio, o al menos después de haberlo atacado durante el tiempo suficiente para que le duela la cabeza.

### Bucle de un triángulo

Escriba un bucle que realice siete llamadas a `console.log` para generar el siguiente triángulo:

```cmd
#

##

###

####

#####

######

#######
```

Puede ser útil saber que puede encontrar la longitud de una cadena escribiendo `.length` después de ella.

```javascript
let abc = "abc";
console.log(abc.length);
// → 3
```

La mayoría de los ejercicios contienen un fragmento de código que puede modificar para resolver el ejercicio. Recuerde que puede hacer clic en los bloques de código para editarlos.

<details>
  <summary>Mostrar pistas...</summary>
Puede comenzar con un programa que imprima los números del 1 al 7, que puede obtener haciendo algunas modificaciones al ejemplo de impresión de números pares dado anteriormente en el capítulo, donde se introdujo el bucle `for`.

Ahora considere la equivalencia entre números y cadenas de caracteres hash. Puede ir del 1 al 2 agregando 1 (`+= 1`). Puede ir de "#" a "##" al agregar un carácter (`+= "#"`). Por lo tanto, su solución puede seguir de cerca el programa de impresión de números.

</details>

### FizzBuzz

Escriba un programa que use `console.log` para imprimir todos los números del 1 al 100, con dos excepciones. Para números divisibles por 3, imprima `"Fizz"` en lugar del número, y para números divisibles por 5 (y no 3), imprima `"Buzz"` en su lugar.

Cuando tenga eso funcionando, modifique su programa para imprimir `"FizzBuzz"` para los números que son divisibles por 3 y 5 (y aún imprima `"Fizz"` o `"Buzz"` para los números divisibles por uno de esos).

(Esta es en realidad una pregunta de entrevista que se afirma que elimina a un porcentaje significativo de candidatos a programadores. Entonces, si la resolvió, su valor en el mercado laboral simplemente aumentó).

<details>
  <summary>Mostrar pistas...</summary>
imprimir es una cuestión de ejecución condicional. Recuerde el truco de usar el operador resto (`%`) para verificar si un número es divisible por otro número (tiene un resto de cero).

En la primera versión, hay tres resultados posibles para cada número, por lo que tendrá que crear una cadena `if` / `else if` / `else`.

La segunda versión del programa tiene una solución sencilla y una inteligente. La solución simple es agregar otra "rama" condicional para probar con precisión la condición dada. Para la solución inteligente, construya una cadena que contenga la palabra o las palabras que se mostrarán e imprima esta palabra o el número si no hay una palabra, posiblemente haciendo un buen uso del operador `||`.

</details>

### Tablero de ajedrez

Escriba un programa que cree una cadena que represente una cuadrícula de 8 × 8, utilizando caracteres de nueva línea para separar las líneas. En cada posición de la cuadrícula hay un espacio o un carácter "#". Los caracteres deben formar un tablero de ajedrez.

Pasar esta cadena a console.log debería mostrar algo como esto:

```cmd
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
```

Cuando tenga un programa que genere este patrón, defina un enlace `size = 8` y cambie el programa para que funcione para cualquier `size`, generando una cuadrícula del ancho y alto dados.

<details>
  <summary>Mostrar pistas...</summary>
Puede construir la cadena comenzando con una vacía (`""`) y repetidamente agregando caracteres. Un carácter de nueva línea se escribe "\n".

Para trabajar con dos dimensiones, necesitará un bucle dentro de un bucle. Coloque llaves alrededor de los cuerpos de ambos bucles para que sea fácil ver dónde comienzan y dónde terminan. Intenta identar adecuadamente estos cuerpos. El orden de los bucles debe seguir el orden en que construimos la cadena (línea por línea, de izquierda a derecha, de arriba a abajo). Entonces, el bucle externo maneja las líneas, y el bucle interno maneja los caracteres en una línea.

Necesitarás dos enlaces para seguir tu progreso. Para saber si se debe colocar un espacio o un signo hash en una posición determinada, puede probar si la suma de los dos contadores es par (`% 2`).

La terminación de una línea agregando un carácter de nueva línea debe ocurrir después de que la línea se haya construido, así que haga esto después del bucle interno pero dentro del bucle externo.

</details>
