/*
document.getElementById("getgif").onclick = getRandomGIF;

function getRandomGIF(event) {
    function buildImageDiv(imageURL) {
        return '<div><img src"${imageURL}"/></div>'
    }
    event.preventDefault();
    var options = {
        method: "GET",
        headers: {
            "x-rapidapi-host": "giphy.p.rapidapi.com",
            "x-repidapi-key": "edaf9fe2f7mshbacb9325978c8e7p193771jsn904e929e8eb6",
        },
    };

    var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

    fetch(url, options)
    .then((response) => {return response.json()})
    .then((data) => {
            let gitURL = data.data.images['downsized_large'].url;
            document.getElementById('gif-storage').innerHTML = buildImageDiv(gifURL);
        })
}
*/


/**
 * Change the function that is assigned to the onclick
 * attribute of the button element.
 * NOTE: for the 25 gif version, you will need to disable the 
 * same origin policy for file:// objects. The request will be
 * blocked by the browser for security reasons.
 * For Firefox you can type about:config in the URL bar, then search for security.file and toggle the value to false.
 * 
 * 
 */
 document.getElementById("getgif").onclick = multipleGifsAjax;

 /**
  * Get a random GIF from the GIPHY API.
  * The div and img tags will be added to the page 
  * using the innerHTML attribute.
  * @param ev 
  */
 function getRndGifInnerHTML(ev){
     function buildImageDiv(src){
         return `<div> <img src="${src}" width="200px" height="200px"></div>`;
     }
 
     ev.preventDefault();
     var url = 'https://api.giphy.com/v1/gifs/random?api_key=NNRJoCsR7akDYqzyU7SvuDwOxI7miCS1&tag=matrix&rating=PG';
     var ajaxCall = new XMLHttpRequest();
 
     ajaxCall.onload = function() {
         console.log('sucess...');
         var resp = JSON.parse(this.responseText);
         var imgLink = resp.data.images['downsized_large'].url;
         eleDiv = buildImageDiv(imgLink);
         var div = document.getElementById("gif-storage")
         div.innerHTML =  eleDiv + div.innerHTML;
     }
 
     ajaxCall.onerror = function() {
         console.log('error...');
     }
     ajaxCall.open('GET', url ,true);
     ajaxCall.send()
 }
 
 /**
  * Get a random GIF from the GIPHY API.
  * The div and img tags will be added to the page 
  * using the DOM API of creating nodes and
  * appending nodes to the parent div.
  * @param ev 
  */
 function getRndGifAppendNodes(ev){
     function buildImageDiv(imgLink){
         let div = document.createElement('div');
         let img = document.createElement('img');
         img.src = imgLink;
         img.width = "200"
         img.height = "200";
         div.appendChild(img);
         return div;
     }
     ev.preventDefault();
     var url = 'https://api.giphy.com/v1/gifs/random?api_key=NNRJoCsR7akDYqzyU7SvuDwOxI7miCS1&tag=matrix&rating=PG';
     var ajaxcall = new XMLHttpRequest();
 
     ajaxcall.onload = function() {
         console.log('sucess...');
         var resp = JSON.parse(this.responseText);
         var imgLink = resp.data.images['downsized_large'].url;
         var div = document.getElementById("gif-storage");
         div.appendChild(buildImageDiv(imgLink));
     }
 
     ajaxcall.onerror = function() {
         console.log('error...');
     }
     ajaxcall.open('GET', url ,true);
     ajaxcall.send()
 }
 
 /**
  * Get GIFs from the GIPHY API, but using
  * the search URL. We will get 25 matrix
  * GIFS, and if we want more , well get the next
  * 25 GIFS in the search. This is one way you can handle
  * pagination. NOTE to use pagination the server needs to 
  * implement logic to set an offset in the results. This offset
  * will be a marker in the query to  keep track of where we are.
  * This way the front-end doesnt need to manage the ~1500 results
  * for this query.
  * @param ev 
  */
 function multipleGifsAjax(ev){
     function buildImageDiv(imgLink){
         let div = document.createElement('div');
         let img = document.createElement('img');
         img.src = imgLink;
         img.width = "200";
         img.height = "200";
         div.appendChild(img);
         return div;
     }
     ev.preventDefault();
     var data = null;
     var url = "https://giphy.p.rapidapi.com/v1/gifs/search?limit=25{offset}&rating=PG&q=fails&api_key=dc6zaTOxFJmzC";
     if(window.offset){
         url = url.replace("{offset}", "&offset="+window.offset);
     }else{
         url = url.replace("{offset}", "");
     }
     var ajaxcall = new XMLHttpRequest();
     ajaxcall.onload = function() {
         if(this.readyState ===  this.DONE){
             console.log('sucess...');
             
             console.log(url);
             var resp = JSON.parse(this.responseText);
             let gifs = resp.data;
             var div = document.getElementById("gif-storage");
             console.log(resp);
             [...gifs].forEach( (gif) => {
                 //console.log(gif.images['downsized_large'].url);
                 div.appendChild(buildImageDiv(gif.images['downsized_large'].url));
             });
             if(window.offset){
                 window.offset = window.offset + 25;
             }else{
                 window.offset = 25;
             }
         }
     }
     ajaxcall.on
     ajaxcall.onerror = function() {
         console.log('error...');
     }
     ajaxcall.open('GET', url ,true);
     ajaxcall.setRequestHeader("x-rapidapi-host", "giphy.p.rapidapi.com");
     ajaxcall.setRequestHeader("x-rapidapi-key", "edaf9fe2f7mshbacb9325978c8e7p193771jsn904e929e8eb6");
     ajaxcall.send(data);
 }


 var opacity =0;
	var intervalID=0;
	 

	//순수 자바스크립트 클릭 이벤트 Fsade out 실행
	document.getElementById('gif-storage').addEventListener('click', function() {
		intervalID = setInterval(hide,200);
	});
    
	//순수 자바스크립트 클릭 이벤트 Fade in
	document.getElementById('gif-storage').addEventListener('click', function() {
		intervalID = setInterval(show,200);
	});
 
	function hide(){
		var div = document.getElementById("gif-storage");
		opacity = Number(window.getComputedStyle(div).getPropertyValue("opacity"));
		
		if(opacity>0){
            //Fade out 핵심 부분
			opacity = opacity-0.1;
			div.style.opacity=opacity;
			//img.style.opacity=opacity;
		}
		else{
			clearInterval(intervalID);
		}
	}
	
	function show(){
		var div = document.getElementById("gif-storage");
		opacity = Number(window.getComputedStyle(div).getPropertyValue("opacity"));
		
		if(opacity<1){
        	//Fade in 핵심 부분
			opacity = opacity+0.1;
			div.style.opacity=opacity;
			//img.style.opacity=opacity;
		}
		else{
			clearInterval(intervalID);
		}
	}