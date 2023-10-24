/*------------------- Objeto calculadora----------------------------------------*/
var calculadora = {
  screen: document.getElementById("display"),
  valorscreen: "0",
  operaracion: "",
  valor1: 0,
  valor2: 0,
  valor3: 0,
  resultado: 0,
  TeclaIgual: false,// Para permitir ingreso consecutivo

  init: (function(){
		this.FormatoBotons(".tecla");
		this.asignarEventosaFuncion();
	}),

  //Eventos para el formato de botones de la pagina

	FormatoBotons: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoteclaReducida;
			x[i].onmouseleave = this.eventoteclaOriginal;
		};
	},

  //reducir el tamaño de los botones
  eventoteclaReducida: function(event){
		calculadora.teclaReducida(event.target);
	},

  //vuelver al tamaño original de los botones
  eventoteclaOriginal: function(event){
		calculadora.teclaOriginal(event.target);
	},


  //Formato de botones

	teclaReducida: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},

  teclaOriginal: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},

	//---Fin evento de formato de botones

  //Eventos de función de calculadora

	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarscreen();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},

	//---Fin eventos de función calculadora



	borrarscreen: function(){ //Funcion de teclas de calculadora

	  this.valorscreen = "0";
		this.operacion = "";
		this.valor1 = 0;
		this.valor2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.TeclaIgual = false;
		this.valor3 = 0;
		this.updatescreen();
	},

  cambiarSigno: function(){
		if (this.valorscreen !="0") {
			var aux;
			if (this.valorscreen.charAt(0)=="-") {
				aux = this.valorscreen.slice(1);
			}	else {
				aux = "-" + this.valorscreen;
			}
		this.valorscreen = "";
		this.valorscreen = aux;
		this.updatescreen();
		}
	},

  ingresoDecimal: function(){
		if (this.valorscreen.indexOf(".")== -1) {
			if (this.valorscreen == ""){
				this.valorscreen = this.valorscreen + "0.";
			} else {
				this.valorscreen = this.valorscreen + ".";
			}
			this.updatescreen();
		}
	},

  ingresoNumero: function(valor){
		if (this.valorscreen.length < 8) {

			if (this.valorscreen=="0") {
				this.valorscreen = "";
				this.valorscreen = this.valorscreen + valor;
			} else {
				this.valorscreen = this.valorscreen + valor;
			}
		this.updatescreen();
		}
	},

  ingresoOperacion: function(oper){
		this.valor1 = parseFloat(this.valorscreen);
		this.valorscreen = "";
		this.operacion = oper;
		this.TeclaIgual = false;
		this.updatescreen();
	},

  verResultado: function(){ // TECLA IGUAL

		if(!this.TeclaIgual){ //Primer vez que presiono igual
			this.valor2 = parseFloat(this.valorscreen);
			this.valor3 = this.valor2;

		//Calculo el resultado
			this.realizarOperacion(this.valor1, this.valor2, this.operacion);

		} else { //Siguientes veces que presiono igual
		//Calculo el resultado
		this.realizarOperacion(this.valor1, this.valor3, this.operacion);
		}

		//Almaceno el resultado como primer valor para poder seguir operando
		this.valor1 = this.resultado;

		//Borro el screen y lo reemplazo por el resultado
		this.valorscreen = "";

		//verifico el largo del resultado para recortarlo, si hace falta

		if (this.resultado.toString().length < 9){
			this.valorscreen = this.resultado.toString();
		} else {
			this.valorscreen = this.resultado.toString().slice(0,8) + "...";
		}

		//Auxiliar para indicar si ya se presionó la tecla igual, para calcular sobre el último valor

		this.TeclaIgual = true;
		this.updatescreen();

	},

  //realiza la 4 operaciones basicas, sumar, restar, dividir y multiplicar dos valores
  realizarOperacion: function(valor1, valor2, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(valor1 + valor2);
			break;
			case "-":
				this.resultado = eval(valor1 - valor2);
			break;
			case "*":
				this.resultado = eval(valor1 * valor2);
			break;
			case "/":
				this.resultado = eval(valor1 / valor2);
			break;
		}
	},

	updatescreen: function(){//captura el display para pasarlo, almacernarlo y leerlo
		this.screen.innerHTML = this.valorscreen;
	}

};

calculadora.init();//objeto calculadora
