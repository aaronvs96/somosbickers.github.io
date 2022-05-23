//FORMATO DOLARES
const formatoDolares = (monto) => {
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    // console.log(numberFormat2.format(monto));
    return numberFormat2.format(monto);
}
export{formatoDolares};