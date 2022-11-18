
interface entityType {
    [key:string]:string
}
const entityMap: entityType = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
export const escapeHtml = (str: string): string => {
    return String(str).replace(
        /[&<>"'`=\/]/g, 
        (s: string) => {
                return entityMap[s];
            }
    );
}

export const sanitizeString = (str: string): string => {

    return escapeHtml(str);
}

export const truncate = (input:string, limit:number):string => {

    return input.length > limit ? `${input.substring(0, limit)}...` : input; 
}

export const HOUR_MS = 3600000; 

export const setWithExpiry = (key:string, value:any, ttl:number) => {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	window.localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key:string) => {
	const itemStr = window.localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}
