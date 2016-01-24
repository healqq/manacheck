(function(document, result) {
	
	var elements = document.getElementsByClassName('cardItem');
	var array = [].slice.call(elements);
	array.forEach(function(element, index) {

		var image = element.getElementsByClassName('leftCol')[0]
			.getElementsByTagName('img')[0].src;
		var text = element.getElementsByClassName('cardTitle')[0]
			.getElementsByTagName('a')[0].innerHTML;

		var names = splitNames(text);

		result.str += [index, image, names[1], names[0] + '\n'].join(';');

		// result.push({
		// 	image: image,
		// 	eng_name: names[1],
		// 	rus_name: names[0]

		// });
		
		function splitNames(str) {
			var names = str.split('(');
			return [
				names[0].trim(), 
				names[1].trim().substr(0, names[1].length - 1)
			]
		}
	})
	console.log(result);
})(document, result)