const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://judge0-ce.p.rapidapi.com/about');
xhr.setRequestHeader('x-rapidapi-key', '5e6758784fmshd4cc117c6a9349bp1b2c02jsnc288163ef483');
xhr.setRequestHeader('x-rapidapi-host', 'judge0-ce.p.rapidapi.com');

xhr.send(data);