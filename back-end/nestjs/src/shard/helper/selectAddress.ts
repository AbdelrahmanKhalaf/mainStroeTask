export function SelectAddress(array: [{ address: string; _id: String; }], address: String) {
    for (let index = 0; index < array.length; index++) {
        const element: any = array[index];
        if (element.address == address) {
            index = array.length - 1
            return element.address
        }
    }
}