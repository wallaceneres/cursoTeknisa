

function validaCPF()
{
    const cpfFormatado = document.getElementById('cpfvalidador').value;

    const cpf = limpaFormatacao(cpfFormatado);

    if (cpf.length !== 11)
    {
        mostraResultado('CPF deve conter 11 dígitos','red');
        return;
    }

    if (verificaDigitosRepetidos(cpf))
    {
        mostraResultado('CPF não pode conter repetição do mesmo digito','red');
        return;
    }

    const digito1 = calcularDigitoVerificador(cpf, 1);

    if(!digito1)
    {
        mostraResultado(`CPF inválido - ${cpfFormatado}`,'red');
        return;
    }

    const digito2 = calcularDigitoVerificador(cpf, 2);

    if(!digito2)
    {
        mostraResultado(`CPF inválido2 - ${cpfFormatado}`,'red');
        return;
    }

    mostraResultado(`CPF válido - ${cpfFormatado}`,'green');
}

function limpaFormatacao(cpf)
{

    cpf = cpf.replace(/\D/g,'');

    return cpf;

}

function mostraResultado(texto, cor)
{

    const span = document.getElementById('result');

    result.innerHTML = texto;
    result.classList.remove('red','green'); 
    result.classList.add(cor); // Adiciona a classe correspondente
    result.classList.add('visible'); // Adiciona a classe 'visible' para exibir a div

}

function verificaDigitosRepetidos(cpf)
{

    return cpf.split('').every((d) => d === cpf[0]);

}

function calcularDigitoVerificador(cpf,posicao)
{

    const sequencia = cpf.slice(0, 8 + posicao).split('');
    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia)
    {
        soma += multiplicador * Number(numero);
        multiplicador--;
    }
    let restoDivisao = (soma * 10) % 11;

    //se o resto da divisao for igual a 10, o valor 0 deve ser considerado!
    if (restoDivisao == 10){
        restoDivisao = 0;
    }

    const digito = cpf.slice(8 + posicao, 9 + posicao);

    console.log(restoDivisao);

    return restoDivisao == digito;


}