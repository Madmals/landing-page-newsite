
const burger = document.querySelector('.header__con img'),
	asideLeft = document.querySelector('.aside-left'),
	main = document.querySelector('main'),
	cardCon = document.querySelector('.news__con'),
	headerSearch = document.querySelector('.header__img')

//aside bar
burger.onclick = () => {
	asideLeft.classList.add('test')
}

window.addEventListener('click', (e) => {

	if (e.target != asideLeft && asideLeft.classList.contains('test') && e.target != burger) {
		asideLeft.classList.remove('test')
	}
})


const eachLink = document.querySelectorAll('.aside-left__con a')

for (let i = 0; i < eachLink.length; i++) {
	eachLink[i].onclick = () => {

		let title = eachLink[i].textContent.trim();

		let query = eachLink[i].textContent.toLowerCase().trim()


		if (query == 'top-headlines') {
			getNewsTop(query, title)
		} else if (query != 'saved searches') {
			getSearchNew(query, title)
		}

	}
}


const addItem = async () => {
	const sleep = async (ms) => {
		await new Promise((res, reject) => setTimeout(res, ms))
	}

	if (window.innerHeight + window.scrollY + 1 >= document.body.scrollHeight) {
		let b = Array.from(eachLink)//this conver nodelist or htmllist to array
		for (let i = 0; i < b.length; i++) {
			if (b[i].textContent.toLowerCase().trim() === 'saved searches') {
				b.splice(i, 1)
			}
		}

		for (let i = 0; i < b.length; i++) {
			if (b[i].textContent.toLowerCase().trim() === 'top-headlines') {
				b.splice(i, 1)
			}
		}


		for (let i = 0; i < b.length; i++) {


			let query = b[i].textContent.toLowerCase().trim()
			let title = b[i].textContent.trim();

			let neDiv = document.createElement('div')
			neDiv.classList.add('news__test')
			let h33 = document.createElement('h3')


			//add setimeout for each fetch
			await sleep(2000)

			let res = await fetch(`https://gnews.io/api/v4/search?q=${query}&token=your_api_key&lang=en`)

			let data = await res.json()

			let html = ''

			data.articles.forEach(async (eachone) => {
				try {

					html += `

				<div class="news__cardcon">

						<div class="news__head">

						<h3><a href="${eachone.url}">${eachone.title}</a></h3>
						<span class="news__headside">
							<h4>${eachone.source.name}</h4>
							<h4 class="news__time">1 hours ago</h4>

						</span>


					</div>
					<img class="news__img"
						src="${eachone.image}"
						alt="">

				</div>
				`
				}
				catch (err) {
					console.error(err)
				}

			})



			neDiv.innerHTML = html
			h33.innerHTML =

				`
			
				<h2>${title}</h2>
			
			`

			neDiv.prepend(h33)

			cardCon.appendChild(neDiv)

			// run once for event listener

			document.removeEventListener('scroll', addItem)

		}




	}
}

document.addEventListener('scroll', addItem)

//api news


const getNewsTop = async (query, title) => {
	let res = await fetch(`https://gnews.io/api/v4/${query}?token=your_api_key&lang=en`)
	let data = await res.json()

	buildNew(data, title)

}

const getSearchNew = async (query, title) => {
	let res = await fetch(`https://gnews.io/api/v4/search?q=${query}&token=your_api_key&lang=en`)
	let data = await res.json()

	buildNew(data, title)

}

const buildNew = (data, title) => {

	let html = ''

	data.articles.forEach((eachone => {

		html += `
	
	<div class="news__cardcon">

					<div class="news__head">

						<h3><a href="${eachone.url}">${eachone.title}</a></h3>
						<span class="news__headside">
							<h4>${eachone.source.name}</h4>
							<h4 class="news__time">1 hours ago</h4>

						</span>


					</div>
					<img class="news__img"
						src="${eachone.image}"
						alt="">
				
	</div>
	`


	}))


	cardCon.innerHTML = `
	
				<h2>${title}</h2>
				${html}


	`


}


const burgerH4 = document.querySelector('.header__con h4'),
	headerInp = document.querySelector('header input'),
	closeInp = document.querySelector('.header__close')


headerSearch.addEventListener('click', () => {
	//under 600px seach button click to show input area
	if (window.innerWidth < 600) {
		headerInp.style.display = "block"
		burger.classList.add('none')
		burgerH4.classList.add('none')
		closeInp.style.display = "block"
		headerSearch.classList.add('none')
	} else {

		//for more than 600px seach button function as click
		let a = headerInp.value
		let b = a.split('')
		let c = b[0].toUpperCase()
		b.splice(0, 1, c)

		return getSearchNew(b.join(''), b.join(''))



	}

})
headerInp.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {

		let a = headerInp.value
		let b = a.split('')
		let c = b[0].toUpperCase()
		b.splice(0, 1, c)

		return getSearchNew(b.join(''), b.join(''))
	}
})

