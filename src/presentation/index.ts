type HttpHeaders = {
  [name: string]: string
}

export const defaultHttpHeaders = () : HttpHeaders => ({
  'Content-Type' : 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization',
});