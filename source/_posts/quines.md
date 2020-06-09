---
title: Quines
date: "2020-06-09T22:00:00.169Z"
---

Você já ouviu falar em Quines?

Quine é um programa que não tem nenhuma finalidade a não ser imprimir seu próprio código fonte. Sim, é algo aparentemente simples, mas que pode também parecer como um paradoxo.

Quer ver um exemplo de Quine em javascript? Tente executar o seguinte código no seu console do navegador: `!function $(){console.log('!'+$+'()')}()`

Você verá que o output desse código será exatamente igual ao código em si. Um outro exemplo ainda menor e mais bizarro em javascript é o seguinte: ```(_=()=>`(_=${_})()`)()```

Por se tratar de algo bastante inútil a comunidade se esforça para conseguer sempre fazer novas Quines em diferentes linguagens, como por exemplo em 

C -
```c
main(s){printf(s="main(s){printf(s=%c%s%1$c,34,s);}",34,s);}
```

C# - 
```c#
using System;

namespace Quine
{
	class Program
	{
		static void Main(string[] args)
		{
			var p = "using System; namespace Quine {{ class Program {{ static void
				Main(string[] args) {{ var p = {1}{0}{1};
				Console.WriteLine(p, p, '{1}'); Console.ReadKey(); }} }} }}";
			Console.WriteLine(p, p, '"');
			Console.ReadKey();
		}
	}
}
```

Java - 
```java
public class Quine { public static void main(String[] args) { char c=34; System.out.println(s+c+s+c+';'+'}'); } static String s="public class Quine { public static void main(String[] args) { char c=34; System.out.println(s+c+s+c+';'+'}'); } static String s=";}
```

Python - 
```python
_='_=%r;print _%%_';print _%_
```

[HQ9+](https://esolangs.org/wiki/HQ9+) (uma linguagem esotérica também não muito útil) - `Q`

E se você acha isso muito simples ainda, você pode se aventurar em entender o [Quine Relay](https://github.com/mame/quine-relay), uma implementação que a partir de uma linguagem gera código em outra, seguindo por 128 diferentes linguagens de programação até voltar ao código fonte inicial.

## Conclusão

Fica aqui o desafio, você consegue fazer alguma Quine? A tarefa parece fácil, mas não é nada trivial.