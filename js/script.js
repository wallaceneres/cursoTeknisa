

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

    const digito1 = calcularDigitoVerificador(cpf, 1, 'calcula');

    if(!digito1)
    {
        mostraResultado(`CPF inválido - ${cpfFormatado}`,'red');
        return;
    }

    const digito2 = calcularDigitoVerificador(cpf, 2, 'calcula');

    if(!digito2)
    {
        mostraResultado(`CPF inválido - ${cpfFormatado}`,'red');
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

    result.innerHTML = texto;
    result.classList.remove('red','green'); 
    result.classList.add(cor); 
    result.classList.add('visible');

}

function verificaDigitosRepetidos(cpf)
{

    return cpf.split('').every((d) => d === cpf[0]);

}

function calcularDigitoVerificador(cpf,posicao,operacao)
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

    switch (operacao){

        case 'calcula': return restoDivisao == digito;

        case 'gera': return restoDivisao;

    }

}

function gerarCPF() {
    let cpf = "";
    
    //gera 9 numeros aleatorios
    for (let i = 0; i < 9; i++) {
      cpf += Math.floor(Math.random() * 10);
    }
  
    const digitogerado1 = calcularDigitoVerificador(cpf, 1, 'gera');
    cpf += digitogerado1;
    
    const digitogerado2 = calcularDigitoVerificador(cpf, 2, 'gera');
    cpf += digitogerado2;

    //adiciona mascara no cpf 999.999.999-99
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    const div = document.getElementById('cpfgerado');

    div.innerHTML = cpf;
  }

