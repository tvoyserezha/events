import axios from 'axios'
import dateFormat from 'dateformat'


const API_URL_BASE = 'http://127.0.0.1:5000/api/v1/'
const API_URL_EVENTS = API_URL_BASE + 'events/'
const API_URL_THEMES = API_URL_BASE + 'themes/'
const API_URL_CITIES = API_URL_BASE + 'cities/'

const getConfig = () => {
	const identity = JSON.parse(localStorage.getItem('identity'))
	if (!identity) {
		return null
	}
	return {
		headers: {
			'Authorization': 'Bearer ' + identity['access_token']
		}
	}
}

export const me = async () => {
	return await axios.get(API_URL_BASE + 'auth/me', getConfig()).then(res => {
		return res.data
	}).catch(() => false)
}

export const login = (login, password) => {
	return axios.post(API_URL_BASE + 'auth/login', {login, password}).then(response => {
		return response.data
	}).catch(e => null)
}

export const register = (login, email, password) => {
	return axios.post(API_URL_BASE + 'auth/register', {login, email, password}).then(response => {
		return response.data
	})
}

export const get_events = async (filters) => {
	let url = API_URL_EVENTS
	if (filters) {
		url += '?'
		if (filters.city_id) {
			url += 'city_id=' + filters.city_id
		}
		const theme_ids = filters?.theme_ids?.filter(id => id !== 0)
		if (theme_ids?.length) {
			if (url[url.length - 1] !== "?" && filters.city_id) {
				url += "&"
			}
			url += 'theme_ids=' + theme_ids.join(',')
		}
		if (filters?.start_at) {
			if (url[url.length - 1] !== "?" && filters?.theme_ids?.length) {
				url += "&"
			}
			console.log(filters.start_at);
			let start_at = new Date(filters.start_at)
			console.log(start_at)
			const year = start_at.getFullYear()
			const day = start_at.getDate()
			const month = start_at.getMonth() + 1
			const hours = start_at.getHours()
			const minutes = start_at.getMinutes()
			const seconds = start_at.getSeconds()

			url += 'start=' + `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
		}
		if (filters?.end_at) {
			if (url[url.length - 1] !== "?" && filters?.start_at) {
				url += "&"
			}

			let end_at = new Date(filters.end_at)
			console.log(end_at);
			const year = end_at.getFullYear()
			const day = end_at.getDate()
			const month = end_at.getMonth() + 1
			const hours = end_at.getHours()
			const minutes = end_at.getMinutes()
			const seconds = end_at.getSeconds()

			url += 'end=' + `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
		}
	}

	return await axios.get(url, getConfig()).then(response => {
		const data = JSON.parse(response.data)
		return data
	})
}

export const get_themes = async () => {
	return await axios.get(API_URL_THEMES, getConfig()).then(response => {
		const data = response.data.map(item => JSON.parse(item))
		return data
	})
}

export const get_cities = async () => {
	return await axios.get(API_URL_CITIES, getConfig()).then(response => {
		const data = response.data
		return data
	})
}

export const create_event = async (data) => {
	return await axios.post(API_URL_EVENTS, data, getConfig()).then(response => {
		const data = response.data
		return data
	})
}
