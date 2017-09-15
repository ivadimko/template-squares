'use strict';
window.onload = () => {
	loadTask();
}
let taskJS = {
	data : {}
	,btncont : document.querySelector('.btn_container')
	,squareCont : document.querySelector('.square_container')
	,readObject : (callback, obj) => {
		for (let key in obj) {
			let value = obj[key];
			typeof value === 'object' && value !== null ? taskJS.readObject(callback, value) : callback(key, obj);
		}
	}
	,drawSquare : (key, obj) =>{
		let color = 				obj[key];
		const		newSquare = 		document.createElement('div'),
		squaresize =		140;
		newSquare.className = "square";
		newSquare.innerHTML = ('<p>key = <b>' + key + '</b></p>' + 
			'<p>color: <b>' + color + '</b></p>');
		newSquare.style.backgroundColor = color;
		newSquare.style.borderColor =  ('black');
		newSquare.style.display = ('inline-block');
		newSquare.style.height = newSquare.style.width = (squaresize + 'px');
		taskJS.squareCont.appendChild(newSquare);			
	}
	,squareBorder : () => {
		if (document.querySelector('.bordercontrol')) {
			var controlButton = document.querySelector('.bordercontrol');
		} else { 
			var	controlButton =	document.createElement('button');
			controlButton.classList.add('bordercontrol', 'button');
			controlButton.innerHTML = 'Enable Border';
			taskJS.btncont.appendChild(controlButton);
		}
		controlButton.addEventListener('click', function(){
			const squares = 			document.querySelectorAll('.square');
			if (this.classList.contains('enabled')) {
				for (let i = 0; i < squares.length; i++) {
					squares[i].style.borderWidth =  '0px';
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				}
				this.classList.remove('enabled');
				this.innerHTML = 'Enable Borders';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			} else {
				for (let i = 0; i < squares.length; i++) {
					let innerKey =	squares[i].getElementsByTagName('b')[0].innerHTML;
					squares[i].style.borderWidth =  (innerKey + 'px');
					squares[i].style.borderStyle =  ('solid');
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				}
				this.classList.add('enabled');
				this.innerHTML = 'Disable Borders';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			}
		}) 						
		
	}
	,squareColor : () => {
		if (document.querySelector('.colorcontrol')) {
			var controlButton = document.querySelector('.colorcontrol');
		} else {
			var	controlButton =	document.createElement('button');
			controlButton.classList.add('colorcontrol', 'button');
			controlButton.innerHTML = 'Repaint Squares';
			taskJS.btncont.appendChild(controlButton);
		}
		controlButton.addEventListener('click', function(){
			const squares = 	document.querySelectorAll('.square');
			if (this.classList.contains('enabled')) {
				for (let i = 0; i < squares.length; i++) {
					let innerColor =	squares[i].getElementsByTagName('b')[1].innerHTML;
					squares[i].style.backgroundColor = innerColor;
					squares[i].style.borderColor =  ('black');
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				}
				this.classList.remove('enabled');
				this.innerHTML = 'Repaint Squares';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			} else {					
				for (let i = 0; i < squares.length; i++) {
					let innerKey =		squares[i].getElementsByTagName('b')[0].innerHTML;
					let innerColor =	squares[i].getElementsByTagName('b')[1].innerHTML;
					if (innerKey % 2 == 0) {
						squares[i].style.borderColor = innerColor;
						squares[i].style.backgroundColor = ('transparent');
					} else {
						squares[i].style.backgroundColor = innerColor;
					}
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				}
				this.classList.add('enabled');
				this.innerHTML = 'Repaint Squares Back';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			}
		});
	}
	,squareNewLine : () => {
		if (document.querySelector('.dropcontrol')) {
			var controlButton = document.querySelector('.dropcontrol');
		} else {
			var			controlButton =	document.createElement('button');
			controlButton.classList.add('dropcontrol', 'button');
			controlButton.innerHTML = 'Drop Squares';
			taskJS.btncont.appendChild(controlButton);
		}
		controlButton.addEventListener('click', function(){
			const squares = document.querySelectorAll('.square');
			if (this.classList.contains('enabled')) {
				for (let i = 0; i < squares.length; i++) {
					squares[i].style.display = 'inline-block';
					squares[i].classList.toggle('center');
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				}
				this.classList.remove('enabled');
				this.innerHTML = 'Drop Squares';
				document.querySelector('.caption').classList.toggle('off');
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			} else {
				for (let i = 0; i < squares.length; i++) {
					if ((i+1) % 4 == 0) {
						squares[i].style.display = 'block';
						squares[i].classList.toggle('center');
					}
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				}
				this.classList.add('enabled');
				this.innerHTML = 'Back Up Squares';
				document.querySelector('.caption').classList.toggle('off');
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			}
		});
	}
	,squareShadow : () => {
		if (document.querySelector('.shadowcontrol')) {
			var controlButton = document.querySelector('.shadowcontrol');
		} else {
			var			controlButton =	document.createElement('button');
			controlButton.classList.add('shadowcontrol', 'button');
			controlButton.innerHTML = 'Add Shadow';
			taskJS.btncont.appendChild(controlButton);
		}
		controlButton.addEventListener('click', function(){
			const squares = document.querySelectorAll('.square');
			if (this.classList.contains('enabled')) {
				for (let i = 0; i < squares.length; i++) {
					squares[i].style.boxShadow = '';
				}
				this.classList.remove('enabled');
				this.innerHTML = 'Add Shadow';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			} else {			
				for (let i = 0; i < squares.length; i++) {
					let innerColor =	squares[i].getElementsByTagName('b')[1].innerHTML; 
					if ((i+1) % 2 == 0) {
						squares[i].style.boxShadow = ('5px 5px 10px ' + innerColor);
					}
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				}
				this.classList.add('enabled');
				this.innerHTML = 'Remove Shadow';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			}
		});
	}
	,squareHover : () => {
		let squares = 	document.querySelectorAll('.square');					
		for (let i = 0; i < squares.length; i++) {
			let prevBG = '';
			squares[i].addEventListener('mouseover', function(){
				/*this.style.transform = 'rotate(7deg)';
				if ($(this).next().is('.square')) {
					this.nextSibling.style.opacity = '0.5';
				}*/
				if ($(this).prev().is('.square')) {
					prevBG = this.previousSibling.style.backgroundColor;
					this.previousSibling.style.backgroundColor = 'yellow';
				}	
			});
			squares[i].addEventListener('mouseout', function(){
				this.style.transform = '';
				if ($(this).prev().is('.square')) {
					this.previousSibling.style.backgroundColor = prevBG;
				}
				/*if ($(this).next().is('.square')) {
					this.nextSibling.style.opacity = '1';
				}*/
			});
		}
	}
	,squareClick : () => {
		let squares = 	document.querySelectorAll('.square');					
		for (let i = 0; i < squares.length; i++) {
			squares[i].addEventListener('click', function(){
				let thsborder= (parseInt(this.style.borderWidth, 10));
				if (this.classList.contains('activated')) {
					this.classList.toggle('activated');
					this.style.borderWidth = (thsborder / 3 + 'px');
					localStorage.setItem(this.getAttribute('data-sqrid') + '_style', this.style.cssText);
					localStorage.setItem(this.getAttribute('data-sqrid') + '_class', this.classList);
				} else {
					this.style.borderWidth = (thsborder * 3 + 'px');
					this.classList.toggle('activated');
					localStorage.setItem(this.getAttribute('data-sqrid') + '_style', this.style.cssText);
					localStorage.setItem(this.getAttribute('data-sqrid') + '_class', this.classList);
				}
			});
		}
	}
	,squareSort : () => {
		if (document.querySelector('.sortcontrol')) {
			var controlButton = document.querySelector('.sortcontrol');
		} else {
			var controlButton = document.createElement('button');
			controlButton.classList.add('sortcontrol', 'button');
			controlButton.innerHTML =			('Sort ASC')
			taskJS.btncont.appendChild(controlButton);
		}
		controlButton.addEventListener('click', function(){
			if (this.classList.contains('sorted_asc')) {
				let descArray = [].slice.call($('.square'));
				descArray.sort(function (a, b) {
					a = $(a).text();		
					b = $(b).text();
					return a < b ? 1 : a > b ? -1 : 0
				});
				$(descArray).appendTo(taskJS.squareCont);
				const squares = document.querySelectorAll('.square')
				for (let i = 0; i < squares.length; i++) {
					localStorage.setItem('sqr_' + i + '_class', squares[i].classList);
					localStorage.setItem('sqr_' + i + '_html', squares[i].innerHTML);
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
					localStorage.setItem('sqr_' + i + '_attr', squares[i].getAttribute('data-sqrid'));
				}
				this.classList.remove('sorted_asc');
				this.classList.add('sorted_desc');
				this.innerHTML = 'Sort Default';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			} else if (this.classList.contains('sorted_desc')) {
				let	defArray = [].slice.call($('.square'));
				defArray.sort(function (a, b) {
					a = $(a).attr('data-sqrid');		
					b = $(b).attr('data-sqrid');
					return a < b ? -1 : a > b ? 1 : 0
				});
				$(defArray).appendTo(taskJS.squareCont);
				const squares = document.querySelectorAll('.square')
				for (let i = 0; i < squares.length; i++) {
					localStorage.setItem('sqr_' + i + '_class', squares[i].classList);
					localStorage.setItem('sqr_' + i + '_html', squares[i].innerHTML);
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
					localStorage.setItem('sqr_' + i + '_attr', squares[i].getAttribute('data-sqrid'));
				}
				this.classList.remove('sorted_desc');
				this.innerHTML = 'Sort ASC';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			} else {
				let ascArray = [].slice.call($('.square'));
				ascArray.sort(function (a, b) {
					a = $(a).text();		
					b = $(b).text();
					return a < b ? -1 : a > b ? 1 : 0
				});
				$(ascArray).appendTo(taskJS.squareCont);
				const squares = document.querySelectorAll('.square')
				for (let i = 0; i < squares.length; i++) {
					localStorage.setItem('sqr_' + i + '_class', squares[i].classList);
					localStorage.setItem('sqr_' + i + '_html', squares[i].innerHTML);
					localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
					localStorage.setItem('sqr_' + i + '_attr', squares[i].getAttribute('data-sqrid'));
				}
				this.classList.add('sorted_asc');
				this.innerHTML = 'Sort DESC';
				localStorage.setItem(this.getAttribute('data-btnid') + '_class', this.classList);
				localStorage.setItem(this.getAttribute('data-btnid') + '_html', this.innerHTML);
			}

		});
	}
}
let loadTask = () => {
	if (localStorage.length > 0) {
		for (let i = 0; i < localStorage.length; i++) {
			let btnClass = localStorage.getItem('btn_' + i + '_class'),
			btnHtml = localStorage.getItem('btn_' + i + '_html'),
			btnAttr = localStorage.getItem('btn_' + i + '_attr'),
			sqrClass = localStorage.getItem('sqr_' + i + '_class'),
			sqrHtml = localStorage.getItem('sqr_' + i + '_html'),
			sqrStyle = localStorage.getItem('sqr_' + i + '_style'),
			sqrAttr = localStorage.getItem('sqr_' + i + '_attr');
			if (btnClass && btnHtml && btnAttr) {
				console.log(btnClass, btnHtml, btnAttr);
				let newBtn = document.createElement('button');
				newBtn.classList = btnClass;
				newBtn.innerHTML = btnHtml;
				newBtn.setAttribute('data-btnid', btnAttr);
				taskJS.btncont.appendChild(newBtn);
			}
			if (sqrClass && sqrHtml && sqrStyle && sqrAttr) {
				console.log(sqrClass, sqrHtml, sqrStyle, sqrAttr);
				let newSqr = document.createElement('div');
				newSqr.classList = sqrClass;
				newSqr.innerHTML = sqrHtml;
				newSqr.style.cssText = sqrStyle;
				newSqr.setAttribute('data-sqrid', sqrAttr);
				taskJS.squareCont.appendChild(newSqr);
			}
		}
		var loadbtn = document.querySelector('.loadjson');
			taskJS.squareBorder(); // draw border around squares
			taskJS.squareColor(); // paint border or background in dependence on elements parity
			taskJS.squareNewLine(); //every 4th element from new line
			taskJS.squareShadow(); //every 2nd element with shadow
			taskJS.squareHover(); //magic
			taskJS.squareClick(); //border changing on click
			taskJS.squareSort(); //sort squares	
		} else {
			var loadbtn = document.createElement('button');
			loadbtn.classList.add('loadjson', 'button');
			loadbtn.innerHTML = 'Load Data';
			taskJS.btncont.appendChild(loadbtn);
		}

		loadbtn.addEventListener('click', function(){
			if (this.classList.contains('loaded')) {
				taskJS.readObject (taskJS.drawSquare, taskJS.data);
			taskJS.squareBorder(); // draw border around squares
			taskJS.squareColor(); // paint border or background in dependence on elements parity
			taskJS.squareNewLine(); //every 4th element from new line
			taskJS.squareShadow(); //every 2nd element with shadow
			taskJS.squareHover(); //magic
			taskJS.squareClick(); //border changing on click
			taskJS.squareSort(); //sort squares	
			this.classList.add('complete');
			this.classList.remove('loaded');
			this.innerHTML = 'Clear All'
			const buttons = document.querySelectorAll('.button'),
			squares = document.querySelectorAll('.square');
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].setAttribute('data-btnid', 'btn_' + i);
				localStorage.setItem('btn_' + i + '_class', buttons[i].classList);
				localStorage.setItem('btn_' + i + '_html', buttons[i].innerHTML);
				localStorage.setItem('btn_' + i + '_attr', buttons[i].getAttribute('data-btnid'));
			}
			for (let i = 0; i < squares.length; i++) {
				squares[i].setAttribute('data-sqrid', 'sqr_' + i);
				localStorage.setItem('sqr_' + i + '_class', squares[i].classList);
				localStorage.setItem('sqr_' + i + '_html', squares[i].innerHTML);
				localStorage.setItem('sqr_' + i + '_style', squares[i].style.cssText);
				localStorage.setItem('sqr_' + i + '_attr', squares[i].getAttribute('data-sqrid'));
			}

		} else if (this.classList.contains('complete')){
			taskJS.squareCont.innerHTML = '';
			this.classList.remove('complete');
			this.innerHTML = 'Load Data';
			const buttons = document.querySelectorAll('.button')
			for (let i = 1; i < buttons.length; i++) {
				taskJS.btncont.removeChild(buttons[i]);
			}
			localStorage.clear();
		} else {
			fetch("./js/data.json")
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				taskJS.data = json;
			});
			this.classList.add('loaded');
			this.innerHTML = ('Draw Squares');
			alert('Succes, press Draw Squares to continue');
		}
	})

	}