//enter to search

const headerClose = document.querySelector('.header__close')

headerClose.addEventListener('click', (e) => {

	if (window.innerWidth < 600) {
		headerInp.style.display = "none"
		burger.classList.remove('none')
		burgerH4.classList.remove('none')
		closeInp.style.display = "none"
		headerSearch.classList.remove('none')
	}


})


//click outside of search area
window.addEventListener('click', (e) => {

	if (e.target != headerSearch && burger.classList.contains('none') && e.target != headerInp) {

		headerInp.style.display = "none"
		burger.classList.remove('none')
		burgerH4.classList.remove('none')
		closeInp.style.display = "none"
		headerSearch.classList.remove('none')
	}
})


//resize to show input
window.addEventListener('resize', () => {
	if (window.innerWidth > 600) {
		headerClose.style.display = 'none'
		burger.classList.remove('none')
		burgerH4.classList.remove('none')
		headerSearch.classList.remove('none')
		headerInp.style.display = "block"



	} else if (window.innerWidth < 600) {
		headerInp.style.display = "none"


	}
})

//get position 

const todayWeather = document.querySelector('.aside-right__weather-today'),
	container5day = document.querySelector('.aside-right__weekly'),
	temp = document.querySelectorAll('.aside-right__footer a'),
	tempText = document.querySelectorAll('.temp'),
	clickLoc = document.querySelector('.aside-right__weather-card-header')



const runPos = async(success) => {

	let metric = ''
	let tempo = ''
	const lat = success.coords.latitude,
		lon = success.coords.longitude


	for (let i = 0; i < temp.length; i++) {
		temp[i].onclick = async () => {
			if (temp[i] === temp[0]) {
				metric = 'metric'
				tempo = 'C'
				console.log(tempText[i].textContent)
			} else if (temp[i] === temp[1]) {
				metric = 'imperial'
				tempo = 'F'
			} else {
				metric = 'default'
				tempo = 'K'
			}


			let data = await fetchWeather(lat, lon, metric)

			buildToday(data,tempo)

			let data2 = await fetch5days(lat, lon, metric)

			buildWeekly(data2,tempo)

		}


	}

	let data = await fetchWeather(lat, lon, 'metric')

	buildToday(data,"C")

	let data2 = await fetch5days(lat, lon, 'metric')

	buildWeekly(data2,"C")


}


navigator.geolocation.getCurrentPosition((runPos))

clickLoc.onclick = ()=>{

navigator.geolocation.getCurrentPosition((runPos))
}


const buildToday = (data,temp) => {

	todayWeather.innerHTML = `
	                                        <div class="aside-right__today-weather">
							<h4>${data.weather[0].main}</h4>
							<h1>${data.main.temp}&#176;${temp}</h1>
						</div>
						<div class="aside-right__cloud">
							<img
								src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />

						</div>
						`
}


const buildWeekly = (data2,temp) => {

	let html = ''

	for (let i = 0; i < 5; i++) {


		const dateObj = new Date(data2.daily[i].dt * 1000),

			today = new Date().toLocaleDateString()


		if (today === dateObj.toLocaleDateString()) {
			day = 'Today'
		} else {
			day = dateObj.toLocaleDateString('en-US', { weekday: "long" })
		}

		html += `
		<div class="aside-right__concard-week">
			<h3>${day}</h3>
			<img src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}.png" />
			<h4>${data2.daily[i].temp.day}&#176;${temp}</h4>
			</div>
		
		`
		container5day.innerHTML = html
	}

}

const fetchWeather = (async (lat, lon, unit) => {

	let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=your_api_key&units=${unit}`)
	let data = await res.json()

	return data


})

const fetch5days = (async (lat, lon, metric) => {

	let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=your_api_key&units=${metric}`)
	let data = await res.json()

	return data
})

//get tag for 

const tags = document.querySelectorAll(".aside-right__tagcon button")

for (let i = 0; i < tags.length; i++) {
	tags[i].innerHTML = eachLink[i].textContent
}

tags[1].innerHTML = 'Popular'

for (let i = 0; i < tags.length; i++){
	tags[i].onclick = ()=>{
		getSearchNew(tags[i].innerHTML,tags[i].innerHTML)
	}
}


getNewsTop('top-headlines','Top-headlines')







