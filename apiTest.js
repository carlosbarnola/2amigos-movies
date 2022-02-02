fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr", {
	"method": "GET",
	"headers": {
    "content-Type": "application/json",
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "a9877cbd76msh11f298c46e6b126p1a6bb8jsn7aa2dbe68783"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});