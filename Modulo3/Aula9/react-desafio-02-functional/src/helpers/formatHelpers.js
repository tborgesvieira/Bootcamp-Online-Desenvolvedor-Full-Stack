const formatter = Intl.NumberFormat('pt-BR');

function formatNumber(value) {
    return formatter.format(value);
}

export { formatNumber }