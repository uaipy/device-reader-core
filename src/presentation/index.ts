type HttpHeaders = {
  [name: string]: string
}

export const defaultHttpHeaders = () : HttpHeaders => ({
  'Content-Type' : 'application/json',
  'Access-Controll-Allow-Origin': '*',
  'Access-Controll-Allow-Credentials': 'true',
  'Access-Controll-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Controll-Allow-Headers': 'Authorization',
});