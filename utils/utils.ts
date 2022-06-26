
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
  
const escapeHtml = (str: string): string => {
    return String(str).replace(
        /[&<>"'`=\/]/g, 
        (s: string) => {
                return entityMap[s];
            }
    );
}

const sanitizeString = (str: string): string => {

    return escapeHtml(str);
}

const truncate = (input:string, limit:number):string => {

    return input.length > limit ? `${input.substring(0, limit)}...` : input; 
}

export { sanitizeString, escapeHtml, truncate}