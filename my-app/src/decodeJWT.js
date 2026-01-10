export function decode(data) {
   try{
    const array = data.split(".");
    const decoded = JSON.parse(atob(array[1]));
    return decoded;
   }catch(error){
    console.log(error)
    return null;
   }
}