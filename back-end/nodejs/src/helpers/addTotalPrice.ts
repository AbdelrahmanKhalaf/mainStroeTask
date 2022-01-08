export function totla(array:any){
    var total = 0 ;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        total += element.totalPrice
    }    
    return total
}