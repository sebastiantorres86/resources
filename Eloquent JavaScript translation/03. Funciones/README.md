### Capítulo 3

# Funciones

> «La gente piensa que la informática es el arte de los genios, pero la realidad es todo lo contrario, solo que muchas personas hacen cosas que se construyen unas sobre otras, como un muro de mini piedras.»
>
> -Donald Knuth

![](https://eloquentjavascript.net/img/chapter_picture_3.jpg)

Las funciones son el pan y la mantequilla de la programación JavaScript. El concepto de envolver una parte del programa en un valor tiene muchos usos. Nos da una forma de estructurar programas más grandes, reducir la repetición, asociar nombres con subprogramas y aislar estos subprogramas entre sí.

La aplicación más obvia de funciones es definir nuevo vocabulario. Crear nuevas palabras en prosa suele ser de mal estilo. Pero en programación, es indispensable.

Los hablantes de inglés adultos típicos tienen unas 20.000 palabras en su vocabulario. Pocos lenguajes de programación vienen con 20.000 comandos integrados. Y el vocabulario disponible _tiende_ a definirse con mayor precisión y, por lo tanto, es menos flexible que en el lenguaje humano. Por eso, solemos _tener_ que introducir nuevos conceptos para no repetirnos demasiado.

## Definiendo una función

Una definición de función es un enlace regular donde el valor del enlace es una función. Por ejemplo, este código define `square` para referirse a una función que produce el cuadrado de un número dado:

```javascript
const square = function (x) {
  return x * x;
};

console.log(square(12));
// → 144
```

Una función se crea con una expresión que comienza con la palabra clave `function`. Las funciones tienen un conjunto de _parámetros_ (en este caso, solo `x`) y un _cuerpo_, que contiene las instrucciones que se ejecutarán cuando se llame a la función. El cuerpo de la función de una función creada de esta manera siempre debe estar entre llaves, incluso cuando consta de una sola declaración.

Una función puede tener varios parámetros o no tener ningún parámetro. En el siguiente ejemplo, `makeNoise` no enumera ningún nombre de parámetro, mientras que `power` enumera dos:

```javascript
const makeNoise = function () {
  console.log("¡Pling!");
};

makeNoise();
// → ¡Pling!

const power = function (base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

console.log(power(2, 10));
// → 1024
```

Algunas funciones producen un valor, como `power` y `square`, y otras no, como `makeNoise`, cuyo único resultado es un efecto secundario. Una declaración de retorno (`return`) determina el valor que devuelve la función. Cuando el control se encuentra con tal declaración, inmediatamente salta de la función actual y le da el valor devuelto al código que llamó a la función. Una palabra clave `return` sin una expresión después hará que la función devuelva `undefined`. Las funciones que no tienen ninguna declaración de `return`, como `makeNoise`, devuelven de manera similar `undefined`.

Los parámetros de una función se comportan como enlaces regulares, pero sus valores iniciales los da el _llamador_ de la función, no el código de la función en sí.

## Enlaces y alcances

Cada enlace tiene un _alcance_, que es la parte del programa en la que el enlace es visible. Para los enlaces definidos fuera de cualquier función o bloque, el alcance es el programa completo; puede consultar dichos enlaces donde quiera. Estos se llaman _globales_.

Pero los enlaces creados para parámetros de función o declarados dentro de una función solo se pueden hacer referencia en esa función, por lo que se conocen como enlaces _locales_. Cada vez que se llama a la función, se crean nuevas instancias de estos enlaces. Esto proporciona cierto aislamiento entre las funciones: cada llamada a función actúa en su propio pequeño mundo (su entorno local) y, a menudo, se puede entender sin saber mucho sobre lo que está sucediendo en el entorno global.

Los enlaces declarados con `let` y `const` son de hecho locales al bloque en el que se declaran, por lo que si crea uno de esos dentro de un bucle, el código antes y después del bucle no puede "verlo". En JavaScript anterior a 2015, solo las funciones creaban nuevos ámbitos, por lo que los enlaces de estilo antiguo, creados con la palabra clave `var`, son visibles en toda la función en la que aparecen, o en todo el ámbito global, si no están en una función.

```javascript
let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z);
  // → 60
}
// y no es visible aquí
console.log(x + z);
// → 40
```

Cada alcance puede "mirar" hacia el ámbito que lo rodea, por lo que x es visible dentro del bloque en el ejemplo. La excepción es cuando varios enlaces tienen el mismo nombre; en ese caso, el código solo puede ver el más interno. Por ejemplo, cuando el código dentro de la función `halve` se refiere a `n`, está viendo su _propia_ `n`, no la `n` global.

```javascript
const halve = function(n) {
  return n / 2;
};

let ​​n = 10;
console.log(halve(100));
// → 50
console.log(n);
// → 10
```

## Alcance anidado

JavaScript no solo distingue los enlaces _globales_ y _locales_. Pueden crearse bloques y funciones dentro de otros bloques y funciones, produciendo múltiples grados de localidad.

Por ejemplo, esta función, que genera los ingredientes necesarios para hacer un lote de hummus, tiene otra función en su interior:

```javascript
const hummus = function (factor) {
  const ingredient = function (amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`$ {ingredientAmount} $ {unit} $ {name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};
```

El código dentro de la función `ingredient` puede ver el `factor` de unión de la función externa. Pero sus enlaces locales, como `unit` o `ingredientAmount`, no son visibles en la función externa.

El conjunto de enlaces visibles dentro de un bloque está determinado por el lugar de ese bloque en el texto del programa. Cada ámbito local también puede ver todos los ámbitos locales que lo contienen y todos los ámbitos pueden ver el ámbito global. Este enfoque de la visibilidad vinculante se denomina _alcance léxico_.

## Funciones como valores

Un enlace de función generalmente actúa simplemente como un nombre para una parte específica del programa. Esta vinculación se define una vez y nunca se modifica. Esto hace que sea fácil confundir la función y su nombre.

Pero los dos son diferentes. Un valor de función puede hacer todas las cosas que pueden hacer otros valores: puede usarlo en expresiones arbitrarias, no solo llamarlo. Es posible almacenar el valor de una función en un nuevo enlace, pasarlo como argumento a una función, etc. De manera similar, un enlace que contiene una función sigue siendo solo un enlace regular y, si no es constante, se le puede asignar un nuevo valor, así:

```javascript
let launchMissiles = function () {
  missileSystem.launch("now");
};
if (safeMode) {
  launchMissiles = function () {
    /* do nothing */
  };
}
```

En el [Capítulo 5](), discutiremos las cosas interesantes que se pueden hacer pasando valores de función a otras funciones.

## Notación de declaración

Hay una forma un poco más corta de crear un enlace de función. Cuando se usa la palabra clave `function` al comienzo de una declaración, funciona de manera diferente.

```javascript
function square(x) {
  return x * x;
}
```

Esta es una _declaración_ de función. La declaración define el `square` vinculante y lo apunta a la función dada. Es un poco más fácil de escribir y no requiere un punto y coma después de la función.

Hay una sutileza con esta forma de definición de función.

```javascript
console.log("The future says:", future());

function future() {
  return "You'll never have flying cars";
}
```

El código anterior funciona, aunque la función se define _debajo_ del código que lo usa. Las declaraciones de funciones no forman parte del flujo de control regular de arriba a abajo. Se mueven conceptualmente a la parte superior de su alcance y pueden ser utilizados por todo el código en ese alcance. Esto a veces es útil porque ofrece la libertad de ordenar el código de una manera que parezca significativa, sin preocuparse por tener que definir todas las funciones antes de usarlas.

## Funciones de flecha

Hay una tercera notación para funciones, que se ve muy diferente a las demás. En lugar de la palabra clave `function`, utiliza una flecha (`=>`) formada por un signo igual y un carácter mayor que (no confundir con el operador mayor o igual, que se escribe `>=`).

```javascript
const power = (base, exponent) => {
  let resulta = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};
```

La flecha viene _después_ de la lista de parámetros y va seguida del cuerpo de la función. Expresa algo como “esta entrada (los parámetros) produce este resultado (el cuerpo)”.

Cuando solo hay un nombre de parámetro, puede omitir los paréntesis alrededor de la lista de parámetros. Si el cuerpo es una expresión única, en lugar de un bloque entre llaves, la función devolverá esa expresión. Entonces, estas dos definiciones de cuadrado hacen lo mismo:

```javascript
const square1 = (x) => {
  return x * x;
};
const square2 = (x) => x * x;
```

Cuando una función de flecha no tiene ningún parámetro, su lista de parámetros es solo un conjunto vacío de paréntesis.

```javascript
const horn = () => {
  console.log("Toot");
};
```

No hay una razón profunda para tener funciones de flecha y expresiones de función en el lenguaje. Aparte de un pequeño detalle, que discutiremos en el [Capítulo 6](), hacen lo mismo. Las funciones de flecha se agregaron en 2015, principalmente para hacer posible escribir expresiones de función pequeñas de una manera menos detallada. Los usaremos mucho en el [Capítulo 5]().

## La pila de llamadas

La forma en que el control fluye a través de las funciones es algo complicada. Echemos un vistazo más de cerca. Aquí hay un programa simple que realiza algunas llamadas a funciones:

```javascript
function greet(who) {
  console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");
```

Una ejecución a través de este programa es más o menos así: la llamada a saludar hace que el control salte al inicio de esa función (línea 2). La función llama a `console.log`, que toma el control, hace su trabajo y luego devuelve el control a la línea 2. Allí llega al final de la función `greet`, por lo que regresa al lugar que lo llamó, que es la línea 4. La línea después de eso, vuelve a llamar a `console.log`. Después de que regrese, el programa llega a su fin.

Podríamos mostrar el flujo de control esquemáticamente así:

```
not in function
  in greet
    in console.log
  in greet
not in function
  in console.log
not in function
```

Debido a que una función tiene que volver al lugar donde la llamó cuando regresa, la computadora debe recordar el contexto desde el cual ocurrió la llamada. En un caso, `console.log` tiene que volver a la función `greet` cuando termina. En el otro caso, vuelve al final del programa.

El lugar donde la computadora almacena este contexto es la _pila de llamadas_. Cada vez que se llama a una función, el contexto actual se almacena en la parte superior de esta pila. Cuando una función regresa, elimina el contexto superior de la pila y usa ese contexto para continuar la ejecución.

El almacenamiento de esta pila requiere espacio en la memoria de la computadora. Cuando la pila crece demasiado, la computadora fallará con un mensaje como "pila sin espacio" o "demasiada recursividad". El siguiente código ilustra esto al hacerle a la computadora una pregunta realmente difícil que causa un intercambio infinito entre dos funciones. Más bien, _sería_ infinito, si la computadora tuviera una pila infinita. Tal como están las cosas, nos quedaremos sin espacio o "arruinaremos la pila".

```javascript
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
// → ??
```

## Argumentos opcionales

El siguiente código está permitido y se ejecuta sin ningún problema:

```javascript
function square(x) {
  return x * x;
}
console.log(square(4, true, "hedgedog"));
// → 16
```

Definimos `square` con un solo parámetro. Sin embargo, cuando lo llamamos con tres, el lenguaje no se queja. Ignora los argumentos adicionales y calcula el cuadrado del primero.

JavaScript es extremadamente tolerante en cuanto a la cantidad de argumentos que se le pasan a una función. Si pasa demasiados, los adicionales se ignoran. Si pasa muy pocos, a los parámetros faltantes se les asigna el valor `undefined`.

La desventaja de esto es que es posible, incluso probable, que pase accidentalmente el número incorrecto de argumentos a las funciones. Y nadie te lo dirá.

La ventaja es que este comportamiento se puede usar para permitir que se llame a una función con diferentes números de argumentos. Por ejemplo, esta función `minus` intenta imitar el operador `-` actuando sobre uno o dos argumentos:

```javascript
function minus(a, b) {
  if (b === undefined) return -a;
  else return a - b;
}

console.log(minus(10));
// → -10
console.log(minus(10, 5));
// → 5
```

Si escribe un operador `=` después de un parámetro, seguido de una expresión, el valor de esa expresión reemplazará el argumento cuando no se proporcione.

Por ejemplo, esta versión de poder hace que su segundo argumento sea opcional. Si no lo proporciona o pasa el valor indefinido, el valor predeterminado será dos y la función se comportará como un cuadrado.

```javascript
function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponente; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
// → 16
console.log(power(2, 6));
// → 64
```

En el [próximo capítulo](), veremos una forma en que el cuerpo de una función puede obtener la lista completa de argumentos que se le pasó. Esto es útil porque hace posible que una función acepte cualquier número de argumentos. Por ejemplo, `console.log` hace esto: genera todos los valores que se le dan.

```javascript
console.log("C", "O", 2);
// → C O 2
```

## Cierre

La capacidad de tratar las funciones como valores, combinada con el hecho de que los enlaces locales se recrean cada vez que se llama a una función, plantea una pregunta interesante. ¿Qué sucede con los enlaces locales cuando la llamada a la función que los creó ya no está activa?

El siguiente código muestra un ejemplo de esto. Define una función, `wrapValue`, que crea un enlace local. Luego devuelve una función que accede y devuelve este enlace local.

```javascript
function wrapValue(n) {
  let local = n;
  return () => local;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
```

Esto está permitido y funciona como es de esperar; aún se puede acceder a ambas instancias del enlace. Esta situación es una buena demostración del hecho de que los enlaces locales se crean de nuevo para cada llamada, y las diferentes llamadas no pueden pisotear los enlaces locales de las demás.

Esta característica (poder hacer referencia a una instancia específica de un enlace local en un ámbito adjunto) se denomina _cierre_. Una función que hace referencia a enlaces de ámbitos locales a su alrededor se llama _un_ cierre. Este comportamiento no solo le libera de tener que preocuparse por la vida útil de los enlaces, sino que también hace posible utilizar valores de función de algunas formas creativas.

Con un ligero cambio, podemos convertir el ejemplo anterior en una forma de crear funciones que se multipliquen por una cantidad arbitraria.

```javascript
function multiplier(factor) {
  return (number) => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
// → 10
```

El enlace `local` explícito del ejemplo de `wrapValue` no es realmente necesario ya que un parámetro es en sí mismo un enlace local.

Pensar en programas como este requiere algo de práctica. Un buen modelo mental es pensar que los valores de función contienen tanto el código en su cuerpo como el entorno en el que se crean. Cuando se llama, el cuerpo de la función ve el entorno en el que se creó, no el entorno en el que se llama.

En el ejemplo, se llama a `multiplier` y crea un entorno en el que su parámetro `factor` está vinculado a 2. El valor de la función que devuelve, que se almacena en `twice`, recuerda este entorno. Entonces, cuando se llama, multiplica su argumento por 2.

## Recursividad

Está perfectamente bien que una función se llame a sí misma, siempre que no lo haga con tanta frecuencia que desborde la pila. Una función que se llama a sí misma se llama _recursiva_. La recursividad permite escribir algunas funciones con un estilo diferente. Tomemos, por ejemplo, esta implementación alternativa de `power`:

```javascript
function power(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

console.log(power(2, 3));
// → 8
```

Esto se acerca bastante a la forma en que los matemáticos definen la exponenciación y podría decirse que describe el concepto con más claridad que la variante de bucle. La función se llama a sí misma varias veces con exponentes cada vez más pequeños para lograr la multiplicación repetida.

Pero esta implementación tiene un problema: en las implementaciones típicas de JavaScript, es aproximadamente tres veces más lenta que la versión en bucle. Ejecutar un bucle simple es generalmente más económico que llamar a una función varias veces.

El dilema de velocidad versus elegancia es interesante. Puede verlo como una especie de continuidad entre la compatibilidad con los humanos y la compatibilidad con las máquinas. Casi cualquier programa se puede hacer más rápido haciéndolo más grande y más complicado. El programador debe decidir sobre un equilibrio adecuado.

En el caso de la función `power`, la versión poco elegante (en bucle) sigue siendo bastante simple y fácil de leer. No tiene mucho sentido reemplazarlo con la versión recursiva. A menudo, sin embargo, un programa se ocupa de conceptos tan complejos que es útil renunciar a cierta eficiencia para hacer que el programa sea más sencillo.

Preocuparse por la eficiencia puede ser una distracción. Es otro factor más que complica el diseño del programa, y ​​cuando estás haciendo algo que ya es difícil, esa cosa extra de la que preocuparte puede ser paralizante.

Por lo tanto, comience siempre por escribir algo que sea correcto y fácil de entender. Si le preocupa que sea demasiado lento, lo que generalmente no es así, ya que la mayoría del código simplemente no se ejecuta con la frecuencia suficiente para tomar una cantidad significativa de tiempo, puede medirlo después y mejorarlo si es necesario.

La recursividad no siempre es solo una alternativa ineficaz al bucle. Algunos problemas son realmente más fáciles de resolver con recursividad que con bucles. En la mayoría de los casos, estos son problemas que requieren la exploración o el procesamiento de varias "ramas", cada una de las cuales podría ramificarse nuevamente en más ramas.

Considere este acertijo: al comenzar desde el número 1 y repetidamente sumar 5 o multiplicar por 3, se puede producir un conjunto infinito de números. ¿Cómo escribirías una función que, dado un número, intenta encontrar una secuencia de tales sumas y multiplicaciones que produzca ese número?

Por ejemplo, el número 13 podría alcanzarse multiplicando primero por 3 y luego sumando 5 dos veces, mientras que el número 15 no se puede alcanzar en absoluto.

Aquí hay una solución recursiva:

```javascript
function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return (
        find(current + 5, `(${history} + 5)`) ||
        find(current * 3, `(${history} * 3)`)
      );
    }
  }
  return find(1, "1");
}

console.log(findSolution(24));
// → (((1 * 3) + 5) * 3)
```

Tenga en cuenta que este programa no necesariamente encuentra la secuencia de operaciones _más corta_. Está satisfecho cuando encuentra alguna secuencia.

Está bien si no ve cómo funciona de inmediato. Trabajemos en ello, ya que es un gran ejercicio de pensamiento recursivo.

La función interna `find` hace la recursión real. Se necesitan dos argumentos: el número actual y una cadena que registra cómo llegamos a este número. Si encuentra una solución, devuelve una cadena que muestra cómo llegar al objetivo. Si no se puede encontrar una solución a partir de este número, devuelve `null`.

Para hacer esto, la función realiza una de tres acciones. Si el número actual es el número objetivo, el historial actual es una forma de alcanzar ese objetivo, por lo que se devuelve. Si el número actual es mayor que el objetivo, no tiene sentido seguir explorando esta rama porque tanto sumar como multiplicar solo hará que el número sea más grande, por lo que devuelve nulo. Finalmente, si todavía estamos por debajo del número objetivo, la función prueba las dos rutas posibles que comienzan desde el número actual llamándose a sí misma dos veces, una para sumar y otra para multiplicar. Si la primera llamada devuelve algo que no es nulo, se devuelve. De lo contrario, se devuelve la segunda llamada, independientemente de si produce una cadena o un nulo.

Para comprender mejor cómo esta función produce el efecto que estamos buscando, veamos todas las llamadas para encontrar que se realizan al buscar una solución para el número 13.

```
find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big
      find(33, "(((1 + 5) + 5) * 3)")
        too big
      find(18, "((1 + 5) _ 3)")
        too big
    find(3, "(1 * 3)")
      find(8, "((1 * 3) + 5)")
        find(13, "(((1 * 3) + 5) + 5)")
          found!
```

La sangría indica la profundidad de la pila de llamadas. La primera vez que se llama a `find`, comienza llamándose a sí mismo para explorar la solución que comienza con `(1 + 5)`. Esa llamada se repetirá aún más para explorar _cada_ solución continua que arroje un número menor o igual al número objetivo. Como no encuentra uno que llegue al objetivo, devuelve un valor `null` a la primera llamada. Ahí el operador `||` hace que suceda la llamada que explora `(1 * 3)`. Esta búsqueda tiene más suerte: su primera llamada recursiva, a través de _otra_ llamada recursiva, acierta en el número de destino. Esa llamada más interna devuelve una cadena, y cada uno de los operadores `||` en las llamadas intermedias pasan esa cadena y, en última instancia, devuelven la solución.

## Crecimiento de funciones

Hay dos formas más o menos naturales de introducir funciones en los programas.

La primera es que te encuentras escribiendo un código similar varias veces. Preferirías no hacer eso. Tener más código significa más espacio para ocultar errores y más material para leer para las personas que intentan comprender el programa. Así que toma la funcionalidad repetida, encuentra un buen nombre para ella y la pone en una función.

La segunda forma es que descubra que necesita alguna funcionalidad que aún no ha escrito y que parece que merece su propia función. Empezarás nombrando la función y luego escribirás su cuerpo. Incluso podría comenzar a escribir código que use la función antes de definir la función en sí.

Lo difícil que es encontrar un buen nombre para una función es una buena indicación de cuán claro es el concepto que está tratando de ajustar. Veamos un ejemplo.

Queremos escribir un programa que imprima dos números: los números de vacas y pollos en una granja, con las palabras `Cows` y `Chickens` después de ellos y ceros rellenados antes de ambos números para que siempre tengan tres dígitos.

```
007 Cows
011 Chickens
```

Esto pide una función de dos argumentos: el número de vacas y el número de pollos. Empecemos a codificar.

```javascript
function printFarmInventory(cows, chickens) {
  let cowString = String(cows);
  while (cowString.length < 3) {
    cowString = "0" + cowString;
  }
  console.log(`${cowString} Cows`);
  let chickenString = String(chickens);
  while (chickenString.length < 3) {
    chickenString = "0" + chickenString;
  }
  console.log(`${chickenString} Chickens`);
}
printFarmInventory(7, 11);
```

Escribir `.length` después de una expresión de cadena nos dará la longitud de esa cadena. Por lo tanto, los bucles `while` continúan agregando ceros delante de las cadenas de números hasta que tengan al menos tres caracteres.

¡Misión cumplida! Pero justo cuando estamos a punto de enviarle al granjero el código (junto con una factura considerable), ella nos llama y nos dice que también ha comenzado a criar cerdos, y ¿no podríamos extender el software para imprimir también cerdos?

Seguro que podemos. Pero justo cuando estamos en el proceso de copiar y pegar esas cuatro líneas una vez más, nos detenemos y lo reconsideramos. Tiene que haber una mejor manera. Aquí tienes un primer intento:

```javascript
function printZeroPaddedWithLabel(number, label) {
  let numberString = String(number);
  while (numberString.length < 3) {
    numberString = "0" + numberString;
  }
  console.log(`${numberString} ${label}`);
}

function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows");
  printZeroPaddedWithLabel(chickens, "Chickens");
  printZeroPaddedWithLabel(pigs, "Pigs");
}

printFarmInventory(7, 11, 3);
```

¡Funciona! Pero ese nombre, `printZeroPaddedWithLabel`, es un poco incómodo. Combina tres cosas: impresión, relleno de ceros y adición de una etiqueta, en una sola función.

En lugar de destacar la parte repetida de nuestro programa al por mayor, intentemos elegir un solo _concepto_.

```javascript
function zeroPad(number, width) {
  let string = String(number);
  while (string.length < width) {
    string = "0" + string;
  }
  return string;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory(7, 16, 3);
```

Una función con un nombre agradable y obvio como `zeroPad` hace que sea más fácil para alguien que lee el código descubrir lo que hace. Y esta función es útil en más situaciones además de este programa específico. Por ejemplo, puede usarlo para ayudar a imprimir tablas de números bien alineadas.

¿Qué tan inteligente y versátil _debería_ ser nuestra función? Podríamos escribir cualquier cosa, desde una función terriblemente simple que solo puede rellenar un número para que tenga tres caracteres de ancho hasta un complicado sistema generalizado de formato de números que maneja números fraccionarios, números negativos, alineación de puntos decimales, relleno con diferentes caracteres, etc..

Un principio útil es no agregar inteligencia a menos que esté absolutamente seguro de que lo va a necesitar. Puede ser tentador escribir "marcos" generales para cada parte de la funcionalidad que encuentre. Resista ese impulso. No hará ningún trabajo real, solo estará escribiendo código que nunca usa.

## Funciones y efectos secundarios

Las funciones se pueden dividir a grandes rasgos en aquellas que se llaman por sus efectos secundarios y aquellas que se llaman por su valor de retorno. (Aunque definitivamente también es posible tener efectos secundarios y devolver un valor).

La primera función auxiliar en el ejemplo de la granja, `printZeroPaddedWithLabel`, se llama por su efecto secundario: imprime una línea. La segunda versión, `zeroPad`, se llama por su valor de retorno. No es casualidad que el segundo sea útil en más situaciones que el primero. Las funciones que crean valores son más fáciles de combinar de nuevas formas que las funciones que realizan efectos secundarios directamente.

Una función _pura_ es un tipo específico de función de producción de valor que no solo no tiene efectos secundarios, sino que tampoco depende de los efectos secundarios de otro código; por ejemplo, no lee enlaces globales cuyo valor pueda cambiar. Una función pura tiene la agradable propiedad de que, cuando se llama con los mismos argumentos, siempre produce el mismo valor (y no hace nada más). Una llamada a dicha función puede sustituirse por su valor de retorno sin cambiar el significado del código. Cuando no esté seguro de que una función pura esté funcionando correctamente, puede probarla simplemente llamándola y sepa que si funciona en ese contexto, funcionará en cualquier contexto. Las funciones no puras tienden a requerir más andamios para probar.

Aún así, no hay necesidad de sentirse mal al escribir funciones que no son puras o de librar una guerra santa para purgarlas de su código. Los efectos secundarios suelen ser útiles. No habría forma de escribir una versión pura de `console.log`, por ejemplo, y es bueno tener `console.log`. Algunas operaciones también son más fáciles de expresar de manera eficiente cuando usamos efectos secundarios, por lo que la velocidad de cálculo puede ser una razón para evitar la pureza.

## Resumen

Este capítulo le enseñó a escribir sus propias funciones. La palabra clave `function`, cuando se usa como expresión, puede crear un valor de función. Cuando se usa como una declaración, se puede usar para declarar un enlace y darle una función como su valor. Las funciones de flecha son otra forma de crear funciones.

```javascript
// Define f to hold a function value
const f = function (a) {
  console.log(a + 2);
};

// Declare g to be a function
function g(a, b) {
  return a * b * 3.5;
}

// A less verbose function value
let h = (a) => a % 3;
```

Un aspecto clave para comprender las funciones es comprender los alcances. Cada bloque crea un nuevo alcance. Los parámetros y enlaces declarados en un ámbito determinado son locales y no son visibles desde el exterior. Los enlaces declarados con `var` se comportan de manera diferente: terminan en el ámbito de función más cercano o en el ámbito global.

Es útil separar las tareas que realiza su programa en diferentes funciones. No tendrá que repetirse tanto, y las funciones pueden ayudar a organizar un programa al agrupar el código en partes que hacen cosas específicas.

## Ejercicios

### Mínimo

El [capítulo anterior]() presentó la función estándar `Math.min` que devuelve su argumento más pequeño. Podemos construir algo así ahora. Escribe una función `min` que tome dos argumentos y devuelva su mínimo.

```javascript
// Tu código aquí.

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
```

<details>
  <summary>Mostrar pistas...</summary>
  
Si tiene problemas para colocar llaves y paréntesis en el lugar correcto para obtener una definición de función válida, comience por copiar uno de los ejemplos de este capítulo y modificarlo.

Una función puede contener múltiples declaraciones `return`.

</details>

### Recursividad

Hemos visto que `%` (el operador restante) se puede usar para probar si un número es par o impar usando `% 2` para ver si es divisible por dos. Aquí hay otra forma de definir si un número entero positivo es par o impar:

- Zero es par.

- Uno es impar.

- Para cualquier otro número _N_, su uniformidad es la misma que _N_ - 2.

Definir una función recursiva `isEven` corresponde a esta descripción. La función debe aceptar un solo parámetro (un número entero positivo) y devolver un booleano.

Pruébelo en 50 y 75. Vea cómo se comporta en -1. ¿Por qué? ¿Puedes pensar en una forma de solucionar este problema?

```javascript
// Tu código aquí.

console.log(isEven(50));
// → verdadero
console.log(isEven(75));
// → falso
console.log(isEven(-1));
// → ??
```

<details>
  <summary>Mostrar pistas...</summary>

Es probable que su función se vea algo similar a la función interna `find` en el ejemplo recursivo `findSolution` de este capítulo, con una cadena `if` / `else if` / `else` que prueba cuál de los tres casos se aplica. El `else` final, correspondiente al tercer caso, realiza la llamada recursiva. Cada una de las ramas debe contener una declaración de devolución o de alguna otra forma disponer que se devuelva un valor específico.

Cuando se le da un número negativo, la función se repetirá una y otra vez, pasándose un número cada vez más negativo, alejándose cada vez más de devolver un resultado. Eventualmente se quedará sin espacio de pila y abortará.

</details>

### Conteo de frijoles

Puede obtener el enésimo carácter, o letra, de una cadena escribiendo `"string"[N]`. El valor devuelto será una cadena que contiene solo un carácter (por ejemplo, `"b"`). El primer carácter tiene la posición 0, lo que hace que el último se encuentre en la posición `string.length - 1`. En otras palabras, una cadena de dos caracteres tiene la longitud 2 y sus caracteres tienen las posiciones 0 y 1.

Escriba una función `countBs` que tome una cadena como único argumento y devuelva un número que indique cuántos caracteres “B” en mayúscula hay en la cadena.

Luego, escriba una función llamada `countChar` que se comporte como `countBs`, excepto que toma un segundo argumento que indica el carácter que se va a contar (en lugar de contar solo los caracteres "B" en mayúscula). Vuelva a escribir `countBs` para hacer uso de esta nueva función.

```javascript
// Tu código aquí.

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
```

<details>
  <summary>Mostrar pistas...</summary>

Su función necesitará un bucle que observe cada carácter de la cadena. Puede ejecutar un índice de cero a uno por debajo de su longitud (`< string.length`). Si el carácter en la posición actual es el mismo que el que busca la función, agrega 1 a una variable de contador. Una vez finalizado el ciclo, se puede devolver el contador.

Tenga cuidado de hacer que todos los enlaces usados en la función sean _locales_ a la función declarándolos correctamente con la palabra clave `let` o `const`.

</details>
