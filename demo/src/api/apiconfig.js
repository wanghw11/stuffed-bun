let url
if(process.env.NODE_ENV == 'development'){
    url = '/newwofortg'
}else{
    url = '../../..'
}
export default url