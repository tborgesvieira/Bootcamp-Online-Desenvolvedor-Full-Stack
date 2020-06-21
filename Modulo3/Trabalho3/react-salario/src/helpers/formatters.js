const moneyFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});


function formatMoney(value) {
    return moneyFormatter.format(value);
}

function formatPercentage(value) {
    return `${value.toFixed(2).replace('.', ',')}%`;
}

export { formatMoney, formatPercentage };
