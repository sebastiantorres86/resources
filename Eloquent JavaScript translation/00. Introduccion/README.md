# Introducción

> «Creemos que estamos creando el sistema para nuestros propios fines. Creemos que lo estamos haciendo a nuestra propia imagen... Pero la computadora no es realmente como nosotros. Es una proyección de una parte muy delgada de nosotros mismos: esa parte dedicada a la lógica, el orden, la regla y la claridad.»
>
> -Ellen Ullman, _Cerca de la máquina: la tecnofilia y sus descontentos_

![](https://eloquentjavascript.net/img/chapter_picture_00.jpg)

Este es un libro sobre instrucciones de computadoras. Las computadoras son casi tan comunes como los destornilladores hoy en día, pero son bastante más complejas, y hacer que hagan lo que quieres que hagan no siempre es fácil.

Si la tarea que tiene para su computadora es común y bien entendida, como mostrarle su correo electrónico o actuar como una calculadora, puede abrir la aplicación adecuada y ponerse a trabajar. Pero para tareas únicas o abiertas, probablemente no haya aplicación.

Ahí es donde puede entrar la programación. La _programación_ es el acto de construir un _programa_: un conjunto de instrucciones precisas que le indican a la computadora qué hacer. Debido a que las computadoras son bestias tontas y pedantes, la programación es fundamentalmente tediosa y frustrante.

Afortunadamente, si puede superar ese hecho, y tal vez incluso disfrutar del rigor de pensar en términos que las máquinas tontas pueden manejar, la programación puede ser gratificante. Te permite hacer cosas en segundos que te llevarían _una eternidad_ a mano. Es una forma de hacer que su herramienta informática haga cosas que antes no podía hacer. Y proporciona un ejercicio maravilloso de pensamiento abstracto.

La mayoría de la programación se realiza con lenguajes de programación. Un _lenguaje de programación_ es un lenguaje construido artificialmente utilizado para instruir a las computadoras. Es interesante que la forma más efectiva en que nos hemos encontrado para comunicarnos con una computadora toma mucho de la forma en que nos comunicamos entre nosotros. Al igual que los lenguajes humanos, los lenguajes de computadora permiten que las palabras y frases se combinen de nuevas maneras, haciendo posible expresar conceptos siempre nuevos.

En un momento, las interfaces basadas en el lenguaje, como las instrucciones BASIC y DOS de las décadas de 1980 y 1990, fueron el método principal para interactuar con las computadoras. Han sido reemplazados en gran medida por interfaces visuales, que son más fáciles de aprender pero ofrecen menos libertad. Los lenguajes informáticos siguen ahí, si sabes dónde buscar. Uno de estos lenguajes, JavaScript, está integrado en cada navegador web moderno y, por lo tanto, está disponible en casi todos los dispositivos.

Este libro intentará familiarizarte lo suficiente con este lenguaje para hacer cosas útiles y divertidas con él.

## En la programación

Además de explicar JavaScript, presentaré los principios básicos de programación. La programación, resulta, difícil. Las reglas fundamentales son simples y claras, pero los programas creados sobre estas reglas tienden a volverse lo suficientemente complejos como para introducir sus propias reglas y complejidad. Estás construyendo tu propio laberinto, de alguna manera, y podrías perderte en él.

Habrá momentos en que leer este libro se sienta terriblemente frustrante. Si eres nuevo en programación, habrá mucho material nuevo para digerir. Gran parte de este material se _combinará_ de manera que requiera que realice conexiones adicionales.

Depende de usted hacer el esfuerzo necesario. Cuando tenga dificultades para seguir el libro, no llegue a ninguna conclusión sobre sus propias capacidades. Estás bien, solo necesitas seguir así. Tómese un descanso, vuelva a leer algún material y asegúrese de leer y comprender los programas y ejercicios de ejemplo. Aprender es un trabajo duro, pero todo lo que aprendes es tuyo y facilitará el aprendizaje posterior.

> «Cuando la acción no sea rentable, recopile información; cuando la información no sea rentable, duerma.»
>
> -Ursula K. Le Guin, _La mano izquierda de la oscuridad_

Un programa es muchas cosas. Es un texto escrito por un programador, es la fuerza directiva que hace que la computadora haga lo que hace, son datos en la memoria de la computadora, pero controla las acciones realizadas en esta misma memoria. Las analogías que intentan comparar programas con objetos con los que estamos familiarizados tienden a fallar. Un ajuste superficial es el de una máquina: muchas partes separadas tienden a estar involucradas, y para hacer que todo funcione, tenemos que considerar las formas en que estas partes se interconectan y contribuyen a la operación del todo.

Una computadora es una máquina física que actúa como un host para estas máquinas inmateriales. Las computadoras en sí mismas solo pueden hacer cosas estúpidamente sencillas. La razón por la que son tan útiles es que hacen estas cosas a una velocidad increíblemente alta. Un programa puede combinar ingeniosamente una enorme cantidad de estas acciones simples para hacer cosas muy complicadas.

Un programa es un edificio de pensamiento. No tiene costo de construcción, no tiene peso y crece fácilmente bajo nuestras manos de mecanografía.

Pero sin cuidado, el tamaño y la complejidad de un programa crecerán fuera de control, confundiendo incluso a la persona que lo creó. Mantener los programas bajo control es el principal problema de la programación. Cuando un programa funciona, es hermoso. El arte de la programación es la habilidad de controlar la complejidad. El gran programa es moderado, simplificado en su complejidad.

Algunos programadores creen que esta complejidad se gestiona mejor utilizando solo un pequeño conjunto de técnicas bien entendidas en sus programas. Han compuesto reglas estrictas ("mejores prácticas") que prescriben los formularios que los programas deben tener y deben permanecer cuidadosamente dentro de su pequeña zona segura.

Esto no solo es aburrido, es ineficaz. Los nuevos problemas a menudo requieren nuevas soluciones. El campo de la programación es joven y todavía se está desarrollando rápidamente, y es lo suficientemente variado como para tener espacio para enfoques muy diferentes. Hay muchos errores terribles que cometer en el diseño del programa, y ​​debes seguir adelante y cometerlos para que los entiendas. Un sentido de cómo se ve un buen programa se desarrolla en la práctica, no se aprende de una lista de reglas.

## Por qué el lenguaje importa

Al principio, al nacer la informática, no había lenguajes de programación. Los programas se parecían a esto:

```
00110001 00000000 00000000
00110001 00000001 00000001
00110011 00000001 00000010
01010001 00001011 00000010
00100010 00000010 00001000
01000011 00000001 00000000
01000001 00000001 00000001
00010000 00000010 00000000
01100010 00000000 00000000
```

Es un programa para sumar los números del 1 al 10 e imprimir el resultado: 1 + 2 + ... + 10 = 55. Podría ejecutarse en una máquina simple e hipotética. Para programar las primeras computadoras, era necesario colocar grandes conjuntos de interruptores en la posición correcta o hacer agujeros en tiras de cartón y alimentarlos a la computadora. Probablemente pueda imaginar cuán tedioso y propenso a errores fue este procedimiento. Incluso escribir programas simples requería mucha inteligencia y disciplina. Los complejos eran casi inconcebibles.

Por supuesto, ingresar manualmente estos patrones de bits arcanos (unos y ceros) le dio al programador una profunda sensación de ser un poderoso mago. Y eso tiene que valer algo en términos de satisfacción laboral.

Cada línea del programa anterior contiene una sola instrucción. Se podría escribir en español así:

1- Almacene el número 0 en la ubicación de memoria 0.

2- Guarde el número 1 en la ubicación de memoria 1.

3- Almacene el valor de la ubicación de memoria 1 en la ubicación de memoria 2.

4- Reste el número 11 del valor en la ubicación de memoria 2.

5- Si el valor en la ubicación de memoria 2 es el número 0, continúe con la instrucción 9.

6- Agregue el valor de la ubicación de memoria 1 a la ubicación de memoria 0.

7- Agregue el número 1 al valor de la ubicación de memoria 1.

8- Continuar con la instrucción 3.

9- Muestra el valor de la ubicación de memoria 0.

Aunque eso ya es más legible que la sopa de bits, todavía es bastante oscuro. El uso de nombres en lugar de números para las instrucciones y ubicaciones de memoria ayuda.

```
Set "total" to 0.
Set "count" to 1.
[loop]
Set "compare" to "count".
Substract 11 from "compare".
If "compare" is zero, continue at [end].
Add "count" to "total".
Add 1 to "count".
Continue at [loop].
[end]
Output "total".
```

¿Puedes ver cómo funciona el programa en este momento? Las primeras dos líneas le dan a dos ubicaciones de memoria sus valores iniciales: el `total` se usará para generar el resultado del cálculo, y el `count` hará un seguimiento del número que estamos viendo actualmente. Las líneas que usan `compare` son probablemente las más extrañas. El programa quiere ver si el `count` es igual a 11 para decidir si puede dejar de ejecutarse. Debido a que nuestra máquina hipotética es bastante primitiva, solo puede probar si un número es cero y tomar una decisión basada en eso. Por lo tanto, utiliza la ubicación de memoria etiquetada `compare` para calcular el valor del `count - 11` y toma una decisión basada en ese valor. Las siguientes dos líneas agregan el valor de `count` al resultado e incrementan el `count` en 1 cada vez que el programa ha decidido que el `count` aún no es 11.

Aquí está el mismo programa en JavaScript:

```javascript
let total = 0,
  count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
// → 55
```

Esta versión nos da algunas mejoras más. Lo más importante, ya no es necesario especificar la forma en que queremos que el programa salte de un lado a otro. La construcción `while` se encarga de eso. Continúa ejecutando el bloque (envuelto en llaves) debajo de él, siempre y cuando se cumpla la condición. Esa condición es `count <= 10`, lo que significa "_count_ es menor o igual a 10". Ya no tenemos que crear un valor temporal y compararlo con cero, que era solo un detalle poco interesante. Parte del poder de los lenguajes de programación es que pueden ocuparse de detalles sin interés para nosotros.

Al final del programa, después de que la construcción `while` haya finalizado, la operación `console.log` se usa para escribir el resultado.

Finalmente, así es como se vería el programa si tuviéramos las convenientes operaciones `range` y `sum` disponible, que respectivamente crean una colección de números dentro de un rango y calculan la suma de una colección de números:

```javascript
console.log(sum(range(1, 10)));
// → 55
```

La moraleja de esta historia es que el mismo programa puede expresarse de manera larga y corta, ilegible y legible. La primera versión del programa era extremadamente oscura, mientras que esta última es casi en inglés: registre (`log`) la suma (`sum`) del rango (`range`) de números del 1 al 10. (En [capítulos posteriores]() veremos cómo definir operaciones como `sum` y `range`).

Un buen lenguaje de programación ayuda al programador al permitirle hablar sobre las acciones que la computadora debe realizar en un nivel superior. Ayuda a omitir detalles, proporciona bloques de construcción convenientes (como `while` y `console.log`), le permite definir sus propios bloques de construcción (como `sum` y `range`) y hace que esos bloques sean fáciles de componer.

## ¿Qué es JavaScript?

JavaScript se introdujo en 1995 como una forma de agregar programas a páginas web en el navegador Netscape Navigator. Desde entonces, el lenguaje ha sido adoptado por todos los otros principales navegadores web gráficos. Ha hecho posibles las aplicaciones web modernas: aplicaciones con las que puede interactuar directamente sin tener que volver a cargar la página para cada acción. JavaScript también se utiliza en sitios web más tradicionales para proporcionar diversas formas de interactividad e inteligencia.

Es importante tener en cuenta que JavaScript no tiene casi nada que ver con el lenguaje de programación llamado Java. El nombre similar se inspiró en consideraciones de marketing más que en un buen juicio. Cuando se introdujo JavaScript, el lenguaje Java se estaba comercializando fuertemente y estaba ganando popularidad. Alguien pensó que era una buena idea tratar de lograr este éxito. Ahora estamos atrapados con el nombre.

Después de su adopción fuera de Netscape, se escribió un documento estándar para describir la forma en que debería funcionar el lenguaje JavaScript, de modo que las diversas piezas de software que afirmaban admitir JavaScript en realidad hablaban del mismo idioma. Esto se llama el estándar ECMAScript, en honor a la organización Ecma International que hizo la estandarización. En la práctica, los términos ECMAScript y JavaScript se pueden usar indistintamente: son dos nombres para el mismo idioma.

Hay quienes dirán cosas _terribles_ sobre JavaScript. Muchas de estas cosas son ciertas. Cuando se me pidió que escribiera algo en JavaScript por primera vez, rápidamente llegué a despreciarlo. Aceptaría casi todo lo que escribí pero lo interpretaría de una manera completamente diferente de lo que quise decir. Esto tenía mucho que ver con el hecho de que no tenía idea de lo que estaba haciendo, por supuesto, pero aquí hay un problema real: JavaScript es ridículamente liberal en lo que permite. La idea detrás de este diseño era que facilitaría la programación en JavaScript para principiantes. En realidad, la mayoría de las veces hace que sea más difícil encontrar problemas en sus programas porque el sistema no los señalará.

Sin embargo, esta flexibilidad también tiene sus ventajas. Deja espacio para muchas técnicas que son imposibles en lenguajes más rígidos y, como verá (por ejemplo, en el [Capítulo 10]()), puede usarse para superar algunas de las deficiencias de JavaScript. Después de aprender el idioma correctamente y trabajar con él durante un tiempo, aprendí a que _me gusta_ JavaScript.

Ha habido varias versiones de JavaScript. La versión 3 de ECMAScript fue la versión ampliamente admitida en el momento del ascenso de JavaScript al dominio, aproximadamente entre 2000 y 2010. Durante este tiempo, se estaba trabajando en una ambiciosa versión 4, que planificó una serie de mejoras radicales y extensiones al lenguaje. Cambiar un lenguaje vivo y ampliamente utilizado de una manera tan radical resultó ser políticamente difícil, y el trabajo en la versión 4 fue abandonado en 2008, lo que condujo a una versión 5 mucho menos ambiciosa, que solo hizo algunas mejoras incontrovertibles, que salió en 2009. Luego, en 2015, salió la versión 6, una actualización importante que incluía algunas de las ideas planificadas para la versión 4. Desde entonces, hemos tenido nuevas actualizaciones pequeñas cada año.

El hecho de que el lenguaje esté evolucionando significa que los navegadores tienen que mantenerse al día constantemente, y si está utilizando un navegador antiguo, es posible que no sea compatible con todas las funciones. Los diseñadores de lenguajes tienen cuidado de no realizar cambios que puedan dañar los programas existentes, por lo que los nuevos navegadores aún pueden ejecutar programas antiguos. En este libro, estoy usando la versión 2017 de JavaScript.

Los navegadores web no son las únicas plataformas en las que se usa JavaScript. Algunas bases de datos, como MongoDB y CouchDB, usan JavaScript como lenguaje de script y consulta. Varias plataformas para la programación de escritorio y servidor, especialmente el proyecto Node.js (el tema del [Capítulo 20]()), proporcionan un entorno para programar JavaScript fuera del navegador

## Código y qué hacer con él

El _código_ es el texto que compone los programas. La mayoría de los capítulos de este libro contienen bastante código. Creo que leer código y escribir código son partes indispensables para aprender a programar. Intente no solo echar un vistazo a los ejemplos, léalos atentamente y entiéndalos. Esto puede ser lento y confuso al principio, pero prometo que rápidamente lo dominarás. Lo mismo ocurre con los ejercicios. No asuma que los comprende hasta que haya escrito una solución de trabajo.

Le recomiendo que pruebe sus soluciones para ejercicios en un intérprete de JavaScript real. De esa manera, recibirá comentarios inmediatos sobre si lo que está haciendo está funcionando y, espero, se sentirá tentado a experimentar e ir más allá de los ejercicios.

Al leer este libro en su navegador, puede editar (y ejecutar) todos los programas de ejemplo haciendo clic en ellos.

Si desea ejecutar los programas definidos en este libro fuera del sitio web del libro, será necesario tener cuidado. Muchos ejemplos son independientes y deberían funcionar en cualquier entorno de JavaScript. Pero el código en capítulos posteriores a menudo se escribe para un entorno específico (el navegador o Node.js) y solo puede ejecutarse allí. Además, muchos capítulos definen programas más grandes, y los fragmentos de código que aparecen en ellos dependen unos de otros o de archivos externos. El [sandbox](https://eloquentjavascript.net/code) en el sitio web proporciona enlaces a archivos Zip que contienen todos los scripts y archivos de datos necesarios para ejecutar el código de un capítulo determinado.

## Resumen de este libro

Este libro contiene aproximadamente tres partes. Los primeros 12 capítulos discuten el lenguaje JavaScript. Los siguientes siete capítulos tratan sobre los navegadores web y la forma en que se usa JavaScript para programarlos. Finalmente, dos capítulos están dedicados a Node.js, otro entorno para programar JavaScript.

A lo largo del libro, hay cinco _capítulos de proyectos_, que describen programas de ejemplo más grandes para darle una idea de la programación real. En orden de aparición, trabajaremos construyendo un [robot de entrega](), un [lenguaje de programación](), un [juego de plataformas](), un [programa de pintura de píxeles]() y un [sitio web dinámico]().

La parte del lenguaje del libro comienza con cuatro capítulos que presentan la estructura básica del lenguaje JavaScript. Presentan [estructuras de control]() (como la palabra `while` que viste en esta introducción), [funciones]() (escribir tus propios bloques de construcción) y [estructuras de datos](). Después de esto, podrás escribir programas básicos. A continuación, los capítulos [5]() y [6]() introducen técnicas para usar funciones y objetos para escribir código más _abstracto_ y mantener la complejidad bajo control.

Después de un [primer capítulo de proyecto](), la parte del lenguaje del libro continúa con capítulos sobre [manejo de errores y corrección de errores](), [expresiones regulares]() (una herramienta importante para trabajar con texto), [modularidad]() (otra defensa contra la complejidad) y [programación asincrónica]() (que trata con eventos que toman tiempo). El [segundo capítulo de proyecto]() concluye la primera parte del libro.

La segunda parte, Capítulos [13]() a [19](), describe las herramientas a las que tiene acceso JavaScript del navegador. Aprenderá a mostrar cosas en la pantalla (Capítulos [14]() y [17]()), responder a las aportaciones del usuario ([Capítulo 15]()) y comunicarse a través de la red ([Capítulo 18]()). De nuevo hay dos capítulos de proyectos en esta parte.

Después de eso, el [Capítulo 20]() describe Node.js, y el [Capítulo 21]() construye un pequeño sitio web usando esa herramienta.

## Convenciones tipográficas

En este libro, el texto escrito en una fuente `monoespaciada` representará elementos de los programas; a veces son fragmentos autosuficientes, y a veces solo se refieren a parte de un programa cercano. Los programas (de los cuales ya ha visto algunos) están escritos de la siguiente manera:

```javascript
function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return factorial(n - 1) * n;
  }
}
```

A veces, para mostrar el resultado que produce un programa, el resultado esperado se escribe después, con dos barras y una flecha al frente.

```javascript
console.log(factorial(8));
// → 40320
```

¡Buena suerte!
