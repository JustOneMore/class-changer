/*
//Example of usage:
ClassChanger.change({
	select: ".my-elements",
	action: "add",
	class: ["animated","fadeInLeft"],
	init: 500,
	interval: 500,
	before: function(jqelement) {jqelement.css("display","block";}
	after: function(jqelement) {jqelement.css("display","none");}
});
*/
var ClassChanger = {
	namespace: {
		accion:				"action",/*"addClass" by default*/
		selector:			"select",/*needed*/
		clases: 			"classes",/*needed*/
		intervalo: 			"interval",/*Anims.intervaloDefecto by default*/
		inicio:				"init",/*Anims.inicioDefecto by default*/
		antes:				"before",
		despues:			"after", 
		intervaloDefecto:	500,
		inicioDefecto:		0,
	},
	change: function(parametros) {
		var accion = (function() {
			var action = parametros[ClassChanger.namespace["accion"]]?parametros[ClassChanger.namespace["accion"]]:"addClass";
			if(action == "add") {return "addClass";}
			if(action == "remove" || action == "drop") {return "removeClass";}
			return action;
		})();
		var objetivos = parametros[ClassChanger.namespace["selector"]];
		var clases = (function() {
			if(parametros[ClassChanger.namespace["clases"]] instanceof Array) {return parametros[ClassChanger.namespace["clases"]];}
			else if(typeof parametros[ClassChanger.namespace["clases"]] == "string") {
				var tArray = [];
				tArray.push(parametros[ClassChanger.namespace["clases"]]);
				return tArray;
			} 
			else {console.error("Error 1"); return [];}
		})();
		var interludio = parametros[ClassChanger.namespace["intervalo"]]?parametros[ClassChanger.namespace["intervalo"]]:ClassChanger.namespace["intervaloDefecto"];
		var inicio = parametros[ClassChanger.namespace["inicio"]]?parametros[ClassChanger.namespace["inicio"]]:ClassChanger.namespace["inicioDefecto"];
		var antes = parametros[ClassChanger.namespace["antes"]]?parametros[ClassChanger.namespace["antes"]]:function(){};
		var despues = parametros[ClassChanger.namespace["despues"]]?parametros[ClassChanger.namespace["despues"]]:function(){};
		var ii = 0;
		for(var i=0; i<$(objetivos).length; i++) {
			setTimeout(function() {
				antes($(objetivos).eq(ii));
				for(var j=0; j<clases.length; j++) {
					$(objetivos).eq(ii)[accion](clases[j]);
				}
				despues($(objetivos).eq(ii));
				ii++;
			}, i*interludio+inicio);
		}
	},
	remove: function(parametros) {
		parametros.accion = "removeClass";
		return ClassChanger.change(parametros);
	},
	add: function(parametros) {
		parametros.accion = "addClass";
		return ClassChanger.change(parametros);
	}
};
